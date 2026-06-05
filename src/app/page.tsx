"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ThemeToggle } from "./components/theme-toggle";

type ProjectCategory = "Geospatial" | "Software Architecture" | "Data Analytics";
type LandingSection = "expertise" | "projects" | "events" | "articles" | "timeline" | "certifications";

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

type PublicLandingResponse = {
  sections: Record<LandingSection, LandingEntry[]>;
  singletons: Record<string, unknown>;
};

type HeroConfig = {
  badge: string;
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  rightMediaUrl?: string;
  rightMediaType?: string;
};

type ContactConfig = {
  message: string;
  linkedin: string;
  github: string;
};

const defaultHero: HeroConfig = {
  badge: "Ingenieria Geoespacial + Arquitectura TI",
  title: "Optimizando el futuro ambiental con software, datos y analitica ecosistemica.",
  subtitle:
    "Especializacion en plataformas geoespaciales, arquitectura de software, DevOps y ciencia de datos aplicada para transformar informacion compleja en decisiones operativas de alto impacto.",
  primaryLabel: "Ver Portafolio de Proyectos",
  primaryHref: "#portafolio",
  secondaryLabel: "Conectar en LinkedIn / Descargar CV",
  secondaryHref: "#contacto",
  rightMediaUrl: "",
  rightMediaType: "",
};

const defaultContact: ContactConfig = {
  message:
    "Disponible para consultorias tecnicas, alianzas de producto y colaboraciones en soluciones geoespaciales.",
  linkedin: "#",
  github: "#",
};

function readContentObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function readContentString(content: Record<string, unknown>, key: string, fallback = "") {
  const value = content[key];
  return typeof value === "string" ? value : fallback;
}

function readContentStringArray(content: Record<string, unknown>, key: string, fallback: string[] = []) {
  const value = content[key];
  if (!Array.isArray(value)) return fallback;
  return value.filter((item): item is string => typeof item === "string");
}

function inferMediaType(url: string) {
  const lowercase = url.toLowerCase();
  if (lowercase.endsWith(".mp4")) return "video/mp4";
  if (lowercase.endsWith(".gif")) return "image/gif";
  if (lowercase.endsWith(".png")) return "image/png";
  if (lowercase.endsWith(".jpg") || lowercase.endsWith(".jpeg")) return "image/jpeg";
  return "image/jpeg";
}

function toYouTubeEmbedUrl(url: string) {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    if (hostname.endsWith("youtube.com")) {
      if (parsedUrl.pathname.startsWith("/embed/")) return url;

      const embedId = parsedUrl.pathname.startsWith("/shorts/")
        ? parsedUrl.pathname.split("/").filter(Boolean)[1]
        : parsedUrl.searchParams.get("v");

      return embedId ? `https://www.youtube.com/embed/${embedId}` : url;
    }
  } catch {
    return url;
  }

  return url;
}

function Media({
  url,
  mimeType,
  className,
  alt,
  controls = true,
}: {
  url: string;
  mimeType: string;
  className: string;
  alt: string;
  controls?: boolean;
}) {
  if (!url) return null;

  if (mimeType.startsWith("video/")) {
    return (
      <video className={className} src={url} controls={controls} muted loop playsInline>
        Tu navegador no soporta video HTML5.
      </video>
    );
  }

  return <Image src={url} alt={alt} width={1200} height={800} className={className} />;
}

function EntryMedia({
  content,
  alt,
  className,
}: {
  content: Record<string, unknown>;
  alt: string;
  className: string;
}) {
  const imageUrl = readContentString(content, "imageUrl");
  if (!imageUrl) return null;

  const imageMimeType = readContentString(content, "imageMimeType", inferMediaType(imageUrl));

  return <Media url={imageUrl} mimeType={imageMimeType} className={className} alt={alt} />;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<"All" | ProjectCategory>("All");
  const [activeEvent, setActiveEvent] = useState(0);
  const [data, setData] = useState<PublicLandingResponse | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch("/api/landing/public", { cache: "no-store" });
        if (!response.ok) return;
        const json = (await response.json()) as PublicLandingResponse;
        if (mounted) setData(json);
      } catch {
        // Keep fallback static content.
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const hero = useMemo(() => {
    const raw = data?.singletons?.hero;
    const parsed = readContentObject(raw);

    return {
      ...defaultHero,
      badge: readContentString(parsed, "badge", defaultHero.badge),
      title: readContentString(parsed, "title", defaultHero.title),
      subtitle: readContentString(parsed, "subtitle", defaultHero.subtitle),
      primaryLabel: readContentString(parsed, "primaryLabel", defaultHero.primaryLabel),
      primaryHref: readContentString(parsed, "primaryHref", defaultHero.primaryHref),
      secondaryLabel: readContentString(parsed, "secondaryLabel", defaultHero.secondaryLabel),
      secondaryHref: readContentString(parsed, "secondaryHref", defaultHero.secondaryHref),
      rightMediaUrl: readContentString(parsed, "rightMediaUrl", defaultHero.rightMediaUrl || ""),
      rightMediaType: readContentString(parsed, "rightMediaType", defaultHero.rightMediaType || ""),
    };
  }, [data]);

  const contact = useMemo(() => {
    const raw = data?.singletons?.contact;
    const parsed = readContentObject(raw);

    return {
      ...defaultContact,
      message: readContentString(parsed, "message", defaultContact.message),
      linkedin: readContentString(parsed, "linkedin", defaultContact.linkedin),
      github: readContentString(parsed, "github", defaultContact.github),
    };
  }, [data]);

  const expertise = data?.sections.expertise ?? [];
  const projects = data?.sections.projects ?? [];
  const events = data?.sections.events ?? [];
  const articles = data?.sections.articles ?? [];
  const timeline = data?.sections.timeline ?? [];
  const certifications = data?.sections.certifications ?? [];

  const categories: Array<"All" | ProjectCategory> = ["All", "Geospatial", "Software Architecture", "Data Analytics"];

  const filteredProjects = projects.filter((entry) => {
    if (activeCategory === "All") return true;
    const content = readContentObject(entry.content);
    return readContentString(content, "category", "Geospatial") === activeCategory;
  });

  const selectedEvent = events[activeEvent] || null;
  const selectedEventContent = readContentObject(selectedEvent?.content);
  const selectedEventVideoUrl = toYouTubeEmbedUrl(readContentString(selectedEventContent, "videoUrl"));

  const heroMediaUrl = hero.rightMediaUrl || "";
  const heroMediaType = hero.rightMediaType || (heroMediaUrl ? inferMediaType(heroMediaUrl) : "");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-700/40 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#inicio" className="font-mono text-sm font-semibold tracking-[0.18em] text-cyan-300">
            DR
          </a>
          <nav className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
            <a href="#inicio" className="hover:text-emerald-300">
              Inicio
            </a>
            <a href="#servicios" className="hover:text-emerald-300">
              Servicios
            </a>
            <a href="#portafolio" className="hover:text-emerald-300">
              Portafolio
            </a>
            <a href="#trayectoria" className="hover:text-emerald-300">
              Trayectoria
            </a>
            <a href="#contacto" className="hover:text-emerald-300">
              Contacto
            </a>
            <a href="/admin/login" className="rounded-full border border-slate-600/70 px-3 py-1 hover:border-cyan-300 hover:text-cyan-200">
              Panel
            </a>
            <ThemeToggle />
          </nav>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-28 px-6 pb-20 pt-14">
        <section id="inicio" className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7">
            <span className="inline-flex rounded-full border border-emerald-500/45 bg-emerald-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.17em] text-emerald-300">
              {hero.badge}
            </span>
            <h1 className="section-title max-w-3xl text-4xl font-semibold md:text-6xl">{hero.title}</h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">{hero.subtitle}</p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={hero.primaryHref}
                className="accent-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
              >
                {hero.primaryLabel}
              </a>
              <a
                href={hero.secondaryHref}
                className="inline-flex items-center justify-center rounded-full border border-slate-600/70 px-6 py-3 text-sm font-medium text-slate-100 hover:border-cyan-300 hover:text-cyan-200"
              >
                {hero.secondaryLabel}
              </a>
            </div>
          </div>

          <div className="glass-panel relative overflow-hidden rounded-3xl p-8">
            {heroMediaUrl ? (
              <Media
                url={heroMediaUrl}
                mimeType={heroMediaType}
                className="h-[360px] w-full rounded-2xl object-cover"
                alt="Media del Hero"
              />
            ) : (
              <>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_22%,rgba(6,182,212,0.25),transparent_42%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_80%,rgba(16,185,129,0.28),transparent_38%)]" />
                <div className="relative grid grid-cols-9 gap-2">
                  {Array.from({ length: 81 }).map((_, index) => (
                    <span
                      key={index}
                      className="h-2.5 w-2.5 rounded-full bg-cyan-200/45 shadow-[0_0_18px_rgba(6,182,212,0.35)]"
                    />
                  ))}
                </div>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.13em] text-slate-300">
                  Mapa de calor geoespacial · abstraccion de red ecosistemica
                </p>
              </>
            )}
          </div>
        </section>

        <section id="servicios" className="space-y-8">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Propuesta de valor</p>
            <h2 className="section-title text-3xl font-semibold md:text-4xl">Expertise Grid</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {expertise.map((entry) => {
              const content = readContentObject(entry.content);
              const points = readContentStringArray(content, "points", []);

              return (
                <article key={entry.id} className="glass-panel rounded-2xl p-6">
                  <EntryMedia content={content} alt={entry.title} className="mb-4 h-44 w-full rounded-xl object-cover" />
                  <h3 className="mb-3 text-xl font-semibold text-emerald-300">{entry.title}</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {(points.length ? points : [entry.description || ""]).map((point, index) => (
                      <li key={`${entry.id}-${index}`}>{point}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section id="portafolio" className="space-y-8">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Featured projects</p>
            <h2 className="section-title text-3xl font-semibold md:text-4xl">Portafolio de Soluciones</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeCategory === category
                    ? "border-emerald-300 bg-emerald-500/20 text-emerald-200"
                    : "border-slate-600/70 text-slate-300 hover:border-cyan-300 hover:text-cyan-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((entry) => {
              const content = readContentObject(entry.content);
              const stack = readContentStringArray(content, "stack", []);

              return (
                <article key={entry.id} className="glass-panel rounded-2xl p-6">
                  <EntryMedia content={content} alt={entry.title} className="mb-4 h-44 w-full rounded-xl object-cover" />
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-cyan-300">
                    {readContentString(content, "category", "Geospatial")}
                  </p>
                  <h3 className="mb-3 text-xl font-semibold">{entry.title}</h3>
                  <p className="mb-3 text-sm text-slate-300">{entry.description}</p>
                  <p className="mb-4 text-sm text-emerald-200">{readContentString(content, "impact")}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {stack.map((item) => (
                      <span key={`${entry.id}-${item}`} className="rounded-full border border-slate-600/70 px-3 py-1 text-xs text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                  <a href={readContentString(content, "link", "#")} className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
                    Ver caso de estudio →
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Featured media & events</p>
            <h2 className="section-title text-3xl font-semibold md:text-4xl">Eventos y Ponencias Tecnicas</h2>
          </div>

          {selectedEvent ? (
            <>
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="glass-panel overflow-hidden rounded-2xl p-3">
                  <div className="aspect-video overflow-hidden rounded-xl">
                    {selectedEventVideoUrl ? (
                      <iframe
                        src={selectedEventVideoUrl}
                        title={selectedEvent.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <EntryMedia
                        content={selectedEventContent}
                        alt={selectedEvent.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <aside className="glass-panel rounded-2xl p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-cyan-300">
                    {readContentString(selectedEventContent, "venue")}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{selectedEvent.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {selectedEvent.subtitle} · {readContentString(selectedEventContent, "date")}
                  </p>

                  <details open className="mt-5 rounded-xl border border-slate-700/70 p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-emerald-300">Abstract tecnico</summary>
                    <p className="mt-3 text-sm text-slate-300">{selectedEvent.description}</p>
                    <p className="mt-2 text-sm text-cyan-200">{readContentString(selectedEventContent, "metrics")}</p>
                  </details>

                  <a
                    href={readContentString(selectedEventContent, "materialUrl", "#")}
                    className="mt-5 inline-flex rounded-full border border-cyan-300/70 px-4 py-2 text-sm text-cyan-200 hover:border-cyan-200"
                  >
                    Descargar material de apoyo
                  </a>
                </aside>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {events.map((event, index) => {
                  const eventContent = readContentObject(event.content);
                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setActiveEvent(index)}
                      className={`rounded-xl border p-4 text-left transition ${
                        activeEvent === index
                          ? "border-emerald-300 bg-emerald-500/15"
                          : "border-slate-700/70 bg-slate-900/50 hover:border-cyan-300/70"
                      }`}
                    >
                      <p className="text-sm font-semibold">{event.title}</p>
                      <p className="mt-1 text-xs text-slate-300">{readContentString(eventContent, "date")}</p>
                    </button>
                  );
                })}
              </div>
            </>
          ) : null}
        </section>

        <section className="space-y-8">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Insights & publications</p>
            <h2 className="section-title text-3xl font-semibold md:text-4xl">Pensamiento Critico y Divulgacion</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {articles.map((entry) => {
              const content = readContentObject(entry.content);
              return (
                <article key={entry.id} className="glass-panel rounded-2xl p-6">
                  <EntryMedia content={content} alt={entry.title} className="mb-4 h-44 w-full rounded-xl object-cover" />
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-emerald-300">
                    {readContentString(content, "topic")}
                  </p>
                  <h3 className="mb-3 text-lg font-semibold">{entry.title}</h3>
                  <p className="mb-4 text-sm text-slate-300">{entry.description}</p>
                  <p className="mb-4 text-xs text-cyan-200">{readContentString(content, "readTime")}</p>
                  <a href={readContentString(content, "link", "#")} className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
                    Leer articulo completo en LinkedIn ↗
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section id="trayectoria" className="space-y-8">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Trayectoria</p>
            <h2 className="section-title text-3xl font-semibold md:text-4xl">Hitos y Especializacion Continua</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <article className="glass-panel rounded-2xl p-6">
              <h3 className="mb-4 text-xl font-semibold text-emerald-300">Hitos Profesionales</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                {timeline.map((entry) => {
                  const timelineContent = readContentObject(entry.content);
                  return (
                    <li key={entry.id} className="space-y-2">
                      <EntryMedia content={timelineContent} alt={entry.title} className="h-40 w-full rounded-xl object-cover" />
                      <p>{entry.title}</p>
                    </li>
                  );
                })}
              </ul>
            </article>

            <article className="glass-panel rounded-2xl p-6">
              <h3 className="mb-4 text-xl font-semibold text-emerald-300">Certificaciones y Formacion</h3>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-200 sm:grid-cols-3">
                {certifications.map((entry) => {
                  const certificationContent = readContentObject(entry.content);

                  return (
                    <span key={entry.id} className="rounded-lg border border-slate-600/70 px-3 py-2 text-center">
                      <EntryMedia
                        content={certificationContent}
                        alt={entry.title}
                        className="mb-2 h-24 w-full rounded-md object-cover"
                      />
                      <span>{entry.title}</span>
                    </span>
                  );
                })}
              </div>
            </article>
          </div>
        </section>

        <section id="contacto" className="glass-panel rounded-2xl p-8">
          <h2 className="section-title mb-2 text-3xl font-semibold">Contacto</h2>
          <p className="mb-6 text-sm text-slate-300">{contact.message}</p>

          <form className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Nombre"
              className="rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
            <input
              type="email"
              placeholder="Correo"
              className="rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
            <textarea
              placeholder="Cuentame sobre tu proyecto"
              className="rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-300 md:col-span-2"
              rows={5}
            />
            <button
              type="submit"
              className="accent-gradient rounded-full px-6 py-3 text-sm font-semibold text-slate-950 md:col-span-2 md:w-fit"
            >
              Enviar solicitud
            </button>
          </form>

          <div className="mt-5 flex gap-4 text-sm">
            <a href={contact.linkedin} className="text-cyan-300 hover:text-cyan-200">
              LinkedIn
            </a>
            <a href={contact.github} className="text-cyan-300 hover:text-cyan-200">
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
