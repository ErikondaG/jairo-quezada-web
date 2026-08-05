"use client"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const cajaRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const spacerRef = useRef<HTMLDivElement>(null);
    const navButtonClass = "text-black text-2xl hover:text-gray-500 transition-colors duration-300 tracking-wide";
    const hfotoRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.from(cajaRef.current, { opacity: 0, y: 50, duration: 1 });
    });

    useGSAP(() => {
        const logoBox = logoRef.current!.getBoundingClientRect();
        const centroLogo = logoBox.left + logoBox.width / 2;
        const centroPantalla = window.innerWidth / 2;
        const offset = centroPantalla - centroLogo;

        gsap.set(logoRef.current, { x: offset });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: spacerRef.current,
                start: "top top",
                end: () => "+=" + window.innerHeight * 0.8,
                scrub: true,
            },
        });

        tl.to(pinRef.current, { height: "100px" }, 0);
        tl.to(logoRef.current, { x: 0, scale: 0.3 }, 0);
        tl.to(navRef.current, { opacity: 1 }, 0);
        tl.to(panelRef.current, { opacity: 0.9 }, 0);
        tl.to(hfotoRef.current, { opacity: 0}, 0);
    });

    return (
        <>
            <div ref={spacerRef} className="h-screen"></div>

            <div ref={pinRef} className="fixed top-0 left-0 w-full h-screen z-50 overflow-hidden">
                <div ref={cajaRef} className="absolute inset-0 flex flex-col items-center justify-center">
                    <div ref={hfotoRef} className="absolute inset-0">
                        <Image
                            src="/Jairo-hero.jpg"
                            alt="Jairo quezada sentado"
                            fill
                            priority
                            className="object-cover object-[25%_35%]"
                        />
                    </div> 

                    <div ref={panelRef} className="absolute inset-0 bg-white opacity-0"></div>

                    <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-8 relative z-10">
                        <div ref={logoRef} className="relative z-10">
                            <Image
                                src="/Logo-negro.png"
                                alt="Logo Jairo Quezada color negro"
                                width={500}
                                height={150}
                                priority
                            />
                        </div>

                        <nav ref={navRef} className="flex gap-15 opacity-0">
                            <button className={navButtonClass}>Biografía</button>
                            <button className={navButtonClass}>Música</button>
                            <button className={navButtonClass}>Contacto</button>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}