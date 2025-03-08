'use client'

import { use, Suspense } from 'react'

type MessageProps = {
  messagePromise: Promise<string>
}

function Message({ messagePromise }: MessageProps) {
  const messageContent = use(messagePromise)
  console.log({ messagePromise })
  // Promiseが取り除からた型となる
  console.log({ messageContent })

  return <p>Here is the message: {messageContent}</p>
}

export function MessageContainer({ messagePromise }: MessageProps) {
  return (
    <Suspense fallback={<p>⌛Downloading message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  )
}
