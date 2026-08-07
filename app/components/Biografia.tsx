import Container from "./Container";
import Image from "next/image";

export default function Biografia() {
    return (
        <section className="bg-black min-h-screen flex items-center py-32">
            <Container>
                <div className="flex gap-16 items-center">
                    <div className="w-1/2 relative h-[75vh]">
                        <Image
                            src="/Jairo-bio.png"
                            alt="Jairo Quezada"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="w-1/2">
                        <h2 className="text-white text-7xl mb-20 font-[family-name:var(--font-playfair)]">
                            Quién es Jairo Quezada
                        </h2>
                        <p className="text-gray-300 text-4xl leading-relaxed mb-6">
                            Cantante, compositor, autor y guitarrista de San Bernardo. Comenzó a cantar profesionalmente a los 15 años, y desde entonces ha llevado su música a escenarios de Chile y el extranjero.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}