import './globals.css'

export const metadata = {
  title: 'Investimentos - Microfrontend',
  description: 'Aplicação de investimentos independente',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  )
}
