"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const fotos = [
    "/Jairo-tra.png",
    "/jairo-tra2.jpg",
    "/Jairo-tra3.jpeg",
    "/Jairo-tra4.jpg",
];

const logros = [
    {
        año: "2017",
        texto: "Festival de la Voz de San Bernardo",
    },
    {
        año: "2018",
        texto: 'Festival "Persiguiendo un Sueño"',
    },
    {
        año: "2019",
        texto: 'Festival "Un Canto al Mar", Concón',
    },
    {
        año: "2023",
        texto: "Campeón nacional KWC Chile, mundial en Panamá",
    },

    // Hitos falsos para probar la expansión
    {
        año: "2024",
        texto: "Presentación especial en Santiago",
    },
    {
        año: "2025",
        texto: "Participación en nuevos escenarios nacionales",
    },
    {
        año: "2025",
        texto: "Reconocimiento por trayectoria artística",
    },
    {
        año: "2026",
        texto: "Nuevos proyectos y desafíos internacionales",
    },
];

const CANTIDAD_INICIAL = 4;
const ALTO_ITEM = 140;

export default function Trayectoria() {
    const [expandida, setExpandida] = useState(false);

    const fotosRef = useRef<(HTMLDivElement | null)[]>([]);
    const seccionRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const puntosRef = useRef<(HTMLDivElement | null)[]>([]);
    const añosRef = useRef<(HTMLDivElement | null)[]>([]);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    const lineaProgresoRef =
        useRef<HTMLDivElement>(null);

    const activoActualRef = useRef(0);

    const indicePendienteRef =
        useRef<number | null>(null);

    const logrosVisibles = expandida
        ? logros
        : logros.slice(0, CANTIDAD_INICIAL);

    useGSAP(
        () => {
            const viewport = viewportRef.current;
            const track = trackRef.current;
            const seccion = seccionRef.current;
            const lineaProgreso =
                lineaProgresoRef.current;

            if (
                !viewport ||
                !track ||
                !seccion ||
                !lineaProgreso
            ) {
                return;
            }

            /*
             * =====================================================
             * DIMENSIONES
             * =====================================================
             */

            const obtenerDimensiones = () => {
                const alturaViewport =
                    viewport.offsetHeight;

                const centroViewport =
                    alturaViewport / 2;

                const centroPrimerHito =
                    ALTO_ITEM / 2;

                const desplazamientoInicial =
                    centroViewport -
                    centroPrimerHito;

                const recorridoTotal =
                    (logrosVisibles.length - 1) *
                    ALTO_ITEM;

                return {
                    desplazamientoInicial,
                    recorridoTotal,
                };
            };

            /*
             * =====================================================
             * ACTUALIZAR HITO
             * =====================================================
             */

            const marcarActivo = (
                indice: number,
                progreso: number
            ) => {
                const indiceAnterior =
                    activoActualRef.current;

                activoActualRef.current = indice;

                /*
                 * -------------------------------------------------
                 * PUNTOS Y TÍTULOS
                 * -------------------------------------------------
                 *
                 * killTweensOf evita que, si el usuario hace
                 * scroll rápidamente, varios tweens estén
                 * peleándose entre sí.
                 */

                logrosVisibles.forEach((_, i) => {
                    const esActivo = i === indice;

                    const punto =
                        puntosRef.current[i];

                    const año =
                        añosRef.current[i];

                    if (punto) {
                        gsap.killTweensOf(punto);

                        gsap.to(punto, {
                            backgroundColor:
                                esActivo
                                    ? "#c9a86a"
                                    : "var(--color-ink-muted)",

                            scale: esActivo
                                ? 1.3
                                : 1,

                            duration: 0.25,

                            ease: "power2.out",
                        });
                    }

                    if (año) {
                        gsap.killTweensOf(año);

                        gsap.to(año, {
                            opacity: esActivo
                                ? 1
                                : 0.35,

                            color: esActivo
                                ? "#c9a86a"
                                : "var(--color-ink)",

                            duration:
                                indiceAnterior ===
                                indice
                                    ? 0
                                    : 0.25,

                            ease: "power2.out",
                        });
                    }
                });

                /*
                 * -------------------------------------------------
                 * FOTOGRAFÍAS
                 * -------------------------------------------------
                 *
                 * No usamos gsap.set().
                 *
                 * Cada imagen mantiene su estado actual y
                 * simplemente hacemos crossfade hacia la nueva.
                 */

                const fotoActiva =
                    indice % fotos.length;

                fotosRef.current.forEach(
                    (foto, i) => {
                        if (!foto) return;

                        gsap.killTweensOf(foto);

                        gsap.to(foto, {
                            opacity:
                                i === fotoActiva
                                    ? 1
                                    : 0,

                            duration: 0.45,

                            ease: "power2.inOut",
                        });
                    }
                );

                /*
                 * -------------------------------------------------
                 * LÍNEA DE PROGRESO
                 * -------------------------------------------------
                 */

                const recorridoTotal =
                    (logrosVisibles.length - 1) *
                    ALTO_ITEM;

                gsap.killTweensOf(
                    lineaProgreso
                );

                gsap.to(lineaProgreso, {
                    height:
                        recorridoTotal *
                        progreso,

                    duration: 0.15,

                    ease: "none",
                });
            };

            /*
             * =====================================================
             * ESTADO INICIAL
             * =====================================================
             *
             * Importante:
             *
             * NO hacemos reset de las fotografías aquí.
             *
             * Esto evita el flash al expandir/contraer.
             */

            /*
             * Puntos
             */
            puntosRef.current.forEach(
                (punto, i) => {
                    if (!punto) return;

                    gsap.killTweensOf(punto);

                    gsap.set(punto, {
                        backgroundColor:
                            i ===
                            activoActualRef.current
                                ? "#c9a86a"
                                : "var(--color-ink-muted)",

                        scale:
                            i ===
                            activoActualRef.current
                                ? 1.3
                                : 1,
                    });
                }
            );

            /*
             * Títulos
             *
             * Solo inicializamos los que todavía
             * no tienen un estado definido.
             */
            añosRef.current.forEach(
                (año, i) => {
                    if (!año) return;

                    gsap.killTweensOf(año);

                    const activo =
                        i ===
                        activoActualRef.current;

                    gsap.set(año, {
                        opacity: activo
                            ? 1
                            : 0.35,

                        color: activo
                            ? "#c9a86a"
                            : "var(--color-ink)",
                    });
                }
            );

            /*
             * =====================================================
             * FOTOGRAFÍA INICIAL
             * =====================================================
             */

            /*
             * Solo establecemos la fotografía inicial
             * si ninguna está visible.
             */
            const hayFotoVisible =
                fotosRef.current.some(
                    (foto) =>
                        foto &&
                        parseFloat(
                            getComputedStyle(
                                foto
                            ).opacity
                        ) > 0
                );

            if (!hayFotoVisible) {
                const fotoInicial =
                    activoActualRef.current %
                    fotos.length;

                fotosRef.current.forEach(
                    (foto, i) => {
                        if (!foto) return;

                        gsap.set(foto, {
                            opacity:
                                i ===
                                fotoInicial
                                    ? 1
                                    : 0,
                        });
                    }
                );
            }

            /*
             * =====================================================
             * LÍNEA
             * =====================================================
             */

            /*
             * Solo inicializamos la línea si está
             * siendo creada por primera vez.
             */
            if (
                lineaProgreso.style.height ===
                ""
            ) {
                gsap.set(
                    lineaProgreso,
                    {
                        height: 0,
                    }
                );
            }

            /*
             * =====================================================
             * ANIMACIÓN DE EXPANSIÓN
             * =====================================================
             */

            if (expandida) {
                gsap.from(
                    itemsRef.current
                        .slice(CANTIDAD_INICIAL)
                        .filter(Boolean),
                    {
                        opacity: 0,
                        x: 30,
                        duration: 0.5,
                        stagger: 0.07,
                        ease: "power2.out",
                    }
                );
            }

            /*
             * =====================================================
             * POSICIÓN DEL TRACK
             * =====================================================
             */

            const {
                desplazamientoInicial,
                recorridoTotal,
            } = obtenerDimensiones();

            /*
             * Cuando cambiamos la cantidad de hitos,
             * ponemos inicialmente el track en su posición
             * geométrica normal.
             */
            gsap.set(track, {
                y: desplazamientoInicial,
            });

            /*
             * =====================================================
             * SCROLL
             * =====================================================
             */

            const distanciaPorHito =
                window.innerHeight * 0.45;

            const distanciaScroll = Math.max(
                window.innerHeight,
                (logrosVisibles.length - 1) *
                    distanciaPorHito
            );

            gsap.to(track, {
                y:
                    desplazamientoInicial -
                    recorridoTotal,

                ease: "none",

                scrollTrigger: {
                    id: "trayectoria-scroll",

                    trigger: seccion,

                    start: "top top",

                    end: `+=${distanciaScroll}`,

                    pin: true,

                    pinSpacing: true,

                    scrub: 0.6,

                    invalidateOnRefresh: true,

                    onUpdate: (self) => {
                        const progreso =
                            self.progress;

                        const indice = Math.round(
                            progreso *
                                (logrosVisibles.length -
                                    1)
                        );

                        marcarActivo(
                            indice,
                            progreso
                        );
                    },
                },
            });

            ScrollTrigger.refresh();

            /*
             * =====================================================
             * RESTAURAR HITO AL EXPANDIR / CONTRAER
             * =====================================================
             */

            if (
                indicePendienteRef.current !==
                null
            ) {
                const indiceDeseado =
                    Math.min(
                        indicePendienteRef.current,
                        logrosVisibles.length - 1
                    );

                const progresoDeseado =
                    logrosVisibles.length > 1
                        ? indiceDeseado /
                          (logrosVisibles.length - 1)
                        : 0;

                const trigger =
                    ScrollTrigger.getById(
                        "trayectoria-scroll"
                    );

                if (trigger) {
                    requestAnimationFrame(() => {
                        const posicion =
                            trigger.start +
                            (trigger.end -
                                trigger.start) *
                                progresoDeseado;

                        window.scrollTo({
                            top: posicion,
                            behavior: "instant",
                        });

                        /*
                         * Actualizamos el estado sin
                         * provocar un nuevo reset.
                         */
                        marcarActivo(
                            indiceDeseado,
                            progresoDeseado
                        );

                        indicePendienteRef.current =
                            null;
                    });
                }
            }
        },
        {
            scope: seccionRef,
            dependencies: [expandida],
            revertOnUpdate: true,
        }
    );

    /*
     * =========================================================
     * EXPANDIR / CONTRAER
     * =========================================================
     */

    const cambiarExpansion = () => {
        const indiceActual =
            activoActualRef.current;

        indicePendienteRef.current =
            expandida
                ? Math.min(
                      indiceActual,
                      CANTIDAD_INICIAL - 1
                  )
                : indiceActual;

        setExpandida(
            (actual) => !actual
        );
    };

    return (
        <section
            id="trayectoria"
            ref={seccionRef}
            className="bg-surface relative"
        >
            <Container>
                <Reveal>
                    <div className="min-h-screen flex items-center py-32">
                        <div className="flex flex-col w-full gap-8">

                            {/* CONTENIDO */}
                            <div className="flex flex-row-reverse gap-16 items-center w-full">

                                {/* FOTOS */}
                                <div className="flex-[1.3] relative h-[70vh] rounded-lg overflow-hidden">
                                    {fotos.map(
                                        (src, i) => (
                                            <div
                                                key={src}
                                                ref={(el) => {
                                                    fotosRef.current[
                                                        i
                                                    ] = el;
                                                }}
                                                className="absolute inset-0"
                                                style={{
                                                    opacity:
                                                        i ===
                                                        0
                                                            ? 1
                                                            : 0,
                                                }}
                                            >
                                                <Image
                                                    src={
                                                        src
                                                    }
                                                    alt="Jairo Quezada"
                                                    fill
                                                    priority={
                                                        i ===
                                                        0
                                                    }
                                                    className="object-contain"
                                                />
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* TIMELINE */}
                                <div
                                    ref={viewportRef}
                                    className="
                                        flex-[1.7]
                                        relative
                                        h-[70vh]
                                        overflow-hidden
                                    "
                                >
                                    <div
                                        ref={trackRef}
                                        className="
                                            absolute
                                            inset-x-0
                                            top-0
                                            will-change-transform
                                            z-10
                                        "
                                    >
                                        {/* LÍNEA BASE */}
                                        <div
                                            className="
                                                absolute
                                                left-6
                                                -translate-x-1/2
                                                w-px
                                                bg-ink-muted/30
                                                z-0
                                            "
                                            style={{
                                                top:
                                                    ALTO_ITEM /
                                                    2,

                                                height:
                                                    (logrosVisibles.length -
                                                        1) *
                                                    ALTO_ITEM,
                                            }}
                                        />

                                        {/* LÍNEA DE PROGRESO */}
                                        <div
                                            ref={
                                                lineaProgresoRef
                                            }
                                            className="
                                                absolute
                                                left-6
                                                -translate-x-1/2
                                                w-[3px]
                                                bg-accent
                                                z-10
                                            "
                                            style={{
                                                top:
                                                    ALTO_ITEM /
                                                    2,

                                                height: 0,
                                            }}
                                        />

                                        {/* HITOS */}
                                        {logrosVisibles.map(
                                            (
                                                logro,
                                                i
                                            ) => (
                                                <div
                                                    key={`${logro.año}-${i}`}
                                                    ref={(
                                                        el
                                                    ) => {
                                                        itemsRef.current[
                                                            i
                                                        ] =
                                                            el;
                                                    }}
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-6
                                                        pl-12
                                                    "
                                                    style={{
                                                        height:
                                                            ALTO_ITEM,
                                                    }}
                                                >
                                                    {/* PUNTO */}
                                                    <div
                                                        className="
                                                            relative
                                                            w-4
                                                            shrink-0
                                                        "
                                                        style={{
                                                            marginLeft:
                                                                "-1.75rem",
                                                        }}
                                                    >
                                                        <div
                                                            ref={(
                                                                el
                                                            ) => {
                                                                puntosRef.current[
                                                                    i
                                                                ] =
                                                                    el;
                                                            }}
                                                            className="
                                                                w-4
                                                                h-4
                                                                rounded-full
                                                                bg-ink-muted
                                                                relative
                                                                z-20
                                                            "
                                                        />
                                                    </div>

                                                    {/* TEXTO */}
                                                    <div className="min-w-0">
                                                        <p
                                                            ref={(
                                                                el
                                                            ) => {
                                                                añosRef.current[
                                                                    i
                                                                ] =
                                                                    el;
                                                            }}
                                                            className="
                                                                text-ink
                                                                text-3xl
                                                                mb-1
                                                                font-[family-name:var(--font-playfair)]
                                                            "
                                                        >
                                                            {
                                                                logro.año
                                                            }
                                                        </p>

                                                        <p
                                                            className="
                                                                text-ink-muted
                                                                text-lg
                                                                leading-relaxed
                                                            "
                                                        >
                                                            {
                                                                logro.texto
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* BOTÓN */}
                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={
                                        cambiarExpansion
                                    }
                                    className="
                                        group
                                        inline-flex
                                        items-center
                                        gap-3
                                        px-6
                                        py-3
                                        rounded-full
                                        border
                                        border-ink-muted/40
                                        text-ink
                                        transition-all
                                        duration-300
                                        hover:border-accent
                                        hover:text-accent
                                    "
                                >
                                    <span>
                                        {expandida
                                            ? "Ver menos"
                                            : "Ver trayectoria completa"}
                                    </span>

                                    <span
                                        className={`
                                            text-xl
                                            transition-transform
                                            duration-300
                                            ${
                                                expandida
                                                    ? "rotate-180"
                                                    : ""
                                            }
                                        `}
                                    >
                                        ↓
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}