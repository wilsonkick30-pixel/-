
import React, { useState, useEffect, useCallback } from 'react';
import { GuestType, GameState, GeminiResponse } from './types';
import { generateScene, generateStudioImage, generateFinalResult } from './geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    warmth: 50,
    chaos: 0,
    bEnergy: 0,
    history: [],
    currentGuest: null,
    phase: 'START',
  });

  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');

  const updateState = (updates: Partial<GameState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleStart = async (guest: GuestType) => {
    setLoading(true);
    setLoadingMsg(`正在調整頻率，迎接${guest}...`);
    try {
      const scene = await generateScene(guest, "剛入座，準備開始訪談", state.chaos, state.warmth);
      const imageUrl = await generateStudioImage(scene.imagePrompt);
      
      updateState({
        currentGuest: guest,
        phase: 'INTERVIEW',
        lastResponse: { ...scene, imageUrl },
        history: [...state.history, `選擇嘉賓: ${guest}`]
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string, impact: { w: number, c: number, b: number }) => {
    if (!state.currentGuest) return;
    
    setLoading(true);
    setLoadingMsg("錄音師正在絕望地調整推桿...");
    try {
      const nextWarmth = Math.max(0, state.warmth + impact.w);
      const nextChaos = Math.max(0, state.chaos + impact.c);
      const nextBEnergy = state.bEnergy + impact.b;

      if (state.history.length >= 4) {
        // Final transition
        updateState({ phase: 'EDITING', warmth: nextWarmth, chaos: nextChaos, bEnergy: nextBEnergy });
        handleFinalize(nextBEnergy, nextWarmth, nextChaos);
      } else {
        const scene = await generateScene(state.currentGuest, action, nextChaos, nextWarmth);
        const imageUrl = await generateStudioImage(scene.imagePrompt);
        
        updateState({
          warmth: nextWarmth,
          chaos: nextChaos,
          bEnergy: nextBEnergy,
          lastResponse: { ...scene, imageUrl },
          history: [...state.history, action]
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalize = async (b: number, w: number, c: number) => {
    setLoading(true);
    setLoadingMsg("正在將垃圾剪輯成金礦...");
    try {
      const finalTitle = await generateFinalResult(state.history, b, w, c);
      updateState({ phase: 'RESULT', finalTitle });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetGame = () => {
    updateState({
      warmth: 50,
      chaos: 0,
      bEnergy: 0,
      history: [],
      currentGuest: null,
      phase: 'START',
      lastResponse: undefined,
      finalTitle: undefined
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-stone-200">
        
        {/* Left: Visualization & Stats */}
        <div className="w-full md:w-1/2 bg-stone-900 text-stone-100 p-6 flex flex-col justify-between relative">
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-xl serif font-bold tracking-widest text-stone-400">GOOD FAMILY RADIO</h1>
              <div className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded animate-pulse">ON AIR</div>
            </div>

            <div className="aspect-video bg-stone-800 rounded-xl overflow-hidden mb-6 border border-stone-700 shadow-inner">
              {state.lastResponse?.imageUrl ? (
                <img src={state.lastResponse.imageUrl} alt="Studio Scene" className="w-full h-full object-cover opacity-80" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-500 italic">
                   錄音室正在靜音...
                </div>
              )}
            </div>

            <div className="space-y-4">
              <StatBar label="暖心值 (優雅度)" value={state.warmth} color="bg-amber-400" />
              <StatBar label="混亂度 (火藥味)" value={state.chaos} color="bg-red-500" />
              <StatBar label="B 聲能量 (嘲諷值)" value={state.bEnergy} color="bg-purple-500" />
            </div>
          </div>

          <div className="mt-8 p-4 bg-stone-800 rounded-lg border border-stone-700">
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-bold">錄音師即時點評</p>
            <p className="text-sm italic text-stone-300">
              {state.lastResponse?.reaction || "「這咖啡...怎麼跟尿一樣苦。」"}
            </p>
          </div>
        </div>

        {/* Right: Narrative & Controls */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between bg-stone-50">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-stone-300 border-t-amber-600 rounded-full animate-spin"></div>
              <p className="text-stone-500 serif italic">{loadingMsg}</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {state.phase === 'START' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl serif font-bold text-stone-800">歡迎來到，好家庭錄音室。</h2>
                    <p className="text-stone-600 leading-relaxed">
                      你是這裡的製作人。你的工作是將那些在外面胡言亂語的「自我過剩者」，包裝成符合電台品牌定位的溫暖心靈雞湯。<br/><br/>
                      <span className="font-bold text-stone-800">今天，你想處理哪一種垃圾？</span>
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      <GuestBtn onClick={() => handleStart(GuestType.SPIRITUAL)} title="靈性大師" desc="「我的頻率正在與宇宙共振...」" icon="✨" />
                      <GuestBtn onClick={() => handleStart(GuestType.ENTREPRENEUR)} title="成功學霸總" desc="「我看過凌晨四點的巴黎...」" icon="👔" />
                      <GuestBtn onClick={() => handleStart(GuestType.LOWEND)} title="低端閒聊家" desc="「你聽過那個體味的笑話嗎？」" icon="💨" />
                    </div>
                  </div>
                )}

                {state.phase === 'INTERVIEW' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-stone-200">
                      <p className="text-stone-800 leading-relaxed whitespace-pre-wrap serif italic">
                        {state.lastResponse?.script}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-tighter mb-2">音軌診斷: {state.lastResponse?.chaosDescription}</p>
                      <ActionBtn onClick={() => handleAction("強行優雅轉場", { w: 15, c: -10, b: 0 })} text="「這確實很有趣，但家庭才是我們的根...」" theme="warm" />
                      <ActionBtn onClick={() => handleAction("直接進廣告 + 狂按 B 聲", { w: -10, c: 20, b: 15 })} text="（按住 B 鍵不放）「導播，進一段廣告！」" theme="chaos" />
                      <ActionBtn onClick={() => handleAction("犀利質問內核", { w: 5, c: 5, b: 5 })} text="「所以，這跟您的童年陰影有關係嗎？」" theme="neutral" />
                    </div>
                  </div>
                )}

                {state.phase === 'RESULT' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-4xl serif font-bold text-stone-800">剪輯完畢。</h2>
                    <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-2xl">
                      <p className="text-xs font-bold text-amber-600 mb-2 uppercase tracking-widest">最終節目單標題</p>
                      <p className="text-xl serif text-stone-900 leading-relaxed font-bold">
                        {state.finalTitle}
                      </p>
                    </div>
                    <button 
                      onClick={resetGame}
                      className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition shadow-lg"
                    >
                      再次挑戰製作人的極限
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="mt-6 pt-6 border-t border-stone-200 flex justify-between items-center text-[10px] text-stone-400 font-mono tracking-widest uppercase">
            <span>Ver. 1.0.4 Hardcore Engine</span>
            <span>Studio: Good Family</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] uppercase font-bold text-stone-500">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${Math.min(100, value)}%` }}></div>
    </div>
  </div>
);

const GuestBtn: React.FC<{ onClick: () => void, title: string, desc: string, icon: string }> = ({ onClick, title, desc, icon }) => (
  <button 
    onClick={onClick}
    className="group flex items-center p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-md transition text-left"
  >
    <span className="text-3xl mr-4 grayscale group-hover:grayscale-0 transition">{icon}</span>
    <div>
      <h4 className="font-bold text-stone-800">{title}</h4>
      <p className="text-xs text-stone-500">{desc}</p>
    </div>
  </button>
);

const ActionBtn: React.FC<{ onClick: () => void, text: string, theme: 'warm' | 'chaos' | 'neutral' }> = ({ onClick, text, theme }) => {
  const styles = {
    warm: "border-amber-200 text-amber-900 hover:bg-amber-100",
    chaos: "border-purple-200 text-purple-900 hover:bg-purple-100",
    neutral: "border-stone-200 text-stone-800 hover:bg-stone-100"
  };
  return (
    <button 
      onClick={onClick}
      className={`w-full p-3 text-left border rounded-lg text-sm transition font-medium ${styles[theme]}`}
    >
      {text}
    </button>
  );
};

export default App;
