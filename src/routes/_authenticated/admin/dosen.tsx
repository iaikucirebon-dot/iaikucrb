import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteRecord,
  getAdminContent,
  saveLecturer,
  type LecturerInput,
} from "@/lib/cms.functions";

export const Route = createFileRoute("/_authenticated/admin/dosen")({
  head: () => ({
    meta: [
      { title: "Kelola Dosen | IAIKU Cirebon" },
      { name: "description", content: "Kelola data dosen dan akademisi IAIKU Cirebon." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLecturers,
});

const EMPTY: LecturerInput = {
  id: undefined,
  name: "",
  position: "",
  expertise: "",
  sort_order: 0,
  is_active: true,
};

function AdminLecturers() {
  const queryClient = useQueryClient();
  const fetchContent = useServerFn(getAdminContent);
  const save = useServerFn(saveLecturer);
  const remove = useServerFn(deleteRecord);

  const [form, setForm] = useState<LecturerInput>({ ...EMPTY });

  const contentQuery = useQuery({ queryKey: ["admin-content"], queryFn: () => fetchContent() });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-content"] });

  const saveMutation = useMutation({
    mutationFn: () => save({ data: form }),
    onSuccess: () => {
      toast.success("Data dosen tersimpan.");
      setForm({ ...EMPTY });
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { table: "lecturers", id } }),
    onSuccess: () => {
      toast.success("Dosen dihapus.");
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const lecturers = contentQuery.data?.lecturers ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-forest text-2xl">Dosen & Akademisi</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tambah, ubah, dan sembunyikan profil dosen yang tampil di halaman depan.
        </p>
      </div>

      <section className="border-border rounded-2xl border bg-white p-6">
        <h2 className="font-display text-forest text-lg">{form.id ? "Ubah Dosen" : "Dosen Baru"}</h2>
        <form
          className="mt-4 grid gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
        >
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="name">Nama & Gelar</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="position">Jabatan</Label>
            <Input
              id="position"
              value={form.position}
              placeholder="Dosen Tetap"
              onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="expertise">Bidang Keahlian</Label>
            <Input
              id="expertise"
              value={form.expertise}
              placeholder="Pendidikan Agama Islam"
              onChange={(e) => setForm((f) => ({ ...f, expertise: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="order">Urutan</Label>
            <Input
              id="order"
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Tampilkan di situs</Label>
            <Select
              value={form.is_active ? "ya" : "tidak"}
              onValueChange={(v) => setForm((f) => ({ ...f, is_active: v === "ya" }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ya">Ya</SelectItem>
                <SelectItem value="tidak">Tidak</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 md:col-span-2">
            <Button type="submit" disabled={saveMutation.isPending}>
              {form.id ? "Simpan Perubahan" : "Tambah Dosen"}
            </Button>
            {form.id && (
              <Button type="button" variant="outline" onClick={() => setForm({ ...EMPTY })}>
                Batal
              </Button>
            )}
          </div>
        </form>
      </section>

      <section className="border-border rounded-2xl border bg-white p-6">
        <h2 className="font-display text-forest text-lg">Daftar Dosen ({lecturers.length})</h2>
        <ul className="mt-4 divide-y">
          {lecturers.map((l) => (
            <li key={l.id} className="flex flex-wrap items-center gap-3 py-3">
              <div className="min-w-[220px] flex-1">
                <p className="text-forest font-semibold">{l.name}</p>
                <p className="text-muted-foreground text-xs">
                  {[l.position, l.expertise].filter(Boolean).join(" · ") || "—"} ·{" "}
                  {l.is_active ? "Tampil" : "Disembunyikan"}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setForm({
                    id: l.id,
                    name: l.name,
                    position: l.position,
                    expertise: l.expertise,
                    sort_order: l.sort_order,
                    is_active: l.is_active,
                  })
                }
              >
                <Pencil className="mr-1.5 h-3.5 w-3.5" /> Ubah
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  if (confirm(`Hapus dosen "${l.name}"?`)) deleteMutation.mutate(l.id);
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
