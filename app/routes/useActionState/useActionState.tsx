import { useActionState } from 'react'

/**
 * useActionStateで実行する関数
 * 返り値に基づいてstateが更新するので必ず値を返す必要がある
 * 第1引数は初回は初期値を受け取り、以降は前回値を受け取る
 * 第２引数はフォームアクションが通常受け取れる引数を受け取る
 */
async function increment(previousState: number, formData: FormData) {
  console.log({ previousState })
  console.log(formData.get('foo'))
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return previousState + 1
}

export default function UseActionState() {
  /**
   * useActionState()
   * 値としてstate、実行する関数、トランザクションの状態を返す
   * useActionStateの第1引数には実行する関数、第2引数には初期値を渡す
   * 非同期処理トランザクションは開始同時にisPendingがtrueになる
   * トランザクションが終了するとisPendingがfalseになる
   * useActionStateを経由した関数はformActionをで実行することを想定して作っているのでonClick、onSubmitなどでは動作しない
   * new FormDataを使用すると動きはするがエラーが発生するのでformActionを使用するのがベター
   * 関数の実行が完了するとレンダリングが行われてstateがUIに反映される
   * React Server Componentsをサーポートするフレームワークで使用する場合、クライアントのJavaScriptが実行される前にフォームを操作可能にすることができる
   * Server Componentsを使用しない場合はコンポーネントのローカルStateをと同様のものとなる
   */
  const [state, formAction, isPending] = useActionState(increment, 0)

  return (
    <>
      <h1>useActionState</h1>
      <form>
        <input name='foo' type='number' defaultValue={state} />
        <p>{state}</p>
        <button formAction={formAction} disabled={isPending}>
          Increment
        </button>
      </form>
    </>
  )
}
