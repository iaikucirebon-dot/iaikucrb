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
  formatRupiah,
  getAdminContent,
  saveTuition,
  setAdmissionStatus,
  type AdmissionStatus,
  type TuitionInput,
} from "@/lib/cms.functions";

export const Route = createFileRoute("/_authenticated/admin/pmb")({
  head: () => ({
    meta: [
      { title: "Kelola PMB & Biaya | IAIKU Cirebon" },
      {
        name: "description",
        content: "Kelola rincian biaya kuliah dan data pendaftar PMB IAIKU Cirebon.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPmb,
});

const EMPTY: TuitionInput = {
  id: undefined,
  label: "",
  amount: 0,
  note: "",
  sort_order: 0,
  is_active: true,
};

const STATUSES: { value: AdmissionStatus; label: string }[] = [
  { value: "baru", label: "Baru" },
  { value: "diproses", label: "Diproses" },
  { value: "diterima", label: "Diterima" },
  { value: "ditolak", label: "Ditolak" },
];

function AdminPmb() {
  const queryClient = useQueryClient();
  const fetchContent = useServerFn(getAdminContent);
  const save = useServerFn(saveTuition);
  const remove = useServerFn(deleteRecord);
  const changeStatus = useServerFn(setAdmissionStatus);

  const [form, setForm] = useState<TuitionInput>({ ...EMPTY });

  const contentQuery = useQuery({ queryKey: ["admin-content"], queryFn: () => fetchContent() });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-content"] });

  const saveMutation = useMutation({
    mutationFn: () => save({ data: form }),
    onSuccess: () => {
      toast.success("Rincian biaya tersimpan.");
      setForm({ ...EMPTY });
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (vars: { table: "tuition_items" | "admissions"; id: string }) =>
      remove({ data: vars }),
    onSuccess: () => {
      toast.success("Data dihapus.");
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; status: AdmissionStatus }) => changeStatus({ data: vars }),
    onSuccess: () => {
      toast.success("Status pendaftar diperbarui.");
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const tuition = contentQuery.data?.tuition ?? [];
  const admissions = contentQuery.data?.admissions ?? [];
  const total = tuition
    .filter((t) => t.is_active)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-forest text-2xl">PMB & Biaya Kuliah</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Atur rincian biaya kuliah dan tindak lanjuti calon mahasiswa yang mendaftar.
        </p>
      </div>

      <section className="border-border rounded-2xl border bg-white p-6">
        <h2 className="font-display text-forest text-lg">
          {form.id ? "Ubah Rincian Biaya" : "Rincian Biaya Baru"}
        </h2>
        <form
          className="mt-4 grid gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
        >
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="label">Nama Biaya</Label>
            <Input
              id="label"
              value={form.label}
              onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="amount">Nominal (Rupiah)</Label>
            <Input
              id="amount"
              type="number"
              min={0}
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="note">Catatan</Label>
            <Input
              id="note"
              value={form.note}
              placeholder="Beasiswa Yayasan 50%"
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
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
              {form.id ? "Simpan Perubahan" : "Tambah Rincian"}
            </Button>
            {form.id && (
              <Button type="button" variant="outline" onClick={() => setForm({ ...EMPTY })}>
                Batal
              </Button>
            )}
          </div>
        </form>

        <ul className="mt-6 divide-y">
          {tuition.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center gap-3 py-3">
              <div className="min-w-[220px] flex-1">
                <p className="text-forest font-semibold">{t.label}</p>
                <p className="text-muted-foreground text-xs">
                  {formatRupiah(Number(t.amount))}
                  {t.note ? ` · ${t.note}` : ""} · {t.is_active ? "Tampil" : "Disembunyikan"}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setForm({
                    id: t.id,
                    label: t.label,
                    amount: Number(t.amount),
                    note: t.note,
                    sort_order: t.sort_order,
                    is_active: t.is_active,
                  })
                }
              >
                <Pencil className="mr-1.5 h-3.5 w-3.5" /> Ubah
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  if (confirm(`Hapus rincian "${t.label}"?`)) {
                    deleteMutation.mutate({ table: "tuition_items", id: t.id });
                  }
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </li>
          ))}
        </ul>
        <p className="text-forest mt-4 text-sm font-semibold">
          Total biaya tampil di situs: {formatRupiah(total)}
        </p>
      </section>

      <section className="border-border rounded-2xl border bg-white p-6">
        <h2 className="font-display text-forest text-lg">Pendaftar PMB ({admissions.length})</h2>
        {admissions.length === 0 && (
          <p className="text-muted-foreground mt-3 text-sm">Belum ada pendaftar.</p>
        )}
        <ul className="mt-4 divide-y">
          {admissions.map((a) => (
            <li key={a.id} className="flex flex-wrap items-start gap-3 py-4">
              <div className="min-w-[240px] flex-1">
                <p className="text-forest font-semibold">{a.full_name}</p>
                <p className="text-muted-foreground text-xs">
                  {a.whatsapp}
                  {a.email ? ` · ${a.email}` : ""}
                  {a.program_name ? ` · ${a.program_name}` : ""}
                  {a.origin_school ? ` · ${a.origin_school}` : ""}
                </p>
                {a.message && <p className="mt-2 text-sm">{a.message}</p>}
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={a.status}
                  onValueChange={(v) =>
                    statusMutation.mutate({ id: a.id, status: v as AdmissionStatus })
                  }
                >
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (confirm(`Hapus pendaftar "${a.full_name}"?`)) {
                      deleteMutation.mutate({ table: "admissions", id: a.id });
                    }
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
  );
}
