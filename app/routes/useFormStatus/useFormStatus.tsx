import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

async function increment(previousState: number, __: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return previousState + 1
}

/**
 * useFormStatus()
 * フォームの状態を返す
 * 以前はボタンをコンポーネントした場合は、propsで渡す必要があったが、useFormStatusを使用することで状態を取得できる
 * 但し、form内に関する情報にアクセスするので、formタグ内で使用する必要がある
 * pending：boolean型の送信状態を取得
 * data：FormData型の送信データを取得
 * method：送信メソッドを取得formタグに指定されたmethod属性の値を取得し、何にも指定されていない場合はGETを返す
 * action:fromタグのpropsであるactionに渡された関数へを取得、親コンポーネントにformが無い、actionが指定されていない場合はnullを返す
 * 注意点: formが書かれているコンポーネントや子コンポーネントでレンダリングされるformへはuseFormStatusを使用しても、なにも返さない
 */
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()
  console.log(data?.get('foo'))
  console.log({ method })
  console.log({ action })

  return (
    <button type='submit' disabled={pending}>
      {pending ? '送信中...' : '送信'}
    </button>
  )
}

export default function UseFormStatus() {
  const [state, formAction] = useActionState(increment, 0)

  return (
    <>
      <h1>useFormStatus</h1>
      <form method='post' action={formAction}>
        <input
          name='foo'
          type='number'
          defaultValue={state}
          className='border border-solid border-red-800 rounded p-1'
        />
        <p>{state}</p>
        <SubmitButton />
      </form>
    </>
  )
}
