import { AppProvider } from '../store/provider'


export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <AppProvider>
          { children }
        </AppProvider>
      </body>
    </html>
  )
}