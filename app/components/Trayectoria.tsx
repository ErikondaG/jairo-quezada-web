"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const fotos = ["/Jairo-tra.png", "/jairo-tra2.jpg", "/Jairo-tra3.jpeg", "/Jairo-tra4.jpg"];

const logros = [
    { año: "2017", texto: "Festival de la Voz de San Bernardo" },
    { año: "2018", texto: "Festival \"Persiguiendo un Sueño\"" },
    { año: "2019", texto: "Festival \"Un Canto al Mar\", Concón" },
    { año: "2023", texto: "Campeón nacional KWC Chile, mundial en Panamá" },
];

const logrosExtra = [
    { año: "2020", texto: "Lanzamiento del sencillo \"Viaje Espacial\"" },
    { año: "2022", texto: "Participación en \"Yo Soy Chile\" interpretando a Luis Miguel" },
    { año: "2023", texto: "Participación en The Voice Chile" },
    { año: "2023", texto: "Lanzamiento del sencillo \"A la deriva\"" },
    { año: "2024", texto: "Lanzamiento del sencillo \"Desnudos\"" },
    { año: "2026", texto: "Lanzamiento del sencillo \"Ya me sané\"" },
    { año: "2026", texto: "Lanzamiento del sencillo \"Duele\"" },
];

export default function Trayectoria() {
    const fotosRef = useRef<(HTMLDivElement | null)[]>([]);
    const lineaRef = useRef<HTMLDivElement>(null);
    const lineaTrackRef = useRef<HTMLDivElement>(null);
    const puntosRef = useRef<(HTMLDivElement | null)[]>([]);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const seccionRef = useRef<HTMLDivElement>(null);

    const puntosExtraRef = useRef<(HTMLDivElement | null)[]>([]);
    const itemsExtraRef = useRef<(HTMLDivElement | null)[]>([]);
    const contenedorExtraRef = useRef<HTMLDivElement>(null);
    const contenidoExtraRef = useRef<HTMLDivElement>(null);

    const [expandido, setExpandido] = useState(false);

    function toggleExpandido() {
        const abrir = !expandido;
        setExpandido(abrir);

        const alturaReal = contenidoExtraRef.current!.scrollHeight;

        gsap.to(contenedorExtraRef.current, {
            height: abrir ? alturaReal : 0,
            duration: 0.8,
            ease: "power2.inOut",
        });

        if (!abrir) {
            gsap.set(itemsExtraRef.current, { opacity: 0.3 });
            gsap.set(puntosExtraRef.current, { backgroundColor: "var(--color-ink-muted)" });
            return;
        }

        const tlExtra = gsap.timeline({ delay: 0.3 });

        logrosExtra.forEach((_, i) => {
            const t = i * 0.5;

            tlExtra.to(itemsExtraRef.current[i], { opacity: 1, duration: 0.3 }, t);
            tlExtra.to(puntosExtraRef.current[i], { backgroundColor: "#c9a86a", duration: 0.3 }, t);

            const fotoActual = fotosRef.current[i % fotos.length];
            const fotoAnterior = fotosRef.current[(i - 1 + fotos.length) % fotos.length];

            tlExtra.to(fotoAnterior, { opacity: 0, duration: 0.3 }, t);
            tlExtra.to(fotoActual, { opacity: 1, duration: 0.3 }, t);
        });
    }

    useGSAP(() => {
        const alturas = logros.map((_, i) => {
            const punto = puntosRef.current[i];
            if (!punto || !lineaTrackRef.current) return 0;
            const puntoBox = punto.getBoundingClientRect();
            const trackBox = lineaTrackRef.current.getBoundingClientRect();
            return puntoBox.top - trackBox.top + puntoBox.height / 2;
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: seccionRef.current,
                start: "center center",
                end: () => "+=" + window.innerHeight,
                pin: true,
                pinSpacing: true,
                scrub: true,
            },
        });

        logros.forEach((_, i) => {
            const posicion = i / logros.length;

            tl.to(lineaRef.current, { height: alturas[i] + "px", duration: 0.15 }, posicion);
            tl.to(itemsRef.current[i], { opacity: 1, duration: 0.1 }, posicion);
            tl.to(puntosRef.current[i], { backgroundColor: "#c9a86a", duration: 0.1 }, posicion);

            if (i > 0) {
                const anchoTransicion = 0.05;
                tl.to(fotosRef.current[i - 1], { opacity: 0, duration: anchoTransicion }, posicion - anchoTransicion);
                tl.to(fotosRef.current[i], { opacity: 1, duration: anchoTransicion }, posicion);
            } else {
                tl.set(fotosRef.current[i], { opacity: 1 }, posicion);
            }
        });

        tl.to(lineaRef.current, { height: "100%", duration: 0.15 }, 1);
    });

    return (
        <section id="trayectoria" ref={seccionRef} className="bg-surface min-h-screen flex items-center py-32">
            <Container>
                <Reveal>
                    <div className="flex flex-row-reverse gap-16 items-center">
                        <div className="flex-[1.3] relative h-[70vh] rounded-lg overflow-hidden">
                            {fotos.map((src, i) => (
                                <div
                                    key={i}
                                    ref={(el) => { fotosRef.current[i] = el; }}
                                    className="absolute inset-0"
                                    style={{ opacity: i === 0 ? 1 : 0 }}
                                >
                                    <Image src={src} alt="Jairo Quezada" fill className="object-contain" />
                                </div>
                            ))}
                        </div>

                        <div className="flex-[1.7] relative pl-12">
                            <div ref={lineaTrackRef} className="absolute left-0 top-2 bottom-2 w-1 bg-ink-muted/30">
                                <div ref={lineaRef} className="w-full bg-accent" style={{ height: "0%" }}></div>
                            </div>

                            {logros.map((logro, i) => (
                                <div
                                    key={i}
                                    ref={(el) => { itemsRef.current[i] = el; }}
                                    className="mb-16 last:mb-0 opacity-30 relative"
                                >
                                    <div
                                        ref={(el) => { puntosRef.current[i] = el; }}
                                        className="absolute -ml-[3.2rem] mt-1 w-4 h-4 rounded-full bg-ink-muted"
                                    ></div>
                                    <p className="text-ink text-3xl mb-1 font-[family-name:var(--font-playfair)]">
                                        {logro.año}
                                    </p>
                                    <p className="text-ink-muted text-lg">{logro.texto}</p>
                                </div>
                            ))}

                            <div
                                ref={contenedorExtraRef}
                                className="overflow-hidden -ml-[3.2rem] pl-[3.2rem]"
                                style={{ height: 0 }}
                            >
                                <div ref={contenidoExtraRef} className="relative pt-8">
                                    {logrosExtra.map((logro, i) => (
                                        <div
                                            key={i}
                                            ref={(el) => { itemsExtraRef.current[i] = el; }}
                                            className="mb-16 last:mb-0 opacity-30 relative"
                                        >
                                            <div
                                                ref={(el) => { puntosExtraRef.current[i] = el; }}
                                                className="absolute -ml-[3.2rem] mt-1 w-4 h-4 rounded-full bg-ink-muted"
                                            ></div>
                                            <p className="text-ink text-3xl mb-1 font-[family-name:var(--font-playfair)]">
                                                {logro.año}
                                            </p>
                                            <p className="text-ink-muted text-lg">{logro.texto}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <div className="text-center mt-16">
                    <button
                        onClick={toggleExpandido}
                        className="text-accent border border-accent bg-surface hover:bg-accent hover:text-surface transition-colors duration-300 px-8 py-3 rounded-full text-lg font-[family-name:var(--font-playfair)]"
                    >
                        {expandido ? "Ver menos" : "Ver trayectoria completa"}
                    </button>
                </div>
            </Container>
        </section>
    );
}
