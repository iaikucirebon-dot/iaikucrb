import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

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
  deleteRecord,
  getAdminContent,
  saveFaculty,
  saveProgram,
  type FacultyInput,
  type ProgramInput,
} from "@/lib/cms.functions";

export const Route = createFileRoute("/_authenticated/admin/akademik")({
  head: () => ({
    meta: [
      { title: "Kelola Fakultas & Prodi | IAIKU Cirebon" },
      {
        name: "description",
        content: "Kelola data fakultas dan program studi IAIKU Cirebon.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminAcademic,
});

const EMPTY_FACULTY: FacultyInput = {
  id: undefined,
  name: "",
  description: "",
  sort_order: 0,
  is_active: true,
};

const EMPTY_PROGRAM: ProgramInput = {
  id: undefined,
  faculty_id: null,
  code: "",
  name: "",
  description: "",
  sort_order: 0,
  is_active: true,
};

function AdminAcademic() {
  const queryClient = useQueryClient();
  const fetchContent = useServerFn(getAdminContent);
  const saveF = useServerFn(saveFaculty);
  const saveP = useServerFn(saveProgram);
  const remove = useServerFn(deleteRecord);

  const [faculty, setFaculty] = useState<FacultyInput>({ ...EMPTY_FACULTY });
  const [program, setProgram] = useState<ProgramInput>({ ...EMPTY_PROGRAM });

  const contentQuery = useQuery({ queryKey: ["admin-content"], queryFn: () => fetchContent() });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-content"] });

  const facultyMutation = useMutation({
    mutationFn: () => saveF({ data: faculty }),
    onSuccess: () => {
      toast.success("Fakultas tersimpan.");
      setFaculty({ ...EMPTY_FACULTY });
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const programMutation = useMutation({
    mutationFn: () => saveP({ data: program }),
    onSuccess: () => {
      toast.success("Program studi tersimpan.");
      setProgram({ ...EMPTY_PROGRAM });
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (vars: { table: "faculties" | "programs"; id: string }) => remove({ data: vars }),
    onSuccess: () => {
      toast.success("Data dihapus.");
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const faculties = contentQuery.data?.faculties ?? [];
  const programs = contentQuery.data?.programs ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-forest text-2xl">Fakultas & Program Studi</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Data ini langsung tampil pada bagian Fakultas & Prodi di halaman depan.
        </p>
      </div>

      <section className="border-border rounded-2xl border bg-white p-6">
        <h2 className="font-display text-forest text-lg">
          {faculty.id ? "Ubah Fakultas" : "Fakultas Baru"}
        </h2>
        <form
          className="mt-4 grid gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            facultyMutation.mutate();
          }}
        >
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="f-name">Nama Fakultas</Label>
            <Input
              id="f-name"
              value={faculty.name}
              onChange={(e) => setFaculty((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="f-desc">Deskripsi</Label>
            <Textarea
              id="f-desc"
              rows={2}
              value={faculty.description}
              onChange={(e) => setFaculty((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="f-order">Urutan</Label>
            <Input
              id="f-order"
              type="number"
              value={faculty.sort_order}
              onChange={(e) => setFaculty((f) => ({ ...f, sort_order: Number(e.target.value) }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Tampilkan di situs</Label>
            <Select
              value={faculty.is_active ? "ya" : "tidak"}
              onValueChange={(v) => setFaculty((f) => ({ ...f, is_active: v === "ya" }))}
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
            <Button type="submit" disabled={facultyMutation.isPending}>
              {faculty.id ? "Simpan Perubahan" : "Tambah Fakultas"}
            </Button>
            {faculty.id && (
              <Button type="button" variant="outline" onClick={() => setFaculty({ ...EMPTY_FACULTY })}>
                Batal
              </Button>
            )}
          </div>
        </form>

        <ul className="mt-6 divide-y">
          {faculties.map((f) => (
            <li key={f.id} className="flex flex-wrap items-center gap-3 py-3">
              <div className="min-w-[220px] flex-1">
                <p className="text-forest font-semibold">{f.name}</p>
                <p className="text-muted-foreground text-xs">
                  Urutan {f.sort_order} · {f.is_active ? "Tampil" : "Disembunyikan"}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setFaculty({
                    id: f.id,
                    name: f.name,
                    description: f.description,
                    sort_order: f.sort_order,
                    is_active: f.is_active,
                  })
                }
              >
                <Pencil className="mr-1.5 h-3.5 w-3.5" /> Ubah
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  if (confirm(`Hapus fakultas "${f.name}" beserta prodinya?`)) {
                    deleteMutation.mutate({ table: "faculties", id: f.id });
                  }
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-border rounded-2xl border bg-white p-6">
        <h2 className="font-display text-forest text-lg">
          {program.id ? "Ubah Program Studi" : "Program Studi Baru"}
        </h2>
        <form
          className="mt-4 grid gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            programMutation.mutate();
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="p-name">Nama Program Studi</Label>
            <Input
              id="p-name"
              value={program.name}
              onChange={(e) => setProgram((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>Fakultas</Label>
            <Select
              value={program.faculty_id ?? ""}
              onValueChange={(v) => setProgram((p) => ({ ...p, faculty_id: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih fakultas" />
              </SelectTrigger>
              <SelectContent>
                {faculties.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-code">Kode Singkat</Label>
            <Input
              id="p-code"
              value={program.code}
              placeholder="PAI"
              onChange={(e) => setProgram((p) => ({ ...p, code: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-order">Urutan</Label>
            <Input
              id="p-order"
              type="number"
              value={program.sort_order}
              onChange={(e) => setProgram((p) => ({ ...p, sort_order: Number(e.target.value) }))}
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="p-desc">Deskripsi</Label>
            <Textarea
              id="p-desc"
              rows={2}
              value={program.description}
              onChange={(e) => setProgram((p) => ({ ...p, description: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Tampilkan di situs</Label>
            <Select
              value={program.is_active ? "ya" : "tidak"}
              onValueChange={(v) => setProgram((p) => ({ ...p, is_active: v === "ya" }))}
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
            <Button type="submit" disabled={programMutation.isPending}>
              {program.id ? "Simpan Perubahan" : "Tambah Program Studi"}
            </Button>
            {program.id && (
              <Button type="button" variant="outline" onClick={() => setProgram({ ...EMPTY_PROGRAM })}>
                Batal
              </Button>
            )}
          </div>
        </form>

        <ul className="mt-6 divide-y">
          {programs.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 py-3">
              <div className="min-w-[220px] flex-1">
                <p className="text-forest font-semibold">{p.name}</p>
                <p className="text-muted-foreground text-xs">
                  {faculties.find((f) => f.id === p.faculty_id)?.name ?? "Tanpa fakultas"} ·{" "}
                  {p.is_active ? "Tampil" : "Disembunyikan"}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setProgram({
                    id: p.id,
                    faculty_id: p.faculty_id,
                    code: p.code,
                    name: p.name,
                    description: p.description,
                    sort_order: p.sort_order,
                    is_active: p.is_active,
                  })
                }
              >
                <Pencil className="mr-1.5 h-3.5 w-3.5" /> Ubah
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  if (confirm(`Hapus program studi "${p.name}"?`)) {
                    deleteMutation.mutate({ table: "programs", id: p.id });
                  }
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
