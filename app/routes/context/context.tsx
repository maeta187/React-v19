import { createContext, use } from 'react'

type Theme = 'light' | 'dark'

type ButtonProps = {
  show: boolean
  children: React.ReactNode
}

const ThemeContext = createContext<Theme>('light')

/**
 * Context
 * React19 以降　Context に Provider を付けなくても使用できるようになった
 * 将来のバージョンでは .Provider が非推奨になる予定
 */
export default function Context() {
  return (
    <ThemeContext value='dark'>
      <Button show={true}>Sign up</Button>
    </ThemeContext>
  )
}

function Button({ show, children }: ButtonProps) {
  if (show) {
    const theme = use(ThemeContext)
    console.log({ Button: theme })
    const className = 'button-' + theme
    return <button className={className}>{children}</button>
  }
  return false
}
