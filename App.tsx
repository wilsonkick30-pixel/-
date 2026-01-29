
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
    <div className="h-screen w-full flex items-center justify-center p-0 lg:p-6 overflow-hidden">
      {/* Main Container */}
      <div className="w-full h-full max-w-[1440px] lg:h-[92vh] bg-white lg:rounded-[2.5rem] shadow-[0_50px_150px_-20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col lg:flex-row relative border border-stone-200">
        
        {/* Left Console Panel */}
        <div className="w-full lg:w-[350px] xl:w-[420px] shrink-0 bg-[#111827] text-white flex flex-col p-6 lg:p-10 z-20 border-b lg:border-b-0 lg:border-r border-slate-800 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl serif font-black tracking-widest text-slate-300 uppercase leading-none">GOOD FAMILY<br/>RADIO</h1>
            <div className="px-3 py-1 bg-[#DC2626] text-white text-[10px] font-black rounded-full animate-pulse tracking-widest uppercase shadow-[0_0_15px_rgba(220,38,38,0.4)]">REC ON</div>
          </div>

          <div className="flex-1 space-y-8 overflow-y-auto hide-scrollbar">
            {/* [位置交換] Monitor moved to TOP */}
            <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-slate-700 shadow-inner group relative">
              <img 
                src={state.lastResponse?.imageUrl || IMAGES.DEFAULT_STUDIO} 
                alt="Studio Monitor" 
                className={`w-full h-full object-cover transition-all duration-1000 ${state.chaos > 60 ? 'contrast-125 scale-105' : 'opacity-80 group-hover:opacity-100'}`}
              />
              <div className="absolute top-4 left-4 flex gap-1 items-center">
                 <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                 <div className="text-[10px] text-white/50 font-mono tracking-tighter">LIVE_FEED</div>
              </div>
            </div>

            {/* Gauges */}
            <div className="space-y-6">
              <StatModule label="頻道優雅度" value={state.warmth} color="from-amber-400 to-amber-600" />
              <StatModule label="現場混亂度" value={state.chaos} color="from-rose-500 to-rose-700" />
              <StatModule label="消音能量" value={state.bEnergy} color="from-indigo-400 to-indigo-600" />
            </div>

            {/* [位置交換] Protocol Box moved to BOTTOM */}
            <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 relative overflow-hidden hidden lg:block">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-600"></div>
              <p className="text-amber-500 text-[11px] font-black uppercase tracking-[0.3em] mb-4">錄音協議說明</p>
              <div className="text-[13px] text-slate-400 font-bold space-y-3 leading-relaxed">
                <p>1. 馴服嘉賓發言，產出高品質音軌。</p>
                <p>2. <span className="text-white">優雅度</span> 決定結局系列。</p>
                <p>3. <span className="text-rose-400">混亂度</span> 過高將導致報廢。</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 px-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-slate-500">System Standing By</span>
          </div>
        </div>

        {/* Right Interaction Panel */}
        <div className="flex-1 bg-[#FAF9F6] flex flex-col overflow-hidden relative">
          
          {loading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-[#FAF9F6]/80 backdrop-blur-md">
              <div className="w-14 h-14 border-[5px] border-slate-200 border-t-amber-600 rounded-full animate-spin"></div>
              <p className="text-slate-600 font-black text-[12px] tracking-[0.5em] uppercase">訊號數位後製中...</p>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 sm:p-12 lg:p-16 flex flex-col items-center">
            {state.phase === 'START' && (
              <div className="w-full max-w-4xl animate-in fade-in zoom-in-95 duration-700">
                <div className="mb-10 text-center lg:text-left">
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl serif font-black text-slate-900 leading-none mb-10">
                    好家庭錄音室：<br/><span className="text-amber-600">拾光製作人</span>
                  </h2>
                  
                  {/* [位置交換] Tutorial moved to TOP */}
                  <div className="inline-block w-full p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl text-lg sm:text-xl text-slate-600 font-bold leading-relaxed border-l-[12px] border-amber-600 mb-10">
                    <p className="mb-4 text-slate-800">📻 錄音室快速上手指南：</p>
                    <ul className="text-base text-slate-500 font-medium space-y-3">
                       <li className="flex items-start gap-3"><span className="text-amber-600">●</span> <span>選定今日嘉賓，點擊下方卡片即可開始直播對話。</span></li>
                       <li className="flex items-start gap-3"><span className="text-amber-600">●</span> <span>針對狂言選擇應對方針。優雅度代表品味，混亂度代表失控風險。</span></li>
                       <li className="flex items-start gap-3"><span className="text-amber-600">●</span> <span>五段問答後將結算您的製作成果，揭曉您被收錄於哪一個金獎節目系列。</span></li>
                    </ul>
                  </div>

                  {/* [位置交換] Hero Image moved to BOTTOM of Guide */}
                  <div className="w-full h-48 sm:h-72 rounded-[3.5rem] overflow-hidden border border-slate-200 shadow-2xl mb-14 group">
                    <img src={IMAGES.START_HERO} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-95" alt="Studio Background" />
                  </div>
                </div>

                {/* Guest Selection Grid - Organzied Grid */}
                <div className="space-y-6 mb-16">
                  <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.8em] border-b border-slate-100 pb-4 text-center lg:text-left">請選擇今日錄製對象</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GuestNode onClick={() => handleStart(GuestType.SPIRITUAL)} title="靈性大師" desc="自認土星環上跳舞的覺醒者" icon="✨" />
                    <GuestNode onClick={() => handleStart(GuestType.ENTREPRENEUR)} title="成功學霸總" desc="要在凌晨 4 點統治市場的狂人" icon="👔" />
                    <GuestNode onClick={() => handleStart(GuestType.LOWEND)} title="低端閒聊家" desc="鼻孔射珍珠與肚臍垢香氛專家" icon="💨" />
                  </div>
                </div>
              </div>
            )}

            {state.phase === 'INTERVIEW' && (
              <div className="w-full max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-700 py-10">
                {/* Dialogue Box */}
                <div className="bg-white p-10 sm:p-14 rounded-[4rem] border border-stone-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden">
                  <div className="absolute -top-4 left-14 px-8 py-2 bg-[#111827] text-amber-500 text-[11px] font-black tracking-[0.4em] uppercase rounded-full shadow-lg">LIVE MONITORING</div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-snug font-black serif italic">
                    {state.lastResponse?.script}
                  </p>
                  <div className="mt-12 pt-10 border-t border-slate-50 text-slate-400 text-lg font-bold flex items-center gap-4">
                    <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                    <span className="uppercase tracking-widest text-[11px] font-black">錄音師點評：</span>
                    {state.lastResponse?.reaction}
                  </div>
                </div>

                {/* Choices */}
                <div className="space-y-5">
                   <div className="flex justify-between items-center px-8 mb-4">
                      <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">製作人應對方向</p>
                      <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">RECORDING {state.step + 1} / 5</p>
                   </div>
                  {state.lastResponse?.choices.map((c, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleAction(c)}
                      className="w-full p-8 sm:p-10 text-left bg-white border-2 border-slate-100 rounded-[2.5rem] text-xl sm:text-2xl transition-all duration-500 font-black hover:border-amber-600 hover:bg-amber-50 active:translate-y-1 shadow-2xl shadow-black/5 leading-relaxed text-slate-800 hover:shadow-amber-200/20 group"
                    >
                      <span className="group-hover:translate-x-2 transition-transform inline-block">{c.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {state.phase === 'RESULT' && (
              <div className="w-full max-w-4xl text-center space-y-12 animate-in zoom-in-95 duration-1000 py-10">
                <div className="p-12 sm:p-16 lg:p-20 bg-white border-[16px] border-[#FFFBEB] rounded-[5.5rem] shadow-2xl relative">
                  <div className="absolute top-12 right-12 p-10 text-amber-100/40 opacity-30">
                     <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                  </div>
                  <div className="text-[14px] font-black text-amber-600 mb-10 uppercase tracking-[1.2em] relative z-10">Production Finalized</div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-relaxed whitespace-pre-wrap serif italic relative z-10">
                    {state.finalTitle}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 px-4">
                  <button onClick={resetGame} className="flex-1 py-8 bg-[#111827] text-white rounded-[3rem] text-2xl font-black hover:bg-slate-800 transition-all shadow-2xl active:scale-[0.98] tracking-widest uppercase">
                    錄製下一集
                  </button>
                  <a href="https://podcasts.apple.com/tw/channel/%E5%A5%BD%E5%AE%B6%E5%BA%AD%E8%81%AF%E6%92%AD%E7%B6%B2/id6751031612" target="_blank" rel="noopener noreferrer" className="flex-1 py-8 bg-white border-4 border-[#111827] text-[#111827] rounded-[3rem] text-2xl font-black hover:bg-slate-50 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] tracking-widest uppercase">
                    <span>即刻播出 🎙️</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Version Footer */}
          <div className="px-12 py-8 border-t border-slate-100 text-[11px] text-slate-400 font-black tracking-[0.5em] uppercase flex flex-col md:flex-row justify-between items-center gap-8 shrink-0 bg-[#FAF9F6]/80 backdrop-blur-sm">
            <span>GOOD FAMILY RADIO v7.0 STABLE</span>
            <div className="flex gap-16">
              <span className="hidden lg:inline">BROADCAST ENGINE</span>
              <span>EST. 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatModule: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end px-1">
      <span className="text-[12px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
      <span className="text-2xl font-black text-white font-mono tracking-tighter">{value}%</span>
    </div>
    <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700 shadow-inner">
      <div className={`h-full bg-gradient-to-r ${color} rounded-full stat-bar-transition`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

const GuestNode: React.FC<{ onClick: () => void, title: string, desc: string, icon: string }> = ({ onClick, title, desc, icon }) => (
  <button onClick={onClick} className="group flex flex-col items-center p-8 bg-white border border-slate-200 rounded-[3rem] hover:border-amber-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center active:scale-[0.98] w-full">
    <div className="w-20 h-20 rounded-[2.2rem] bg-slate-50 flex items-center justify-center text-4xl group-hover:scale-125 transition-transform duration-700 shrink-0 shadow-sm border border-slate-100 mb-6">
      {icon}
    </div>
    <div className="min-w-0">
      <h4 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">{title}</h4>
      <p className="text-xs text-slate-400 font-bold tracking-wide leading-relaxed">{desc}</p>
    </div>
  </button>
);

export default App;
