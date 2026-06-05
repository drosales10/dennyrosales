"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../../components/theme-toggle";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error || "No se pudo iniciar sesion");
        return;
      }

      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
      <div className="glass-panel w-full rounded-2xl p-8">
        <div className="mb-4 flex justify-end">
          <ThemeToggle />
        </div>
        <h1 className="mb-2 text-2xl font-semibold">Acceso administrador</h1>
        <p className="mb-6 text-sm text-slate-300">Ingresa para administrar el contenido de la landing.</p>

        <form className="space-y-4" onSubmit={onSubmit}>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Usuario"
            className="w-full rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-300"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-300"
          />

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="accent-gradient w-full rounded-full px-6 py-3 text-sm font-semibold text-slate-950 disabled:opacity-70"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}
