import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

async function page() {

  await requireAuth()
  return (
    <div>credentials page</div>
  )
}

export default page