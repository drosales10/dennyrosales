"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThemeToggle } from "../components/theme-toggle";

type LandingSection =
  | "expertise"
  | "projects"
  | "events"
  | "articles"
  | "timeline"
  | "certifications";

type LandingEntry = {
  id: string;
  section: LandingSection;
  key: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  sortOrder: number;
  content: unknown;
};

type EntryForm = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  sortOrder: string;
  content: string;
};

type MediaPreview = {
  url: string;
  mimeType: string;
};

const sections: LandingSection[] = [
  "expertise",
  "projects",
  "events",
  "articles",
  "timeline",
  "certifications",
];

const emptyForm: EntryForm = {
  key: "",
  title: "",
  subtitle: "",
  description: "",
  sortOrder: "0",
  content: "{}",
};

function parseObjectJson(value: string) {
  try {
    const parsed = JSON.parse(value || "{}");
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
    return {};
  } catch {
    return {};
  }
}

function readString(source: Record<string, unknown>, key: string, fallback = "") {
  const value = source[key];
  return typeof value === "string" ? value : fallback;
}

function extractHeroMedia(json: string): MediaPreview | null {
  const parsed = parseObjectJson(json);
  const url = readString(parsed, "rightMediaUrl");
  if (!url) return null;

  return {
    url,
    mimeType: readString(parsed, "rightMediaType", "image/jpeg"),
  };
}

function extractEntryMedia(json: string): MediaPreview | null {
  const parsed = parseObjectJson(json);
  const url = readString(parsed, "imageUrl");
  if (!url) return null;

  return {
    url,
    mimeType: readString(parsed, "imageMimeType", "image/jpeg"),
  };
}

function MediaPreviewCard({ media, title }: { media: MediaPreview | null; title: string }) {
  if (!media) {
    return <p className="text-xs text-slate-400">Sin media cargada.</p>;
  }

  return (
    <div className="space-y-2 rounded-xl border border-slate-700/70 bg-slate-900/50 p-3">
      <p className="text-xs text-slate-300">{title}</p>
      {media.mimeType.startsWith("video/") ? (
        <video src={media.url} controls className="h-44 w-full rounded-lg object-cover" />
      ) : (
        <Image src={media.url} alt={title} width={800} height={400} className="h-44 w-full rounded-lg object-cover" />
      )}
      <p className="truncate text-xs text-cyan-300">{media.url}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<LandingSection>("expertise");
  const [entries, setEntries] = useState<LandingEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EntryForm>(emptyForm);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [heroJson, setHeroJson] = useState("{}");
  const [contactJson, setContactJson] = useState("{}");
  const [uploadingHeroMedia, setUploadingHeroMedia] = useState(false);
  const [uploadingEntryMedia, setUploadingEntryMedia] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeLabel = useMemo(() => activeSection.toUpperCase(), [activeSection]);
  const heroMedia = useMemo(() => extractHeroMedia(heroJson), [heroJson]);
  const entryMedia = useMemo(() => extractEntryMedia(form.content), [form.content]);

  useEffect(() => {
    void loadEntries(activeSection);
  }, [activeSection]);

  useEffect(() => {
    void loadSingleton("hero", setHeroJson);
    void loadSingleton("contact", setContactJson);
  }, []);

  async function loadEntries(section: LandingSection) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/entries?section=${section}`);
      if (!response.ok) throw new Error("No autorizado o error cargando registros");

      const data = (await response.json()) as { entries: LandingEntry[] };
      setEntries(data.entries);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function loadSingleton(key: string, setter: (value: string) => void) {
    const response = await fetch(`/api/admin/singletons/${key}`);
    if (!response.ok) return;

    const data = (await response.json()) as { singleton?: { value: unknown } | null };
    setter(JSON.stringify(data.singleton?.value ?? {}, null, 2));
  }

  function fillForm(entry: LandingEntry) {
    setEditingId(entry.id);
    setForm({
      key: entry.key,
      title: entry.title,
      subtitle: entry.subtitle || "",
      description: entry.description || "",
      sortOrder: String(entry.sortOrder),
      content: JSON.stringify(entry.content ?? {}, null, 2),
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function onSaveEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const parsedContent = JSON.parse(form.content || "{}");
      const payload = {
        section: activeSection,
        key: form.key,
        title: form.title,
        subtitle: form.subtitle || null,
        description: form.description || null,
        sortOrder: Number(form.sortOrder || 0),
        content: parsedContent,
      };

      const response = await fetch(editingId ? `/api/admin/entries/${editingId}` : "/api/admin/entries", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("No se pudo guardar el registro");

      setMessage(editingId ? "Registro actualizado" : "Registro creado");
      resetForm();
      await loadEntries(activeSection);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  async function onDeleteEntry(id: string) {
    setError(null);
    setMessage(null);

    const response = await fetch(`/api/admin/entries/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("No se pudo eliminar");
      return;
    }

    setMessage("Registro eliminado");
    setConfirmDeleteId(null);
    await loadEntries(activeSection);
  }

  async function saveSingleton(key: "hero" | "contact", value: string) {
    try {
      setError(null);
      setMessage(null);
      const parsedValue = JSON.parse(value || "{}");

      const response = await fetch(`/api/admin/singletons/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: parsedValue }),
      });

      if (!response.ok) throw new Error(`No se pudo guardar ${key}`);
      setMessage(`Configuracion ${key} guardada`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      setError(msg);
    }
  }

  async function uploadMedia(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      throw new Error(data.error || "No se pudo subir el archivo");
    }

    return (await response.json()) as { url: string; mimeType: string };
  }

  async function onHeroMediaUpload(file: File | null) {
    if (!file) return;

    try {
      setUploadingHeroMedia(true);
      setError(null);
      setMessage(null);

      const uploaded = await uploadMedia(file);
      const parsed = JSON.parse(heroJson || "{}");

      parsed.rightMediaUrl = uploaded.url;
      parsed.rightMediaType = uploaded.mimeType;

      setHeroJson(JSON.stringify(parsed, null, 2));
      setMessage("Media del Hero cargada. Guarda el Hero para publicar.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      setError(msg);
    } finally {
      setUploadingHeroMedia(false);
    }
  }

  async function onEntryMediaUpload(file: File | null) {
    if (!file) return;

    try {
      setUploadingEntryMedia(true);
      setError(null);
      setMessage(null);

      const uploaded = await uploadMedia(file);
      const parsed = JSON.parse(form.content || "{}");

      parsed.imageUrl = uploaded.url;
      parsed.imageMimeType = uploaded.mimeType;

      setForm((prev) => ({
        ...prev,
        content: JSON.stringify(parsed, null, 2),
      }));

      setMessage("Media de seccion cargada. Guarda el registro para publicar.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      setError(msg);
    } finally {
      setUploadingEntryMedia(false);
    }
  }

  function clearHeroMediaFields() {
    const parsed = parseObjectJson(heroJson);
    delete parsed.rightMediaUrl;
    delete parsed.rightMediaType;
    setHeroJson(JSON.stringify(parsed, null, 2));
    setMessage("Media del Hero removida del JSON. Guarda el Hero para publicar.");
    setError(null);
  }

  function clearEntryMediaFields() {
    const parsed = parseObjectJson(form.content);
    delete parsed.imageUrl;
    delete parsed.imageMimeType;
    setForm((prev) => ({
      ...prev,
      content: JSON.stringify(parsed, null, 2),
    }));
    setMessage("Media del registro removida del JSON. Guarda el registro para publicar.");
    setError(null);
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Panel de control de la landing</h1>
          <p className="text-sm text-slate-300">CRUD para todas las secciones visibles en la pagina principal.</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-full border border-slate-500 px-5 py-2 text-sm hover:border-cyan-300 hover:text-cyan-200"
        >
          Cerrar sesion
        </button>
        <ThemeToggle />
      </header>

      {message ? <p className="rounded-xl border border-emerald-300/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</p> : null}
      {error ? <p className="rounded-xl border border-rose-300/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="glass-panel rounded-2xl p-6">
          <h2 className="mb-4 text-xl font-semibold">Configuracion Hero (JSON)</h2>
          <div className="mb-4 space-y-2">
            <label className="block text-sm text-slate-300">Cargar media derecha del Hero (PNG/JPG/GIF/MP4)</label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/gif,video/mp4"
              disabled={uploadingHeroMedia}
              onChange={(event) => {
                const file = event.target.files?.[0] || null;
                void onHeroMediaUpload(file);
                event.currentTarget.value = "";
              }}
              className="block w-full cursor-pointer text-sm text-slate-200 file:mr-3 file:rounded-full file:border-0 file:bg-cyan-500/20 file:px-4 file:py-2 file:text-cyan-200"
            />
            <p className="text-xs text-slate-400">Se guardara en rightMediaUrl/rightMediaType del JSON del Hero.</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={clearHeroMediaFields}
                className="rounded-full border border-rose-400/70 px-4 py-1.5 text-xs text-rose-200"
              >
                Quitar media del Hero
              </button>
            </div>
          </div>
          <div className="mb-4">
            <MediaPreviewCard media={heroMedia} title="Vista previa Hero" />
          </div>
          <textarea
            value={heroJson}
            onChange={(event) => setHeroJson(event.target.value)}
            rows={10}
            className="w-full rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm font-mono outline-none focus:border-cyan-300"
          />
          <button
            type="button"
            onClick={() => saveSingleton("hero", heroJson)}
            className="accent-gradient mt-4 rounded-full px-5 py-2 text-sm font-semibold text-slate-950"
          >
            Guardar hero
          </button>
        </article>

        <article className="glass-panel rounded-2xl p-6">
          <h2 className="mb-4 text-xl font-semibold">Configuracion Contacto (JSON)</h2>
          <textarea
            value={contactJson}
            onChange={(event) => setContactJson(event.target.value)}
            rows={10}
            className="w-full rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm font-mono outline-none focus:border-cyan-300"
          />
          <button
            type="button"
            onClick={() => saveSingleton("contact", contactJson)}
            className="accent-gradient mt-4 rounded-full px-5 py-2 text-sm font-semibold text-slate-950"
          >
            Guardar contacto
          </button>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
        <aside className="glass-panel rounded-2xl p-6">
          <h2 className="mb-4 text-lg font-semibold">Secciones</h2>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => {
                  setActiveSection(section);
                  resetForm();
                }}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                  activeSection === section
                    ? "border-emerald-300 bg-emerald-500/20 text-emerald-200"
                    : "border-slate-600/70 text-slate-300 hover:border-cyan-300"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-6">
          <article className="glass-panel rounded-2xl p-6">
            <h2 className="mb-4 text-lg font-semibold">{editingId ? `Editar ${activeLabel}` : `Nuevo ${activeLabel}`}</h2>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={onSaveEntry}>
              <input
                value={form.key}
                onChange={(event) => setForm((prev) => ({ ...prev, key: event.target.value }))}
                placeholder="key unico"
                className="rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm outline-none focus:border-cyan-300"
              />
              <input
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="title"
                className="rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm outline-none focus:border-cyan-300"
              />
              <input
                value={form.subtitle}
                onChange={(event) => setForm((prev) => ({ ...prev, subtitle: event.target.value }))}
                placeholder="subtitle"
                className="rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm outline-none focus:border-cyan-300"
              />
              <input
                value={form.sortOrder}
                onChange={(event) => setForm((prev) => ({ ...prev, sortOrder: event.target.value }))}
                placeholder="orden"
                className="rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm outline-none focus:border-cyan-300"
              />
              <textarea
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                placeholder="description"
                rows={3}
                className="rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm outline-none focus:border-cyan-300 md:col-span-2"
              />
              <textarea
                value={form.content}
                onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
                placeholder="content JSON"
                rows={7}
                className="rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 font-mono text-sm outline-none focus:border-cyan-300 md:col-span-2"
              />
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm text-slate-300">Cargar imagen/media para esta seccion (PNG/JPG/GIF/MP4)</label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/gif,video/mp4"
                  disabled={uploadingEntryMedia}
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    void onEntryMediaUpload(file);
                    event.currentTarget.value = "";
                  }}
                  className="block w-full cursor-pointer text-sm text-slate-200 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-500/20 file:px-4 file:py-2 file:text-emerald-200"
                />
                <p className="text-xs text-slate-400">Se guardara en content.imageUrl y content.imageMimeType.</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={clearEntryMediaFields}
                    className="rounded-full border border-rose-400/70 px-4 py-1.5 text-xs text-rose-200"
                  >
                    Quitar media del registro
                  </button>
                </div>
                <MediaPreviewCard media={entryMedia} title="Vista previa del registro" />
              </div>
              <div className="flex gap-3 md:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="accent-gradient rounded-full px-6 py-2 text-sm font-semibold text-slate-950"
                >
                  {saving ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
                </button>
                {editingId ? (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full border border-slate-500 px-6 py-2 text-sm"
                  >
                    Cancelar
                  </button>
                ) : null}
              </div>
            </form>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <h2 className="mb-4 text-lg font-semibold">Listado ({activeLabel})</h2>
            {loading ? <p className="text-sm text-slate-300">Cargando...</p> : null}
            {!loading && entries.length === 0 ? <p className="text-sm text-slate-300">Sin registros en esta seccion.</p> : null}

            <div className="space-y-3">
              {entries.map((entry) => (
                <div key={entry.id} className="rounded-xl border border-slate-700/70 bg-slate-900/50 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm text-cyan-300">{entry.key}</p>
                      <h3 className="font-semibold">{entry.title}</h3>
                      <p className="text-sm text-slate-300">{entry.subtitle || "Sin subtitle"}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fillForm(entry)}
                        className="rounded-full border border-slate-500 px-4 py-1 text-xs hover:border-cyan-300"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirmDeleteId === entry.id) {
                            void onDeleteEntry(entry.id);
                            return;
                          }

                          setConfirmDeleteId(entry.id);
                        }}
                        className="rounded-full border border-rose-400/70 px-4 py-1 text-xs text-rose-200"
                      >
                        {confirmDeleteId === entry.id ? "Confirmar" : "Eliminar"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
