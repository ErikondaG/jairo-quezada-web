import Image from "next/image";
import Container from "./Container";

const enlaces = [
    { nombre: "Inicio", href: "#inicio" },
    { nombre: "Biografía", href: "#biografia" },
    { nombre: "Música", href: "#musica" },
    { nombre: "Trayectoria", href: "#trayectoria" },
    { nombre: "Galería", href: "#galeria" },
];

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-ink/10">
            <Container>
                <div className="py-16">
                    <div className="flex flex-col items-center gap-10">
                        <a href="#inicio" aria-label="Volver al inicio">
                            <Image
                                src="/Logo-blanco.png"
                                alt="Logo"
                                width={180}
                                height={80}
                                className="w-auto h-16 object-contain"
                            />
                        </a>

                        <nav>
                            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                                {enlaces.map((enlace) => (
                                    <li key={enlace.href}>
                                        <a
                                            href={enlace.href}
                                            className="text-ink-muted hover:text-accent transition-colors duration-300 text-sm"
                                        >
                                            {enlace.nombre}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="h-px bg-ink/10 my-12" />

                    <div className="text-center">
                        <p className="text-ink-muted text-sm">
                            © {new Date().getFullYear()} Jairo Quezada. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}