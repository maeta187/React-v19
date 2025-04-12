import { useState } from 'react'

/**
 * refのクリーンアップ
 * React19以降、refコールバックからクリーンアップ関数を返すことがサポートされるようになった
 * コンポーネントがアンマウントされるときにクリーンアップ関数が呼び出される
 * DOMへのref、クラスコンポーネントへのref、useImperativeHandleで作成したrefのいずれでも使用できる
 * 以前はrefに渡された関数の引数にnullを使用して実行していたが、クリーンアップを返す場合はこのステップをスキップできる
 * 将来的にコンポーネントがアンマウント時にrefがnull引数を受け取ることは非推奨になる予定
 */
export default function RefCleanup() {
  const [show, setShow] = useState(true)

  return (
    <div>
      <h1>Ref Cleanup</h1>
      <button onClick={() => setShow(!show)}>Toggle Input</button>

      {show && (
        <input
          ref={(element) => {
            if (element) {
              // ✅ 要素がDOMに追加されたとき
              console.log('Input mounted:', element)
              element.focus()

              // イベントリスナーを追加
              const handleKeyDown = (e: KeyboardEvent) => {
                console.log('Key pressed:', e.key)
              }
              element.addEventListener('keydown', handleKeyDown)

              // ✅ クリーンアップ関数を返す
              return () => {
                // 要素がDOMから削除されるとき
                console.log('Input unmounted')
                element.removeEventListener('keydown', handleKeyDown)
              }
            }
          }}
          placeholder='Type here...'
        />
      )}
    </div>
  )
}
