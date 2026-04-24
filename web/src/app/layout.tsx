import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CRM JERICHO | Gestão de Vendas Premium",
  description: "O CRM moderno para empresas que procuram excelência e simplicidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className={`${outfit.variable} dark`}>
      <body className="font-sans antialiased">
        <ClerkProvider>
          <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white">J</div>
                <span className="text-xl font-bold tracking-tight">JERICHO</span>
              </div>
              <nav className="flex items-center gap-4">
                <Show when="signed-out">
                  <SignInButton mode="modal"><button className="text-sm font-medium hover:text-primary transition-colors">Entrar</button></SignInButton>
                  <SignUpButton mode="modal"><button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">Começar Agora</button></SignUpButton>
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </nav>
            </div>
          </header>
          <main className="min-h-screen pt-16">
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
