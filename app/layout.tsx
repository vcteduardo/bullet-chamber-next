import type { Metadata } from "next";
import { Providers } from './providers';
import "./globals.css";

export const metadata: Metadata = {
  title: "Bullet Chamber",
  description: "Bullet Chamber - Gestão de Clientes e Times",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
