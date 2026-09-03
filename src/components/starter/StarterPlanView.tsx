import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Calculator, 
  ArrowRight, 
  Calendar, 
  Smartphone, 
  CreditCard, 
  Home, 
  Briefcase, 
  TrendingUp, 
  RotateCcw,
  Share2
} from 'lucide-react';
import { STARTER_PLAN_DAYS } from '../../data/starterPlan';

export const StarterPlanView: React.FC = () => {
  // Local state for interactive checkboxes, stored in localStorage
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dubaistart_completed_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Budget Calculator state
  const [housingCost, setHousingCost] = useState<number>(750);
  const [transportCost, setTransportCost] = useState<number>(300);
  const [foodCost, setFoodCost] = useState<number>(650);
  const [simCost, setSimCost] = useState<number>(125);
  const [bufferCost, setBufferCost] = useState<number>(300);

  const totalCalculated = housingCost + transportCost + foodCost + simCost + bufferCost;

  useEffect(() => {
    try {
      localStorage.setItem('dubaistart_completed_tasks', JSON.stringify(completedTaskIds));
    } catch {}
  }, [completedTaskIds]);

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  // Calculate total tasks across all days
  const allTasks = STARTER_PLAN_DAYS.flatMap(day => day.tasks.map(t => `${day.day}-${t}`));
  const completedCount = completedTaskIds.length;
  const progressPercentage = Math.round((completedCount / (allTasks.length || 1)) * 100);

  const resetAllProgress = () => {
    if (window.confirm('هل تريد إعادة تعيين كافة المهام المكتملة؟')) {
      setCompletedTaskIds([]);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>خطة الطريق العملية خطوة بخطوة</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          خطة أول أسبوع في دبي (First Week Plan)
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
          جدول زمني منظم لليالي والأيام السبعة الأولى، لتتجنب التشتت وتضمن إنهاء الإجراءات الضرورية بأعلى كفاءة وأقل تكلفة.
        </p>
      </div>

      {/* Progress Bar Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-10 shadow-lg">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <span className="text-xs font-bold text-amber-400 block">نسبة إنجاز مهام الأسبوع:</span>
            <span className="text-xl sm:text-2xl font-black text-white">
              {progressPercentage}% <span className="text-xs text-slate-400 font-normal">({completedCount} من {allTasks.length} مهمة)</span>
            </span>
          </div>

          <button
            onClick={resetAllProgress}
            className="p-2 text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة تعيين</span>
          </button>
        </div>

        <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 7-Day Timeline */}
      <div className="space-y-6 mb-14">
        {STARTER_PLAN_DAYS.map((dayItem) => (
          <div
            key={dayItem.day}
            className="bg-slate-900 border border-slate-800 hover:border-amber-400/30 rounded-2xl p-5 sm:p-6 shadow-md transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 font-black text-sm flex items-center justify-center shrink-0">
                  {dayItem.day}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    اليوم {dayItem.day}: {dayItem.title}
                  </h3>
                  <span className="text-xs text-slate-400">{dayItem.subtitle}</span>
                </div>
              </div>

              <div className="text-xs text-amber-400/90 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 w-fit">
                💡 {dayItem.estimatedBudget}
              </div>
            </div>

            {/* Checklist items for this day */}
            <div className="space-y-2.5">
              {dayItem.tasks.map((task, idx) => {
                const taskId = `${dayItem.day}-${task}`;
                const isChecked = completedTaskIds.includes(taskId);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleTask(taskId)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-amber-400/10 border-amber-400/30 text-amber-200'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <button className="mt-0.5 shrink-0 text-amber-400">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 fill-amber-400 text-slate-950" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-slate-400' : ''}`}>
                      {task}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {/* Estimated 1-Month Survival Budget Calculator (Prompt 13) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                حاسبة ميزانية أول شهر في دبي
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              كم تحتاج كحد أدنى للبقاء شهراً كاملاً حتى تجد عملاً؟ (تكلفة تقريبية واقعية)
            </p>
          </div>

          {/* Grand Total */}
          <div className="text-end bg-slate-950 p-3.5 rounded-2xl border border-amber-400/40 shrink-0">
            <span className="text-[11px] text-slate-400 block">إجمالي الشهر المقدر</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">
              {totalCalculated.toLocaleString()} <span className="text-xs text-white">درهم (AED)</span>
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              ≈ {(totalCalculated * 0.27).toFixed(0)} دولار أمريكي
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
          
          {/* Housing */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-white">
              <span className="font-semibold flex items-center gap-1.5">
                <Home className="w-4 h-4 text-amber-400" />
                <span>السكن (Bed Space / بارتيشن)</span>
              </span>
              <span className="font-bold text-amber-400">{housingCost} درهم</span>
            </div>
            <input
              type="range"
              min="500"
              max="1500"
              step="50"
              value={housingCost}
              onChange={(e) => setHousingCost(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>اقتصادي (500)</span>
              <span>متوسط (1000)</span>
              <span>خاص (1500)</span>
            </div>
          </div>

          {/* Transportation */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-white">
              <span className="font-semibold flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-sky-400" />
                <span>المواصلات (بطاقة نول الشهرية للمترو)</span>
              </span>
              <span className="font-bold text-sky-400">{transportCost} درهم</span>
            </div>
            <input
              type="range"
              min="150"
              max="400"
              step="25"
              value={transportCost}
              onChange={(e) => setTransportCost(Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>منطقة واحدة (150)</span>
              <span>منطقتين (250)</span>
              <span>كافة المناطق (350+)</span>
            </div>
          </div>

          {/* Food */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-white">
              <span className="font-semibold flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>الطعام ومشتريات السوبرماركت (طبخ في السكن)</span>
              </span>
              <span className="font-bold text-emerald-400">{foodCost} درهم</span>
            </div>
            <input
              type="range"
              min="400"
              max="1200"
              step="50"
              value={foodCost}
              onChange={(e) => setFoodCost(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>اقتصادي جداً (400)</span>
              <span>معتدل (750)</span>
              <span>وجبات خارجية (1200)</span>
            </div>
          </div>

          {/* Phone & SIM */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-white">
              <span className="font-semibold flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>شريحة الاتصال والإنترنت (e& أو Du)</span>
              </span>
              <span className="font-bold text-indigo-400">{simCost} درهم</span>
            </div>
            <input
              type="range"
              min="80"
              max="250"
              step="15"
              value={simCost}
              onChange={(e) => setSimCost(Number(e.target.value))}
              className="w-full accent-indigo-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>باقة أساسية (80)</span>
              <span>باقة تواصل (140)</span>
              <span>بيانات مكثفة (250)</span>
            </div>
          </div>

        </div>

        {/* Tip on Living */}
        <div className="mt-5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          💡 <strong>نصيحة ذهبية:</strong> يفضل أن يكون معك مبلغ يغطي شهرين على الأقل (حوالي 4,000 إلى 5,000 درهم إماراتي) لتفادي الضغط المالي خلال فترة البحث والمقابلات.
        </div>

      </div>

    </div>
  );
};
