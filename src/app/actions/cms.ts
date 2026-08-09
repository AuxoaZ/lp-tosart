"use server";

import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Environment variables
const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH || "main";
const TOKEN = process.env.GITHUB_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const LOCAL_DB_PATH = path.join(process.cwd(), "src/data/db.json");
const UPLOADS_DIR = path.join(process.cwd(), "public/uploads");

// Simple interface for gallery db
interface GalleryData {
  apparelImages: string[];
  accessoriesImages: string[];
  logoBrandImages: string[];
  visualImages: string[];
  socialImages: string[];
  homeApparelImages: string[];
  homeAccessoriesImages: string[];
  videos: {
    id: string;
    title: string;
    embedUrl: string;
    category: string;
  }[];
  typewriting: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      words: string[];
      stats: { value: string; label: string }[];
    };
    whoWeAre: {
      title: string;
      paragraphs: string[];
    };
    services: {
      title: string;
      subtitle: string;
      items: { title: string; description: string }[];
    };
  };
  media: {
    whatsapp: string;
    instagram: string;
    email: string;
  };
}

// Check if GitHub credentials are fully configured
const isGithubConfigured = () => {
  return !!(TOKEN && OWNER && REPO);
};

// Helper: Fetch file from GitHub API (handles public and private repos)
async function fetchFromGithub(filePath: string) {
  if (!isGithubConfigured())
    throw new Error("GitHub credentials not configured.");

  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${BRANCH}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `token ${TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch from GitHub: ${response.statusText}`);
  }

  const data = await response.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return {
    sha: data.sha,
    content,
    parsed: JSON.parse(content),
  };
}

// Helper: Push file to GitHub API
async function pushToGithub(
  filePath: string,
  content: string | Buffer,
  sha?: string,
  commitMessage = "Update via CMS",
) {
  if (!isGithubConfigured())
    throw new Error("GitHub credentials not configured.");

  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`;
  const base64Content = typeof content === "string"
    ? Buffer.from(content, "utf-8").toString("base64")
    : content.toString("base64");

  const body: any = {
    message: commitMessage,
    content: base64Content,
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `token ${TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `Failed to write to GitHub: ${response.statusText}. Details: ${errorDetails}`,
    );
  }

  return await response.json();
}

// Helper: Delete file from GitHub API
async function deleteFromGithub(filePath: string, sha: string) {
  if (!isGithubConfigured())
    throw new Error("GitHub credentials not configured.");

  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `token ${TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Delete image via CMS",
      sha,
      branch: BRANCH,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to delete from GitHub: ${response.statusText}`);
  }
}

// Helper: Get file SHA from GitHub API
async function getFileSha(filePath: string) {
  if (!isGithubConfigured()) return null;
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${BRANCH}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data.sha as string;
  }
  return null;
}

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================

export async function authenticateAdmin(password: string) {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }
  return { success: false, error: "Password salah!" };
}

export async function checkAdminSession() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}

// ==========================================
// CORE CMS DATA OPERATIONS
// ==========================================

// Get all gallery data
export async function getGalleryData(): Promise<GalleryData> {
  // If GitHub is configured, fetch from GitHub
  if (isGithubConfigured()) {
    try {
      const gitData = await fetchFromGithub("src/data/db.json");
      if (gitData && gitData.parsed) {
        return gitData.parsed as GalleryData;
      }
    } catch (error) {
      console.error(
        "Error fetching from GitHub, falling back to local:",
        error,
      );
    }
  }

  // Fallback to local file system
  try {
    const fileContent = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    return JSON.parse(fileContent) as GalleryData;
  } catch (error) {
    console.error("Error reading local db.json:", error);
    // Return empty schema if reading fails
    return {
      apparelImages: [],
      accessoriesImages: [],
      logoBrandImages: [],
      visualImages: [],
      socialImages: [],
      homeApparelImages: [],
      homeAccessoriesImages: [],
      videos: [],
      typewriting: {
        hero: {
          badge: "Apparel Design, Branding & Visual Studio",
          title: "Beyond\nVisuals",
          subtitle:
            "Designing visuals that connect culture, identity, and storytelling.",
          words: ["culture", "identity", "storytelling"],
          stats: [
            { value: "5+", label: "Years Experience" },
            { value: "400+", label: "Brands Handled" },
          ],
        },
        whoWeAre: {
          title: "Who We Are",
          paragraphs: [
            "Tosart is a creative studio specializing in apparel design, branding, and visual content production. We help brands transform ideas into visuals that feel distinctive, relevant, and production-ready.",
            "With years of experience working across various industries and creative directions, we focus on creating designs that are not only visually strong, but also aligned with brand identity and audience culture.",
            "From apparel graphics to digital visuals, every project is approached with attention to detail, concept development, and strong visual storytelling.",
          ],
        },
        services: {
          title: "Our Services",
          subtitle:
            "Comprehensive creative solutions to elevate your brand and apparel line",
          items: [
            {
              title: "Apparel Design",
              description:
                "T-shirt, hoodie, jersey, and custom apparel design with strong visual direction and production-ready output.",
            },
            {
              title: "Social Media Design",
              description:
                "Creative content and visual systems tailored for digital branding and audience engagement.",
            },
            {
              title: "Video Marketing",
              description:
                "Visual editing, motion graphics, and video production to tell your brand story dynamically.",
            },
            {
              title: "Custom & Accessories",
              description:
                "Creative support for hats, bags, patches, tags, zipper pulls, packaging, and other supporting merchandise.",
            },
            {
              title: "Logo & Branding",
              description:
                "Brand identity design that builds a recognizable and consistent visual presence.",
            },
          ],
        },
      },
      media: {
        whatsapp: "6285904430581",
        instagram: "tosart.std",
        email: "hello@tosart.studio",
      },
    };
  }
}

// Save/Update gallery lists (e.g. reordering or selected home images)
export async function updateGalleryData(
  category: keyof GalleryData,
  newImagesList: string[],
  homeApparel?: string[],
  homeAccessories?: string[],
) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  // Validate home gallery constraints (MUST be exactly 12 if provided)
  if (homeApparel && homeApparel.length !== 12) {
    throw new Error("Pilihan Apparel Beranda harus tepat 12 gambar!");
  }
  if (homeAccessories && homeAccessories.length !== 12) {
    throw new Error("Pilihan Accessories Beranda harus tepat 12 gambar!");
  }

  if (isGithubConfigured()) {
    try {
      const gitData = await fetchFromGithub("src/data/db.json");
      const currentDb = gitData ? gitData.parsed : await getGalleryData();
      const sha = gitData ? gitData.sha : undefined;

      currentDb[category] = newImagesList;
      if (homeApparel) currentDb.homeApparelImages = homeApparel;
      if (homeAccessories) currentDb.homeAccessoriesImages = homeAccessories;

      await pushToGithub(
        "src/data/db.json",
        JSON.stringify(currentDb, null, 2),
        sha,
        `Update category ${category} via CMS`,
      );

      // Revalidate paths to clear Next.js caches
      revalidatePath("/");
      revalidatePath("/apparel-design");
      revalidatePath("/social-media-design");
      return { success: true };
    } catch (error: any) {
      console.error("GitHub update failed:", error);
      throw new Error(`Gagal menyimpan ke GitHub: ${error.message}`);
    }
  }

  // Local fallback
  try {
    const fileContent = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    const currentDb = JSON.parse(fileContent);

    currentDb[category] = newImagesList;
    if (homeApparel) currentDb.homeApparelImages = homeApparel;
    if (homeAccessories) currentDb.homeAccessoriesImages = homeAccessories;

    await fs.writeFile(
      LOCAL_DB_PATH,
      JSON.stringify(currentDb, null, 2),
      "utf-8",
    );

    revalidatePath("/");
    revalidatePath("/apparel-design");
    revalidatePath("/social-media-design");
    return { success: true };
  } catch (error: any) {
    console.error("Local update failed:", error);
    throw new Error(`Gagal menyimpan file lokal: ${error.message}`);
  }
}

// Upload Image (Max 2MB validation)
export async function uploadImageAction(
  category: keyof GalleryData,
  fileName: string,
  fileBase64: string,
) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  // Validate size: (base64String.length * 3) / 4
  const fileSizeInBytes = (fileBase64.length * 3) / 4;
  const maxBytes = 2 * 1024 * 1024; // 2MB
  if (fileSizeInBytes > maxBytes) {
    throw new Error("Ukuran file terlalu besar! Maksimal adalah 2MB.");
  }

  const fileRepoPath = `public/uploads/${fileName}`;
  const relativePublicPath = `/uploads/${fileName}`;

  if (isGithubConfigured()) {
    try {
      // 1. Upload file to GitHub repo
      const existingSha = await getFileSha(fileRepoPath);
      const fileBuffer = Buffer.from(fileBase64, "base64");
      await pushToGithub(
        fileRepoPath,
        fileBuffer,
        existingSha || undefined,
        `Upload image ${fileName} via CMS`,
      );

      // 2. Write copy to local disk so localhost can serve it immediately without git pull
      try {
        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        await fs.writeFile(path.join(UPLOADS_DIR, fileName), fileBuffer);
      } catch (localErr) {
        console.warn("Gagal menyimpan salinan lokal gambar:", localErr);
      }

      // 3. Add to db.json
      const gitData = await fetchFromGithub("src/data/db.json");
      const currentDb = gitData ? gitData.parsed : await getGalleryData();
      const dbSha = gitData ? gitData.sha : undefined;

      if (!currentDb[category].includes(relativePublicPath)) {
        currentDb[category].push(relativePublicPath);
      }

      await pushToGithub(
        "src/data/db.json",
        JSON.stringify(currentDb, null, 2),
        dbSha,
        `Add uploaded image path to ${category}`,
      );

      revalidatePath("/");
      revalidatePath("/apparel-design");
      revalidatePath("/social-media-design");
      return { success: true, imagePath: relativePublicPath };
    } catch (error: any) {
      console.error("GitHub upload action failed:", error);
      throw new Error(`Gagal mengunggah ke GitHub: ${error.message}`);
    }
  }

  // Local fallback
  try {
    // Ensure dir exists
    await fs.mkdir(UPLOADS_DIR, { recursive: true });

    // Write local file
    const fileBuffer = Buffer.from(fileBase64, "base64");
    await fs.writeFile(path.join(UPLOADS_DIR, fileName), fileBuffer);

    // Update local db.json
    const fileContent = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    const currentDb = JSON.parse(fileContent);

    if (!currentDb[category].includes(relativePublicPath)) {
      currentDb[category].push(relativePublicPath);
    }

    await fs.writeFile(
      LOCAL_DB_PATH,
      JSON.stringify(currentDb, null, 2),
      "utf-8",
    );

    revalidatePath("/");
    revalidatePath("/apparel-design");
    revalidatePath("/social-media-design");
    return { success: true, imagePath: relativePublicPath };
  } catch (error: any) {
    console.error("Local upload action failed:", error);
    throw new Error(`Gagal mengunggah secara lokal: ${error.message}`);
  }
}

// Delete Image
export async function deleteImageAction(
  category: keyof GalleryData,
  imagePath: string,
) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  // Determine if it was uploaded or if it is inside public/uploads
  const isUploadedFile = imagePath.startsWith("/uploads/");
  const fileName = isUploadedFile ? imagePath.replace("/uploads/", "") : "";
  const fileRepoPath = `public/uploads/${fileName}`;

  if (isGithubConfigured()) {
    try {
      // 1. Delete physical file from GitHub if it's an uploaded file
      if (isUploadedFile) {
        const fileSha = await getFileSha(fileRepoPath);
        if (fileSha) {
          await deleteFromGithub(fileRepoPath, fileSha);
        }
      }

      // 2. Remove path from db.json
      const gitData = await fetchFromGithub("src/data/db.json");
      const currentDb = gitData ? gitData.parsed : await getGalleryData();
      const dbSha = gitData ? gitData.sha : undefined;

      // Filter arrays
      currentDb[category] = currentDb[category].filter(
        (p: string) => p !== imagePath,
      );
      currentDb.homeApparelImages = currentDb.homeApparelImages.filter(
        (p: string) => p !== imagePath,
      );
      currentDb.homeAccessoriesImages = currentDb.homeAccessoriesImages.filter(
        (p: string) => p !== imagePath,
      );

      await pushToGithub(
        "src/data/db.json",
        JSON.stringify(currentDb, null, 2),
        dbSha,
        `Delete image ${imagePath} from ${category}`,
      );

      revalidatePath("/");
      revalidatePath("/apparel-design");
      revalidatePath("/social-media-design");
      return { success: true };
    } catch (error: any) {
      console.error("GitHub delete action failed:", error);
      throw new Error(`Gagal menghapus dari GitHub: ${error.message}`);
    }
  }

  // Local fallback
  try {
    // 1. Delete physical file locally
    if (isUploadedFile) {
      const localFilePath = path.join(UPLOADS_DIR, fileName);
      try {
        await fs.unlink(localFilePath);
      } catch (e) {
        console.warn(
          `File local tidak ditemukan untuk dihapus: ${localFilePath}`,
        );
      }
    }

    // 2. Remove from local db.json
    const fileContent = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    const currentDb = JSON.parse(fileContent);

    currentDb[category] = currentDb[category].filter(
      (p: string) => p !== imagePath,
    );
    currentDb.homeApparelImages = currentDb.homeApparelImages.filter(
      (p: string) => p !== imagePath,
    );
    currentDb.homeAccessoriesImages = currentDb.homeAccessoriesImages.filter(
      (p: string) => p !== imagePath,
    );

    await fs.writeFile(
      LOCAL_DB_PATH,
      JSON.stringify(currentDb, null, 2),
      "utf-8",
    );

    revalidatePath("/");
    revalidatePath("/apparel-design");
    revalidatePath("/social-media-design");
    return { success: true };
  } catch (error: any) {
    console.error("Local delete action failed:", error);
    throw new Error(`Gagal menghapus secara lokal: ${error.message}`);
  }
}

// Update Videos List (CRUD)
export async function updateVideosAction(newVideosList: any[]) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  if (isGithubConfigured()) {
    try {
      const gitData = await fetchFromGithub("src/data/db.json");
      const currentDb = gitData ? gitData.parsed : await getGalleryData();
      const sha = gitData ? gitData.sha : undefined;

      currentDb.videos = newVideosList;

      await pushToGithub(
        "src/data/db.json",
        JSON.stringify(currentDb, null, 2),
        sha,
        "Update videos list via CMS",
      );

      revalidatePath("/video-marketing");
      return { success: true };
    } catch (error: any) {
      console.error("GitHub videos update failed:", error);
      throw new Error(`Gagal memperbarui video di GitHub: ${error.message}`);
    }
  }

  // Local fallback
  try {
    const fileContent = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    const currentDb = JSON.parse(fileContent);

    currentDb.videos = newVideosList;

    await fs.writeFile(
      LOCAL_DB_PATH,
      JSON.stringify(currentDb, null, 2),
      "utf-8",
    );

    revalidatePath("/video-marketing");
    return { success: true };
  } catch (error: any) {
    console.error("Local videos update failed:", error);
    throw new Error(`Gagal memperbarui video secara lokal: ${error.message}`);
  }
}

// Update Typewriting (Copywriting) List
export async function updateTypewritingAction(newTypewritingData: any) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  if (isGithubConfigured()) {
    try {
      const gitData = await fetchFromGithub("src/data/db.json");
      const currentDb = gitData ? gitData.parsed : await getGalleryData();
      const sha = gitData ? gitData.sha : undefined;

      currentDb.typewriting = newTypewritingData;

      await pushToGithub(
        "src/data/db.json",
        JSON.stringify(currentDb, null, 2),
        sha,
        "Update copywriting texts via CMS",
      );

      revalidatePath("/");
      return { success: true };
    } catch (error: any) {
      console.error("GitHub typewriting update failed:", error);
      throw new Error(
        `Gagal memperbarui konten teks di GitHub: ${error.message}`,
      );
    }
  }

  // Local fallback
  try {
    const fileContent = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    const currentDb = JSON.parse(fileContent);

    currentDb.typewriting = newTypewritingData;

    await fs.writeFile(
      LOCAL_DB_PATH,
      JSON.stringify(currentDb, null, 2),
      "utf-8",
    );

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Local typewriting update failed:", error);
    throw new Error(
      `Gagal memperbarui konten teks secara lokal: ${error.message}`,
    );
  }
}

// Update Media Contact Settings
export async function updateMediaAction(newMediaSettings: {
  whatsapp: string;
  instagram: string;
  email: string;
}) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  if (isGithubConfigured()) {
    try {
      const gitData = await fetchFromGithub("src/data/db.json");
      const currentDb = gitData ? gitData.parsed : await getGalleryData();
      const sha = gitData ? gitData.sha : undefined;

      currentDb.media = newMediaSettings;

      await pushToGithub(
        "src/data/db.json",
        JSON.stringify(currentDb, null, 2),
        sha,
        "Update media settings via CMS",
      );

      revalidatePath("/");
      revalidatePath("/apparel-design");
      revalidatePath("/social-media-design");
      return { success: true };
    } catch (error: any) {
      console.error("GitHub media settings update failed:", error);
      throw new Error(`Gagal memperbarui kontak di GitHub: ${error.message}`);
    }
  }

  // Local fallback
  try {
    const fileContent = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    const currentDb = JSON.parse(fileContent);

    currentDb.media = newMediaSettings;

    await fs.writeFile(
      LOCAL_DB_PATH,
      JSON.stringify(currentDb, null, 2),
      "utf-8",
    );

    revalidatePath("/");
    revalidatePath("/apparel-design");
    revalidatePath("/social-media-design");
    return { success: true };
  } catch (error: any) {
    console.error("Local media settings update failed:", error);
    throw new Error(`Gagal memperbarui kontak secara lokal: ${error.message}`);
  }
}
