import AppHeader from '@/components/AppHeader'
import AppSidebar from '@/components/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

function layout({children} : {children : React.ReactNode}) {
  return (
    <>
     <nav>
        <AppHeader/>
     </nav>
    <main>
        {children}
    </main>
    </>
 
  )
}

export default layout