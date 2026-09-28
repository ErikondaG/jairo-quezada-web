"use client"
import { useState } from "react";
import Image from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";
import TituloSeccion from "./TituloSeccion";

// Clases compartidas por los tres campos. Al enfocar, además de cambiar el color del borde
// (1px, sutil) sumamos un box-shadow de 1px del mismo color: engrosa la línea a 2px
// visualmente SIN mover el layout (un border-b-2 empujaría el contenido 1px).
const claseCampo =
    "w-full bg-transparent border-b border-ink-muted text-ink text-base sm:text-lg py-2 focus:outline-none focus:border-accent focus:shadow-[0_1px_0_0_var(--color-accent)] transition-colors";

export default function Contacto() {
    const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
    // Honeypot: campo señuelo que ningún humano llena porque no lo ve, pero un bot
    // que completa formularios automáticamente sí. Nombre poco obvio a propósito
    // (los bots a veces reconocen nombres típicos como "honeypot" y los saltean).
    const [webUrl, setWebUrl] = useState("");
    const [status, setStatus] = useState("idle");

    async function enviar(e: React.FormEvent) {
        e.preventDefault();

        // Si el señuelo llegó lleno, es un bot: cortamos acá, sin llamar a Formspree
        // ni gastar cuota del plan. No mostramos error para no darle pistas al bot
        // de que fue detectado; simplemente no pasa nada visible.
        if (webUrl !== "") return;

        setStatus("enviando");

        try {
            const res = await fetch("https://formspree.io/f/xrpzlbeq", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("exito");
                setForm({ nombre: "", email: "", mensaje: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <section id="contacto" className="bg-surface-alt border-t border-accent/10 min-h-screen flex items-center py-20 sm:py-32">
            <Container>
                <Reveal>
                    {/* flex-col en mobile, flex-row recién desde md */}
                    <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
                        <div className="w-full md:w-1/2 relative h-[40vh] sm:h-[50vh] md:h-[70vh] rounded-lg overflow-hidden">
                            <Image
                                src="/Jairo-con.jpg"
                                alt="Jairo Quezada"
                                fill
                                className="object-cover object-[center_85%] grayscale"
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <TituloSeccion>
                                Contacto
                            </TituloSeccion>

                            <form onSubmit={enviar} className="flex flex-col gap-6">
                                <div>
                                    <label htmlFor="contacto-nombre" className="sr-only">Nombre</label>
                                    <input
                                        id="contacto-nombre"
                                        type="text"
                                        name="nombre"
                                        autoComplete="name"
                                        placeholder="Nombre"
                                        required
                                        value={form.nombre}
                                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                        className={claseCampo}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contacto-email" className="sr-only">Correo electrónico</label>
                                    <input
                                        id="contacto-email"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="Correo electrónico"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className={claseCampo}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contacto-mensaje" className="sr-only">Mensaje</label>
                                    <textarea
                                        id="contacto-mensaje"
                                        name="mensaje"
                                        placeholder="Mensaje"
                                        required
                                        rows={4}
                                        value={form.mensaje}
                                        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                                        className={`${claseCampo} resize-none`}
                                    ></textarea>
                                </div>

                                {/* Campo señuelo (honeypot), invisible para una persona real:
                                    - fuera de la pantalla (left: -9999px) en vez de display:none/opacity:0,
                                      porque algunos bots ignoran esos dos por ser trucos demasiado conocidos.
                                    - tabIndex={-1}: si por lo que sea quedara visible, tampoco es alcanzable
                                      por teclado ni se lee con un lector de pantalla (aria-hidden).
                                    - autoComplete="off": evita que el navegador lo autocomplete por error. */}
                                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0 }}>
                                    <label htmlFor="contacto-web">No completar este campo</label>
                                    <input
                                        id="contacto-web"
                                        type="text"
                                        name="web"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={webUrl}
                                        onChange={(e) => setWebUrl(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "enviando"}
                                    className="text-black bg-gray-200 hover:bg-surface hover:text-accent hover:scale-105 transition-colors transition-transform duration-300 py-3 rounded-lg text-sm sm:text-base font-[family-name:var(--font-playfair)] disabled:opacity-50"
                                >
                                    {status === "enviando" ? "Enviando..." : "Enviar mensaje"}
                                </button>

                                {/* role="status" / "alert": los lectores de pantalla anuncian el mensaje
                                    apenas aparece, sin que la persona tenga que ir a buscarlo */}
                                {status === "exito" && (
                                    <p role="status" className="text-green-400">¡Mensaje enviado! Te responderemos pronto.</p>
                                )}
                                {status === "error" && (
                                    <p role="alert" className="text-red-400">Hubo un error. Inténtalo de nuevo.</p>
                                )}

                                {/* Aviso de uso de datos (Ley 19.628 sobre protección de datos
                                    personales). No es un formulario legal completo, es la línea
                                    mínima razonable para un formulario de contacto simple: le dice
                                    a la persona para qué se usan los datos que está por enviar. */}
                                <p className="text-ink-muted text-xs sm:text-sm">
                                    Al enviar este formulario, tus datos se usan únicamente para responder tu mensaje.
                                </p>
                            </form>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}