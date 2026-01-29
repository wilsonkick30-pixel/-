
import React, { useState } from 'react';
import { GuestType, GameState, Choice } from './types';
import { getNextScene, getFinalTitle, IMAGES } from './scriptEngine';

const App: React.FC = () => {
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
    }, 500);
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

        if (nextStep > 1) {
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
    }, 500);
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
    <div className="h-screen w-full flex items-center justify-center bg-[#e5e5e5] overflow-hidden font-sans p-0 lg:p-6">
      <div className="w-full h-full max-w-[1440px] lg:h-[90vh] bg-white lg:rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col lg:flex-row relative">
        
        {/* Left Side: Dark Control Panel */}
        <div className="w-full lg:w-[380px] shrink-0 bg-[#1a1a1a] flex flex-col p-8 z-10 shadow-2xl overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl serif font-black tracking-widest text-stone-400 uppercase leading-none">GOOD FAMILY<br/>RADIO</h1>
            <div className="px-3 py-1 bg-[#b91c1c] text-white text-[10px] font-black rounded-full animate-pulse tracking-widest uppercase shadow-[0_0_15px_rgba(185,28,28,0.5)]">MASTER FEED</div>
          </div>

          {/* Monitor Display */}
          <div className="w-full aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-stone-800 shadow-inner mb-10 group">
             <img 
               src={state.lastResponse?.imageUrl || IMAGES.DEFAULT_STUDIO} 
               alt="Studio Monitor" 
               className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
             />
          </div>

          {/* Stats Column */}
          <div className="space-y-8 flex-1">
            <StatBar label="頻道優雅度" value={state.warmth} color="bg-amber-500" />
            <StatBar label="現場混亂度" value={state.chaos} color="bg-rose-600" />
            <StatBar label="消音能量" value={state.bEnergy} color="bg-purple-600" />
            
            {/* Producer's Guide Box */}
            <div className="bg-[#262626] p-6 rounded-3xl border border-stone-800 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">🔮</span>
                <h3 className="text-[12px] font-black text-amber-500 uppercase tracking-widest">製作人操作指南</h3>
              </div>
              <ul className="text-[13px] text-stone-400 space-y-4 leading-relaxed font-bold">
                <li className="flex gap-2">
                  <span className="text-amber-500">◆</span>
                  <span>目標：馴服嘉賓的荒謬發言，產出符合「好家庭」形象的高質感音軌。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">◆</span>
                  <span>數值：優雅度代表頻道生命線，混亂度代表來賓失控程度。</span>
                </li>
                <li className="flex gap-2 text-stone-500">
                  <span className="text-stone-700">◆</span>
                  <span>結局：最終數值決定您會被收錄進哪一個金獎 Podcast 節目。</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-stone-600">CONSOLE STATUS: READY</span>
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="flex-1 bg-[#fcfcfc] flex flex-col overflow-hidden relative">
          
          {loading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-white/80 backdrop-blur-md">
              <div className="w-10 h-10 border-4 border-stone-100 border-t-amber-600 rounded-full animate-spin"></div>
              <p className="text-stone-500 font-black text-[11px] tracking-[0.5em] uppercase">訊號數位後製中...</p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-16 flex flex-col items-center justify-center">
            {state.phase === 'START' && (
              <div className="w-full max-w-2xl animate-in fade-in duration-700">
                <div className="mb-12">
                  <h2 className="text-6xl lg:text-7xl serif font-black text-[#1c1917] leading-none mb-4">
                    好家庭錄音室：<br/><span className="text-[#d97706]">拾光製作人</span>
                  </h2>
                  <p className="text-xl text-stone-600 font-bold leading-relaxed max-w-lg">
                    來賓已在錄音間就座。面對那些「自我過剩」的狂言，身為製作人的您，準備好進行一場音波馴服戰了嗎？
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-[11px] font-black text-stone-400 uppercase tracking-[0.6em] border-b border-stone-100 pb-3">請選定今日專攻嘉賓</p>
                  <div className="grid grid-cols-1 gap-4">
                    <GuestCard onClick={() => handleStart(GuestType.SPIRITUAL)} title="靈性大師" desc="販售宇宙高頻水，宣稱與土星人有秘密契約" icon="✨" />
                    <GuestCard onClick={() => handleStart(GuestType.ENTREPRENEUR)} title="成功學霸總" desc="要在 20 歲吞噬太陽，拒絕睡眠的狂熱份子" icon="👔" />
                    <GuestCard onClick={() => handleStart(GuestType.LOWEND)} title="低端閒聊家" desc="鑽研肚臍垢與鼻孔大砲，本台形象的最大威脅" icon="💨" />
                  </div>
                </div>
              </div>
            )}

            {state.phase === 'INTERVIEW' && (
              <div className="w-full max-w-3xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white p-10 lg:p-14 rounded-[4rem] border border-stone-100 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.05)] relative">
                  <div className="absolute -top-4 left-12 px-6 py-2 bg-[#1a1a1a] text-amber-400 text-[10px] font-black tracking-[0.3em] uppercase rounded-full">LIVE MONITORING</div>
                  <p className="text-3xl lg:text-5xl text-stone-800 leading-snug font-black serif">
                    {state.lastResponse?.script}
                  </p>
                  <div className="mt-8 pt-8 border-t border-stone-50 text-stone-400 text-sm font-bold flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    環境回傳：{state.lastResponse?.chaosDescription}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {state.lastResponse?.choices.map((c, i) => (
                    <ActionNode key={i} onClick={() => handleAction(c)} text={c.text} theme={c.theme} />
                  ))}
                </div>
              </div>
            )}

            {state.phase === 'RESULT' && (
              <div className="w-full max-w-xl text-center space-y-12 animate-in zoom-in-95 duration-700">
                <div className="p-12 lg:p-16 bg-[#fffcf5] border-[10px] border-white rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(217,119,6,0.15)] relative">
                  <div className="text-[12px] font-black text-amber-600 mb-8 uppercase tracking-[0.8em]">Broadcast Result</div>
                  <p className="text-3xl lg:text-4xl font-black text-stone-900 leading-relaxed whitespace-pre-wrap serif italic">
                    {state.finalTitle}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <button onClick={resetGame} className="flex-1 py-6 bg-[#1a1a1a] text-white rounded-[2rem] text-xl font-black hover:bg-stone-800 transition-all shadow-xl active:scale-[0.98]">
                    RESET
                  </button>
                  <a href="https://podcasts.apple.com/tw/channel/%E5%A5%BD%E5%AE%B6%E5%BA%AD%E8%81%AF%E6%92%AD%E7%B6%B2/id6751031612" target="_blank" rel="noopener noreferrer" className="flex-1 py-6 bg-white border-2 border-stone-900 text-stone-900 rounded-[2rem] text-xl font-black hover:bg-stone-50 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]">
                    LISTEN 🎙️
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="px-10 py-6 border-t border-stone-100 text-[10px] text-stone-400 font-black tracking-widest uppercase flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
            <span>GOOD FAMILY PRODUCTION V6.0 FINAL</span>
            <div className="flex gap-8">
              <span>HIGH READABILITY INTERFACE</span>
              <span>EST. 2024 RADIO ENGINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end px-1">
      <span className="text-[12px] font-black text-stone-500 uppercase tracking-widest">{label}</span>
      <span className="text-lg font-black text-white">{value}%</span>
    </div>
    <div className="h-2 w-full bg-[#262626] rounded-full overflow-hidden p-0.5 border border-stone-800 shadow-inner">
      <div className={`h-full ${color} rounded-full stat-bar-transition`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

const GuestCard: React.FC<{ onClick: () => void, title: string, desc: string, icon: string }> = ({ onClick, title, desc, icon }) => (
  <button onClick={onClick} className="group flex items-center p-8 bg-white border border-stone-100 rounded-[2rem] hover:border-amber-400 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 text-left active:scale-[0.98]">
    <div className="w-16 h-16 rounded-[1.5rem] bg-stone-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 shrink-0">
      {icon}
    </div>
    <div className="ml-8 min-w-0">
      <h4 className="text-2xl font-black text-stone-800 mb-1 group-hover:text-amber-600 transition-colors truncate">{title}</h4>
      <p className="text-sm text-stone-400 font-bold tracking-wide truncate">{desc}</p>
    </div>
  </button>
);

const ActionNode: React.FC<{ onClick: () => void, text: string, theme: string }> = ({ onClick, text, theme }) => {
  return (
    <button onClick={onClick} className="w-full p-8 text-left bg-white border-2 border-stone-100 rounded-[2rem] text-xl lg:text-2xl transition-all duration-300 font-black hover:border-amber-500 hover:bg-amber-50 active:translate-y-1 shadow-lg shadow-black/5 leading-relaxed text-stone-800">
      {text}
    </button>
  );
};

export default App;
