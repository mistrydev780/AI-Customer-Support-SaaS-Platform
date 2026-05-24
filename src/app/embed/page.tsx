import EmbedClient from '@/component/EmbedClient'
import { getSession } from '@/lib/getSession'
import React from 'react'

async function page() {
    const Session = await getSession()

  return (
    <>
        <EmbedClient ownerId={Session?.user?.id || ""}/>
    </>
  )
}

export default page
