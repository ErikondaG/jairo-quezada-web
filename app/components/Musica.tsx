import Container from "./Container";

const videos = [
    { titulo: "Ya me sané", id: "jFNBxR1MC18" },
    { titulo: "Viaje Espacial", id: "H-PqrrTdJSw" },
    { titulo: "Desnudos", id: "pY8ANO8jDQ4" },
];

export default function Musica() {
    return (
        <section className="bg-black py-32 pt-32">
            <Container>
                <h2 className="text-white text-5xl mb-16 font-[family-name:var(--font-playfair)]">
                    Música y Videos
                </h2>

                <div className="grid grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div key={video.id}>
                            <div className="aspect-video rounded-lg overflow-hidden">
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.titulo}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                            <p className="text-white text-xl mt-4 font-[family-name:var(--font-playfair)]">
                                {video.titulo}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}