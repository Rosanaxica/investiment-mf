import './globals.css'
import { Providers } from '../components/Providers'

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
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
