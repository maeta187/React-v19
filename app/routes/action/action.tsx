import { useState, useTransition } from 'react'
import type { Route } from './+types/action'

// パスパラメータを受け取るためのコンポーネント
export function loader({ params }: Route.LoaderArgs) {
  return { planet: `world #${params.id}` }
}

export default function Action({ loaderData }: Route.ComponentProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  /**
   * useTransition()
   * 非同期処理トランザクションは開始同時にisPendingがtrueになる
   * トランザクションが終了するとisPendingがfalseになる
   * ボタンのdisabledやローディング表示に利用できる
   */
  const [isPending, startTransition] = useTransition()

  const updateName = async (name: string) => {
    console.log('submit')
    if (!name) {
      return 'Name is required'
    }
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return null
  }

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateName(name)
      if (error) {
        setError(error)
        return
      }
    })
  }
  return (
    <div className='pt-5'>
      <input
        className='border border-solid border-red-800 rounded'
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      <p>{error && <p>{error}</p>}</p>
    </div>
  )
}
