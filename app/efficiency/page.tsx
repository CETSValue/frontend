'use client';

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import TreeExplorer from "@/components/tree-explorer";
import RadarExplorer from "@/components/radar-explorer";

import Data from "../../public/data/efficiency.json"; // adjust path if needed

import { useUser } from "@auth0/nextjs-auth0"

const AllowedUsers: string[] = [
  'kulesha@gmail.com',
  'cyril.journoux@gmail.com',
  'iryna.parfenava@gmail.com',
  'soraya.kadra@outlook.com'
]

export default function Page() {
  const { user, isLoading } = useUser();

  console.log(user)
  if (user && user.email) {
    if (AllowedUsers.indexOf(user.email) < 0 ) {
    return (
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  You are not allowed to access this page (signed in as <span className="font-bold">{user?.email ?? 'unknown user'}</span>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
    }
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <RadarExplorer data={Data} />
              </div>
              <div className="px-4 lg:px-6">
                <TreeExplorer data={Data} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
