
import React, { useState } from 'react';
import { GuestType, GameState, Choice } from './types';
import { getNextScene, getFinalTitle } from './scriptEngine';

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
      setState({
        ...state,
        currentGuest: guest,
        phase: 'INTERVIEW',
        lastResponse: scene,
        step: 0,
        history: [`選擇嘉賓: ${guest}`]
      });
      setLoading(false);
    }, 600);
  };

  const handleAction = (choice: Choice) => {
    if (!state.currentGuest) return;
    setLoading(true);
    
    setTimeout(() => {
      const nextStep = state.step + 1;
      const nextWarmth = Math.max(0, state.warmth + choice.impact.w);
      const nextChaos = Math.max(0, state.chaos + choice.impact.c);
      const nextBEnergy = state.bEnergy + choice.impact.b;

      if (nextStep > 1) {
        setState({
          ...state,
          warmth: nextWarmth,
          chaos: nextChaos,
          bEnergy: nextBEnergy,
          phase: 'RESULT',
          finalTitle: getFinalTitle(nextWarmth, nextChaos, nextBEnergy)
        });
      } else {
        const scene = getNextScene(state.currentGuest!, nextStep);
        setState({
          ...state,
          warmth: nextWarmth,
          chaos: nextChaos,
          bEnergy: nextBEnergy,
          step: nextStep,
          lastResponse: scene
        });
      }
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
    <div className="h-screen w-full flex items-center justify-center bg-stone-100 overflow-hidden font-sans">
      <div className="w-full h-full max-w-7xl lg:h-[90vh] bg-white lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-stone-200">
        
        {/* Left Stats Panel (Sidebar/Header) */}
        <div className="w-full lg:w-[35%] xl:w-[30%] bg-stone-900 text-stone-100 p-4 sm:p-6 lg:p-8 flex flex-col shrink-0 relative">
          <div className="flex justify-between items-center mb-4 lg:mb-8">
            <h1 className="text-lg sm:text-xl serif font-black tracking-widest text-stone-400">GOOD FAMILY RADIO</h1>
            <div className="px-2 py-0.5 bg-red-600 text-white text-[8px] font-black rounded-full animate-pulse tracking-widest uppercase">ON AIR</div>
          </div>

          <div className="flex lg:flex-col gap-4 lg:gap-8 flex-row items-stretch lg:items-stretch overflow-hidden">
            <div className="w-1/3 lg:w-full aspect-video bg-stone-800 rounded-xl overflow-hidden border border-stone-700 shadow-lg shrink-0">
              {state.lastResponse?.imageUrl ? (
                <img src={state.lastResponse.imageUrl} alt="Studio" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-500 font-bold text-xs sm:text-sm">
                   NO SIGNAL
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3 lg:space-y-6 flex flex-col justify-center">
              <StatBar label="優雅度" value={state.warmth} color="bg-amber-400" />
              <StatBar label="失控度" value={state.chaos} color="bg-red-500" />
              <StatBar label="濾波度" value={state.bEnergy} color="bg-purple-500" />
            </div>
          </div>

          <div className="mt-auto pt-4 hidden lg:block border-t border-stone-800">
             <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-2 font-black">機房回報</p>
             <p className="text-sm font-medium text-stone-300 leading-relaxed line-clamp-3">
                {state.lastResponse?.reaction || "等待訪談開始..."}
             </p>
          </div>
        </div>

        {/* Right Content Panel (Main Content) */}
        <div className="flex-1 flex flex-col bg-stone-50 overflow-hidden relative">
          {loading ? (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center space-y-6 bg-stone-50/90 backdrop-blur-sm">
              <div className="w-12 h-12 border-[4px] border-stone-200 border-t-amber-600 rounded-full animate-spin"></div>
              <p className="text-stone-500 font-black text-sm tracking-[0.2em] uppercase animate-pulse">音軌處理中...</p>
            </div>
          ) : null}

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 lg:p-12 xl:p-16">
            {state.phase === 'START' && (
              <div className="space-y-8 lg:space-y-12 max-w-2xl mx-auto">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl serif font-black text-stone-800 leading-tight">好家庭錄音室<br/>準備就緒。</h2>
                <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-medium">
                  你是電台製作人。面對失控的嘉賓，你必須守住優雅的底線。
                </p>
                <div className="space-y-4">
                  <p className="text-xs font-black text-stone-400 uppercase tracking-widest border-b border-stone-200 pb-2">請選擇今日嘉賓：</p>
                  <div className="grid grid-cols-1 gap-4">
                    <GuestBtn onClick={() => handleStart(GuestType.SPIRITUAL)} title="靈性大師" desc="宇宙震動、昂宿星人" icon="✨" />
                    <GuestBtn onClick={() => handleStart(GuestType.ENTREPRENEUR)} title="成功學霸總" desc="極致自律、掠奪市場" icon="👔" />
                    <GuestBtn onClick={() => handleStart(GuestType.LOWEND)} title="低端閒聊家" desc="肚臍垢、鼻孔大砲" icon="💨" />
                  </div>
                </div>
              </div>
            )}

            {state.phase === 'INTERVIEW' && (
              <div className="space-y-8 lg:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
                <div className="p-6 sm:p-8 lg:p-10 bg-white rounded-[2rem] shadow-sm border border-stone-200">
                  <p className="text-xl sm:text-2xl lg:text-3xl text-stone-800 leading-[1.6] lg:leading-[1.7] font-bold whitespace-pre-wrap">
                    {state.lastResponse?.script}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.5em] mb-4">即時音訊監測：{state.lastResponse?.chaosDescription}</p>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
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
              <div className="space-y-8 lg:space-y-10 animate-in zoom-in-95 duration-700 max-w-3xl mx-auto">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl serif font-black text-stone-800 leading-tight">製作存檔。</h2>
                <div className="p-8 sm:p-10 lg:p-12 bg-amber-50 border-[4px] border-amber-200 rounded-[2.5rem] shadow-inner">
                  <p className="text-[10px] font-black text-amber-600 mb-6 uppercase tracking-[0.5em]">Broadcast Log Final</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 leading-relaxed whitespace-pre-wrap">
                    {state.finalTitle}
                  </p>
                </div>
                <button 
                  onClick={resetGame}
                  className="w-full py-5 sm:py-6 bg-stone-900 text-white rounded-[1.5rem] text-xl font-black hover:bg-stone-800 transition-all shadow-xl active:scale-[0.98] duration-300"
                >
                  開始下一場訪談
                </button>
              </div>
            )}
          </div>

          <div className="p-4 lg:p-8 border-t border-stone-200 bg-white/50 backdrop-blur-sm flex justify-between items-center text-[8px] sm:text-[10px] text-stone-400 font-black tracking-widest uppercase shrink-0">
            <span>UNIVERSAL STUDIO KIT V4.0</span>
            <span className="hidden sm:inline">EST. 1998 GOOD FAMILY</span>
            <span>MOBILE OPTIMIZED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="flex-1 lg:w-full space-y-1 sm:space-y-2">
    <div className="flex justify-between text-[8px] sm:text-[10px] uppercase font-black text-stone-500 tracking-wider">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1.5 sm:h-2 w-full bg-stone-800 rounded-full overflow-hidden p-0.5">
      <div className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${Math.min(100, value)}%` }}></div>
    </div>
  </div>
);

const GuestBtn: React.FC<{ onClick: () => void, title: string, desc: string, icon: string }> = ({ onClick, title, desc, icon }) => (
  <button 
    onClick={onClick}
    className="group flex items-center p-4 sm:p-6 bg-white border border-stone-200 rounded-xl sm:rounded-2xl hover:border-amber-400 hover:shadow-lg transition-all duration-300 text-left active:scale-[0.98]"
  >
    <span className="text-3xl sm:text-4xl mr-4 sm:mr-6 transform group-hover:rotate-6 transition-transform">{icon}</span>
    <div className="min-w-0">
      <h4 className="text-base sm:text-lg font-black text-stone-800 mb-0.5 truncate">{title}</h4>
      <p className="text-[10px] sm:text-xs text-stone-500 font-bold tracking-wide truncate">{desc}</p>
    </div>
  </button>
);

const ActionBtn: React.FC<{ onClick: () => void, text: string, theme: 'warm' | 'chaos' | 'neutral' }> = ({ onClick, text, theme }) => {
  const styles = {
    warm: "border-amber-200 text-amber-900 hover:bg-amber-100 bg-amber-50/40",
    chaos: "border-purple-200 text-purple-900 hover:bg-purple-100 bg-purple-50/40",
    neutral: "border-stone-200 text-stone-800 hover:bg-stone-100 bg-white"
  };
  return (
    <button 
      onClick={onClick}
      className={`w-full p-4 sm:p-6 text-left border rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg transition-all duration-300 font-black shadow-sm active:translate-y-0.5 leading-snug ${styles[theme]}`}
    >
      {text}
    </button>
  );
};

export default App;
