import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Archive, LogOut, Pencil, Plus, RotateCcw, Trash2, Upload } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  claimFirstAdmin,
  deleteNews,
  getMyAdminStatus,
  listAllNews,
  resolveImage,
  saveNews,
  setNewsStatus,
  uploadNewsImage,
  type NewsRecord,
  type NewsStatus,
} from "@/lib/news.functions";

export const Route = createFileRoute("/_authenticated/admin/berita")({
  head: () => ({
    meta: [
      { title: "Kelola Berita | IAIKU Cirebon" },
      { name: "description", content: "Dashboard admin untuk mengelola berita IAIKU Cirebon." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminNews,
});

const EMPTY = {
  id: undefined as string | undefined,
  slug: "",
  title: "",
  category: "Umum",
  excerpt: "",
  content: "",
  image_url: null as string | null,
  status: "draft" as NewsStatus,
  published_at: new Date().toISOString().slice(0, 10),
};

const STATUS_LABEL: Record<NewsStatus, string> = {
  draft: "Draf",
  published: "Terbit",
  archived: "Arsip",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function AdminNews() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchStatus = useServerFn(getMyAdminStatus);
  const fetchNews = useServerFn(listAllNews);
  const claim = useServerFn(claimFirstAdmin);
  const save = useServerFn(saveNews);
  const changeStatus = useServerFn(setNewsStatus);
  const remove = useServerFn(deleteNews);
  const upload = useServerFn(uploadNewsImage);

  const [form, setForm] = useState({ ...EMPTY });
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const statusQuery = useQuery({ queryKey: ["admin-status"], queryFn: () => fetchStatus() });
  const isAdmin = statusQuery.data?.isAdmin ?? false;

  const newsQuery = useQuery({
    queryKey: ["admin-news"],
    queryFn: () => fetchNews(),
    enabled: isAdmin,
  });

  const claimMutation = useMutation({
    mutationFn: () => claim(),
    onSuccess: () => {
      toast.success("Anda kini menjadi admin.");
      queryClient.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveMutation = useMutation({
    mutationFn: () =>
      save({
        data: {
          ...form,
          slug: form.slug || slugify(form.title),
        },
      }),
    onSuccess: () => {
      toast.success("Berita tersimpan.");
      setForm({ ...EMPTY });
      setEditing(false);
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; status: NewsStatus }) => changeStatus({ data: vars }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      toast.success("Status diperbarui.");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      toast.success("Berita dihapus.");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const buffer = await file.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]!);
      const result = await upload({
        data: {
          fileName: file.name,
          contentType: file.type || "image/jpeg",
          base64: btoa(binary),
        },
      });
      setForm((f) => ({ ...f, image_url: result.path }));
      toast.success("Gambar terunggah.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  function startEdit(n: NewsRecord) {
    setForm({
      id: n.id,
      slug: n.slug,
      title: n.title,
      category: n.category,
      excerpt: n.excerpt,
      content: n.content,
      image_url: n.image_url,
      status: n.status,
      published_at: n.published_at,
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (statusQuery.isLoading) {
    return <p className="p-10 text-center text-sm">Memuat...</p>;
  }

  if (!isAdmin) {
    return (
      <main className="bg-sand flex min-h-screen items-center justify-center px-4">
        <div className="border-border max-w-md rounded-2xl border bg-white p-8 text-center">
          <h1 className="font-display text-forest text-xl">Akses admin diperlukan</h1>
          <p className="text-muted-foreground mt-3 text-sm">
            Akun Anda belum berstatus admin. Jika ini pemasangan pertama, jadikan akun ini sebagai
            admin utama.
          </p>
          <Button
            className="mt-5"
            onClick={() => claimMutation.mutate()}
            disabled={claimMutation.isPending}
          >
            Jadikan akun ini admin
          </Button>
          <p className="mt-5 text-sm">
            <button className="text-muted-foreground underline" onClick={handleSignOut}>
              Keluar
            </button>
          </p>
        </div>
      </main>
    );
  }

  const items = newsQuery.data ?? [];

  return (
    <main className="bg-sand min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-forest text-2xl">Kelola Berita</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Tambah, ubah, terbitkan, dan arsipkan berita kampus.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/">Lihat situs</Link>
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Keluar
            </Button>
          </div>
        </header>

        <section className="border-border mt-8 rounded-2xl border bg-white p-6">
          <h2 className="font-display text-forest text-lg">
            {editing ? "Ubah Berita" : "Berita Baru"}
          </h2>
          <form
            className="mt-5 grid gap-4 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate();
            }}
          >
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: f.id ? f.slug : slugify(e.target.value),
                  }))
                }
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category">Kategori</Label>
              <Input
                id="category"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="published_at">Tanggal</Label>
              <Input
                id="published_at"
                type="date"
                value={form.published_at}
                onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="excerpt">Ringkasan</Label>
              <Textarea
                id="excerpt"
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="content">Isi Berita</Label>
              <Textarea
                id="content"
                rows={8}
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as NewsStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draf</SelectItem>
                  <SelectItem value="published">Terbit</SelectItem>
                  <SelectItem value="archived">Arsip</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="image">Gambar Sampul</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleUpload(file);
                  }}
                />
                {uploading && <Upload className="h-4 w-4 animate-pulse" />}
              </div>
              {form.image_url && (
                <img
                  src={resolveImage(form.image_url) ?? ""}
                  alt="Pratinjau sampul"
                  loading="lazy"
                  className="mt-2 h-24 w-40 rounded-lg object-cover"
                />
              )}
            </div>
            <div className="flex gap-3 md:col-span-2">
              <Button type="submit" disabled={saveMutation.isPending}>
                <Plus className="mr-2 h-4 w-4" />
                {editing ? "Simpan Perubahan" : "Tambah Berita"}
              </Button>
              {editing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setForm({ ...EMPTY });
                    setEditing(false);
                  }}
                >
                  Batal
                </Button>
              )}
            </div>
          </form>
        </section>

        <section className="border-border mt-8 rounded-2xl border bg-white p-6">
          <h2 className="font-display text-forest text-lg">Daftar Berita</h2>
          {newsQuery.isLoading && <p className="mt-4 text-sm">Memuat berita...</p>}
          {!newsQuery.isLoading && items.length === 0 && (
            <p className="text-muted-foreground mt-4 text-sm">Belum ada berita.</p>
          )}
          <ul className="mt-4 divide-y">
            {items.map((n) => (
              <li key={n.id} className="flex flex-wrap items-center gap-4 py-4">
                <div className="min-w-[220px] flex-1">
                  <p className="text-forest font-semibold">{n.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {n.category} · {n.published_at} · {STATUS_LABEL[n.status]}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(n)}>
                    <Pencil className="mr-1.5 h-3.5 w-3.5" /> Ubah
                  </Button>
                  {n.status !== "published" && (
                    <Button
                      size="sm"
                      onClick={() => statusMutation.mutate({ id: n.id, status: "published" })}
                    >
                      Terbitkan
                    </Button>
                  )}
                  {n.status !== "archived" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => statusMutation.mutate({ id: n.id, status: "archived" })}
                    >
                      <Archive className="mr-1.5 h-3.5 w-3.5" /> Arsipkan
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => statusMutation.mutate({ id: n.id, status: "draft" })}
                    >
                      <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Kembalikan
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm(`Hapus berita "${n.title}"?`)) deleteMutation.mutate(n.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
