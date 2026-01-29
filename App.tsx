
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-stone-100">
      <div className="w-full max-w-7xl bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[650px] lg:min-h-[850px] border border-stone-200">
        
        {/* Left Stats Panel */}
        <div className="w-full lg:w-[40%] bg-stone-900 text-stone-100 p-8 sm:p-10 flex flex-col justify-between relative">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-xl sm:text-2xl serif font-black tracking-widest text-stone-400">GOOD FAMILY RADIO</h1>
              <div className="px-3 py-1 bg-red-600 text-white text-[9px] font-black rounded-full animate-pulse tracking-widest uppercase">ON AIR</div>
            </div>

            <div className="aspect-video bg-stone-800 rounded-2xl overflow-hidden mb-10 border border-stone-700 shadow-2xl">
              {state.lastResponse?.imageUrl ? (
                <img src={state.lastResponse.imageUrl} alt="Studio" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-500 font-bold text-lg">
                   等待波形訊號...
                </div>
              )}
            </div>

            <div className="space-y-8 flex-grow">
              <StatBar label="頻道優雅等級" value={state.warmth} color="bg-amber-400" />
              <StatBar label="現場崩潰指數" value={state.chaos} color="bg-red-500" />
              <StatBar label="消音濾波強度" value={state.bEnergy} color="bg-purple-500" />
            </div>

            <div className="mt-10 p-6 sm:p-8 bg-stone-800/50 rounded-[2rem] border border-stone-700/30 hidden sm:block">
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-4 font-black">機房現場回報</p>
              <p className="text-lg sm:text-xl font-medium text-stone-300 leading-relaxed">
                {state.lastResponse?.reaction || "這場錄音比我的人生還要荒腔走板。"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="w-full lg:w-[60%] p-8 sm:p-12 lg:p-20 flex flex-col justify-between bg-stone-50">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-[6px] border-stone-200 border-t-amber-600 rounded-full animate-spin"></div>
              <p className="text-stone-500 font-black text-xl sm:text-2xl tracking-[0.2em] uppercase">動態剪輯音軌中...</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
                {state.phase === 'START' && (
                  <div className="space-y-12">
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl serif font-black text-stone-800 leading-tight">好家庭錄音室<br/>準備就緒。</h2>
                    <p className="text-xl sm:text-2xl text-stone-600 leading-loose font-medium">
                      你是電台製作人。<br/>
                      面對失控的嘉賓，你必須守住優雅的底線。<br/><br/>
                      <span className="font-black text-stone-900 border-b-4 border-amber-400 pb-2 uppercase tracking-tighter">今日訪談名單：</span>
                    </p>
                    <div className="grid grid-cols-1 gap-5">
                      <GuestBtn onClick={() => handleStart(GuestType.SPIRITUAL)} title="靈性大師" desc="宇宙震動、昂宿星人的秘密" icon="✨" />
                      <GuestBtn onClick={() => handleStart(GuestType.ENTREPRENEUR)} title="成功學霸總" desc="極致自律、掠奪市場槓桿" icon="👔" />
                      <GuestBtn onClick={() => handleStart(GuestType.LOWEND)} title="低端閒聊家" desc="肚臍垢收集、生吞雞蛋挑戰" icon="💨" />
                    </div>
                  </div>
                )}

                {state.phase === 'INTERVIEW' && (
                  <div className="space-y-10 animate-in fade-in duration-500">
                    <div className="p-8 sm:p-10 bg-white rounded-[2.5rem] shadow-sm border border-stone-200">
                      <p className="text-2xl sm:text-3xl lg:text-4xl text-stone-800 leading-[1.6] lg:leading-[1.8] font-bold whitespace-pre-wrap">
                        {state.lastResponse?.script}
                      </p>
                    </div>
                    <div className="space-y-5">
                      <p className="text-[10px] sm:text-xs font-black text-stone-400 uppercase tracking-[0.5em] mb-6">即時監測：{state.lastResponse?.chaosDescription}</p>
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

                {state.phase === 'RESULT' && (
                  <div className="space-y-12 animate-in zoom-in-95 duration-700">
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl serif font-black text-stone-800 leading-tight">製作存檔。</h2>
                    <div className="p-10 sm:p-14 bg-amber-50 border-[8px] border-amber-200 rounded-[3rem] shadow-inner">
                      <p className="text-[10px] font-black text-amber-600 mb-8 uppercase tracking-[0.8em]">Broadcast Log Archive</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 leading-snug whitespace-pre-wrap">
                        {state.finalTitle}
                      </p>
                    </div>
                    <button 
                      onClick={resetGame}
                      className="w-full py-8 bg-stone-900 text-white rounded-[2.5rem] text-2xl sm:text-3xl font-black hover:bg-stone-800 transition-all shadow-2xl active:scale-[0.98] duration-300"
                    >
                      開啟下一場製作
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="mt-12 pt-10 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-400 font-black tracking-[0.4em] uppercase space-y-3 sm:space-y-0 text-center">
            <span>Production Kit v3.5 Universal</span>
            <span>Est. 1998 Studio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-[11px] uppercase font-black text-stone-400 tracking-[0.2em]">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2.5 w-full bg-stone-800 rounded-full overflow-hidden p-0.5 shadow-inner">
      <div className={`h-full ${color} rounded-full transition-all duration-1000 ease-out shadow-lg`} style={{ width: `${Math.min(100, value)}%` }}></div>
    </div>
  </div>
);

const GuestBtn: React.FC<{ onClick: () => void, title: string, desc: string, icon: string }> = ({ onClick, title, desc, icon }) => (
  <button 
    onClick={onClick}
    className="group flex items-center p-8 bg-white border-2 border-stone-100 rounded-[2rem] hover:border-amber-400 hover:shadow-2xl transition-all duration-500 text-left active:scale-[0.97]"
  >
    <span className="text-4xl sm:text-6xl mr-8 transform group-hover:rotate-12 transition-transform duration-500">{icon}</span>
    <div className="min-w-0">
      <h4 className="text-xl sm:text-2xl font-black text-stone-800 mb-1 truncate">{title}</h4>
      <p className="text-sm sm:text-base text-stone-500 font-bold tracking-wide truncate">{desc}</p>
    </div>
  </button>
);

const ActionBtn: React.FC<{ onClick: () => void, text: string, theme: 'warm' | 'chaos' | 'neutral' }> = ({ onClick, text, theme }) => {
  const styles = {
    warm: "border-amber-200 text-amber-900 hover:bg-amber-100 bg-amber-50/30",
    chaos: "border-purple-200 text-purple-900 hover:bg-purple-100 bg-purple-50/30",
    neutral: "border-stone-200 text-stone-800 hover:bg-stone-100 bg-white"
  };
  return (
    <button 
      onClick={onClick}
      className={`w-full p-6 sm:p-8 text-left border-2 rounded-[1.5rem] text-lg sm:text-xl lg:text-2xl transition-all duration-300 font-black shadow-sm active:translate-y-1 leading-snug ${styles[theme]}`}
    >
      {text}
    </button>
  );
};

export default App;
