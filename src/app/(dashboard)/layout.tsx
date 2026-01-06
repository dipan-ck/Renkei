import AppSidebar from '@/components/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

function layout({children} : {children : React.ReactNode}) {
  return (
     <SidebarProvider>
        <AppSidebar/>
        <SidebarInset className='bg-accent'>
            {children}
        </SidebarInset>
     </SidebarProvider>
  )
}

export default layout