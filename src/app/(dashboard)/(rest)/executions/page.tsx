import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

async function page() {

  await requireAuth()
  return (
    <div>execution page</div>
  )
}

export default page