"use client"
import { useRef } from "react";
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

export default function Trayectoria() {
    const fotosRef = useRef<(HTMLDivElement | null)[]>([]);
    const lineaRef = useRef<HTMLDivElement>(null);
    const puntosRef = useRef<(HTMLDivElement | null)[]>([]);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const lineaTrackRef = useRef<HTMLDivElement>(null);

    const seccionRef = useRef<HTMLDivElement>(null);

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
                            <div ref={lineaTrackRef} className="absolute left-0 top-2 bottom-2 w-1 bg-ink-muted opacity-30">
                                <div ref={lineaRef} className="w-full bg-accent" style={{ height: "0%" }}></div>
                            </div>

                            {logros.map((logro, i) => (
                                <div
                                    key={i}
                                    ref={(el) => { itemsRef.current[i] = el; }}
                                    className="mb-16 last:mb-0 opacity-30 transition-opacity duration-300"
                                >
                                    <div
                                        ref={(el) => { puntosRef.current[i] = el; }}
                                        className="absolute -ml-[3.44rem] mt-1 w-5 h-5 rounded-full bg-ink-muted"
                                    ></div>
                                    <p className="text-ink text-3xl mb-1 font-[family-name:var(--font-playfair)]">
                                        {logro.año}
                                    </p>
                                    <p className="text-ink-muted text-lg">{logro.texto}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
} 