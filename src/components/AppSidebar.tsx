"use client";

import {
  Workflow,
  Home,
  Settings,
  Users,
  FileText,
  BarChart,
  Key,
  HistoryIcon,
  Star,
  LogOut,
  CardSim,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useCheckActiveSubscription } from "@/features/subscription/hooks/useSubscription";

function AppSidebar() {
  const router = useRouter();
  const pathName = usePathname();
  const {isHavingSubscription, isLoading} = useCheckActiveSubscription()

  const sidebarItems = [
    {
      title: "Main",
      items: [
        { title: "Workflows", icon: Workflow, url: "/workflows" },
        { title: "Credentials", icon: Key, url: "/credentials" },
        { title: "Executions", icon: HistoryIcon, url: "/executions" },
      ],
    },
  ];



  async function logout(){
    await authClient.signOut({}, {
        onSuccess(){
            router.push("/login")
            toast.success("Logged out")
        },
        onError(err){
            toast.error(err.error.message || "Somethibng went wrong")
        }
    })
  }



  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        {sidebarItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="py-5"
                      isActive={pathName == item.url}
                      asChild
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
           {
            (!isHavingSubscription && !isLoading) && (
                       <SidebarMenuItem>
            <SidebarMenuButton onClick={() => authClient.checkout({slug:"Renkei-Pro"})} className="py-5" tooltip={"Billing Portal"}>
              <Star className="h-4 w-4" />
              <span>Upgrade to Pro</span>
            </SidebarMenuButton>           
           
          </SidebarMenuItem>
            )
           }
        </SidebarMenu>{" "}
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton onClick={() => authClient.customer.portal()} className="py-5" tooltip={"Billing Portal"}>
              <CardSim className="h-4 w-4" />
              <span>Billing Portal</span>
            </SidebarMenuButton>
            <SidebarMenuButton className="py-5">
              <Settings className="h-4 w-4" />
              <span>Account Settings</span>
            </SidebarMenuButton>
            <SidebarMenuButton onClick={logout} className="py-5" tooltip={"Billing Portal"}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
