import { AppProvider } from '../store/provider'

import 'styles/variables/_borders.scss'
import 'styles/variables/_colors.scss'
import 'styles/variables/_spacings.scss'
import 'styles/variables/_typography.scss'
import 'styles/global.scss'
import 'styles/buttons.scss'
import 'styles/fonts.scss'
import 'styles/inputs.scss'
import 'styles/typography.scss'



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