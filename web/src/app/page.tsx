"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Users, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Show } from "@clerk/nextjs";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-32 px-6">
        <motion.div
          className="container mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary text-sm font-medium mb-8"
          >
            <Zap size={16} />
            <span>Versão 1.0 Já Disponível</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
          >
            Venda Mais, <br />
            <span className="text-primary">Gira Menos.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            O CRM JERICO foi desenhado para equipas de alta performance que procuram simplicidade,
            velocidade e uma visão clara do seu pipeline de vendas.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 transition-all group shadow-lg shadow-primary/20"
            >
              Começar Agora Gratuitamente
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="glass px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all">
              Agendar Demo
            </button>
          </motion.div>

          {/* Abstract Preview */}
          <motion.div
            variants={itemVariants}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden aspect-video shadow-2xl">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="space-y-2">
                  <div className="h-2 w-32 bg-primary/40 rounded-full"></div>
                  <div className="h-2 w-48 bg-white/20 rounded-full"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/10"></div>
                  <div className="w-10 h-10 rounded-full bg-white/10"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-zinc-950/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 className="text-primary" />}
              title="Análise em Tempo Real"
              description="Gráficos dinâmicos que mostram exatamente onde está o seu dinheiro e para onde vai."
            />
            <FeatureCard
              icon={<Users className="text-blue-400" />}
              title="Gestão de Contactos"
              description="Organize os seus leads de forma inteligente e nunca perca um follow-up importante."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-emerald-400" />}
              title="Segurança Máxima"
              description="Os seus dados estão protegidos com encriptação de nível empresarial e autenticação Clerk."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="premium-card space-y-4">
      <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
