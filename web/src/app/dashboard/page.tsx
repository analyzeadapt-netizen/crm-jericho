"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Briefcase, 
  Calendar, 
  Target,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";

// Dados fictícios para o "Efeito Uau"
const revenueData = [
  { name: "Jan", revenue: 4000, expenses: 2400 },
  { name: "Fev", revenue: 3000, expenses: 1398 },
  { name: "Mar", revenue: 2000, expenses: 9800 },
  { name: "Abr", revenue: 2780, expenses: 3908 },
  { name: "Mai", revenue: 1890, expenses: 4800 },
  { name: "Jun", revenue: 2390, expenses: 3800 },
  { name: "Jul", revenue: 3490, expenses: 4300 },
];

const constructionData = [
  { name: "Edifício A", progress: 85 },
  { name: "Villa B", progress: 45 },
  { name: "Condo C", progress: 60 },
  { name: "Loja D", progress: 95 },
];

const salesGoalsData = [
  { name: "Atingido", value: 65 },
  { name: "Restante", value: 35 },
];

const COLORS = ["#10b981", "#020617"];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header do Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Geral</h1>
          <p className="text-muted-foreground">Bem-vindo de volta! Aqui está o resumo da sua operação.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
          <Plus size={20} />
          Nova Venda
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Receita Mensal" 
          value="€45.231,89" 
          change="+20.1%" 
          icon={<DollarSign className="text-primary" />} 
          isPositive={true} 
        />
        <KPICard 
          title="Despesas Mensais" 
          value="€12.450,00" 
          change="-4.5%" 
          icon={<TrendingDown className="text-red-400" />} 
          isPositive={false} 
        />
        <KPICard 
          title="Obras em Curso" 
          value="12" 
          change="+2 novas" 
          icon={<Briefcase className="text-blue-400" />} 
          isPositive={true} 
        />
        <KPICard 
          title="Taxa de Conversão" 
          value="24.5%" 
          change="+3.2%" 
          icon={<TrendingUp className="text-emerald-400" />} 
          isPositive={true} 
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico Principal de Receita */}
        <div className="lg:col-span-2 premium-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Receita vs Despesas</h3>
            <Calendar size={18} className="text-muted-foreground" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff20", borderRadius: "8px" }}
                  itemStyle={{ color: "#f8fafc" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                <Area type="monotone" dataKey="expenses" stroke="#3b82f6" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Objetivos de Vendas */}
        <div className="premium-card flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-6 w-full">Objetivo de Vendas</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesGoalsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {salesGoalsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold">65%</span>
              <span className="text-xs text-muted-foreground">da meta</span>
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>Atingido</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
              <span>Restante</span>
            </div>
          </div>
        </div>

        {/* Progresso de Obras */}
        <div className="lg:col-span-3 premium-card">
          <h3 className="text-lg font-semibold mb-6">Execução de Obras (%)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {constructionData.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-primary">{item.progress}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-primary"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, icon, isPositive }: { title: string, value: string, change: string, icon: React.ReactNode, isPositive: boolean }) {
  return (
    <div className="premium-card">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <TrendingDown size={12} />}
          {change}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
