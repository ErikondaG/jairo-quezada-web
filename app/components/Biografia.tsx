import Container from "./Container";
import Image from "next/image";

export default function Biografia() {
    return (
        <section className="bg-black min-h-screen flex items-center py-32">
            <Container>
                <div className="flex gap-16 items-center">
                    <div className="w-1/2 relative h-[500px]">
                        <Image
                            src="/Jairo-bio.png"
                            alt="Jairo Quezada"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="w-1/2">
                        <h2 className="text-white text-5xl mb-8 font-[family-name:var(--font-playfair)]">
                            Quién es Jairo Quezada
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            Cantante, compositor, autor y guitarrista de San Bernardo. Comenzó a cantar profesionalmente a los 15 años, y desde entonces ha llevado su música a escenarios de Chile y el extranjero.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            Su talento lo llevó a ganar el Festival de la Voz de San Bernardo (2017), el Festival &quot;Persiguiendo un Sueño&quot; (2018) y el Festival &quot;Un Canto al Mar&quot; de Concón (2019) con una canción propia. Ha participado en programas como Yo Soy, The Voice Chile y Caja de Pandora, y en 2023 se coronó campeón nacional del concurso KWC Chile, representando al país en el mundial KWC de Panamá.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Hoy trabaja en nuevos lanzamientos que combinan la emotividad de sus baladas con sonidos de pop urbano — el más reciente, &quot;Ya me sané&quot;, marca su primera incursión en este género.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}