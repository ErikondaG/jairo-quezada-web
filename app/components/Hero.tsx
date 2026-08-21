"use client"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero() {
    const cajaRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const spacerRef = useRef<HTMLDivElement>(null);
    const hfotoRef = useRef<HTMLDivElement>(null);
    const botonRef = useRef<HTMLDivElement>(null);

    const navButtonClass =
        "font-[family-name:var(--font-Playfair)] text-white text-2xl hover:text-accent hover:scale-105 transition-colors transition-transform duration-300 tracking-wide";

    useGSAP(() => {
        gsap.from(cajaRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" });

        gsap.from(botonRef.current, {
            opacity: 0,
            y: 20,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.8,
        });

        gsap.to(botonRef.current, {
            y: -8,
            repeat: -1,
            yoyo: true,
            duration: 1.6,
            ease: "sine.inOut",
        });
    });

    useGSAP(() => {
        const logoBox = logoRef.current!.getBoundingClientRect();
        const centroLogo = logoBox.left + logoBox.width / 2;
        const centroPantalla = window.innerWidth / 2;
        const offset = centroPantalla - centroLogo;

        gsap.set(logoRef.current, { x: offset, opacity: 1 });

        const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: spacerRef.current, 
                start: "top top",
                end: "bottom top",
                scrub: true,
                snap: {
                    snapTo: [0,1],
                    duration: {min: 0.3, max:0.6 },
                    ease: "power2.inOut",
                }
            },
        });

        tl.to(pinRef.current, { height: "100px" }, 0);
        tl.to(logoRef.current, { x: 0, scale: 0.3, transformOrigin: "left center" }, 0);
        tl.to(navRef.current, { opacity: 1 }, 0);
        tl.to(panelRef.current, { opacity: 1, background: "rgba(255,255,255,0.25)", backdropFilter: "blur(10px)" }, 0);
        tl.to(hfotoRef.current, { opacity: 0 }, 0);
        tl.to(botonRef.current, { opacity: 0 }, 0);
    });

    function irA(id: string, offsetY = 90) {
        gsap.to(window, {
            scrollTo: { y: `#${id}`, offsetY },
            duration: 1.2,
            ease: "power2.inOut",
        });
    }

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
                            background: "rgba(255,255,255,0.8)",
                            backdropFilter: "blur(0px)",
                            opacity: 0,
                        }}
                    ></div>

                    <Container>
                        <div className="flex items-center justify-between relative z-10">
                            <div ref={logoRef} className="relative z-10 opacity-0">
                                <Image
                                    src="/Logo-blanco.png"
                                    alt="Logo Jairo Quezada color blanco"
                                    width={500}
                                    height={292}
                                    priority
                                />
                            </div>

                            <nav ref={navRef} className="flex items-center gap-15 opacity-0">
                                <button onClick={() => irA("biografia", 0)} className={navButtonClass}>Biografía</button>
                                <button onClick={() => irA("trayectoria")} className={navButtonClass}>Trayectoria</button>
                                <button onClick={() => irA("musica")} className={navButtonClass}>Música</button>
                                <button onClick={() => irA("contacto")} className={navButtonClass}>Contacto</button>

                                <div className="flex items-center gap-4 ml-4">
                                    <a href="https://www.instagram.com/jairo_cantante/" target="_blank" rel="noopener noreferrer">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white hover:text-accent transition-colors">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.facebook.com/jairocantante/" target="_blank" rel="noopener noreferrer">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white hover:text-accent transition-colors">
                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.youtube.com/channel/UCqhHyqXlg0CQEBC_0Rkrr1g" target="_blank" rel="noopener noreferrer">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white hover:text-accent transition-colors">
                                            <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.391.566a2.994 2.994 0 0 0-2.107 2.12C0 8.09 0 12 0 12s0 3.91.502 5.814a2.994 2.994 0 0 0 2.107 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.391-.566a2.994 2.994 0 0 0 2.107-2.12C24 15.91 24 12 24 12s0-3.91-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z" />
                                        </svg>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </Container>

                    <div
                        ref={botonRef}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 cursor-pointer text-accent transition-colors duration-300 group"
                        onClick={() => irA("biografia", 0)}
                    >
                        <span className="text-xl tracking-[0.2em] uppercase font-[family-name:var(--font-Playfair)] font-bold">
                            Descubre más
                        </span>

                        <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-accent bg-surface/50 group-hover:bg-accent transition-colors duration-300">
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-accent group-hover:text-surface transition-colors duration-300"
                            >
                                <path d="M12 5v14" />
                                <path d="M5 12l7 7 7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}