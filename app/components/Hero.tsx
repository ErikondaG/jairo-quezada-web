"use client"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const cajaRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const spacerRef = useRef<HTMLDivElement>(null);
    const navButtonClass = "font-[family-name:var(--font-Playfair)] text-black text-2xl hover:text-gray-700 hover:scale-105 transition-colors transition-transform duration-300 tracking-wide";
    const hfotoRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.from(cajaRef.current, { opacity: 0,  duration: 1.2, ease: "power2.out" });
    });

    useGSAP(() => {
        const logoBox = logoRef.current!.getBoundingClientRect();
        const centroLogo = logoBox.left + logoBox.width / 2;
        const centroPantalla = window.innerWidth / 2;
        const offset = centroPantalla - centroLogo;

        gsap.set(logoRef.current, { x: offset, opacity: 1 });

        const tl = gsap.timeline({
            defaults: { ease: "none"},
            scrollTrigger: {
                trigger: spacerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        tl.to(pinRef.current, { height: "110px" }, 0);
        tl.to(logoRef.current, { x: 0, scale: 0.3, transformOrigin: "left center" }, 0);
        tl.to(navRef.current, { opacity: 1 }, 0);
        tl.to(panelRef.current, { opacity: 1 }, 0);
        tl.to(hfotoRef.current, { opacity: 0 }, 0);
    });

    return (
        <>
            <div ref={spacerRef} className="h-screen"></div>

            <div ref={pinRef} className="fixed top-0 left-0 w-full h-screen z-50 overflow-hidden">
                <div ref={cajaRef} className="absolute inset-0 flex flex-col items-center justify-center">
                    <div ref={hfotoRef} className="absolute inset-0">
                        <Image
                            src="/Jairo-hero-new.jpg"
                            alt="Jairo quezada sentado"
                            fill
                            priority
                            className="object-cover object-[25%_35%]"
                        />
                    </div> 

                    <div 
                        ref={panelRef} 
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))",
                            opacity: 0,
                        }}
                    ></div>

                    <Container>
                        <div className="flex items-center justify-between relative z-10">
                            <div ref={logoRef} className="relative z-10 opacity-0">
                                <Image
                                    src="/Logo-negro.png"
                                    alt="Logo Jairo Quezada color negro"
                                    width={500}
                                    height={292}
                                    priority
                                />
                            </div>

                            <nav ref={navRef} className="flex gap-15 opacity-0 ">
                                <button className={navButtonClass}>Biografía</button>
                                <button className={navButtonClass}>Trayectoria</button>
                                <button className={navButtonClass}>Música</button>
                                <button className={navButtonClass}>Contacto</button>
                            </nav>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
}