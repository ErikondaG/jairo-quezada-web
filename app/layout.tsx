import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Playfair = Playfair_Display({
  variable: "--font-Playfair", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Jairo Quezada | Cantante, compositor y guitarrista",
  description:
    "Sitio oficial de Jairo Quezada, cantante, compositor y guitarrista chileno de San Bernardo. Conocé su biografía, trayectoria, música y videos, y contactalo directamente.",
  openGraph: {
    title: "Jairo Quezada | Cantante, compositor y guitarrista",
    description:
      "Cantante, compositor y guitarrista chileno de San Bernardo. Biografía, trayectoria, música y videos.",
    images: [
      {
        url: "/Jairo-hero-new.jpg",
        width: 1200,
        height: 630,
        alt: "Jairo Quezada",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jairo Quezada | Cantante, compositor y guitarrista",
    description:
      "Cantante, compositor y guitarrista chileno de San Bernardo. Biografía, trayectoria, música y videos.",
    images: ["/Jairo-hero-new.jpg"],
  },
  icons: {
    icon: "/Logo-negro.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jairo Quezada",
    jobTitle: "Cantante, compositor y guitarrista",
    nationality: "Chilena",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    image: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/Jairo-hero-new.jpg`,
    sameAs: [
      "https://www.instagram.com/jairo_cantante/",
      "https://www.facebook.com/jairocantante/",
      "https://www.youtube.com/channel/UCqhHyqXlg0CQEBC_0Rkrr1g",
      "https://open.spotify.com/intl-es/artist/5Xc7HccmWZ0fLqTnhNVvzC",
      "https://music.apple.com/cl/artist/jairo-quezada/1586396880",
    ],
  };

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${Playfair.variable} h-full antialiased overflow-x-hidden`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* overflow-x-hidden: red de seguridad global para elementos decorativos
          (como el brillo de Biografía) que se desbordan intencionalmente de su
          contenedor. Si llegan a tocar el borde real de la pantalla, se recortan
          ahí (invisible), en vez de necesitar un overflow-hidden ajustado en
          cada componente por separado. */}
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}