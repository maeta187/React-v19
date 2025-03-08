import { createContext, use, useContext, useState } from 'react'
import { MessageContainer } from './messageContainer'

function fetchMessage(): Promise<string> {
  return new Promise((resolve) => setTimeout(resolve, 3000, '⚛️'))
}

type Theme = 'light' | 'dark'
const ThemeContext = createContext<Theme>('light')

export default function Use() {
  return (
    <ThemeContext.Provider value='dark'>
      <Form />
      <UsePromise />
    </ThemeContext.Provider>
  )
}

function Form() {
  return (
    <Panel title='Welcome'>
      <Button show={true}>Sign up</Button>
      <Button show={false}>Log in</Button>
    </Panel>
  )
}

/**
 * 処理の流れ
 * 1. ダウンロードボタンをクリックすると、download() が呼ばれる
 * 2. fetchMessage() が呼ばれ、Promise<string> が返される
 * 3. setMessagePromise() で messagePromise に Promise<string> がセットされる
 * 4. setShow() で show が true になる
 * 5. MessageContainer がレンダリングされる
 * 6. MessageContainer がレンダリングされると、messagePromise が解決されるまで、Suspense が表示される
 * 7. messagePromise が解決されると、Message がレンダリングされる
 * 8. Message がレンダリングされると、messageContent が取得される
 * 9. messageContent が取得されると、'Here is the message: ⚛️' が表示される
 */
function UsePromise() {
  const [messagePromise, setMessagePromise] = useState<Promise<string> | null>(
    null
  )
  const [show, setShow] = useState(false)

  function download() {
    setMessagePromise(fetchMessage())
    setShow(true)
  }

  if (show && messagePromise) {
    return <MessageContainer messagePromise={messagePromise} />
  } else {
    return <button onClick={download}>Download message</button>
  }
}

type PanelProps = {
  title: string
  children: React.ReactNode
}

type ButtonProps = {
  show: boolean
  children: React.ReactNode
}

function Panel({ title, children }: PanelProps) {
  // v19以前のコンテキストの参照方法
  const theme = useContext(ThemeContext)
  console.log({ Panel: theme })
  const className = 'panel-' + theme
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

/**
 * use()
 * use() を使用してコンテキストやプロミスを参照する
 * コンテキストの場合はコンテキストの値を参照し、プロミスの場合はPromiseの結果を参照する（型としてはPromiseが取り除かれている）
 * useContext() と同じように使えるが、ifやループ内で使える
 * 但し use() はコンポーネントまたは、フック内でのみ使用可能
 * useを使わずにサーバーコンポーネントでawaitを使用してプロミスを解決する方法もあるが、それだとawait文が終了するまでコンポーネントがレンダリングされない
 * なのでサーバーコンポーネントからクライアントコンポーネントにプロミスを渡すことでレンダーブロックを回避できる
 */
function Button({ show, children }: ButtonProps) {
  if (show) {
    const theme = use(ThemeContext)
    console.log({ Button: theme })
    const className = 'button-' + theme
    return <button className={className}>{children}</button>
  }
  return false
}
