"use client"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Container from "./Container";

const fotos = ["/Jairo-bio.png", "/jairo-bio2.png", "/Jairo-bio3.png", "/Jairo-bio4.png"];

export default function Biografia() {
    const fotosRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1 });

        fotos.forEach((_, i) => {
            const duracionTotal = 6;
            const etiqueta = "foto" + i;

            tl.addLabel(etiqueta);
            tl.set(fotosRef.current[i], { opacity: 0, x: 0 }, etiqueta);
            tl.to(fotosRef.current[i], { x: -80, duration: duracionTotal, ease: "none" }, etiqueta);
            tl.to(fotosRef.current[i], { opacity: 1, duration: 1 }, etiqueta);
            tl.to(fotosRef.current[i], { opacity: 0, duration: 1 }, `${etiqueta}+=${duracionTotal - 1}`);
        });
    });

    return (
        <section className="bg-black min-h-screen flex items-center py-32">
            <Container>
                <div className="flex gap-16 items-center">
                    <div className="w-1/2 relative h-[75vh] overflow-hidden">
                        {fotos.map((src, i) => (
                            <div
                                key={i}
                                ref={(el) => { fotosRef.current[i] = el; }}
                                className="absolute inset-0"
                                style={{ 
                                    opacity: 0,
                                    maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                                    maskComposite: "intersect",
                                    WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                                    WebkitMaskComposite: "source-in",
                                }}
                            >
                                <Image src={src} alt="Jairo Quezada" fill className="object-contain object-bottom" />
                            </div>
                        ))}
                    </div>

                    <div className="w-1/2">
                        <h2 className="text-white text-7xl mb-20 font-[family-name:var(--font-playfair)]">
                            Quién es Jairo Quezada
                        </h2>
                        <p className="text-gray-300 text-4xl leading-relaxed mb-6">
                            Cantante, compositor, autor y guitarrista de San Bernardo. Comenzó a cantar profesionalmente a los 15 años, y desde entonces ha llevado su música a escenarios de Chile y el extranjero.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}