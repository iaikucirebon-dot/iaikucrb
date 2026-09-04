# Landing Page IAIKU Cirebon

Membangun satu halaman utama (homepage) resmi Institut Agama Islam Kanzul Ulum Cirebon dengan gaya Islamic Modern University: hijau tua sebagai warna utama, emerald sebagai aksen, emas sebagai sentuhan premium, putih dan abu-abu muda sebagai latar.

## Isi halaman (urut dari atas)

1. Navbar melekat di atas — logo teks IAIKU Cirebon, menu Beranda, Tentang, Fakultas & Prodi, Fasilitas, Biaya Kuliah, Dosen, Berita, Kontak, plus tombol DAFTAR SEKARANG. Transparan di atas hero, menjadi solid saat digulir, berubah jadi menu hamburger di ponsel.
2. Hero — foto kampus dengan gradasi gelap, badge nama institut, judul besar "Kearifan Lokal Berdaya Saing Global", subjudul, dua tombol (DAFTAR SEKARANG, JELAJAHI KAMPUS), dan baris statistik: 4 Program Studi, 3 Fakultas/bidang pengembangan, Dosen Profesional, Berbasis Pesantren & Teknologi Digital.
3. Tentang — dua kolom: foto dengan bentuk dekoratif di kiri, teks pengantar dan tombol SELENGKAPNYA di kanan.
4. Visi — panel hijau tua dengan aksen emas dan kutipan visi 2035 dalam tipografi besar.
5. Misi — tiga kartu berikon: Pendidikan, Penelitian, Pengabdian.
6. Tujuan — tiga kartu besar bernomor.
7. Fakultas & Program Studi — kartu Fakultas Ilmu Tarbiyah dan Keguruan (PAI, PIAUD, PGMI) dan Fakultas Syariah dan Hukum (HPI), tiap prodi berikon dengan tautan "Lihat Program Studi".
8. Keunggulan — enam poin sesuai teks yang diberikan.
9. Fasilitas — galeri 8 kartu bergambar dengan efek hover.
10. Biaya Kuliah — rincian empat komponen biaya, catatan beasiswa yayasan 50%, kartu TOTAL BIAYA Rp 2.950.000 yang paling menonjol, tombol daftar, dan catatan kecil.
11. Dosen — grid 24 nama dengan inisial/foto placeholder dan tombol LIHAT SEMUA DOSEN.
12. Ajakan PMB — panel bergambar dengan tombol DAFTAR SEKARANG dan KONSULTASI PMB.
13. Berita — enam kartu (foto, kategori, judul, tanggal, ringkasan, Baca Selengkapnya) dari satu berkas data agar mudah dipindah ke sistem berita nanti.
14. Kontak — peta tersemat dan alamat di kiri; formulir Nama, Email, WhatsApp, Pesan di kanan.
15. Media sosial dan footer empat kolom, plus baris hak cipta 2026.

Tambahan: gulir halus antar bagian, animasi masuk saat digulir, efek hover, tombol kembali ke atas, dan tombol WhatsApp melayang.

## Catatan isi

- Berita masih berupa contoh karena belum ada materi asli; nanti tinggal diganti.
- Foto kampus, fasilitas, dan berita dibuat sebagai gambar ilustrasi bergaya kampus Islam modern sampai ada foto asli.
- Nomor WhatsApp dan email resmi belum ada — mohon dikirim; sementara tombolnya diarahkan ke tautan sementara.
- Formulir kontak untuk tahap ini hanya tampilan; pengiriman pesan sungguhan bisa ditambahkan setelahnya.

## Catatan teknis

- Token warna hijau tua/emerald/emas/abu ditambahkan di `src/styles.css` (oklch) plus font modern via `<link>` di `__root.tsx`.
- Homepage di `src/routes/index.tsx`, tiap bagian sebagai komponen terpisah di `src/components/sections/` agar mudah dikembangkan jadi halaman tersendiri.
- Data prodi, dosen, fasilitas, berita, dan biaya dipisah di `src/data/*.ts`.
- SEO: `head()` pada route index dengan title, description, Open Graph, Twitter card, JSON-LD CollegeOrUniversity; satu H1 di hero, H2 per bagian.
- Gambar `loading="lazy"`, HTML semantik, fokus dan alt text untuk aksesibilitas.
