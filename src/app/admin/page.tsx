"use client";

import React, { useState, useEffect } from "react";
import { 
  FiLock, 
  FiLogOut, 
  FiTrash2, 
  FiArrowLeft, 
  FiArrowRight, 
  FiUploadCloud, 
  FiPlus, 
  FiSave, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiArrowUp, 
  FiArrowDown,
  FiFileText,
  FiVideo,
  FiInstagram,
  FiLayers
} from "react-icons/fi";
import { 
  authenticateAdmin, 
  checkAdminSession, 
  logoutAdmin, 
  getGalleryData, 
  updateGalleryData, 
  uploadImageAction, 
  deleteImageAction,
  updateVideosAction
} from "@/app/actions/cms";

type TabType = "apparel" | "accessories" | "logo-brand" | "visuals" | "social" | "videos";

interface VideoItem {
  id: string;
  title: string;
  embedUrl: string;
  category: string;
}

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Data states
  const [activeTab, setActiveTab] = useState<TabType>("apparel");
  const [loadingData, setLoadingData] = useState(false);
  const [savingData, setSavingData] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Gallery arrays
  const [apparelImages, setApparelImages] = useState<string[]>([]);
  const [accessoriesImages, setAccessoriesImages] = useState<string[]>([]);
  const [logoBrandImages, setLogoBrandImages] = useState<string[]>([]);
  const [visualImages, setVisualImages] = useState<string[]>([]);
  const [socialImages, setSocialImages] = useState<string[]>([]);
  const [homeApparel, setHomeApparel] = useState<string[]>([]);
  const [homeAccessories, setHomeAccessories] = useState<string[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  // Video Form states
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoCategory, setNewVideoCategory] = useState("ai-marketing");

  // Fetch session on load
  useEffect(() => {
    async function initSession() {
      try {
        const isAuth = await checkAdminSession();
        setIsAuthenticated(isAuth);
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setCheckingSession(false);
      }
    }
    initSession();
  }, []);

  // Fetch gallery data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    setLoadingData(true);
    try {
      const data = await getGalleryData();
      setApparelImages(data.apparelImages || []);
      setAccessoriesImages(data.accessoriesImages || []);
      setLogoBrandImages(data.logoBrandImages || []);
      setVisualImages(data.visualImages || []);
      setSocialImages(data.socialImages || []);
      setHomeApparel(data.homeApparelImages || []);
      setHomeAccessories(data.homeAccessoriesImages || []);
      setVideos(data.videos || []);
    } catch (err) {
      showToast("Gagal memuat data!", "error");
    } finally {
      setLoadingData(false);
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await authenticateAdmin(password);
      if (res.success) {
        setIsAuthenticated(true);
      } else {
        setAuthError(res.error || "Password salah!");
      }
    } catch (err) {
      setAuthError("Gagal menghubungkan ke server.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      setIsAuthenticated(false);
      setPassword("");
    } catch (err) {
      showToast("Gagal logout.", "error");
    }
  };

  // Reorder images
  const moveImage = (images: string[], setImages: React.Dispatch<React.SetStateAction<string[]>>, index: number, direction: "left" | "right") => {
    const newImages = [...images];
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    
    // Swap
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    
    setImages(newImages);
  };

  // Toggle Pinned status for Home page (must be exactly 12)
  const toggleHomePin = (src: string, pinnedList: string[], setPinnedList: React.Dispatch<React.SetStateAction<string[]>>) => {
    const isPinned = pinnedList.includes(src);
    if (isPinned) {
      setPinnedList(pinnedList.filter(item => item !== src));
    } else {
      if (pinnedList.length >= 12) {
        showToast("Sudah mencapai batas maksimal 12 gambar untuk Beranda!", "error");
        return;
      }
      setPinnedList([...pinnedList, src]);
    }
  };

  // Handle image upload with 2MB validation
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: keyof typeof categoryMapping) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (2MB max)
    const maxBytes = 2 * 1024 * 1024;
    if (file.size > maxBytes) {
      showToast("Gagal! Ukuran file maksimal adalah 2MB.", "error");
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(",")[1];
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        
        const key = categoryMapping[category];
        const res = await uploadImageAction(key, fileName, base64String);

        if (res.success && res.imagePath) {
          // Append locally first
          if (key === "apparelImages") setApparelImages(prev => [...prev, res.imagePath!]);
          else if (key === "accessoriesImages") setAccessoriesImages(prev => [...prev, res.imagePath!]);
          else if (key === "logoBrandImages") setLogoBrandImages(prev => [...prev, res.imagePath!]);
          else if (key === "visualImages") setVisualImages(prev => [...prev, res.imagePath!]);
          else if (key === "socialImages") setSocialImages(prev => [...prev, res.imagePath!]);

          showToast("Gambar berhasil diunggah!", "success");
          // Re-load data from git/local to ensure fully in sync
          await loadAllData();
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      showToast(`Gagal mengunggah: ${err.message}`, "error");
    } finally {
      setUploading(false);
      // Clear input
      e.target.value = "";
    }
  };

  // Delete image
  const handleDeleteImage = async (imagePath: string, key: keyof typeof categoryMapping) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus gambar ini? Tindakan ini permanen.")) return;
    
    setSavingData(true);
    try {
      const res = await deleteImageAction(categoryMapping[key], imagePath);
      if (res.success) {
        showToast("Gambar berhasil dihapus!", "success");
        await loadAllData();
      }
    } catch (err: any) {
      showToast(`Gagal menghapus: ${err.message}`, "error");
    } finally {
      setSavingData(false);
    }
  };

  // Save changes for current category (includes order and home pins)
  const saveCategoryChanges = async (tab: TabType) => {
    setSavingData(true);
    try {
      if (tab === "apparel") {
        if (homeApparel.length !== 12) {
          showToast("Gagal! Anda harus memilih tepat 12 gambar untuk galeri Apparel Beranda.", "error");
          setSavingData(false);
          return;
        }
        await updateGalleryData("apparelImages", apparelImages, homeApparel, undefined);
      } else if (tab === "accessories") {
        if (homeAccessories.length !== 12) {
          showToast("Gagal! Anda harus memilih tepat 12 gambar untuk galeri Accessories Beranda.", "error");
          setSavingData(false);
          return;
        }
        await updateGalleryData("accessoriesImages", accessoriesImages, undefined, homeAccessories);
      } else if (tab === "logo-brand") {
        await updateGalleryData("logoBrandImages", logoBrandImages);
      } else if (tab === "visuals") {
        await updateGalleryData("visualImages", visualImages);
      } else if (tab === "social") {
        await updateGalleryData("socialImages", socialImages);
      }

      showToast("Perubahan berhasil disimpan dan disinkronkan!", "success");
      await loadAllData();
    } catch (err: any) {
      showToast(`Gagal menyimpan: ${err.message}`, "error");
    } finally {
      setSavingData(false);
    }
  };

  // Video Management CRUD
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle || !newVideoUrl) {
      showToast("Judul dan URL Embed Video wajib diisi!", "error");
      return;
    }

    setSavingData(true);
    try {
      const newVideo: VideoItem = {
        id: `v-${Date.now()}`,
        title: newVideoTitle,
        embedUrl: newVideoUrl,
        category: newVideoCategory,
      };
      
      const updatedVideos = [...videos, newVideo];
      const res = await updateVideosAction(updatedVideos);
      if (res.success) {
        setVideos(updatedVideos);
        setNewVideoTitle("");
        setNewVideoUrl("");
        showToast("Video berhasil ditambahkan!", "success");
      }
    } catch (err: any) {
      showToast(`Gagal menambah video: ${err.message}`, "error");
    } finally {
      setSavingData(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus video ini?")) return;
    
    setSavingData(true);
    try {
      const updatedVideos = videos.filter(v => v.id !== id);
      const res = await updateVideosAction(updatedVideos);
      if (res.success) {
        setVideos(updatedVideos);
        showToast("Video berhasil dihapus!", "success");
      }
    } catch (err: any) {
      showToast(`Gagal menghapus video: ${err.message}`, "error");
    } finally {
      setSavingData(false);
    }
  };

  const moveVideo = async (index: number, direction: "up" | "down") => {
    const newVideos = [...videos];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newVideos.length) return;

    // Swap
    const temp = newVideos[index];
    newVideos[index] = newVideos[targetIndex];
    newVideos[targetIndex] = temp;

    setVideos(newVideos);
    setSavingData(true);
    try {
      const res = await updateVideosAction(newVideos);
      if (res.success) {
        showToast("Urutan video berhasil diperbarui!", "success");
      }
    } catch (err: any) {
      showToast(`Gagal mengubah urutan: ${err.message}`, "error");
      // Re-load
      await loadAllData();
    } finally {
      setSavingData(false);
    }
  };

  const categoryMapping = {
    apparel: "apparelImages",
    accessories: "accessoriesImages",
    "logo-brand": "logoBrandImages",
    visuals: "visualImages",
    social: "socialImages",
  } as const;

  // Helper getters/setters inside component body to access state directly
  const getCategoryImages = (tab: TabType): string[] => {
    switch (tab) {
      case "apparel": return apparelImages;
      case "accessories": return accessoriesImages;
      case "logo-brand": return logoBrandImages;
      case "visuals": return visualImages;
      case "social": return socialImages;
      default: return [];
    }
  };

  const getImageSetter = (tab: TabType) => {
    switch (tab) {
      case "apparel": return setApparelImages;
      case "accessories": return setAccessoriesImages;
      case "logo-brand": return setLogoBrandImages;
      case "visuals": return setVisualImages;
      case "social": return setSocialImages;
      default: return () => {};
    }
  };

  const isImagePinned = (src: string, tab: TabType): boolean => {
    if (tab === "apparel") return homeApparel.includes(src);
    if (tab === "accessories") return homeAccessories.includes(src);
    return false;
  };

  const handlePinToggle = (src: string, tab: TabType) => {
    if (tab === "apparel") {
      toggleHomePin(src, homeApparel, setHomeApparel);
    } else if (tab === "accessories") {
      toggleHomePin(src, homeAccessories, setHomeAccessories);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white/50 font-light">
        <span className="loading loading-spinner loading-md mr-3"></span> Memverifikasi sesi...
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 bg-primary/20 rounded-full blur-3xl z-0" />
        
        <form 
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-md bg-base-300/40 backdrop-blur-2xl border border-white/10 rounded-4xl p-8 sm:p-10 shadow-2xl flex flex-col space-y-6"
        >
          <div className="text-center">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4">
              <LockIcon className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-syne font-black uppercase text-white tracking-tight">
              TOSART CMS
            </h1>
            <p className="text-sm text-base-content/60 font-light mt-1">
              Masukkan kata sandi admin untuk melanjutkan
            </p>
          </div>

          {authError && (
            <div className="alert alert-error bg-red-950/40 border border-red-500/20 text-red-200 text-sm flex gap-2 rounded-xl p-3 select-none">
              <FiAlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-semibold text-white/50">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-white transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={authLoading}
            className="btn btn-primary w-full rounded-xl py-3 font-semibold shadow-lg shadow-primary/25 cursor-pointer"
          >
            {authLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : "Masuk ke Dashboard"}
          </button>
        </form>
      </div>
    );
  }

  // DASHBOARD SCREEN
  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-24 right-6 z-50 alert shadow-2xl border flex gap-3 p-4 rounded-2xl max-w-sm transition-all duration-300 ${
          toast.type === "success" 
            ? "alert-success bg-green-950/60 border-green-500/30 text-green-200" 
            : "alert-error bg-red-950/60 border-red-500/30 text-red-200"
        }`}>
          {toast.type === "success" ? <FiCheckCircle className="w-5 h-5" /> : <FiAlertCircle className="w-5 h-5" />}
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-8 select-none">
        <div>
          <h1 className="text-4xl font-syne font-black uppercase text-white tracking-tight leading-none">
            CMS Dashboard
          </h1>
          <p className="text-sm text-base-content/60 font-light mt-2">
            Kelola konten, galeri portfolio, dan aset media website secara dinamis.
          </p>
        </div>

        <button 
          onClick={handleLogout}
          className="btn btn-outline border-white/10 text-white/70 hover:bg-white/5 hover:text-white rounded-xl gap-2 cursor-pointer"
        >
          <FiLogOut className="w-4 h-4" /> Keluar
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Tabs */}
        <div className="lg:col-span-3 bg-base-300/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-1.5 select-none">
          <p className="text-xs uppercase tracking-widest font-bold text-white/30 px-3 mb-2">Kategori Konten</p>
          
          <TabButton active={activeTab === "apparel"} icon={<FiLayers />} label="Apparel Gallery" onClick={() => setActiveTab("apparel")} />
          <TabButton active={activeTab === "accessories"} icon={<FiLayers />} label="Accessories Gallery" onClick={() => setActiveTab("accessories")} />
          <TabButton active={activeTab === "logo-brand"} icon={<FiFileText />} label="Logo & Brand" onClick={() => setActiveTab("logo-brand")} />
          <TabButton active={activeTab === "visuals"} icon={<FiFileText />} label="Visual Designs" onClick={() => setActiveTab("visuals")} />
          <TabButton active={activeTab === "social"} icon={<FiInstagram />} label="Social Media" onClick={() => setActiveTab("social")} />
          <TabButton active={activeTab === "videos"} icon={<FiVideo />} label="Video Marketing" onClick={() => setActiveTab("videos")} />
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 bg-base-300/20 backdrop-blur-sm border border-white/5 rounded-3xl p-6 sm:p-8 min-h-125">
          
          {loadingData ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/40">
              <span className="loading loading-spinner loading-lg mb-4 text-primary"></span>
              <p className="text-sm font-medium">Memuat data dari database...</p>
            </div>
          ) : (
            <>
              {/* IMAGE CATEGORIES EDITOR */}
              {activeTab !== "videos" && (
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-syne font-bold uppercase text-white flex items-center gap-2">
                        {activeTab === "apparel" && "Apparel Design Gallery"}
                        {activeTab === "accessories" && "Accessories Gallery"}
                        {activeTab === "logo-brand" && "Logo & Brand Gallery"}
                        {activeTab === "visuals" && "Visual Designs"}
                        {activeTab === "social" && "Social Media Graphics"}
                      </h2>
                      <p className="text-xs text-white/50 font-light mt-1">
                        Seret/Pindahkan urutan gambar, hapus gambar, atau unggah gambar baru ke folder repo.
                      </p>
                    </div>

                    {/* Action Save Button */}
                    <button 
                      onClick={() => saveCategoryChanges(activeTab)}
                      disabled={savingData}
                      className="btn btn-primary rounded-xl px-6 gap-2 cursor-pointer shadow-lg shadow-primary/20"
                    >
                      {savingData ? <span className="loading loading-spinner loading-sm"></span> : <FiSave className="w-4 h-4" />}
                      Simpan Urutan & Pin
                    </button>
                  </div>

                  {/* Home Pin Validation Banner (For Apparel & Accessories) */}
                  {(activeTab === "apparel" || activeTab === "accessories") && (
                    <div className={`alert text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 rounded-xl border ${
                      (activeTab === "apparel" ? homeApparel.length : homeAccessories.length) === 12
                        ? "bg-green-950/20 border-green-500/30 text-green-200"
                        : "bg-yellow-950/20 border-yellow-500/30 text-yellow-200"
                    }`}>
                      <div className="flex items-center gap-2">
                        <FiAlertCircle className="w-5 h-5 shrink-0" />
                        <div>
                          <strong className="font-semibold block">Dinamis Gambar Beranda (Home)</strong>
                          <span className="text-xs text-white/60">
                            Pilih/Pin tepat 12 gambar dari galeri di bawah untuk ditampilkan di halaman Beranda.
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-bold bg-white/10 px-4 py-1.5 rounded-full select-none">
                        Terpilih: {activeTab === "apparel" ? homeApparel.length : homeAccessories.length} / 12
                      </span>
                    </div>
                  )}

                  {/* Grid Container */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
                    {/* Add Image Upload Card */}
                    <label className={`border-2 border-dashed border-white/10 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors aspect-square relative ${
                      uploading ? "pointer-events-none bg-white/5" : "hover:bg-white/5"
                    }`}>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, activeTab)}
                        className="hidden"
                      />
                      {uploading ? (
                        <>
                          <span className="loading loading-spinner loading-md text-primary mb-2"></span>
                          <span className="text-xs font-semibold text-primary">Mengunggah...</span>
                        </>
                      ) : (
                        <>
                          <FiUploadCloud className="w-8 h-8 text-white/40 mb-2" />
                          <span className="text-sm font-bold text-white/80">Unggah Gambar</span>
                          <span className="text-[10px] text-white/40 mt-1">Maksimal 2 MB</span>
                        </>
                      )}
                    </label>

                    {/* Gallery Items */}
                    {getCategoryImages(activeTab).map((src, index) => {
                      const isPinned = isImagePinned(src, activeTab);
                      const imagesList = getCategoryImages(activeTab);
                      return (
                        <div 
                          key={index} 
                          className="group relative border border-white/5 rounded-2xl overflow-hidden aspect-square bg-base-300 flex flex-col justify-end shadow-md transition-transform duration-300 hover:scale-[1.02]"
                        >
                          {/* Image preview */}
                          <img 
                            src={src} 
                            alt="Gallery item"
                            className="absolute inset-0 w-full h-full object-cover object-center z-0" 
                          />
                          
                          {/* Overlay Gradient on Hover */}
                          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20 opacity-90 group-hover:opacity-100 transition-opacity z-10 p-3 flex flex-col justify-between" />

                          {/* Pinned Ribbon Badge (Apparel & Accessories only) */}
                          {(activeTab === "apparel" || activeTab === "accessories") && isPinned && (
                            <span className="absolute top-2 left-2 z-20 badge badge-primary text-[10px] uppercase font-bold py-2.5 rounded-lg select-none">
                              Beranda (Home)
                            </span>
                          )}

                          {/* Action top right */}
                          <button
                            onClick={() => handleDeleteImage(src, activeTab)}
                            className="absolute top-2 right-2 z-20 btn btn-circle btn-sm bg-red-950/70 border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
                            title="Hapus gambar"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Controls Footer Overlay */}
                          <div className="relative z-20 p-2 sm:p-3 space-y-2 select-none">
                            {/* Pin Toggle checkbox (for Apparel & Accessories) */}
                            {(activeTab === "apparel" || activeTab === "accessories") && (
                              <button
                                onClick={() => handlePinToggle(src, activeTab)}
                                className={`w-full text-xs font-semibold py-1.5 rounded-lg border transition-all cursor-pointer ${
                                  isPinned 
                                    ? "bg-primary border-primary text-white" 
                                    : "bg-black/40 border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                                }`}
                              >
                                {isPinned ? "Lepas Pin Beranda" : "Pin ke Beranda"}
                              </button>
                            )}

                            {/* Navigation order triggers */}
                            <div className="flex justify-between items-center gap-1.5">
                              <button
                                onClick={() => moveImage(imagesList, getImageSetter(activeTab), index, "left")}
                                disabled={index === 0}
                                className="btn btn-square btn-xs bg-black/60 border border-white/10 text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10"
                                title="Geser Kiri"
                              >
                                <FiArrowLeft className="w-3 h-3" />
                              </button>
                              <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
                                Pos: {index + 1}
                              </span>
                              <button
                                onClick={() => moveImage(imagesList, getImageSetter(activeTab), index, "right")}
                                disabled={index === imagesList.length - 1}
                                className="btn btn-square btn-xs bg-black/60 border border-white/10 text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10"
                                title="Geser Kanan"
                              >
                                <FiArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* VIDEO MARKETING CATEGORY EDITOR */}
              {activeTab === "videos" && (
                <div className="space-y-8">
                  {/* Category Header */}
                  <div>
                    <h2 className="text-2xl font-syne font-bold uppercase text-white flex items-center gap-2">
                      Video Marketing Manager
                    </h2>
                    <p className="text-xs text-white/50 font-light mt-1">
                      Tambahkan link embed Youtube baru, ubah kategori video, atau reorder urutan video slider publik.
                    </p>
                  </div>

                  {/* Add New Video Form */}
                  <form 
                    onSubmit={handleAddVideo}
                    className="bg-white/5 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4 shadow-inner"
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wide text-primary flex items-center gap-2">
                      <FiPlus /> Tambah Video YouTube Baru
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-white/50">Judul Video</label>
                        <input 
                          type="text" 
                          placeholder="Contoh: AI Product Promo Showcase"
                          value={newVideoTitle}
                          onChange={(e) => setNewVideoTitle(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 focus:border-primary focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-white/50">URL Embed YouTube</label>
                        <input 
                          type="text" 
                          placeholder="https://www.youtube.com/embed/g2zP3ajD6o4?autoplay=0"
                          value={newVideoUrl}
                          onChange={(e) => setNewVideoUrl(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 focus:border-primary focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-end gap-4">
                      <div className="space-y-1 min-w-50">
                        <label className="text-[10px] uppercase font-bold text-white/50">Kategori Video</label>
                        <select 
                          value={newVideoCategory}
                          onChange={(e) => setNewVideoCategory(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 focus:border-primary focus:outline-none rounded-xl px-3 py-2 text-sm text-white select"
                        >
                          <option value="ai-marketing">AI Marketing</option>
                          <option value="video-motion">Video Motion</option>
                          <option value="video-editing">Video Editing</option>
                        </select>
                      </div>

                      <button 
                        type="submit"
                        disabled={savingData}
                        className="btn btn-primary rounded-xl px-6 gap-2 cursor-pointer shadow-lg shadow-primary/20"
                      >
                        {savingData ? <span className="loading loading-spinner loading-sm"></span> : <FiPlus className="w-4.5 h-4.5" />}
                        Tambah Video
                      </button>
                    </div>
                  </form>

                  {/* Videos List */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 select-none">
                      Daftar Video Aktif ({videos.length})
                    </h3>

                    {videos.length === 0 ? (
                      <div className="text-center py-10 border border-dashed border-white/5 rounded-2xl text-white/30 text-sm">
                        Belum ada video yang terdaftar.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {videos.map((vid, idx) => (
                          <div 
                            key={vid.id}
                            className="bg-base-300/40 border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300 hover:border-white/10 hover:bg-base-300/60"
                          >
                            <div className="space-y-1 grow">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${
                                  vid.category === "ai-marketing" ? "bg-blue-900/50 text-blue-300" :
                                  vid.category === "video-motion" ? "bg-purple-900/50 text-purple-300" :
                                  "bg-indigo-900/50 text-indigo-300"
                                }`}>
                                  {vid.category === "ai-marketing" ? "AI Marketing" :
                                   vid.category === "video-motion" ? "Video Motion" : "Video Editing"}
                                </span>
                              </div>
                              <h4 className="text-base font-semibold text-white">{vid.title}</h4>
                              <p className="text-xs text-white/40 truncate max-w-lg font-mono">{vid.embedUrl}</p>
                            </div>

                            {/* Actions / Order Controls */}
                            <div className="flex items-center gap-2 shrink-0 select-none">
                              {/* Reorder triggers */}
                              <div className="flex gap-1">
                                <button
                                  onClick={() => moveVideo(idx, "up")}
                                  disabled={idx === 0}
                                  className="btn btn-square btn-sm bg-black/40 border border-white/10 text-white hover:bg-white/5 disabled:opacity-20 disabled:pointer-events-none"
                                >
                                  <FiArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => moveVideo(idx, "down")}
                                  disabled={idx === videos.length - 1}
                                  className="btn btn-square btn-sm bg-black/40 border border-white/10 text-white hover:bg-white/5 disabled:opacity-20 disabled:pointer-events-none"
                                >
                                  <FiArrowDown className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <button
                                onClick={() => handleDeleteVideo(vid.id)}
                                className="btn btn-square btn-sm bg-red-950/70 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                                title="Hapus Video"
                              >
                                <FiTrash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}

// Sub-component helper for Tab Button
interface TabButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function TabButton({ active, icon, label, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
        active 
          ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.01]" 
          : "text-white/60 hover:text-white hover:bg-white/5"
      }`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}

// Icon helper
function LockIcon({ className = "" }) {
  return <FiLock className={className} />;
}


