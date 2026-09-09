export default function TituloSeccion({ children, subtitulo }: { children: React.ReactNode; subtitulo?: string }) {
    return (
        <div className="relative mb-10 sm:mb-16">
            <div className="relative inline-block">
                <div
                    className="absolute inset-0 -mx-10 sm:-mx-16 md:-mx-20 -my-4 sm:-my-6 md:-my-8 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 55% 48% at center, rgba(201,168,106,0.28), transparent 70%)" }}
                ></div>
                {/* text-6xl fijo hacía que una sola palabra larga (como "Trayectoria")
                    fuera más ancha que la pantalla en mobile, sin poder partirse en líneas */}
                <h2 className="relative text-ink text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)]">
                    {children}
                </h2>
            </div>
            {subtitulo && <p className="relative text-ink-muted text-base sm:text-lg mt-3">{subtitulo}</p>}
        </div>
    );
}