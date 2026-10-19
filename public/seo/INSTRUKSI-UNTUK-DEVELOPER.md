# 📦 Paket Update SEO — tosart.com
## Dikirimkan untuk: Developer/Pembuat Website Tosart
## Tanggal: Oktober 2026

---

## 🎯 Tujuan Update Ini
Meningkatkan visibilitas tosart.com di Google Search melalui perbaikan SEO teknis.

---

## 📂 File yang Perlu Ditambahkan/Diupdate

### 1. `app/sitemap.ts` ← FILE BARU
**Lokasi:** Letakkan di folder `app/` (root app directory)
**Fungsi:** Memberitahu Google semua halaman yang ada di website

### 2. `app/robots.ts` ← FILE BARU
**Lokasi:** Letakkan di folder `app/` (root app directory)
**Fungsi:** Mengizinkan Google untuk mengindex semua halaman

### 3. `app/metadata.ts` ← FILE BARU
**Lokasi:** Letakkan di folder `app/`
**Fungsi:** Berisi metadata (judul, deskripsi) untuk semua halaman

### 4. `components/SchemaMarkup.tsx` ← FILE BARU
**Lokasi:** Letakkan di folder `components/`
**Fungsi:** Structured data untuk Google rich snippets

---

## 🔧 Cara Implementasi oleh Developer

### Langkah 1 — Salin semua file ke project
Salin 4 file di atas ke lokasi yang sesuai dalam project Next.js.

### Langkah 2 — Update `app/layout.tsx`
Tambahkan import SchemaMarkup dan pasang di dalam `<body>`:

```tsx
// Di bagian atas file layout.tsx, tambahkan import:
import SchemaMarkup from '@/components/SchemaMarkup'

// Di dalam return, di dalam <body>, tambahkan:
<SchemaMarkup />
```

### Langkah 3 — Update metadata di tiap halaman

**Homepage** (`app/page.tsx` atau `app/(website)/page.tsx`):
```tsx
import { homepageMetadata } from '../metadata'
export const metadata = homepageMetadata
```

**Apparel Design** (`app/apparel-design/page.tsx`):
```tsx
import { apparelDesignMetadata } from '../metadata'
export const metadata = apparelDesignMetadata
```

**Social Media Design** (`app/social-media-design/page.tsx`):
```tsx
import { socialMediaDesignMetadata } from '../metadata'
export const metadata = socialMediaDesignMetadata
```

**Video Marketing** (`app/video-marketing/page.tsx`):
```tsx
import { videoMarketingMetadata } from '../metadata'
export const metadata = videoMarketingMetadata
```

---

## 🖼️ Gambar OG yang Perlu Dibuat (Opsional tapi Direkomendasikan)

Minta developer atau buat sendiri gambar berikut (ukuran 1200x630px):
- `/public/img/og-image.jpg` — untuk homepage
- `/public/img/og-apparel.jpg` — untuk halaman apparel
- `/public/img/og-social.jpg` — untuk halaman social media
- `/public/img/og-video.jpg` — untuk halaman video marketing

Gambar ini akan muncul saat link tosart.com dibagikan di WhatsApp, Instagram, dll.

---

## ✅ Checklist Developer

Setelah semua perubahan dilakukan, mohon konfirmasi:
- [ ] `sitemap.ts` sudah ditambahkan → cek: https://tosart.com/sitemap.xml
- [ ] `robots.ts` sudah ditambahkan → cek: https://tosart.com/robots.txt
- [ ] SchemaMarkup sudah dipasang di layout.tsx
- [ ] Metadata sudah diupdate di semua halaman
- [ ] Website sudah di-deploy ulang (re-deploy)

---

## 📋 Langkah Setelah Deploy (Dilakukan Pemilik Website)

1. Buka https://search.google.com/search-console
2. Tambahkan property `tosart.com`
3. Submit sitemap: masukkan `https://tosart.com/sitemap.xml`
4. Buka https://business.google.com → daftarkan bisnis Tosart Studio

---

Pertanyaan? Hubungi: [nama/kontak Anda]
