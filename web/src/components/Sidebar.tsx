"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Truck, 
  Briefcase 
} from "lucide-react";

const routes = [
  {
    label: "Visão Geral",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Clientes",
    icon: Users,
    href: "/dashboard/clientes",
  },
  {
    label: "Orçamentos",
    icon: FileText,
    href: "/dashboard/orcamentos",
  },
  {
    label: "Fornecedores",
    icon: Truck,
    href: "/dashboard/fornecedores",
  },
  {
    label: "Colaboradores",
    icon: Briefcase,
    href: "/dashboard/colaboradores",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full text-white overflow-y-auto">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ${isActive ? "text-white bg-white/10" : "text-zinc-400"}`}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={`h-5 w-5 mr-3 ${isActive ? "text-emerald-400" : ""}`} />
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
