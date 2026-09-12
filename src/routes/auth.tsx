import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TITLE = "Masuk Admin | IAIKU Cirebon";
const DESC = "Halaman masuk pengelola berita dan konten website IAIKU Cirebon.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/berita", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin/berita", replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        if (data.session) navigate({ to: "/admin/berita", replace: true });
        else toast.success("Cek email Anda untuk konfirmasi pendaftaran.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Gagal masuk dengan Google.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin/berita", replace: true });
  }

  return (
    <main className="bg-sand flex min-h-screen items-center justify-center px-4 py-16">
      <div className="border-border w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="font-display text-forest text-2xl">
          {mode === "signin" ? "Masuk Pengelola" : "Daftar Pengelola"}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Kelola berita dan informasi IAIKU Cirebon.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Memproses..." : mode === "signin" ? "Masuk" : "Daftar"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <span className="bg-border h-px flex-1" />
          <span className="text-muted-foreground text-xs">atau</span>
          <span className="bg-border h-px flex-1" />
        </div>

        <Button type="button" variant="outline" className="w-full" onClick={handleGoogle}>
          Lanjutkan dengan Google
        </Button>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          {mode === "signin" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button
            type="button"
            className="text-emerald font-semibold"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "Daftar" : "Masuk"}
          </button>
        </p>
        <p className="mt-4 text-center text-sm">
          <Link to="/" className="text-muted-foreground hover:text-forest">
            ← Kembali ke beranda
          </Link>
        </p>
      </div>
    </main>
  );
}
