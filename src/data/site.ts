import labKomputer from "@/assets/fac-lab-komputer.jpg";
import labHukum from "@/assets/fac-lab-hukum.jpg";
import masjid from "@/assets/fac-masjid.jpg";
import campus from "@/assets/hero-campus.jpg";
import students from "@/assets/about-students.jpg";
import cta from "@/assets/cta-admission.jpg";

export const SITE = {
  name: "Institut Agama Islam Kanzul Ulum Cirebon",
  short: "IAIKU Cirebon",
  slogan: "Kearifan Lokal Berdaya Saing Global",
  visi: "Menjadi perguruan tinggi Islam unggul berbasis pesantren, teknologi digital, dan kearifan lokal yang berdaya saing global pada tahun 2035.",
  address:
    "Jl. Pemuda No. 33, Sunyaragi, Kec. Kesambi, Kota Cirebon, Jawa Barat 45132",
  website: "iaikucrb.ac.id",
  whatsapp: "https://wa.me/6281000000000",
  socials: {
    instagram: "https://instagram.com/iaikanzululum.cirebon",
    tiktok: "https://tiktok.com/@iaikanzululum.cirebon",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export const NAV = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Fakultas & Prodi", href: "#fakultas" },
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Biaya Kuliah", href: "#biaya" },
  { label: "Dosen", href: "#dosen" },
  { label: "Berita", href: "#berita" },
  { label: "Kontak", href: "#kontak" },
];

export const FACULTIES = [
  {
    name: "Fakultas Ilmu Tarbiyah dan Keguruan",
    desc: "Mencetak pendidik profesional yang berakhlak dan adaptif terhadap perkembangan zaman.",
    programs: [
      {
        code: "PAI",
        name: "S1 Pendidikan Agama Islam",
        desc: "Menyiapkan guru dan pendidik agama Islam yang kompeten dan moderat.",
      },
      {
        code: "PIAUD",
        name: "S1 Pendidikan Islam Anak Usia Dini",
        desc: "Fokus pada tumbuh kembang dan pendidikan karakter anak usia dini.",
      },
      {
        code: "PGMI",
        name: "S1 Pendidikan Guru Madrasah Ibtidaiyah",
        desc: "Membentuk guru madrasah ibtidaiyah yang kreatif dan berbasis riset.",
      },
    ],
  },
  {
    name: "Fakultas Syariah dan Hukum",
    desc: "Mengembangkan keilmuan hukum Islam yang responsif terhadap kebutuhan masyarakat.",
    programs: [
      {
        code: "HPI",
        name: "S1 Hukum Pidana Islam",
        desc: "Mendalami hukum pidana Islam dan sistem hukum nasional secara integratif.",
      },
    ],
  },
];

export const FACILITIES = [
  { title: "Lab Komputer & Digital Learning", img: labKomputer },
  { title: "Lab Hukum", img: labHukum },
  { title: "Masjid Kampus", img: masjid },
  { title: "Area Diskusi & Co-Working", img: students },
  { title: "Lapangan Olahraga", img: campus },
  { title: "Perpustakaan Modern", img: labKomputer },
  { title: "Ruang Belajar", img: labHukum },
  { title: "Asrama", img: cta },
];

export const LECTURERS = [
  "Dr. Tosuerdi, S.H.I., M.Pd.I",
  "Prof. Dr. Cecep Wahyu Khoerudin, M.Pd",
  "Prof. Dr. Dedi Djubaedi, M.A",
  "Prof. Dr. Abdul Aziz, M.Ag",
  "Prof. Dr. Sugianto, M.H",
  "Prof. Dr. Kartimi, M.Pd",
  "Prof. Dr. Jamali, M.Ag",
  "Prof. Dr. Nuriela, M.Ag",
  "Prof. Dr. Hurriyah, M.Pd",
  "Dr. Sopidi, M.A",
  "Dr. Asroi, M.Pd",
  "Dr. Slamet, M.Pd.I",
  "Dr. A. Rafiq Zainul Mun'im, M.Pd., S.Th.I., M.Fil.I.",
  "Bakhtiar Azharuddin Sa'dan, M.Pd",
  "Drs. Nawawi, M.Pd.I",
  "Drs. Sutrisno, M.Pd",
  "M. Yudiyanto, M.Pd",
  "Lukman Azis, S.H., M.H",
  "Siti Khaerunnisa, M.Pd",
  "Rasjid, S.H., M.H",
  "Muhamad Idris, M.Pd",
  "Ahmad Zaldi Assegaf, Ph.D",
  "Anipah, M.Pd",
  "Khairon, M.Ag",
];

export type NewsItem = {
  slug: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

export const NEWS: NewsItem[] = [
  {
    slug: "pmb-2026-dibuka",
    category: "PMB",
    title: "Penerimaan Mahasiswa Baru IAIKU Cirebon Resmi Dibuka",
    date: "1 September 2026",
    excerpt:
      "Pendaftaran mahasiswa baru untuk seluruh program studi telah dibuka dengan skema beasiswa yayasan hingga 50%.",
    image: campus,
  },
  {
    slug: "seminar-pesantren-digital",
    category: "Akademik",
    title: "Seminar Nasional: Pesantren dan Transformasi Digital",
    date: "22 Agustus 2026",
    excerpt:
      "Civitas akademika membahas peran pesantren dalam menghadapi percepatan transformasi digital di Indonesia.",
    image: labKomputer,
  },
  {
    slug: "pengabdian-masyarakat-sunyaragi",
    category: "Pengabdian",
    title: "Mahasiswa Gelar Pengabdian Masyarakat di Sunyaragi",
    date: "10 Agustus 2026",
    excerpt:
      "Program pendampingan literasi digital dan keagamaan bagi masyarakat sekitar kampus berjalan selama dua pekan.",
    image: students,
  },
  {
    slug: "riset-kearifan-lokal-cirebon",
    category: "Penelitian",
    title: "Riset Kearifan Lokal Cirebon Masuk Jurnal Terindeks",
    date: "28 Juli 2026",
    excerpt:
      "Hasil penelitian dosen tentang tradisi keilmuan Cirebon berhasil dipublikasikan pada jurnal bereputasi.",
    image: labHukum,
  },
  {
    slug: "wisuda-perdana",
    category: "Kemahasiswaan",
    title: "Persiapan Wisuda dan Peningkatan Layanan Akademik",
    date: "15 Juli 2026",
    excerpt:
      "Institut memperkuat layanan akademik digital untuk mendukung kelancaran studi seluruh mahasiswa.",
    image: cta,
  },
  {
    slug: "kajian-rutin-masjid-kampus",
    category: "Keislaman",
    title: "Kajian Rutin Masjid Kampus Hadirkan Ulama Cirebon",
    date: "2 Juli 2026",
    excerpt:
      "Kegiatan kajian mingguan menjadi ruang penguatan akhlak dan wawasan keislaman bagi mahasiswa.",
    image: masjid,
  },
];
