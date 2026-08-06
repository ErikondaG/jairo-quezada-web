export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full max-w-[1800px] mx-auto px-16">
            {children}
        </div>
    );
}