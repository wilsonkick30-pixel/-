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
    <div className="h-screen w-full flex items-center justify-center bg-stone-300 overflow-hidden font-sans p-0 lg:p-6">
      <div className="w-full h-full max-w-7xl lg:h-[92vh] bg-white lg:rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col lg:flex-row border border-stone-400">
        
        {/* Left Panel: Dashboard (Producer's Console) */}
        <div className="w-full lg:w-[28%] bg-stone-900 text-stone-100 p-6 lg:p-8 flex flex-col shrink-0 border-b lg:border-b-0 lg:border-r border-stone-800">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl serif font-black tracking-widest text-stone-400 uppercase">GOOD FAMILY RADIO</h1>
            <div className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-black rounded-full animate-pulse tracking-widest uppercase shadow-lg shadow-red-900/40">MASTER FEED</div>
          </div>

          <div className="flex flex-col gap-6 mb-8">
            <div className="w-full aspect-video bg-stone-800 rounded-2xl overflow-hidden border-2 border-stone-700 shadow-2xl shrink-0">
              <img 
                src={state.lastResponse?.imageUrl || IMAGES.DEFAULT_STUDIO} 
                alt="Monitor" 
                className="w-full h-full object-cover grayscale-[0.05] transition-transform duration-1000" 
              />
            </div>

            <div className="space-y-6">
              <StatBar label="頻道優雅度" value={state.warmth} color="bg-amber-400" />
              <StatBar label="現場混亂度" value={state.chaos} color="bg-red-500" />
              <StatBar label="消音能量" value={state.bEnergy} color="bg-purple-500" />
            </div>
          </div>

          <div className="mt-auto hidden lg:block">
             <div className="bg-stone-800/60 p-5 rounded-2xl border border-stone-700 shadow-lg">
                <p className="text-[12px] font-black text-amber-500 uppercase tracking-widest mb-3 border-b border-stone-700 pb-2">🕹️ 製作人操作指南</p>
                <div className="text-[14px] text-stone-300 space-y-3 leading-relaxed font-bold">
                  <div className="flex gap-2 items-start text-amber-100/90">
                    <span className="text-amber-500">◆</span>
                    <span><b>目標：</b>馴服嘉賓的荒謬發言，產出符合「好家庭」形象的高質感音軌。</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-amber-500">◆</span>
                    <span><b>數值：</b>優雅度代表頻道生命線，混亂度代表來賓失控程度。</span>
                  </div>
                  <div className="flex gap-2 items-start text-stone-400">
                    <span className="text-stone-600">◆</span>
                    <span><b>結局：</b>最終數值決定您會被收錄進哪一個金獎 Podcast 節目。</span>
                  </div>
                </div>
             </div>
             <div className="flex gap-3 items-center mt-6 px-1">
               <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
               <span className="text-[11px] uppercase tracking-[0.4em] text-stone-500 font-black">CONSOLE STATUS: READY</span>
             </div>
          </div>
        </div>

        {/* Right Panel: Content Area */}
        <div className="flex-1 flex flex-col bg-stone-50 overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-stone-50/95 backdrop-blur-md">
              <div className="w-12 h-12 border-[5px] border-stone-200 border-t-amber-600 rounded-full animate-spin"></div>
              <p className="text-stone-600 font-black text-[12px] tracking-[0.5em] uppercase">訊號數位後製中...</p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 xl:p-12 flex flex-col justify-center">
            {state.phase === 'START' && (
              <div className="space-y-10 max-w-2xl mx-auto w-full py-6">
                <div className="space-y-4 text-center lg:text-left">
                  <h2 className="text-5xl lg:text-7xl serif font-black text-stone-800 leading-[1.1] tracking-tight">好家庭錄音室：<br/><span className="text-amber-600">拾光製作人</span></h2>
                  <p className="text-xl lg:text-2xl text-stone-600 font-bold leading-relaxed">
                    來賓已在錄音間就座。面對那些「自我過剩」的狂言，身為製作人的您，準備好進行一場音波馴服戰了嗎？
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-[13px] font-black text-stone-400 uppercase tracking-[0.4em] border-b-2 border-stone-200 pb-2">請選定今日專攻嘉賓</p>
                  <div className="grid grid-cols-1 gap-4">
                    <GuestBtn onClick={() => handleStart(GuestType.SPIRITUAL)} title="靈性大師" desc="販售宇宙高頻水，宣稱與土星人有秘密契約" icon="✨" />
                    <GuestBtn onClick={() => handleStart(GuestType.ENTREPRENEUR)} title="成功學霸總" desc="要在 20 歲吞噬太陽，拒絕睡眠的狂熱份子" icon="👔" />
                    <GuestBtn onClick={() => handleStart(GuestType.LOWEND)} title="低端閒聊家" desc="鑽研肚臍垢與鼻孔大砲，本台形象的最大威脅" icon="💨" />
                  </div>
                </div>
              </div>
            )}

            {state.phase === 'INTERVIEW' && (
              <div className="space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-3xl mx-auto w-full py-4">
                <div className="p-8 lg:p-12 bg-white rounded-[3rem] border border-stone-200 relative shadow-2xl">
                  <div className="absolute -top-4 left-10 px-5 py-1.5 bg-stone-900 text-amber-400 text-[11px] font-black tracking-widest uppercase rounded-full shadow-xl">LIVE MONITORING</div>
                  <p className="text-2xl lg:text-4xl text-stone-800 leading-snug font-black">
                    {state.lastResponse?.script}
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-6">
                    <p className="text-[12px] font-black text-stone-500 uppercase tracking-[0.3em] flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                      環境監測：{state.lastResponse?.chaosDescription}
                    </p>
                    <p className="text-[12px] font-black text-stone-500 uppercase tracking-[0.3em]">PROGRESS {state.step + 1} / 2</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 lg:gap-5">
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
              </div>
            )}

            {state.phase === 'RESULT' && (
              <div className="space-y-10 animate-in zoom-in-95 duration-700 max-w-2xl mx-auto w-full py-8 text-center">
                <h2 className="text-4xl lg:text-6xl serif font-black text-stone-800 tracking-tight">後製錄音完成。</h2>
                <div className="p-10 lg:p-14 bg-amber-50 border-[6px] border-amber-100 rounded-[3rem] shadow-2xl relative">
                  <div className="absolute top-0 right-0 p-8 text-amber-200/50">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                  </div>
                  <p className="text-[12px] font-black text-amber-600 mb-6 uppercase tracking-[0.8em]">Broadcast Archive</p>
                  <p className="text-2xl lg:text-3xl font-black text-stone-900 leading-relaxed whitespace-pre-wrap relative z-10">
                    {state.finalTitle}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5 px-4">
                  <button 
                    onClick={resetGame}
                    className="flex-1 py-6 bg-stone-900 text-white rounded-[1.5rem] text-xl font-black hover:bg-stone-800 hover:shadow-2xl hover:-translate-y-1 transition-all shadow-xl active:scale-[0.98]"
                  >
                    製作下一集
                  </button>
                  <a 
                    href="https://podcasts.apple.com/tw/channel/%E5%A5%BD%E5%AE%B6%E5%BA%AD%E8%81%AF%E6%92%AD%E7%B6%B2/id6751031612"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-6 bg-white border-4 border-stone-900 text-stone-900 rounded-[1.5rem] text-xl font-black hover:bg-stone-50 hover:shadow-2xl hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    <span>🎙️ 即刻收聽</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 lg:px-10 lg:py-4 border-t border-stone-200 bg-white/60 text-[10px] text-stone-400 font-black tracking-widest uppercase flex justify-between shrink-0">
            <span>GOOD FAMILY PRODUCTION v6.0 FINAL</span>
            <span className="hidden sm:inline">HIGH READABILITY INTERFACE</span>
            <span>EST. 2024 RADIO ENGINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="w-full space-y-2">
    <div className="flex justify-between items-end px-1">
      <span className="text-[11px] lg:text-[13px] uppercase font-black text-stone-400 tracking-widest">{label}</span>
      <span className="text-lg font-black text-stone-100">{value}%</span>
    </div>
    <div className="h-3 w-full bg-stone-800 rounded-full overflow-hidden p-0.5 border border-stone-700 shadow-inner">
      <div 
        className={`h-full ${color} rounded-full stat-bar-transition shadow-[0_0_12px_rgba(0,0,0,0.5)]`} 
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      ></div>
    </div>
  </div>
);

const GuestBtn: React.FC<{ onClick: () => void, title: string, desc: string, icon: string }> = ({ onClick, title, desc, icon }) => (
  <button 
    onClick={onClick}
    className="group flex items-center p-5 lg:p-7 bg-white border-2 border-stone-100 rounded-3xl hover:border-amber-400 hover:shadow-2xl transition-all duration-500 text-left active:scale-[0.98]"
  >
    <span className="text-4xl lg:text-5xl mr-6 transform group-hover:scale-110 transition-transform">{icon}</span>
    <div className="min-w-0">
      <h4 className="text-xl lg:text-2xl font-black text-stone-800 mb-1 truncate">{title}</h4>
      <p className="text-[12px] lg:text-[14px] text-stone-500 font-bold tracking-wide truncate">{desc}</p>
    </div>
  </button>
);

const ActionBtn: React.FC<{ onClick: () => void, text: string, theme: 'warm' | 'chaos' | 'neutral' }> = ({ onClick, text, theme }) => {
  const styles = {
    warm: "border-amber-300 text-amber-950 hover:bg-amber-100 bg-amber-50/40 hover:shadow-amber-200/40",
    chaos: "border-purple-300 text-purple-950 hover:bg-purple-100 bg-purple-50/40 hover:shadow-purple-200/40",
    neutral: "border-stone-300 text-stone-900 hover:bg-stone-100 bg-white hover:shadow-stone-300/40"
  };
  return (
    <button 
      onClick={onClick}
      className={`w-full p-6 lg:p-8 text-left border-2 rounded-[1.5rem] text-lg lg:text-2xl transition-all duration-500 font-black shadow-lg active:translate-y-1 leading-relaxed ${styles[theme]}`}
    >
      {text}
    </button>
  );
};

export default App;