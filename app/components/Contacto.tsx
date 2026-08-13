"use client"
import { useState } from "react";
import Image from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";

export default function Contacto() {
    const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
    const [status, setStatus] = useState("idle");

    async function enviar(e: React.FormEvent) {
        e.preventDefault();
        setStatus("enviando");

        try {
            const res = await fetch("https://formspree.io/f/xrpzlbeq", {
                method: "POST",
                headers: { "Accept": "application/json" },
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
        <section className="bg-black min-h-screen flex items-center py-32">
            <Container>
                <Reveal>
                    <div className="flex gap-16 items-center">
                        <div className="w-1/2 relative h-[70vh] rounded-lg overflow-hidden "> 
                            <Image
                                src="/Jairo-con.jpg"
                                alt="Jairo Quezada"
                                fill
                                className="object-cover object-bottom grayscale"
                            />
                        </div>

                        <div className="w-1/2">
                            <h2 className="text-white text-6xl mb-4 font-[family-name:var(--font-playfair)]">
                                Contacto
                            </h2>

                            <form onSubmit={enviar} className="flex flex-col gap-6">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    required
                                    value={form.nombre}
                                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                    className="bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-gray-200 transition-colors"
                                />
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-gray-200 transition-colors"
                                />
                                <textarea
                                    placeholder="Mensaje"
                                    required
                                    rows={4}
                                    value={form.mensaje}
                                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                                    className="bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-gray-200 transition-colors resize-none"
                                ></textarea>

                                <button
                                    type="submit"
                                    disabled={status === "enviando"}
                                    className="text-black bg-gray-200 hover:bg-white hover:scale-105 transition-colors transition-transform duration-300 py-3 rounded-lg text-lg font-[family-name:var(--font-playfair)] disabled:opacity-50"
                                >
                                    {status === "enviando" ? "Enviando..." : "Enviar mensaje"}
                                </button>

                                {status === "exito" && (
                                    <p className="text-green-400">¡Mensaje enviado! Te responderemos pronto.</p>
                                )}
                                {status === "error" && (
                                    <p className="text-red-400">Hubo un error. Intentá de nuevo.</p>
                                )}
                            </form>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}