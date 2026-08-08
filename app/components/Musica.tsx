import Container from "./Container";

const videos = [
    { titulo: "Ya me sané" },
    { titulo: "Viaje Espacial" },
    { titulo: "Desnudos" },
];

export default function Musica() {
    return (
        <section className="bg-black py-32 pt-32">
            <Container>
                <h2 className="text-white text-5xl mb-16 font-[family-name:var(--font-playfair)]">
                    Música y Videos
                </h2>

                <div className="grid grid-cols-3 gap-8">
                    {videos.map((video, i) => (
                        <div key={i}>
                            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500 text-sm">Video próximamente</span>
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