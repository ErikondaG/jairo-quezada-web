"use client"
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";
import TituloSeccion from "./TituloSeccion";

const fotos = [
    { src: "/Jairo-bio.png", alt: "Jairo Quezada de pie, sonriendo, con blazer floral azul y dorado" },
    { src: "/jairo-bio2.png", alt: "Jairo Quezada en pose relajada con blazer floral, apoyado sobre una pierna" },
    { src: "/Jairo-bio3-newest.png", alt: "Jairo Quezada de perfil, con blazer negro de terciopelo y camisa roja" },
    { src: "/Jairo-bio4.png", alt: "Retrato de cerca de Jairo Quezada sonriendo, con camisa roja y blazer negro" },
];

const parrafoIntro =
    "Jairo Quezada es un cantante, compositor y guitarrista chileno, nacido artísticamente en San Bernardo, cuya trayectoria reúne más de dos décadas de música, escenarios, festivales, televisión y competencias nacionales e internacionales.";

const parrafosCompletos = [
    "Su vínculo con la música comenzó desde muy joven. En 1996 empezó a cantar como afición y, en 1998, aprendió a tocar guitarra con el propósito de acompañarse y comenzar a desarrollar sus propias composiciones. Desde entonces, la música se convirtió en una parte esencial de su vida y en el camino que lo llevaría a construir una carrera profesional.",
    "A lo largo de su trayectoria, Jairo ha destacado en diversos escenarios y competencias de canto. En 2017 obtuvo el primer lugar del Festival de la Voz de San Bernardo y en 2018 ganó el Festival de la Voz \"Persiguiendo un Sueño\". En 2019 alcanzó uno de sus reconocimientos más importantes al convertirse en ganador del Festival Internacional de la Canción \"Un Canto al Mar\" de Concón, donde obtuvo el primer lugar con una canción de su propia autoría.",
    "Su talento también lo llevó a la televisión nacional. Participó en Yo Soy, donde interpretó repertorio de Luis Miguel, y posteriormente fue parte de The Voice Chile 2023, integrando el Team Beto Cuevas y avanzando hasta la etapa de Knockouts.",
    "En 2023 vivió además una experiencia internacional que marcó su carrera: se convirtió en ganador de la primera versión de KWC Chile, obteniendo el derecho de representar a Chile en el Karaoke World Championships, realizado en Panamá. En la competencia mundial avanzó hasta la tercera ronda, formando parte de los representantes destacados de la categoría individual. Un año más tarde, fue invitado a integrar el jurado de KWC Chile, pasando de competidor a evaluador de nuevos talentos.",
    "Como artista, Jairo ha desarrollado una propuesta propia que tiene como eje fundamental la interpretación emocional y la conexión con las historias que cuentan sus canciones. Su identidad nace de la balada y la música romántica, pero se encuentra en constante evolución, explorando diferentes sonoridades y estilos sin perder la sensibilidad que caracteriza su manera de interpretar.",
    "En 2024 presentó \"Desnudos\", una balada romántica que reafirmó su identidad como intérprete y compositor, seguida de \"Viaje Espacial\", una propuesta que amplió su universo musical hacia sonidos pop y latinoamericanos.",
    "Actualmente, Jairo Quezada continúa consolidando su carrera como cantante y compositor independiente, dando paso a una nueva etapa artística en la que incorpora nuevas influencias y sonidos, manteniendo como sello personal una voz cercana, auténtica y profundamente emocional. Ya está disponible \"Ya me sané\", su nuevo sencillo, su primera incursión en el género pop urbano, que forma parte de varios lanzamientos programados para este 2026.",
];

const textoParrafo = "text-ink-muted text-base sm:text-lg lg:text-xl leading-relaxed mb-4 max-w-xl lg:max-w-2xl text-justify [hyphens:auto]";

export default function Biografia() {
    const fotosRef = useRef<(HTMLDivElement | null)[]>([]);
    const brilloRef = useRef<HTMLDivElement>(null);
    const extraRef = useRef<(HTMLParagraphElement | null)[]>([]);
    const [expandida, setExpandida] = useState(false);
    const [mostrarCompleto, setMostrarCompleto] = useState(false);

    function alternarBiografia() {
        if (!expandida) {
            // Abrir: mostramos el panel largo ya mismo, para que el contenedor
            // tenga algo "grande" que revelar mientras crece.
            setMostrarCompleto(true);
            setExpandida(true);
        } else {
            // Cerrar: primero encogemos el contenedor; recién cuando esa animación
            // termina (500ms, mismo tiempo que la transición de max-height) volvemos
            // al texto corto. Si lo hiciéramos al mismo tiempo, el contenido chico
            // aparecería de golpe y la animación no se vería.
            setExpandida(false);
            setTimeout(() => setMostrarCompleto(false), 500);
        }
    }

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

        gsap.set(brilloRef.current, { opacity: 0.4 });

        gsap.to(brilloRef.current, {
            opacity: 0.7,
            duration: 2.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });

        gsap.to(brilloRef.current, {
            scale: 1.15,
            x: 15,
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });
    }, []);

    // Fade-in escalonado de los párrafos nuevos, cada vez que se expande
    useGSAP(() => {
        if (expandida) {
            gsap.from(extraRef.current.filter(Boolean), {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
            });
        }
    }, { dependencies: [expandida] });

    return (
        <section id="biografia" className="bg-surface min-h-screen flex items-center pt-28 sm:pt-36 md:pt-32 pb-20 sm:pb-32">
            <Container>
                <Reveal>
                    <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                        <div className="w-full md:w-1/2 relative h-[50vh] sm:h-[60vh] md:h-[75vh]">
                            <div
                                ref={brilloRef}
                                className="absolute -inset-10 sm:-inset-16 md:-inset-24 lg:-inset-32 pointer-events-none"
                                style={{
                                    background: "linear-gradient(75deg, transparent 20%, rgba(201,168,106,0.55) 50%, transparent 80%)",
                                    filter: "blur(55px)",
                                    maskImage: "linear-gradient(to bottom, transparent, black 20%, black 72%, transparent 96%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 72%, transparent 96%)",
                                }}
                            ></div>

                            <div className="absolute inset-0 overflow-hidden">
                                {fotos.map((foto, i) => (
                                    <div
                                        key={foto.src}
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
                                        <Image src={foto.src} alt={foto.alt} fill className="object-contain object-bottom" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 md:pt-[15vh] lg:pt-[18vh]">
                            <TituloSeccion>
                                Sobre Jairo
                            </TituloSeccion>

                            <div
                                className={`max-w-xl lg:max-w-2xl overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                                    expandida ? "max-h-56 sm:max-h-64 md:max-h-72" : "max-h-32 sm:max-h-36 md:max-h-40"
                                }`}
                            >
                                {!mostrarCompleto ? (
                                    <p className={textoParrafo}>{parrafoIntro}</p>
                                ) : (
                                    <div
                                        className="h-56 sm:h-64 md:h-72 overflow-y-auto pr-2 pt-5 sm:pt-6"
                                        style={{
                                            maskImage: "linear-gradient(to bottom, transparent, black 6%, black 88%, transparent)",
                                            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 6%, black 88%, transparent)",
                                        }}
                                    >
                                        {parrafosCompletos.map((texto, i) => (
                                            <p
                                                key={i}
                                                ref={(el) => { extraRef.current[i] = el; }}
                                                className={textoParrafo}
                                            >
                                                {texto}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={alternarBiografia}
                                className="group inline-flex items-center justify-center gap-3 w-60 sm:w-64 px-6 py-3 mt-2 rounded-full border border-ink-muted/40 text-ink text-sm sm:text-base transition-all duration-300 hover:border-accent hover:text-accent"
                            >
                                <span>{expandida ? "Ver menos" : "Ver biografía completa"}</span>
                                <span className={`text-xl transition-transform duration-300 ${expandida ? "rotate-180" : ""}`}>
                                    ↓
                                </span>
                            </button>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}