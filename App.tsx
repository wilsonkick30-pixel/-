
import React, { useState } from 'react';
import { GuestType, GameState, Choice } from './types';
import { getNextScene, getFinalTitle, IMAGES } from './scriptEngine';

const App: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(true);
  const [state, setState] = useState<GameState>({
    warmth: 50,
    chaos: 0,
    bEnergy: 0,
    history: [],
    currentGuest: null,
    phase: 'START',
    step: 0
  });

  const [loading, setLoading] = useState(false);

  const handleStart = (guest: GuestType) => {
    setLoading(true);
    setTimeout(() => {
      const scene = getNextScene(guest, 0);
      setState(prev => ({
        ...prev,
        currentGuest: guest,
        phase: 'INTERVIEW',
        lastResponse: scene,
        step: 0,
        warmth: 50,
        chaos: 0,
        bEnergy: 0,
        history: [`選擇嘉賓: ${guest}`]
      }));
      setLoading(false);
    }, 600);
  };

  const handleAction = (choice: Choice) => {
    if (!state.currentGuest) return;
    setLoading(true);
    
    setTimeout(() => {
      setState(prev => {
        const nextStep = prev.step + 1;
        const nextWarmth = Math.max(0, Math.min(100, prev.warmth + choice.impact.w));
        const nextChaos = Math.max(0, Math.min(100, prev.chaos + choice.impact.c));
        const nextBEnergy = Math.max(0, Math.min(100, prev.bEnergy + choice.impact.b));

        if (nextStep > 4) {
          return {
            ...prev,
            warmth: nextWarmth,
            chaos: nextChaos,
            bEnergy: nextBEnergy,
            phase: 'RESULT',
            finalTitle: getFinalTitle(nextWarmth, nextChaos, nextBEnergy, prev.currentGuest)
          };
        } else {
          const scene = getNextScene(prev.currentGuest!, nextStep);
          return {
            ...prev,
            warmth: nextWarmth,
            chaos: nextChaos,
            bEnergy: nextBEnergy,
            step: nextStep,
            lastResponse: scene
          };
        }
      });
      setLoading(false);
    }, 600);
  };

  const resetGame = () => {
    setState({
      warmth: 50,
      chaos: 0,
      bEnergy: 0,
      history: [],
      currentGuest: null,
      phase: 'START',
      step: 0,
      lastResponse: undefined,
      finalTitle: undefined
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans p-0 lg:p-10 text-[16px] lg:text-[20px] bg-[#F4F5F0]">
      
      {/* Tutorial Modal */}
      {showTutorial && (
        <TutorialModal onClose={() => setShowTutorial(false)} />
      )}

      {/* Main Container - Card Style */}
      <div className="w-full min-h-screen lg:min-h-0 lg:h-[92vh] max-w-[1600px] bg-white lg:rounded-[2rem] shadow-[0_40px_100px_-30px_rgba(15,76,129,0.15)] flex flex-col lg:flex-row border-stone-200 lg:border lg:overflow-hidden">
        
        {/* Left Panel: Dashboard / Visuals */}
        <div className="w-full lg:w-[35%] bg-[#0F4C81] text-white p-8 lg:p-16 flex flex-col shrink-0 relative lg:overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#1a5b94] rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          {/* Header */}
          <div className="relative z-10 flex justify-between items-start mb-8 lg:mb-12">
            <div>
              <h1 className="text-2xl lg:text-3xl serif font-black tracking-wider leading-none mb-2">GOOD<br/>FAMILY</h1>
              <span className="text-[10px] lg:text-xs uppercase tracking-[0.3em] opacity-60">Radio Production</span>
            </div>
            <div className="px-4 py-1.5 bg-[#FF6F61] text-white text-[10px] lg:text-xs font-bold rounded-full animate-pulse tracking-widest uppercase shadow-lg shadow-[#FF6F61]/30">
              ON AIR
            </div>
          </div>

          {/* Main Visual Content */}
          <div className="relative z-10 flex-1 flex flex-col gap-8 lg:gap-12">
            {/* Monitor/Image */}
            <div className="w-full aspect-[16/9] lg:aspect-[4/3] bg-stone-900 rounded-xl overflow-hidden shadow-2xl relative group shrink-0">
               <img 
                src={state.lastResponse?.imageUrl || IMAGES.DEFAULT_STUDIO} 
                alt="Monitor" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              {state.phase === 'INTERVIEW' && (
                <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 text-white/90">
                  <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#FF6F61] mb-1">Live Feed</p>
                  <p className="serif text-lg lg:text-xl font-bold">{state.currentGuest}</p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="space-y-6 lg:space-y-8">
              <StatBar label="ELEGANCE (優雅)" value={state.warmth} color="bg-[#FF6F61]" />
              <StatBar label="CHAOS (混亂)" value={state.chaos} color="bg-[#F5DF4D]" />
              <StatBar label="CENSORSHIP (消音)" value={state.bEnergy} color="bg-[#939597]" />
            </div>

            {/* Mini Status */}
            <div className="mt-auto pt-6 lg:pt-8 border-t border-white/10 flex justify-between items-end">
               <div className="text-[10px] lg:text-xs text-white/60">
                 System: <span className="text-[#F5DF4D]">Online</span>
               </div>
               <div className="text-[10px] lg:text-xs text-white/60">
                 v2.6.5
               </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Content & Interaction */}
        <div className="flex-1 flex flex-col bg-[#F4F5F0] relative min-h-[50vh]">
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#F4F5F0]/80 backdrop-blur-sm transition-all fixed lg:absolute h-screen lg:h-full w-full">
              <div className="w-12 h-12 border-4 border-[#939597]/20 border-t-[#0F4C81] rounded-full animate-spin mb-6"></div>
              <p className="text-[#0F4C81] font-bold text-sm tracking-[0.3em] uppercase">Processing Signal...</p>
            </div>
          )}

          {/* Scrollable Content */}
          <div className="flex-1 lg:overflow-y-auto custom-scrollbar p-6 md:p-10 lg:p-20 flex flex-col">
            
            {/* 1. START PHASE */}
            {state.phase === 'START' && (
              <div className="max-w-4xl mx-auto w-full my-auto space-y-12 lg:space-y-16 animate-in fade-in duration-700 py-10 lg:py-0">
                <div className="space-y-4 lg:space-y-6">
                  <h2 className="text-5xl lg:text-7xl serif font-black text-[#2D2D2D] leading-tight tracking-tight">
                    Radio<br/>
                    <span className="text-[#0F4C81]">Producer.</span>
                  </h2>
                  <p className="text-lg lg:text-2xl text-[#939597] font-medium leading-relaxed max-w-2xl">
                    這裡是專業的錄音間，不歡迎粗俗。<br className="hidden lg:block"/>請運用您的剪輯智慧，將這場災難轉化為廣播神作。
                  </p>
                </div>
                
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-px bg-[#0F4C81] w-8 lg:w-12"></div>
                    <p className="text-xs lg:text-sm font-bold text-[#0F4C81] uppercase tracking-[0.3em]">Guest Selection</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GuestCard 
                      onClick={() => handleStart(GuestType.SPIRITUAL)} 
                      title="靈性大師" 
                      subtitle="Spiritual"
                      desc="神秘宇宙高頻水" 
                      image={IMAGES.SPIRITUAL_VIBE}
                    />
                    <GuestCard 
                      onClick={() => handleStart(GuestType.ENTREPRENEUR)} 
                      title="成功霸總" 
                      subtitle="Entrepreneur"
                      desc="20歲吞噬太陽" 
                      image={IMAGES.ENTREPRENEUR_VIBE}
                    />
                    <GuestCard 
                      onClick={() => handleStart(GuestType.LOWEND)} 
                      title="地方有力人士" 
                      subtitle="Local Power"
                      desc="掌控所有里民秘密" 
                      image={IMAGES.LOWEND_VIBE}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. INTERVIEW PHASE */}
            {state.phase === 'INTERVIEW' && (
              <div className="max-w-4xl mx-auto w-full my-auto space-y-8 lg:space-y-12 animate-in slide-in-from-bottom-8 duration-700 py-10 lg:py-0">
                {/* Status Header */}
                <div className="flex justify-between items-center border-b border-[#939597]/20 pb-4 lg:pb-6">
                  <div className="flex items-center gap-3">
                     <span className={`w-2 h-2 rounded-full ${state.lastResponse?.choices.some(c => c.impact.c > 10) ? 'bg-red-500 animate-ping' : 'bg-green-500'}`}></span>
                     <span className="text-[10px] lg:text-xs font-bold text-[#939597] uppercase tracking-[0.2em]">
                       Status: {state.lastResponse?.chaosDescription || 'Stable'}
                     </span>
                  </div>
                  <span className="text-[10px] lg:text-xs font-bold text-[#0F4C81] uppercase tracking-[0.2em]">
                    Segment {state.step + 1} / 5
                  </span>
                </div>

                {/* Dialog Box */}
                <div className="space-y-4 lg:space-y-6">
                  <h3 className="serif text-3xl lg:text-5xl font-black text-[#2D2D2D] leading-snug">
                    「{state.lastResponse?.script}」
                  </h3>
                  <p className="text-[#939597] italic text-base lg:text-lg flex items-center gap-3">
                    <span className="text-[#FF6F61] not-italic">●</span>
                    {state.lastResponse?.reaction}
                  </p>
                </div>

                {/* Choices */}
                <div className="grid grid-cols-1 gap-4 lg:gap-5 pt-4 lg:pt-8">
                  {state.lastResponse?.choices.map((choice, idx) => (
                    <ActionBtn 
                      key={idx} 
                      onClick={() => handleAction(choice)} 
                      text={choice.text} 
                      theme={choice.theme} 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 3. RESULT PHASE */}
            {state.phase === 'RESULT' && (
              <div className="max-w-3xl mx-auto w-full my-auto text-center space-y-10 lg:space-y-16 animate-in zoom-in-95 duration-700 py-10 lg:py-0">
                <div>
                  <p className="text-[10px] lg:text-xs font-bold text-[#FF6F61] uppercase tracking-[0.4em] mb-4 lg:mb-6">Podcast Production Complete</p>
                  <h2 className="text-4xl lg:text-7xl serif font-black text-[#0F4C81] mb-4 lg:mb-6">錄音後製完成</h2>
                  <div className="h-1 w-16 lg:w-24 bg-[#0F4C81] mx-auto"></div>
                </div>

                <div className="bg-white p-8 lg:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden group border border-[#0F4C81]/10">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#0F4C81]"></div>
                  <p className="text-xl lg:text-3xl font-medium text-[#2D2D2D] leading-relaxed whitespace-pre-wrap text-left relative z-10">
                    {state.finalTitle}
                  </p>
                  {/* Watermark */}
                  <div className="absolute -bottom-10 -right-10 text-[6rem] lg:text-[8rem] opacity-5 serif text-[#0F4C81] select-none pointer-events-none font-black z-0">
                    POD
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 lg:gap-6 justify-center">
                  <button 
                    onClick={resetGame}
                    className="px-8 lg:px-10 py-4 lg:py-5 bg-[#2D2D2D] text-white text-base lg:text-lg font-bold tracking-widest uppercase hover:bg-[#0F4C81] transition-colors shadow-xl"
                  >
                    Next Episode
                  </button>
                  <a 
                    href="https://podcasts.apple.com/tw/channel/%E5%A5%BD%E5%AE%B6%E5%BA%AD%E8%81%AF%E6%92%AD%E7%B6%B2/id6751031612"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 lg:px-10 py-4 lg:py-5 bg-white border border-[#2D2D2D] text-[#2D2D2D] text-base lg:text-lg font-bold tracking-widest uppercase hover:bg-[#F4F5F0] transition-colors flex items-center justify-center gap-3 shadow-xl"
                  >
                    Listen Now ↗
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 lg:px-12 border-t border-[#939597]/20 bg-white/50 backdrop-blur text-[10px] lg:text-[12px] text-[#939597] font-bold tracking-[0.2em] uppercase flex flex-col md:flex-row justify-between shrink-0 gap-2 items-center md:items-start text-center md:text-left">
            <span>好家庭聯播網 製作 © 2026</span>
            <span className="hidden sm:inline">Good Family Podcast Network</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Components ---

const TutorialModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6 bg-[#0F4C81]/60 backdrop-blur-md animate-in fade-in duration-500">
    <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 flex flex-col relative max-h-[90vh] overflow-y-auto">
      
      {/* Decorative */}
      <div className="h-3 w-full bg-[#FF6F61] shrink-0"></div>
      
      <div className="p-8 lg:p-14 text-center">
        <h3 className="serif text-2xl lg:text-3xl font-black text-[#0F4C81] mb-2">歡迎來到好家庭錄音室</h3>
        <p className="text-[10px] lg:text-xs font-bold text-[#939597] uppercase tracking-[0.3em] mb-8 lg:mb-10">Role: Executive Producer</p>
        
        <div className="space-y-6 lg:space-y-8 text-left mb-8 lg:mb-12">
          <div className="flex gap-4 lg:gap-6">
             <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#F4F5F0] flex items-center justify-center text-xl lg:text-2xl shrink-0">🎙️</div>
             <div>
               <h4 className="font-bold text-[#2D2D2D] text-base lg:text-lg mb-1">您的任務</h4>
               <p className="text-[#939597] text-sm lg:text-base">訪談各種失控的 Podcast 來賓，將他們的荒謬言論剪輯成優雅的廣播內容。</p>
             </div>
          </div>
          <div className="flex gap-4 lg:gap-6">
             <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#F4F5F0] flex items-center justify-center text-xl lg:text-2xl shrink-0">🎚️</div>
             <div>
               <h4 className="font-bold text-[#2D2D2D] text-base lg:text-lg mb-1">控制台</h4>
               <p className="text-[#939597] text-sm lg:text-base">維持 <span className="text-[#FF6F61] font-bold">優雅度</span>，避免 <span className="text-[#F5DF4D] font-bold text-stone-600">混亂</span>。必要時使用消音按鈕。</p>
             </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 lg:py-5 bg-[#0F4C81] text-white text-lg lg:text-xl font-bold rounded-xl hover:bg-[#0a355c] transition-colors shadow-lg active:scale-[0.98]"
        >
          開始製作
        </button>
      </div>
    </div>
  </div>
);

const StatBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="w-full space-y-2">
    <div className="flex justify-between items-end">
      <span className="text-[10px] uppercase font-bold text-white/60 tracking-widest">{label}</span>
      <span className="text-lg lg:text-xl font-bold text-white">{value}%</span>
    </div>
    <div className="h-1 w-full bg-black/20 overflow-hidden">
      <div 
        className={`h-full ${color} stat-bar-fill shadow-[0_0_15px_rgba(255,255,255,0.2)]`} 
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      ></div>
    </div>
  </div>
);

const GuestCard: React.FC<{ onClick: () => void, title: string, subtitle: string, desc: string, image: string }> = ({ onClick, title, subtitle, desc, image }) => (
  <button 
    onClick={onClick}
    className="group relative h-64 lg:h-80 w-full overflow-hidden bg-stone-100 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
  >
    {/* Background Image */}
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
    
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/90 via-[#0F4C81]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
    
    {/* Content */}
    <div className="absolute bottom-0 left-0 p-6 lg:p-8 w-full text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
      <p className="text-[10px] text-[#FF6F61] font-bold tracking-[0.3em] uppercase mb-2">{subtitle}</p>
      <h4 className="text-2xl lg:text-3xl font-black text-white mb-2 serif">{title}</h4>
      <p className="text-xs lg:text-sm text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity delay-100 font-medium tracking-wide">{desc}</p>
    </div>

    {/* Hover Border */}
    <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#FF6F61] transition-colors duration-500"></div>
  </button>
);

const ActionBtn: React.FC<{ onClick: () => void, text: string, theme: 'warm' | 'chaos' | 'neutral' }> = ({ onClick, text, theme }) => {
  const borderColor = theme === 'warm' ? 'border-[#FF6F61]' : theme === 'chaos' ? 'border-[#F5DF4D]' : 'border-[#2D2D2D]';
  
  return (
    <button 
      onClick={onClick}
      className={`w-full p-6 lg:p-8 text-left bg-white border-l-4 ${borderColor} shadow-sm hover:shadow-xl transition-all duration-300 group`}
    >
      <div className={`text-lg lg:text-2xl font-bold text-[#2D2D2D] group-hover:translate-x-2 transition-transform duration-300 leading-relaxed`}>
        {text}
      </div>
    </button>
  );
};

export default App;
