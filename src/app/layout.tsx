import type { Metadata } from 'next'
import './globals.css'
import ThemeWrapper from '@/components/ThemeWrapper'

export const metadata: Metadata = {
  title: 'Flugo',
  description: 'Sistema de gestão de colaboradores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
      </head>
      <body>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  )
}
