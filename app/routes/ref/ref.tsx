import { useRef } from 'react'

type InputProps = {
  placeholder: string
  ref: React.RefObject<HTMLInputElement | null>
}

/**
 * ref
 * React19以降親コンポーネントからrefをpropsで渡せるようになった
 * これにより、親コンポーネントから子コンポーネントのDOM要素にアクセスできるようになった
 * 型定義はReact.RefObjectし、<>の中でHTML要素の型と初期値を指定する
 * 今まで方法だと forwardRef という関数を使っていたが、将来のバージョンで非推奨になる予定
 */
function Input({ placeholder, ref }: InputProps) {
  return (
    <div>
      <input ref={ref} placeholder={placeholder} />
    </div>
  )
}

export default function Ref() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    console.log(inputRef.current)
    inputRef.current?.focus()
  }

  return (
    <div>
      <h1>useRef</h1>
      <Input placeholder='Type here' ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  )
}
