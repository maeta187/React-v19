import { useOptimistic } from 'react'
import { useState } from 'react'

type Props = {
  currentName: string
  onUpdateName: (name: string) => void
}

/**
 * useOptimistic()
 * 何らかの非同期アクションが進行中の間だけ、異なる値を表示するためのフック
 * 第1引数: state
 * 第2引数: 更新関数こちらはなくても問題ないが、使用する場合は currentState と optimisticValue の2つの引数を受け取る
 * 戻り値　optimisticName: 初期は引数に渡された値を返し、何らかのアクションが実行された時は更新関数の返り値を返す
 * 戻り値　setOptimisticName: 更新関数
 * サーバーの更新結果を待たずに入力内容を表示や入力内容をもとにしたUIを表示する時に有効
 * 例 : 〇〇送信中... →　〇〇
 */
function UpdateName({ currentName, onUpdateName }: Props) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName)

  const updateName = async (name: string) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return name
  }

  /**
   * 処理の流れ
   * setOptimisticName() が実行されると引数から渡された値を optimisticName が受け取り、再レンダリングされる
   * updateName() のが終了すると親コンポーネントの updateName(useState) が更新され、再レンダリングされる
   * そして再び更新されたcurrentName(name)を useOptimistic() が受け取り、optimisticName が更新され、更新されたnameを表示する
   */
  const submitAction = async (formData: FormData) => {
    const newName = formData.get('name')
    if (typeof newName === 'string') {
      // updateNameが終了するまでの間、newNameを表示する
      setOptimisticName(`newName: ${newName}`)
      const updatedName = await updateName(newName)
      onUpdateName(updatedName)
    }
  }

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change Name:</label>
        <input
          type='text'
          name='name'
          disabled={currentName !== optimisticName}
          className='border border-solid border-red-800 rounded p-1'
        />
      </p>
      <button type='submit'>Update</button>
    </form>
  )
}

export default function UseOptimistic() {
  const [name, setName] = useState('John')

  return (
    <>
      <h1>useOptimistic</h1>
      <UpdateName currentName={name} onUpdateName={setName} />
    </>
  )
}
