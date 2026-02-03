import React, { useState } from 'react';
import { 
  ShieldCheck, Zap, CheckCircle2, Gem,
  Download, ChevronDown, ChevronUp, Lock, 
  Instagram, Facebook, PlayCircle, UserCircle,
  AlertTriangle, ArrowRight, LayoutDashboard, MonitorPlay, ExternalLink,
  KeyRound, LogIn, ArrowLeft
} from 'lucide-react';

// --- COMPONENTE: TELA DE LOGIN (ÁREA DO CLIENTE) ---
const LoginScreen = ({ onBack, logoLoadError, setLogoLoadError }) => {
  const [accessCode, setAccessCode] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Tentativa de acesso com a chave: ${accessCode}\n(Aqui entraria a validação do backend)`);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[120px] rounded-full opacity-40 pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 animate-fade-in">
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Voltar
        </button>

        <div className="text-center mb-10 mt-12 flex flex-col items-center">
          {/* LOGO NA TELA DE LOGIN (Usa a mesma lógica da home) */}
          <div className="mb-4">
            {!logoLoadError ? (
              <img 
                src="/logo-lexops.jpg" 
                alt="LexOps Insight" 
                onError={() => setLogoLoadError(true)}
                className="h-16 w-auto rounded-xl shadow-lg shadow-violet-500/20 object-cover"
              />
            ) : (
              <div className="p-3 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-500/20">
                <ShieldCheck size={32} className="text-white" />
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Área do Cliente</h2>
          <p className="text-slate-400 text-sm">Insira sua chave de acesso única.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2 ml-1">Chave de Acesso (Token)</label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="password" 
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Ex: LEX-8829-XP"
                className="w-full bg-[#0B1121] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-mono"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-900/20 transition-all flex items-center justify-center gap-2 group"
          >
            ACESSAR SISTEMA
            <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (LANDING PAGE) ---
const LexOpsInsightFinal = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentView, setCurrentView] = useState('landing');
  // NOVO ESTADO: Controla se a imagem da logo falhou
  const [logoLoadError, setLogoLoadError] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    { 
      question: 'Sou do RH / Financeiro / Logística. Posso usar?', 
      answer: "O LexOps não lê 'Leis', ele lê Lógica. Se a sua planilha tem colunas como 'Responsável', 'Valor', 'Status' ou 'Data', o sistema funciona. A inteligência é agnóstica: onde se lê 'Processo', leia-se 'Chamado' ou 'Pedido'. Você define a legenda." 
    },
    { 
      question: 'Meu Excel é uma bagunça exportada do sistema. Vai quebrar?', 
      answer: "O LexOps foi treinado no caos. Ele ignora células mescladas vazias, cabeçalhos duplos e formatações quebradas. Se houver dados, ele vai ler. Não precisamos que sua planilha seja bonita, apenas que ela exista." 
    },
    { 
      question: 'Preciso instalar algo no servidor da empresa?', 
      answer: "Absolutamente não. Se precisasse, custaria 50 mil reais. É um arquivo HTML inteligente. Você baixa, abre no seu navegador (Chrome/Edge) e arrasta a planilha. Tudo roda na memória do seu computador. Segurança total, nada sobe para nuvem." 
    },
    { 
      question: 'Tenho limite de clientes ou processos?', 
      answer: "Não. Enquanto sua assinatura estiver ativa, o processamento é ilimitado. Pode fazer dashboards para 1 cliente ou para 500. Pode processar 10 linhas ou 1 milhão. O limite é o seu hardware." 
    }
  ];

  // Se for para o login, passa o estado da logo junto
  if (currentView === 'login') {
    return <LoginScreen onBack={() => setCurrentView('landing')} logoLoadError={logoLoadError} setLogoLoadError={setLogoLoadError} />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-violet-500/30">
      
      {/* NAVBAR PREMIUM (CORRIGIDA) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          
          {/* LOGO AREA - Lógica de Fallback Inteligente */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
            
            {/* SE NÃO DEU ERRO, TENTA MOSTRAR A IMAGEM */}
            {!logoLoadError ? (
              <img 
                src="/logo-lexops.jpg" 
                alt="LexOps Insight" 
                // Se der erro ao carregar, avisa o estado
                onError={() => setLogoLoadError(true)}
                className="h-10 w-auto rounded-lg shadow-lg shadow-violet-500/20 object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              // SE DEU ERRO, MOSTRA O ÍCONE DE ESCUDO NO LUGAR
              <div className="p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
                <ShieldCheck size={24} className="text-white" />
              </div>
            )}
            
            {/* Nome da empresa */}
            <span className="font-bold text-white text-xl tracking-tight hidden sm:block">
              LexOps<span className="text-violet-500">Insight</span>
            </span>
          </div>

          {/* BOTÃO LOGIN */}
          <button 
            onClick={() => setCurrentView('login')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 hover:border-violet-500/50 transition-all text-sm font-medium text-slate-400 hover:text-white group"
          >
            <UserCircle size={18} className="group-hover:text-violet-400 transition-colors" />
            <span className="hidden sm:inline">Área do Cliente</span>
            <span className="sm:hidden">Entrar</span>
          </button>
        </div>
      </nav>

      {/* HEADER / HERO SECTION */}
      <header className="relative pt-32 pb-32 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/30 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider mb-8 animate-pulse-slow">
            <Zap size={14} className="fill-current" /> Nova Era da Advocacia
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight drop-shadow-2xl">
            Excel é o seu Banco de Dados. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Não o seu Palco.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Sua planilha esconde as respostas que o seu cliente exige.
            Enquanto você perde horas limpando linhas, seu concorrente já decidiu.
            Transforme dados brutos em <span className="text-white font-bold">Autoridade Visual</span> agora.
          </p>

          {/* BOTÕES DE AÇÃO PRINCIPAIS */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 w-full max-w-2xl">
            <a href="https://chk.eduzz.com/39ZQXX2B9E" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl text-lg shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)] transition-all hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto">
              COMEÇAR POR R$ 6,50/DIA
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://chk.eduzz.com/KW8KPPER01" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-transparent border border-slate-700 hover:border-violet-500/50 text-slate-300 hover:text-white font-bold rounded-xl text-lg transition-all flex items-center justify-center w-full sm:w-auto">
              QUERO ECONOMIA ANUAL
            </a>
          </div>

          {/* BOTÃO DA DEMO HTML (LINK PARA O ARQUIVO NA PASTA PUBLIC) */}
          <a href="/demo.html" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50 transition-all text-slate-300 hover:text-white backdrop-blur-sm cursor-pointer mb-6">
            <div className="p-2 bg-emerald-600 rounded-full group-hover:scale-110 transition-transform shadow-lg shadow-emerald-900/50">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <span className="font-semibold tracking-wide">Testar Dashboard Interativo (Clique Aqui)</span>
            <ExternalLink size={14} className="opacity-50 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            Processamento Seguro via Eduzz • Risco Zero por 7 Dias
          </p>
        </div>
      </header>

      {/* VIDEO SHOWCASE SECTION (VÍDEO LOCAL) */}
      <section className="px-6 -mt-20 relative z-20 mb-24 pt-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl relative group overflow-hidden ring-1 ring-white/5">
            
            {/* Título do Vídeo Overlay */}
            <div className="absolute top-6 left-0 right-0 text-center z-10 pointer-events-none">
              <span className="bg-black/60 text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur-md border border-white/10 shadow-xl">
                De "entregador de planilha" a Consultor Premium em segundos
              </span>
            </div>

            {/* VÍDEO LOCAL */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden relative shadow-inner group-hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-shadow duration-500">
               <video 
                 className="w-full h-full object-cover"
                 controls 
                 autoPlay 
                 muted 
                 loop 
                 playsInline
               >
                 {/* O ARQUIVO demo.mp4 DEVE ESTAR NA PASTA PUBLIC */}
                 <source src="/demo.mp4" type="video/mp4" />
                 Seu navegador não suporta a tag de vídeo.
               </video>
               
               {/* Overlay Brilho */}
               <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          </div>
          <p className="text-center text-slate-500 mt-6 text-sm max-w-2xl mx-auto flex items-center justify-center gap-2">
            <MonitorPlay size={16} />
            Não é mágica, é lógica. O tempo que você gastaria montando isso no PowerBI pagaria 10 anos de assinatura.
          </p>
        </div>
      </section>

      {/* A DOR DA CEGUEIRA (GATILHO TRABALHISTA) */}
      <section className="py-20 px-6 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-rose-500 font-bold mb-6 bg-rose-500/10 px-4 py-2 rounded-full border border-rose-500/20">
            <AlertTriangle size={18} /> GATILHO DE CEGUEIRA
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
            Sua planilha diz quanto vale.<br />
            O LexOps diz o que fazer.
          </h2>
          
          <div className="bg-[#0B1121] p-8 rounded-2xl border border-rose-500/20 shadow-2xl text-left max-w-3xl mx-auto mb-8 relative overflow-hidden group hover:border-rose-500/40 transition-colors">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-shadow"></div>
            <p className="text-xl text-slate-300 leading-relaxed">
              <span className="text-white font-bold block mb-4 text-2xl">Faça o teste agora:</span>
              Seu cliente sabe exatamente <span className="text-rose-400 font-semibold">quanto cada filial gera de passivo trabalhista?</span> 
              Quais são os maiores pedidos por unidade? 
              <br /><br />
              Já imaginou criar um gráfico com esses dados cruzados em segundos, sem tocar numa tabela dinâmica?
              <br /><br />
              No Excel, isso leva horas e gera dúvida. Com LexOps, isso é padrão. Você entrega a resposta, não a tabela.
            </p>
          </div>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Nós não validamos se o estagiário digitou certo. Nós garantimos que, se o dado existe, ele será visto e entendido.
          </p>
        </div>
      </section>

      {/* SOLUÇÃO - BENTO GRID */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Refino Lógico. Sem IA. Sem Alucinação.</h2>
            <p className="text-slate-400">Algoritmos determinísticos que limpam a sujeira e entregam a verdade.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Grande */}
            <div className="md:col-span-2 bg-slate-900/50 p-8 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-colors group">
              <LayoutDashboard className="text-violet-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2">Motor de Refino Jurídico</h3>
              <p className="text-slate-400">
                O sistema varre suas colunas, identifica a estrutura lógica (Autor, Réu, Valor, Vara), limpa a poluição visual e entrega a verdade matemática do processo. Não inventamos dados. Revelamos eles.
              </p>
            </div>

            {/* Card Vertical */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-colors group">
              <Lock className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">White-Label Total</h3>
              <p className="text-slate-400">
                O painel carrega a SUA logo, as SUAS cores. O cliente vai achar que você investiu R$ 50k em tecnologia própria.
              </p>
            </div>

            {/* Card Horizontal */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-colors group">
              <Download className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">Agnóstico a Sistemas</h3>
              <p className="text-slate-400">
                Astrea? CPJ? Protheus? Se tem linhas e colunas, nós lemos. O Excel é o suporte universal; nós somos o refino final.
              </p>
            </div>

            {/* Card Horizontal */}
            <div className="md:col-span-2 bg-slate-900/50 p-8 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-colors group">
              <Zap className="text-amber-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">Fábrica Ilimitada</h3>
              <p className="text-slate-400">
                Enquanto sua assinatura está ativa, processe dashboards para 1, 10 ou 500 clientes. Se cancelar, a fábrica para, mas os arquivos que você já baixou são seus para sempre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: DEMO INTERATIVA (HTML DA PASTA PUBLIC) */}
      <section className="py-24 px-6 bg-violet-900/10 border-y border-violet-500/20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm font-bold mb-6">
            <MonitorPlay size={16} /> TEST DRIVE
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Veja uma decisão acontecendo
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto">
            Explore o dashboard interativo real. Clique nos gráficos, filtre por datas e veja a velocidade.
            Sem cadastro necessário.
          </p>
          
          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            {/* LINK PARA O ARQUIVO HTML */}
            <a href="/demo.html" target="_blank" rel="noopener noreferrer" className="relative px-8 py-4 bg-slate-900 ring-1 ring-white/10 rounded-xl leading-none flex items-center divide-x divide-slate-700 cursor-pointer">
              <span className="flex items-center space-x-5">
                <span className="pr-6 text-slate-100 font-bold">Abrir Simulador em Tela Cheia</span>
              </span>
              <span className="pl-6 text-violet-400 group-hover:text-violet-300 transition duration-200">
                Acessar &rarr;
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS - A NOVA ELITE */}
      <section className="py-24 px-6 bg-[#050A15]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-16">Quem parou de operar e começou a decidir</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Depoimento Trabalhista */}
            <div className="bg-slate-900/40 p-8 rounded-2xl border border-white/5 relative hover:border-violet-500/20 transition-colors">
              <div className="absolute -top-4 -left-4 bg-violet-600 rounded-full p-2">
                <CheckCircle2 size={20} className="text-white" />
              </div>
              <p className="text-slate-300 italic mb-6">
                "O Diretor de RH não sabia qual filial dava mais prejuízo. Joguei a planilha no LexOps e o gráfico de 'Passivo por Filial' apareceu na hora. Ele descobriu que 40% do prejuízo vinha de uma única unidade. Virei consultor fixo nessa reunião."
              </p>
              <div>
                <p className="text-white font-bold">Dr. Ricardo M.</p>
                <p className="text-slate-500 text-sm">Especialista em Direito do Trabalho</p>
              </div>
            </div>

            {/* Depoimento Financeiro */}
            <div className="bg-slate-900/40 p-8 rounded-2xl border border-white/5 relative hover:border-violet-500/20 transition-colors">
              <p className="text-slate-300 italic mb-6">
                "O Jurídico sempre me mandava dados que não batiam com o contábil. Joguei a planilha deles no LexOps e o 'Deduplicador' achou 400 mil reais de erro em duplicidade. O sistema se pagou em 30 segundos."
              </p>
              <div>
                <p className="text-white font-bold">Roberto S.</p>
                <p className="text-slate-500 text-sm">Controller Industrial</p>
              </div>
            </div>

             {/* Depoimento Boutique */}
             <div className="bg-slate-900/40 p-8 rounded-2xl border border-white/5 relative hover:border-violet-500/20 transition-colors">
              <p className="text-slate-300 italic mb-6">
                "Meus clientes são acostumados com o 'padrão Faria Lima'. Eu mandava relatórios em PDF que ninguém lia. Na primeira reunião com o LexOps, projetei o painel na TV e a renovação do contrato nem foi discutida."
              </p>
              <div>
                <p className="text-white font-bold">Dra. Manuela C.</p>
                <p className="text-slate-500 text-sm">Sócia de Boutique Empresarial</p>
              </div>
            </div>

             {/* Depoimento Advogado Junior */}
             <div className="bg-slate-900/40 p-8 rounded-2xl border border-white/5 relative hover:border-violet-500/20 transition-colors">
              <p className="text-slate-300 italic mb-6">
                "Eu perdia 2 dias montando o relatório mensal. Com o LexOps, fiz em 10 minutos. Fui elogiado pela 'visão estratégica' pela primeira vez."
              </p>
              <div>
                <p className="text-white font-bold">Felipe A.</p>
                <p className="text-slate-500 text-sm">Advogado Sênior</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING AGRESSIVO */}
      <section id="pricing" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Quanto custa a sua hora técnica?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Se você gasta mais de 15 minutos por mês "arrumando" planilha, você já está pagando pelo LexOps (e pagando caro), mas continua usando Excel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            
            {/* PLANO MENSAL */}
            <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/30 hover:bg-slate-900/50 transition-all text-center group">
              <h3 className="text-xl font-bold text-slate-300 mb-2">Mensal</h3>
              <div className="text-4xl font-black text-white mb-2">R$ 197<span className="text-lg font-normal text-slate-500">/mês</span></div>
              <p className="text-slate-500 text-sm mb-6">Menos que 15 min da sua hora</p>
              
              <ul className="text-left space-y-4 mb-8 text-slate-300">
                <li className="flex gap-3"><CheckCircle2 size={18} className="text-violet-500 shrink-0" /> Acesso Imediato</li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="text-violet-500 shrink-0" /> Exportações Ilimitadas</li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="text-violet-500 shrink-0" /> Cancele quando quiser</li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="text-violet-500 shrink-0" /> Atualizações e melhorias inclusas</li>
              </ul>

              {/* LINK DA EDUZZ AQUI - PLANO MENSAL */}
              <a href="https://chk.eduzz.com/39ZQXX2B9E" target="_blank" rel="noopener noreferrer" className="block w-full py-4 rounded-xl border border-violet-500 text-violet-400 font-bold hover:bg-violet-500 hover:text-white transition-all">
                ASSINAR MENSAL
              </a>
            </div>

            {/* PLANO ANUAL (DESTAQUE) */}
            <div className="relative p-8 rounded-3xl border border-violet-500 bg-[#0F0821] shadow-[0_0_50px_-10px_rgba(124,58,237,0.3)] transform md:scale-105">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                Economia Inteligente
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Anual</h3>
                <div className="text-5xl font-black text-white mb-2">R$ 2.127<span className="text-lg font-normal text-slate-500">,60</span></div>
                <p className="text-emerald-400 font-bold text-sm mb-1">Equivale a R$ 5,80 por dia</p>
                <p className="text-slate-500 text-xs mb-6">Mais barato que estacionamento</p>
              </div>

              <ul className="text-left space-y-4 mb-8 text-slate-200">
                <li className="flex gap-3"><Gem size={18} className="text-emerald-400 shrink-0" /> <strong>Tudo do plano mensal</strong></li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Pagamento Único (Desconto Real)</li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> 4 Planilhas Otimizadas de Brinde</li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Atualizações e melhorias inclusas</li>
              </ul>

              {/* LINK DA EDUZZ AQUI - PLANO ANUAL */}
              <a href="https://chk.eduzz.com/KW8KPPER01" target="_blank" rel="noopener noreferrer" className="block w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold hover:shadow-lg hover:scale-[1.02] transition-all text-center shadow-lg shadow-violet-900/50">
                GARANTIR PLANO ANUAL
              </a>
              <p className="text-center text-slate-500 text-xs mt-4">Parcelamento disponível no cartão</p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Manual Rápido (FAQ)</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-white/10 rounded-xl bg-slate-900/80 overflow-hidden">
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-slate-200">{faq.question}</span>
                  {openFAQ === index ? <ChevronUp className="text-violet-500" /> : <ChevronDown className="text-slate-500" />}
                </button>
                {openFAQ === index && (
                  <div className="p-6 pt-0 text-slate-400 border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL & FOOTER */}
      <footer className="py-20 px-6 border-t border-white/10 text-center bg-[#020617]">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-black text-white mb-6">A primeira decisão inteligente começa agora.</h2>
          <p className="text-xl text-slate-400 mb-8">Pare de justificar números no quadro branco. Comece a conduzir o show.</p>
          <a href="#pricing" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-slate-900 hover:bg-slate-200 font-bold rounded-xl text-xl transition-all shadow-xl shadow-white/10">
            QUERO MEU ACESSO AGORA <ArrowRight size={20} />
          </a>
        </div>

        {/* REDES SOCIAIS ATUALIZADAS */}
        <div className="flex justify-center gap-6 mb-10">
          <a 
            href="https://www.instagram.com/lexopsinsight?igsh=NHBzYXFmNmt3eDdz&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 bg-slate-800 rounded-full hover:bg-pink-600 hover:text-white transition-all text-slate-400"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="https://www.facebook.com/people/LexOps-Insight/61587114226502/?mibextid=wwXIfr&rdid=otH2ioRmhScr20N8&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17SBy4ptti%2F%3Fmibextid%3DwwXIfr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all text-slate-400"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
        </div>
        
        <p className="text-slate-600 text-sm">
          © 2026 LexOpsInsight. Todos os direitos reservados. <br />
          Feito para a Elite Jurídica.
        </p>
      </footer>
    </div>
  );
};

export default LexOpsInsightFinal;