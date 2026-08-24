export default function TituloSeccion({ children, subtitulo }: { children: React.ReactNode; subtitulo?: string }) {
    return (
        <div className="relative mb-16">
            <div className="relative inline-block">
                <div
                    className="absolute inset-0 -m-8 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, rgba(201,168,106,0.15), transparent 70%)" }}
                ></div>
                <h2 className="relative text-ink text-6xl font-[family-name:var(--font-playfair)]">
                    {children}
                </h2>
            </div>
            {subtitulo && <p className="relative text-ink-muted text-lg mt-3">{subtitulo}</p>}
        </div>
    );
}