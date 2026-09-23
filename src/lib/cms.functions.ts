import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type FacultyRecord = {
  id: string;
  name: string;
  description: string;
  sort_order: number;
  is_active: boolean;
};

export type ProgramRecord = {
  id: string;
  faculty_id: string | null;
  code: string;
  name: string;
  description: string;
  sort_order: number;
  is_active: boolean;
};

export type LecturerRecord = {
  id: string;
  name: string;
  position: string;
  expertise: string;
  sort_order: number;
  is_active: boolean;
};

export type TuitionRecord = {
  id: string;
  label: string;
  amount: number;
  note: string;
  sort_order: number;
  is_active: boolean;
};

export type AdmissionStatus = "baru" | "diproses" | "diterima" | "ditolak";

export type AdmissionRecord = {
  id: string;
  full_name: string;
  email: string | null;
  whatsapp: string;
  origin_school: string | null;
  program_name: string | null;
  message: string;
  status: string;
  admin_note: string;
  created_at: string;
};

export type PublicSiteContent = {
  faculties: (FacultyRecord & { programs: ProgramRecord[] })[];
  lecturers: LecturerRecord[];
  tuition: TuitionRecord[];
};

export function formatRupiah(amount: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Public: konten akademik untuk landing page. */
export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicSiteContent> => {
    const supabase = publicClient();
    const [faculties, programs, lecturers, tuition] = await Promise.all([
      supabase
        .from("faculties")
        .select("id, name, description, sort_order, is_active")
        .eq("is_active", true)
        .order("sort_order"),
      supabase
        .from("programs")
        .select("id, faculty_id, code, name, description, sort_order, is_active")
        .eq("is_active", true)
        .order("sort_order"),
      supabase
        .from("lecturers")
        .select("id, name, position, expertise, sort_order, is_active")
        .eq("is_active", true)
        .order("sort_order"),
      supabase
        .from("tuition_items")
        .select("id, label, amount, note, sort_order, is_active")
        .eq("is_active", true)
        .order("sort_order"),
    ]);

    const programRows = (programs.data ?? []) as ProgramRecord[];
    return {
      faculties: ((faculties.data ?? []) as FacultyRecord[]).map((f) => ({
        ...f,
        programs: programRows.filter((p) => p.faculty_id === f.id),
      })),
      lecturers: (lecturers.data ?? []) as LecturerRecord[],
      tuition: (tuition.data ?? []) as TuitionRecord[],
    };
  },
);

/** Public: kirim pendaftaran PMB. */
export const submitAdmission = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      full_name: string;
      email: string;
      whatsapp: string;
      origin_school: string;
      program_name: string;
      message: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const name = data.full_name.trim().slice(0, 120);
    const whatsapp = data.whatsapp.trim().slice(0, 40);
    if (name.length < 2) throw new Error("Nama lengkap wajib diisi.");
    if (whatsapp.length < 6) throw new Error("Nomor WhatsApp tidak valid.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("admissions").insert({
      full_name: name,
      email: data.email.trim().slice(0, 160) || null,
      whatsapp,
      origin_school: data.origin_school.trim().slice(0, 160) || null,
      program_name: data.program_name.trim().slice(0, 160) || null,
      message: data.message.trim().slice(0, 2000),
    });
    if (error) throw new Error("Gagal mengirim pendaftaran. Coba lagi.");
    return { ok: true };
  });

type AuthedSupabase = {
  rpc: (
    fn: "has_role",
    args: { _user_id: string; _role: "admin" },
  ) => PromiseLike<{ data: unknown }>;
};

async function assertAdmin(supabase: AuthedSupabase, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (data !== true) throw new Error("Anda tidak memiliki akses admin.");
}

export type AdminContent = {
  faculties: FacultyRecord[];
  programs: ProgramRecord[];
  lecturers: LecturerRecord[];
  tuition: TuitionRecord[];
  admissions: AdmissionRecord[];
};

export const getAdminContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminContent> => {
    await assertAdmin(context.supabase, context.userId);
    const supabase = context.supabase;
    const [faculties, programs, lecturers, tuition, admissions] = await Promise.all([
      supabase
        .from("faculties")
        .select("id, name, description, sort_order, is_active")
        .order("sort_order"),
      supabase
        .from("programs")
        .select("id, faculty_id, code, name, description, sort_order, is_active")
        .order("sort_order"),
      supabase
        .from("lecturers")
        .select("id, name, position, expertise, sort_order, is_active")
        .order("sort_order"),
      supabase
        .from("tuition_items")
        .select("id, label, amount, note, sort_order, is_active")
        .order("sort_order"),
      supabase
        .from("admissions")
        .select(
          "id, full_name, email, whatsapp, origin_school, program_name, message, status, admin_note, created_at",
        )
        .order("created_at", { ascending: false }),
    ]);

    return {
      faculties: (faculties.data ?? []) as FacultyRecord[],
      programs: (programs.data ?? []) as ProgramRecord[],
      lecturers: (lecturers.data ?? []) as LecturerRecord[],
      tuition: (tuition.data ?? []) as TuitionRecord[],
      admissions: (admissions.data ?? []) as AdmissionRecord[],
    };
  });

export type FacultyInput = {
  id?: string | undefined;
  name: string;
  description: string;
  sort_order: number;
  is_active: boolean;
};

export const saveFaculty = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: FacultyInput) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const payload = {
      name: data.name,
      description: data.description,
      sort_order: data.sort_order,
      is_active: data.is_active,
    };
    const { error } = data.id
      ? await context.supabase.from("faculties").update(payload).eq("id", data.id)
      : await context.supabase.from("faculties").insert(payload);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export type ProgramInput = {
  id?: string | undefined;
  faculty_id: string | null;
  code: string;
  name: string;
  description: string;
  sort_order: number;
  is_active: boolean;
};

export const saveProgram = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: ProgramInput) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const payload = {
      faculty_id: data.faculty_id,
      code: data.code,
      name: data.name,
      description: data.description,
      sort_order: data.sort_order,
      is_active: data.is_active,
    };
    const { error } = data.id
      ? await context.supabase.from("programs").update(payload).eq("id", data.id)
      : await context.supabase.from("programs").insert(payload);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export type LecturerInput = {
  id?: string | undefined;
  name: string;
  position: string;
  expertise: string;
  sort_order: number;
  is_active: boolean;
};

export const saveLecturer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: LecturerInput) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const payload = {
      name: data.name,
      position: data.position,
      expertise: data.expertise,
      sort_order: data.sort_order,
      is_active: data.is_active,
    };
    const { error } = data.id
      ? await context.supabase.from("lecturers").update(payload).eq("id", data.id)
      : await context.supabase.from("lecturers").insert(payload);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export type TuitionInput = {
  id?: string | undefined;
  label: string;
  amount: number;
  note: string;
  sort_order: number;
  is_active: boolean;
};

export const saveTuition = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: TuitionInput) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const payload = {
      label: data.label,
      amount: data.amount,
      note: data.note,
      sort_order: data.sort_order,
      is_active: data.is_active,
    };
    const { error } = data.id
      ? await context.supabase.from("tuition_items").update(payload).eq("id", data.id)
      : await context.supabase.from("tuition_items").insert(payload);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export type CmsTable = "faculties" | "programs" | "lecturers" | "tuition_items" | "admissions";

export const deleteRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { table: CmsTable; id: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const setAdmissionStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: AdmissionStatus; admin_note?: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("admissions")
      .update({ status: data.status, ...(data.admin_note ? { admin_note: data.admin_note } : {}) })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
