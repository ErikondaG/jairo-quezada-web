import Container from "./Container";
import Reveal from "./Reveal";

const videos = [
    { titulo: "Ya me sané", id: "jFNBxR1MC18" },
    { titulo: "Viaje Espacial", id: "H-PqrrTdJSw" },
    { titulo: "Desnudos", id: "pY8ANO8jDQ4" },
];

export default function Musica() {
    return (
        <section id="musica" className="bg-surface py-32 pt-32">
            <Container>
                <Reveal>
                    <h2 className="text-ink text-5xl mb-16 font-[family-name:var(--font-playfair)]">
                        Música y Videos
                    </h2>
                </Reveal>

                <div className="grid grid-cols-3 gap-8">
                    {videos.map((video, i) => (
                        <Reveal key={video.id} delay={i * 0.15}>
                            <div>
                                <div className="aspect-video rounded-lg overflow-hidden">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${video.id}`}
                                        title={video.titulo}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                                <p className="text-ink text-xl mt-4 font-[family-name:var(--font-playfair)]">
                                    {video.titulo}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}