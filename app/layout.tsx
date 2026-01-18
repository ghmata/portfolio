import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Gabriel Mata | Desenvolvedor de Automações & Sistemas Web com IA",
  description: "Especialista em automações Python, sistemas web full-stack e IA. Projetos reais para empresas. Ex-FAB.",
  generator: "Next.js",
  keywords: ["automações", "sistemas web", "IA", "Python", "Next.js", "React", "FastAPI", "desenvolvedor"],
  authors: [{ name: "Gabriel Mata" }],
  openGraph: {
    title: "Gabriel Mata | Desenvolvedor de Automações & Sistemas Web com IA",
    description:
      "Especialista em automações Python, sistemas web full-stack e IA. Projetos reais para empresas. Ex-FAB.",
    url: "https://gabrielmata.dev",
    siteName: "Gabriel Mata",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Mata | Desenvolvedor de Automações & Sistemas Web com IA",
    description:
      "Especialista em automações Python, sistemas web full-stack e IA. Projetos reais para empresas. Ex-FAB.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
