import React from 'react';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '40px' }} className="animate-fade">
      <header style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 700, background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px' }}>
          CRM JERICHO
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          A próxima geração de gestão de relacionamento com o cliente.
        </p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="premium-card">
          <h2 style={{ color: 'var(--accent-primary)', marginBottom: '12px' }}>Vendas</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Acompanhe os seus leads e feche negócios mais rapidamente com o nosso pipeline inteligente.</p>
        </div>
        
        <div className="premium-card">
          <h2 style={{ color: 'var(--accent-secondary)', marginBottom: '12px' }}>Análise</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Relatórios detalhados e insights em tempo real sobre a performance da sua equipa.</p>
        </div>

        <div className="premium-card">
          <h2 style={{ color: 'var(--success)', marginBottom: '12px' }}>Contactos</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Gestão centralizada de todos os seus clientes com histórico completo de interações.</p>
        </div>
      </section>

      <footer style={{ marginTop: '100px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>© 2026 CRM JERICHO. Built with precision.</p>
      </footer>
    </main>
  );
}
