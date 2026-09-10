"use client"
import { useState } from "react";
import Image from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";
import TituloSeccion from "./TituloSeccion";

function BotonPlay({ tamaño = "w-14 h-14 sm:w-16 sm:h-16" }: { tamaño?: string }) {
    return (
        <div className={`flex items-center justify-center ${tamaño} rounded-full border-2 border-accent bg-surface/50 group-hover:bg-accent transition-colors duration-300`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-accent group-hover:text-surface transition-colors duration-300 ml-1">
                <path d="M8 5v14l11-7z" />
            </svg>
        </div>
    );
}

function VideoCard({ id, titulo }: { id: string; titulo: string }) {
    const [reproduciendo, setReproduciendo] = useState(false);
    const miniatura = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

    return (
        <div>
            <div className="aspect-video rounded-lg overflow-hidden relative bg-surface-alt">
                {reproduciendo ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                        title={titulo}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                ) : (
                    <button onClick={() => setReproduciendo(true)} className="group relative w-full h-full">
                        {/* scale-125: la mayoría de las miniaturas de YouTube traen franjas
                            negras horneadas en la propia imagen (no es algo que controlemos
                            nosotros) — el zoom las saca del cuadro visible */}
                        <Image src={miniatura} alt={titulo} fill className="object-cover scale-125" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <BotonPlay />
                        </div>
                    </button>
                )}
            </div>
            <p className="text-ink text-base sm:text-xl mt-2 font-[family-name:var(--font-playfair)]">{titulo}</p>
        </div>
    );
}

const videoDestacado = { titulo: "Ya me sané", id: "jFNBxR1MC18" };

const categorias = [
    {
        nombre: "Sencillos",
        videos: [
            { titulo: "Viaje Espacial", id: "H-PqrrTdJSw" },
            { titulo: "Desnudos", id: "pY8ANO8jDQ4", portada: "/caratula-desnudos.png" },
            { titulo: "Ya me sané", id: "jFNBxR1MC18" },
            { titulo: "Duele", id: "hK-cf9qM7xs" },
            { titulo: "Cómo pensar en mañana", id: "lyQrgyuSd4k" },
        ],
    },
    {
        nombre: "Festivales",
        videos: [
            { titulo: "Festival de la Voz de San Bernardo 2017", id: "8NRNUua-bwY" },
            { titulo: "Festival \"Persiguiendo un Sueño\" 2018", id: "fan6XFqp-Ag" },
            { titulo: "\"A la deriva\" — Festival de Concón 2019", id: "JkQEIgaHplw" },
        ],
    },
    {
        nombre: "Yo Soy Chile · Luis Miguel",
        videos: [
            { titulo: "Audición", id: "wsmybU6ffgY" },
            { titulo: "\"Culpable o no\"", id: "ztFjBw85IJM" },
            { titulo: "\"Hasta que me olvides\"", id: "rtcblnP86Aw" },
            { titulo: "\"No sé tú\"", id: "Dtjk22yLAo0" },
        ],
    },
    {
        nombre: "The Voice Chile",
        videos: [
            { titulo: "Audición a ciegas", id: "PIID7juUthA" },
            { titulo: "Batalla", id: "4i7dlua9x7E" },
            { titulo: "Knockouts", id: "UUadjdezFRA" },
        ],
    },
    {
        nombre: "KWC Panamá",
        videos: [
            { titulo: "Primera presentación — \"América\"", id: "QO3R276A5t4" },
            { titulo: "Segunda presentación — \"Fuego de Noche, Nieve de Día\"", id: "wJGzK7n3GDE" },
            { titulo: "Clasificación a semifinales", id: "mzuciTRz-x8" },
            { titulo: "Presentación semifinales", id: "EFG5ERDzlbY" },
        ],
    },
];

const plataformas = [
    { nombre: "Spotify", url: "https://open.spotify.com/intl-es/artist/5Xc7HccmWZ0fLqTnhNVvzC" },
    { nombre: "Apple Music", url: "https://music.apple.com/cl/artist/jairo-quezada/1586396880" },
    { nombre: "YouTube Music", url: "https://music.youtube.com/channel/UC4fQkMEShppmmSXAAdsLKIQ" },
    { nombre: "Deezer", url: "https://www.deezer.com/es/artist/268562172" },
];

export default function Musica() {
    const [reproduciendoDestacado, setReproduciendoDestacado] = useState(false);
    const [categoriaActiva, setCategoriaActiva] = useState(0);

    return (
        <section id="musica" className="bg-surface border-t border-accent/10 py-20 sm:py-32">
            <Container>
                <Reveal>
                    <TituloSeccion>
                        Música y Videos
                        </TituloSeccion>
                    <p className="text-ink-muted text-base sm:text-lg mb-4">Ya disponible</p>
                </Reveal>
                <Reveal>
                    <div className="aspect-[3/1] rounded-lg overflow-hidden relative mb-12 sm:mb-20 bg-surface-alt">
                        {reproduciendoDestacado ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${videoDestacado.id}?autoplay=1`}
                                title={videoDestacado.titulo}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        ) : (
                            <button onClick={() => setReproduciendoDestacado(true)} className="group relative w-full h-full">
                                <Image src="/banner-ya-me-sane.png" alt="Ya me sané" fill className="object-cover scale-[102%]" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <BotonPlay tamaño="w-16 h-16 sm:w-20 sm:h-20" />
                                </div>
                            </button>
                        )}
                    </div>
                </Reveal>
                <Reveal>
                    {/* overflow-x-auto + whitespace-nowrap: en vez de que la fila de
                        pestañas se desborde de la pantalla (rompiendo TODO el sitio,
                        igual que pasaba con el nav del Hero), ahora se puede deslizar
                        horizontalmente solo esta fila, de forma controlada */}
                    <div className="flex gap-6 sm:gap-8 border-b border-ink-muted/20 mb-12 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {categorias.map((cat, i) => (
                            <button
                                key={cat.nombre}
                                onClick={() => setCategoriaActiva(i)}
                                className={`pb-4 shrink-0 text-sm tracking-[0.15em] uppercase font-[family-name:var(--font-playfair)] transition-colors relative ${
                                    categoriaActiva === i ? "text-accent" : "text-ink-muted hover:text-ink"
                                }`}
                            >
                                {cat.nombre}
                                {categoriaActiva === i && (
                                    <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-accent"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </Reveal>

                {/* 1 columna en mobile, 2 desde sm, 3 desde lg — antes eran
                    siempre 3, aplastadas en pantallas chicas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-8">
                    {categorias[categoriaActiva].videos.map((video, i) => (
                        <Reveal key={video.id} delay={i * 0.1}>
                            <VideoCard id={video.id} titulo={video.titulo} />
                        </Reveal>
                    ))}
                </div>
                <Reveal>
                    <div className="mt-16 sm:mt-24 pt-16 border-t border-accent/10 text-center">
                        <p className="text-ink-muted text-sm tracking-[0.15em] uppercase mb-8 font-[family-name:var(--font-playfair)]">
                            Disponible en todas las plataformas
                        </p>
                        <div className="flex justify-center gap-6 sm:gap-10 flex-wrap">
                            {plataformas.map((p) => (
                                <a
                                    key={p.nombre}
                                    href={p.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ink-muted hover:text-accent transition-colors text-sm sm:text-base font-[family-name:var(--font-playfair)]"
                                >
                                    {p.nombre}
                                </a>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}