"use client"
import { useState } from "react";
import Image from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";
import TituloSeccion from "./TituloSeccion";

function BotonPlay({ tamaño = "w-16 h-16" }: { tamaño?: string }) {
    return (
        <div className={`flex items-center justify-center ${tamaño} rounded-full border-2 border-accent bg-surface/50 group-hover:bg-accent transition-colors duration-300`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-accent group-hover:text-surface transition-colors duration-300 ml-1">
                <path d="M8 5v14l11-7z" />
            </svg>
        </div>
    );
}

function VideoCard({ id, titulo, portada }: { id: string; titulo: string; portada?: string }) {
    const [reproduciendo, setReproduciendo] = useState(false);
    const miniatura = portada ?? `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

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
                        <Image src={miniatura} alt={titulo} fill className="object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <BotonPlay />
                        </div>
                    </button>
                )}
            </div>
            <p className="text-ink text-xl mt-4 font-[family-name:var(--font-playfair)]">{titulo}</p>
        </div>
    );
}

const videoDestacado = { titulo: "Ya me sané", id: "jFNBxR1MC18" };

const categorias = [
    {
        nombre: "Sencillos",
        videos: [
            { titulo: "A la deriva", id: "PiqvKFYomdA" },
            { titulo: "Viaje Espacial", id: "H-PqrrTdJSw" },
            { titulo: "Desnudos", id: "pY8ANO8jDQ4", portada: "/caratula-desnudos.png" },
            { titulo: "Ya me sané", id: "jFNBxR1MC18" },
            { titulo: "Duele", id: "hK-cf9qM7xs" },
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

export default function Musica() {
    const [reproduciendoDestacado, setReproduciendoDestacado] = useState(false);
    const [categoriaActiva, setCategoriaActiva] = useState(0);

    return (
        <section id="musica" className="bg-surface border-t border-accent/10 py-32 pt-32">
            <Container>
                <Reveal>
                    <TituloSeccion>
                        Música y Videos
                        </TituloSeccion>
                    <p className="text-ink-muted text-lg mb-12">Lo más reciente</p>
                </Reveal>
                <Reveal>
                    <div className="aspect-[3/1] rounded-lg overflow-hidden relative mb-20 bg-surface-alt">
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
                                    <BotonPlay tamaño="w-20 h-20" />
                                </div>
                            </button>
                        )}
                    </div>
                </Reveal>
                <Reveal>
                    <div className="flex gap-8 border-b border-ink-muted/20 mb-12">
                        {categorias.map((cat, i) => (
                            <button
                                key={cat.nombre}
                                onClick={() => setCategoriaActiva(i)}
                                className={`pb-4 text-sm tracking-[0.15em] uppercase font-[family-name:var(--font-playfair)] transition-colors relative ${
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

                <div className="grid grid-cols-3 gap-8">
                    {categorias[categoriaActiva].videos.map((video, i) => (
                        <Reveal key={video.id} delay={i * 0.1}>
                            <VideoCard id={video.id} titulo={video.titulo} portada={video.portada} />
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}