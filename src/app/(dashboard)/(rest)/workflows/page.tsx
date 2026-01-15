import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

async function page() {

  await requireAuth()
  return (
    <div>worlflowss page</div>
  )
}

export default page