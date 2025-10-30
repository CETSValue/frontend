'use client';

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SupplyValueChainOverview } from "@/components/supply-value-chain-overview"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

import { useUser } from "@auth0/nextjs-auth0"
import { SectionSGDImpact } from "@/components/section-sdg-impact";

const AllowedUsers: string[] = [
  'kulesha@gmail.com'
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
              <SectionCards />
              <div className="px-4 lg:px-10" style={{fontWeight:'bold', color: '#6634A2'}}>
              SGD IMPACT
              </div>
              <SectionSGDImpact />
              <div className="px-4 lg:px-10" style={{fontWeight:'bold', color: '#6634A2'}}>
              SUPPLY & VALUE CHAIN OVERVIEW
              </div>
            
              <div className="px-4 lg:px-6">
                <SupplyValueChainOverview />
              </div>
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
