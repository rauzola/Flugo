import type { Metadata } from "next";
import ThemeWrapper from "../components/ThemeWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flugo - Sistema de Gestão",
  description: "Sistema de gestão de colaboradores da Flugo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </head>
      <body>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
