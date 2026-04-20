import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:top-16 md:bottom-0 z-40 bg-[#020617] border-r border-white/10">
        <Sidebar />
      </div>
      <main className="md:pl-72 h-full">
        {children}
      </main>
    </div>
  );
}
