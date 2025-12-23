import React, { useState, useEffect } from 'react';
import { User, ViewState, PurposeDay } from './types';
import { PURPOSE_DAYS, INITIAL_GREETINGS, PRAYERS_30_DAYS } from './constants';
import { AudioPlayer } from './components/AudioPlayer';
import { getDailyMessage } from './services/geminiService';
import { 
  Heart, 
  BookOpen, 
  Wind, 
  ChevronLeft, 
  Lock, 
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Calendar
} from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LOGIN');
  const [user, setUser] = useState<User | null>(null);
  const [dailyMessage, setDailyMessage] = useState<string>("Carregando mensagem de paz...");
  const [selectedDay, setSelectedDay] = useState<PurposeDay | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // --- Login Handlers ---
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    
    if (name && email) {
      setUser({ name, email });
      setView('HOME');
      fetchDailyMessage();
    }
  };

  // --- Gemini Integration ---
  const fetchDailyMessage = async () => {
    const msg = await getDailyMessage();
    setDailyMessage(msg);
  };

  // --- Navigation Helpers ---
  const goBack = () => {
    if (view === 'PURPOSE_DETAIL') setView('PURPOSE_LIST');
    else setView('HOME');
  };

  const handleDaySelect = (day: PurposeDay) => {
    setSelectedDay(day);
    setView('PURPOSE_DETAIL');
  };

  // --- Render Sections ---

  // 1. LOGIN VIEW
  if (view === 'LOGIN') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sand-200/50 rounded-full blur-[100px] z-0" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[80px] z-0" />

        <div className="glass-card w-full max-w-md p-8 rounded-3xl z-10 animate-fade-in-up">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl text-sand-800 mb-2">Aliança Restaurada</h1>
            <p className="text-sand-600 font-light text-sm">Um lugar de paz para o seu coração.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-sand-700 uppercase tracking-wider mb-2">Seu Nome</label>
              <input 
                name="name" 
                type="text" 
                required
                className="w-full p-4 rounded-xl glass-input text-sand-900 focus:outline-none focus:ring-2 focus:ring-sand-400 placeholder-sand-400/70"
                placeholder="Como você gostaria de ser chamada?"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-sand-700 uppercase tracking-wider mb-2">E-mail de Acesso</label>
              <input 
                name="email" 
                type="email" 
                required
                className="w-full p-4 rounded-xl glass-input text-sand-900 focus:outline-none focus:ring-2 focus:ring-sand-400 placeholder-sand-400/70"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-sand-700 uppercase tracking-wider mb-2">Senha Padrão</label>
              <div className="relative">
                <input 
                  name="password" 
                  type="password" 
                  className="w-full p-4 rounded-xl glass-input text-sand-900 focus:outline-none focus:ring-2 focus:ring-sand-400 placeholder-sand-400/70"
                  placeholder="••••••••"
                />
                <Lock className="absolute right-4 top-4 text-sand-400" size={20} />
              </div>
              <p className="text-[10px] text-sand-500 mt-2 text-center leading-relaxed">
                A senha é padrão e o e-mail deve ser o mesmo utilizado na compra.<br/>
                Este acesso é pessoal e não deve ser compartilhado.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-sand-700 text-white font-serif py-4 rounded-xl shadow-lg hover:bg-sand-800 transition-all transform active:scale-95 text-lg"
            >
              Entrar no Propósito
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN APP LAYOUT ---
  return (
    <div className="min-h-screen relative bg-sand-50 text-sand-900 font-sans pb-24">
       {/* Background */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-amber-50/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[90vw] h-[90vw] bg-sand-100/80 rounded-full blur-[100px]" />
       </div>

       {/* Header */}
       <header className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex justify-between items-center shadow-sm">
          {view === 'HOME' ? (
             <h2 className="font-serif text-xl text-sand-800">Aliança Restaurada</h2>
          ) : (
            <button onClick={goBack} className="p-2 -ml-2 text-sand-700 hover:text-sand-900">
              <ChevronLeft size={24} />
            </button>
          )}
          
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-sand-700">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
       </header>

       {/* Menu Overlay */}
       {menuOpen && (
         <div className="fixed inset-0 z-40 bg-sand-900/10 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
           <div className="absolute top-16 right-4 w-64 glass-card rounded-2xl p-4 flex flex-col space-y-2 shadow-2xl animate-fade-in-down" onClick={(e) => e.stopPropagation()}>
             <button onClick={() => { setView('HOME'); setMenuOpen(false); }} className="text-left px-4 py-3 rounded-xl hover:bg-sand-100 transition-colors font-serif">Início</button>
             <button onClick={() => { setView('PURPOSE_LIST'); setMenuOpen(false); }} className="text-left px-4 py-3 rounded-xl hover:bg-sand-100 transition-colors font-serif">Propósito 7 Dias</button>
             <button onClick={() => { setView('PRAYER_30'); setMenuOpen(false); }} className="text-left px-4 py-3 rounded-xl hover:bg-sand-100 transition-colors font-serif">30 Dias de Oração</button>
             <div className="h-px bg-sand-200 my-2"></div>
             <button onClick={() => window.location.reload()} className="text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-50 transition-colors text-sm">Sair</button>
           </div>
         </div>
       )}

       {/* Scrollable Content */}
       <main className="pt-24 px-6 relative z-10 max-w-2xl mx-auto min-h-[85vh]">
         
         {/* --- HOME VIEW --- */}
         {view === 'HOME' && user && (
           <div className="space-y-8 animate-fade-in">
             {/* Welcome */}
             <div className="space-y-1">
               <p className="text-sand-500 text-sm font-medium tracking-wide">
                 {INITIAL_GREETINGS[Math.floor(Math.random() * INITIAL_GREETINGS.length)]}
               </p>
               <h1 className="font-serif text-3xl text-sand-800">{user.name.split(' ')[0]}.</h1>
             </div>

             {/* Daily Message */}
             <div className="glass-card p-6 rounded-2xl border-l-4 border-sand-400">
                <div className="flex items-start space-x-3">
                  <Wind className="text-sand-400 shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-xs font-bold text-sand-500 uppercase tracking-widest mb-2">Mensagem do Dia</h3>
                    <p className="font-serif text-lg text-sand-800 italic leading-relaxed">
                      "{dailyMessage}"
                    </p>
                  </div>
                </div>
             </div>

             {/* Main Purpose Card */}
             <div 
                onClick={() => setView('PURPOSE_LIST')}
                className="glass-card p-0 rounded-3xl overflow-hidden shadow-md group cursor-pointer active:scale-[0.98] transition-all"
             >
                <div className="bg-sand-200/50 h-32 relative flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-sand-800/20 to-transparent" />
                   <BookOpen className="text-sand-700/50 absolute top-[-10px] right-[-10px]" size={100} />
                   <h2 className="font-serif text-2xl text-sand-800 relative z-10">Propósito 7 Dias</h2>
                </div>
                <div className="p-6">
                  <p className="text-sand-600 mb-4 leading-relaxed">
                    Um caminho guiado para alinhar o coração e atravessar esse tempo com fé.
                  </p>
                  <div className="flex items-center text-sand-700 font-bold text-sm">
                    <span>Continuar jornada</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
             </div>

             {/* Quick Actions Grid */}
             <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setView('RITUAL')} className="glass-card p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 cursor-pointer active:scale-95 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center text-sand-600">
                    <Heart size={24} />
                  </div>
                  <h3 className="font-serif text-sand-800 font-medium">Ritual Diário</h3>
                </div>
                <div onClick={() => setView('PRAYER_30')} className="glass-card p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 cursor-pointer active:scale-95 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center text-sand-600">
                    <Calendar size={24} />
                  </div>
                  <h3 className="font-serif text-sand-800 font-medium">30 Dias de Oração</h3>
                </div>
             </div>
           </div>
         )}

         {/* --- PURPOSE LIST VIEW --- */}
         {view === 'PURPOSE_LIST' && (
           <div className="space-y-6 animate-fade-in">
             <div className="mb-6">
               <h1 className="font-serif text-2xl text-sand-800">Sua Jornada</h1>
               <p className="text-sand-500 text-sm mt-1">7 dias de renovação.</p>
             </div>

             <div className="space-y-3">
               {PURPOSE_DAYS.map((day) => (
                 <div 
                  key={day.id}
                  onClick={() => handleDaySelect(day)}
                  className="glass-card p-5 rounded-xl flex items-center space-x-4 cursor-pointer hover:bg-white/40 transition-colors"
                 >
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg ${completedDays.includes(day.id) ? 'bg-sand-600 text-white' : 'bg-sand-200 text-sand-600'}`}>
                     {completedDays.includes(day.id) ? <CheckCircle2 size={20} /> : day.id}
                   </div>
                   <div className="flex-1">
                     <h3 className="font-bold text-sand-800 text-sm uppercase tracking-wide mb-0.5">{day.theme}</h3>
                     <p className="text-sand-600 text-sm font-serif truncate">{day.title.split(': ')[1]}</p>
                   </div>
                   <ChevronLeft size={20} className="text-sand-400 rotate-180" />
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* --- PURPOSE DETAIL VIEW --- */}
         {view === 'PURPOSE_DETAIL' && selectedDay && (
           <div className="space-y-8 pb-10 animate-fade-in">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold bg-sand-200 text-sand-700 px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedDay.theme}
                </span>
                <h1 className="font-serif text-3xl text-sand-900 leading-tight pt-2">{selectedDay.title.split(': ')[1]}</h1>
              </div>

              {/* Audio Player Sticky/Top */}
              <AudioPlayer 
                duration={selectedDay.audioDuration} 
                onPlayStateChange={(playing) => {
                  if (playing && !completedDays.includes(selectedDay.id)) {
                    setCompletedDays([...completedDays, selectedDay.id]);
                  }
                }}
              />

              {/* Content */}
              <div className="space-y-6 text-sand-800 leading-relaxed">
                
                <div className="glass-card p-6 rounded-2xl italic text-center font-serif text-sand-700">
                   "{selectedDay.scripture}"
                </div>

                <div className="prose prose-sand">
                  <h3 className="font-serif text-xl mb-3 text-sand-900">Reflexão</h3>
                  <p className="text-base text-justify opacity-90">{selectedDay.devotional}</p>
                </div>

                <div className="bg-sand-100/50 p-6 rounded-2xl border border-sand-200">
                  <h3 className="font-serif text-lg mb-2 text-sand-800">Orientação do Dia</h3>
                  <p className="text-sm">{selectedDay.guidance}</p>
                </div>

                <div>
                   <h3 className="font-serif text-xl mb-3 text-sand-900">Oração em Texto</h3>
                   <div className="glass-card p-6 rounded-2xl">
                     <p className="font-serif italic text-lg leading-relaxed text-center text-sand-700">
                       "{selectedDay.prayer}"
                     </p>
                   </div>
                </div>

                <button 
                  onClick={goBack}
                  className="w-full py-4 text-center text-sand-500 text-sm uppercase tracking-widest hover:text-sand-800 transition-colors"
                >
                  Voltar para a lista
                </button>
              </div>
           </div>
         )}

         {/* --- RITUAL VIEW --- */}
         {view === 'RITUAL' && (
           <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-8 animate-fade-in">
             <div className="w-24 h-24 rounded-full bg-sand-200 flex items-center justify-center animate-pulse">
               <Wind size={40} className="text-sand-500" />
             </div>
             <div>
               <h2 className="font-serif text-3xl text-sand-900 mb-2">Respire e Acalme-se</h2>
               <p className="text-sand-600 max-w-xs mx-auto">Este é um momento seguro. Feche os olhos por alguns segundos antes de dar o play.</p>
             </div>
             <div className="w-full max-w-sm">
                <AudioPlayer duration="05:00" />
             </div>
             <p className="text-xs text-sand-400 mt-8">Ritual de 5 minutos para acalmar a ansiedade.</p>
           </div>
         )}

         {/* --- 30 DAYS PRAYER VIEW --- */}
         {view === 'PRAYER_30' && (
           <div className="space-y-6 animate-fade-in">
             <div className="mb-6">
                <h1 className="font-serif text-2xl text-sand-800">30 Dias de Oração</h1>
                <p className="text-sand-500 text-sm mt-1">Constância gera cura.</p>
             </div>
             
             <div className="grid grid-cols-4 gap-3">
               {PRAYERS_30_DAYS.map((item) => (
                 <div key={item.day} className="aspect-square glass-card rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-sand-200 transition-colors group relative">
                    <span className="font-serif text-lg text-sand-700 group-hover:scale-110 transition-transform">{item.day}</span>
                    <span className="text-[9px] uppercase tracking-widest text-sand-400 mt-1">Dia</span>
                 </div>
               ))}
             </div>
             
             <div className="glass-card p-6 rounded-2xl mt-8">
               <h3 className="font-serif text-lg text-sand-800 mb-2">Compromisso</h3>
               <p className="text-sm text-sand-600">Não quebre a corrente. Uma oração pequena por dia é melhor que um grande esforço esporádico.</p>
             </div>
           </div>
         )}

       </main>

       {/* Floating action button or similar sticky element could go here if needed, keeping simple for now */}
    </div>
  );
};

export default App;