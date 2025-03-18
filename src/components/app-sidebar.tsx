"use client";

import * as React from "react";
import Image from "next/image";
import {
  Home,
  NotebookPen,
  Calendar1Icon,
  ChartBarBig,
  ArchiveRestore,
  BotMessageSquare,
} from "lucide-react";
import Link from "next/link";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {usePathname} from'next/navigation';
// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: <Home />,
      items: [
        {
          title: "Diary",
          url: "/diary",
          isActive: false,
          icon: <NotebookPen />,
        },
        {
          title: "Tasks",
          url: "/tasks",
          isActive: false,
          icon: <Calendar1Icon />,
        },
        {
          title: "Stats",
          url: "/stats",
          isActive: false,
          icon: <ChartBarBig />,
        },
        {
          title: "Archive",
          url: "#",
          isActive: false,
          icon: <ArchiveRestore />,
        },
        {
          title: "Assistant",
          url: "#",
          isActive: false,
          icon: <BotMessageSquare />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  console.log("Route",pathname);
  data.navMain.forEach((mainItem) => {
    mainItem.items.forEach((subItem) => {
      subItem.isActive = subItem.url === pathname;
    });
  });
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/icon.svg"
                    alt="WellTrack Logo"
                    width="32"
                    height="32"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">WellTrack</span>
                  <span className="bg-blue-900 text-xs text-blue-100 p-0.5 rounded font-bold m-0.5 text-center font-mono">
                    .Alpha
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.icon}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={subItem.isActive}
                        >
                          <Link href={subItem.url}>
                            {subItem.icon}
                            {subItem.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

