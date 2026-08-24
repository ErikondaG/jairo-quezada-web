"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const enlaces = [
    { nombre: "Biografía", id: "biografia" },
    { nombre: "Trayectoria", id: "trayectoria" },
    { nombre: "Música", id: "musica" },
    { nombre: "Contacto", id: "contacto" },
];

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLButtonElement>(null);
    const enlacesRef = useRef<HTMLUListElement>(null);
    const redesRef = useRef<HTMLDivElement>(null);
    const separadorRef = useRef<HTMLDivElement>(null);
    const copyrightRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const elementos = [
            logoRef.current,
            redesRef.current,
            enlacesRef.current,
            separadorRef.current,
            copyrightRef.current,
        ];

        gsap.from(elementos, {
            opacity: 0,
            y: 25,
            duration: 1,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }, { scope: footerRef });

    function irA(id: string, offsetY = 90) {
        gsap.to(window, {
            scrollTo: {
                y: `#${id}`,
                offsetY,
            },
            duration: 1.2,
            ease: "power2.inOut",
        });
    }

    function hoverEnlace(element: HTMLElement) {
        gsap.to(element, {
            y: -3,
            duration: 0.25,
            ease: "power2.out",
        });
    }

    function leaveEnlace(element: HTMLElement) {
        gsap.to(element, {
            y: 0,
            duration: 0.25,
            ease: "power2.out",
        });
    }

    return (
        <footer
            ref={footerRef}
            className="bg-surface border-t border-ink/10"
        >
            <Container>
                <div className="py-16">

                    {/* Logo */}
                    <div className="flex flex-col items-center">

                        <button
                            ref={logoRef}
                            onClick={() => irA("biografia", 0)}
                            aria-label="Ir a Biografía"
                            className="group cursor-pointer"
                        >
                            <Image
                                src="/Logo-blanco.png"
                                alt="Logo Jairo Quezada"
                                width={180}
                                height={100}
                                className="w-auto h-16 object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        </button>

                        {/* Redes sociales */}
                        <div
                            ref={redesRef}
                            className="flex items-center gap-5 mt-8"
                        >

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/jairo_cantante/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="text-ink-muted hover:text-accent transition-colors duration-300"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            

                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/jairocantante/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="text-ink-muted hover:text-accent transition-colors duration-300"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a
                                href="https://www.youtube.com/channel/UCqhHyqXlg0CQEBC_0Rkrr1g"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="text-ink-muted hover:text-accent transition-colors duration-300"
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.391.566a2.994 2.994 0 0 0-2.107 2.12C0 8.09 0 12 0 12s0 3.91.502 5.814a2.994 2.994 0 0 0 2.107 2.12C4.495 20.5 12 20.5 12 20.5s7.505-.566 9.391-.566a2.994 2.994 0 0 0 2.107-2.12C24 15.91 24 12 24 12s0-3.91-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z" />
                                </svg>
                            </a>

                        </div>

                        {/* Navegación */}
                        <nav className="mt-10">
                            <ul
                                ref={enlacesRef}
                                className="flex flex-wrap justify-center gap-x-10 gap-y-4"
                            >
                                {enlaces.map((enlace) => (
                                    <li key={enlace.id}>
                                        <button
                                            onClick={() => irA(enlace.id)}
                                            onMouseEnter={(e) =>
                                                hoverEnlace(e.currentTarget)
                                            }
                                            onMouseLeave={(e) =>
                                                leaveEnlace(e.currentTarget)
                                            }
                                            className="inline-block text-ink-muted hover:text-accent text-sm tracking-wide transition-colors duration-300 cursor-pointer"
                                        >
                                            {enlace.nombre}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                    </div>

                    {/* Separador */}
                    <div
                        ref={separadorRef}
                        className="h-px bg-ink/10 my-12"
                    />

                    {/* Copyright */}
                    <div
                        ref={copyrightRef}
                        className="text-center"
                    >
                        <p className="text-ink-muted text-xs tracking-wide">
                            © {new Date().getFullYear()} Jairo Quezada.
                            Todos los derechos reservados.
                        </p>
                    </div>

                </div>
            </Container>
        </footer>
    );
}