import DashboardClient from '@/component/DashboardClient'
import { getSession } from '@/lib/getSession'
import React from 'react'



export default async function page() {
  const Session = await getSession()
  return (
    <div>
     <DashboardClient ownerId={Session?.user?.id || ""} />
    </div>
  )
}


