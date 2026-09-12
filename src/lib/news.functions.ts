import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type NewsStatus = "draft" | "published" | "archived";

export type NewsRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  status: NewsStatus;
  published_at: string;
  author_name: string | null;
  updated_at: string;
};

export type PublicNewsItem = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  image: string | null;
};

export function resolveImage(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return `/api/public/news-image/${url}`;
}

export function formatDateID(value: string): string {
  const d = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
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

/** Public: berita yang sudah dipublikasikan. */
export const listPublishedNews = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicNewsItem[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("news")
      .select("slug, title, category, excerpt, image_url, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(6);

    if (error) return [];
    return (data ?? []).map((n) => ({
      slug: n.slug,
      title: n.title,
      category: n.category,
      excerpt: n.excerpt,
      date: formatDateID(n.published_at),
      image: resolveImage(n.image_url),
    }));
  },
);

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

export const getMyAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    const { count } = await context.supabase
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    return { isAdmin: data === true, anyAdminVisible: (count ?? 0) > 0 };
  });

/** Admin pertama: jika belum ada admin sama sekali, akun ini menjadi admin. */
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (error) throw new Error(error.message);
    if ((count ?? 0) > 0) throw new Error("Admin sudah ada. Minta admin untuk menambahkan Anda.");
    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (insertError) throw new Error(insertError.message);
    return { ok: true };
  });

export const listAllNews = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<NewsRecord[]> => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("news")
      .select(
        "id, slug, title, category, excerpt, content, image_url, status, published_at, author_name, updated_at",
      )
      .order("published_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as NewsRecord[];
  });

export type NewsInput = {
  id?: string | undefined;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  status: NewsStatus;
  published_at: string;
};

export const saveNews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: NewsInput) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);

    const { data: profile } = await context.supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", context.userId)
      .maybeSingle();

    const payload = {
      slug: data.slug,
      title: data.title,
      category: data.category,
      excerpt: data.excerpt,
      content: data.content,
      image_url: data.image_url,
      status: data.status,
      published_at: data.published_at,
      author_id: context.userId,
      author_name: profile?.full_name ?? profile?.email ?? null,
    };

    if (data.id) {
      const { error } = await context.supabase.from("news").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }

    const { data: inserted, error } = await context.supabase
      .from("news")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: inserted.id };
  });

export const setNewsStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: NewsStatus }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("news")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteNews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("news").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const uploadNewsImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { fileName: string; contentType: string; base64: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const binary = Uint8Array.from(atob(data.base64), (c) => c.charCodeAt(0));
    if (binary.byteLength > 5 * 1024 * 1024) throw new Error("Ukuran gambar maksimal 5 MB.");

    const safe = data.fileName.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    const path = `${Date.now()}-${safe}`;
    const { error } = await supabaseAdmin.storage
      .from("news-images")
      .upload(path, binary, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);
    return { path };
  });
