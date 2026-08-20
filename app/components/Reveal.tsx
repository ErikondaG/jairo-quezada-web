"use client"
import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(ref.current, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 65%",
                toggleActions: "play none none none",
            },
        });
    });

    return <div ref={ref}>{children}</div>;
}