import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plane, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  CreditCard, 
  Compass, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Building,
  Coins
} from 'lucide-react';

export const AlgerianGuideView: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const guideSections = [
    {
      title: '1. ماذا تحتاج بدقة قبل السفر من بلدك؟',
      icon: <Plane className="w-5 h-5 text-amber-400" />,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            تأكد من استيفاء هذه المتطلبات لتفادي التعطل في مطار المغادرة أو مطار دبي:
          </p>
          <ul className="space-y-2 list-disc list-inside text-slate-300">
            <li><strong>جواز سفر صالح:</strong> صلاحية لا تقل عن 6 أشهر من تاريخ السفر.</li>
            <li><strong>تأشيرة دخول رسمية:</strong> تأشيرة سياحة (30 يوماً أو 60 يوماً). تأكد من صحتها عبر منصة ICP أو GDRFA.</li>
            <li><strong>تذكرة ذهاب وعودة مؤكدة:</strong> مطارات الجزائر والمغرب العربي تتطلب تذكرة عودة إلزامية لحاملي تأشيرة السياحة.</li>
            <li><strong>حجز فندقي أو عنوان إقامة:</strong> احفظ عنوان أول مكان ستنزل فيه ورقياً وعلى هاتفك.</li>
            <li><strong>الميزانية النقدية الكافية:</strong> يفضل حمل مبالغ باليورو (€) أو الدولار ($) نقداً لتصريفها فور وصولك بالدرهم الإماراتي في مراكز الصرافة.</li>
          </ul>
        </div>
      )
    },
    {
      title: '2. كيف تبحث عن وظيفة في دبي بدون خبرة خليجية سابقة؟',
      icon: <FileText className="w-5 h-5 text-sky-400" />,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            سوق دبي يختلف عن شمال إفريقيا في صياغة السيرة الذاتية واستراتيجية التقديم:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>السيرة الذاتية (CV):</strong> احذف تاريخ الميلاد الكامل والحالة الاجتماعية. ركز على الإنجازات والمهارات المباشرة. احرص أن تكون باللغة الإنجليزية.</li>
            <li><strong>رقم هاتف محلي إماراتي:</strong> أصحاب العمل والشركات في دبي نادراً ما يتصلون برقم أجنبي (+213 أو +212). احصل على شريحة محلية وضع الرقم في أعلى الـ CV فوراً.</li>
            <li><strong>تحسين حساب LinkedIn:</strong> غير موقعك على لينكدإن إلى "Dubai, United Arab Emirates" بمجرد وصولك لكي تظهر لمسؤولي التوظيف (Recruiters).</li>
            <li><strong>الوظائف السريعة للبداية:</strong> المبيعات والتجزئة (Retail Sales)، خدمة العملاء، المخازن واللوجستيات، المطاعم والفنادق، والأمن (بعد رخصة SIRA).</li>
          </ul>
        </div>
      )
    },
    {
      title: '3. أين تسكن بأمان وبأقل تكلفة شهرية؟',
      icon: <Building className="w-5 h-5 text-emerald-400" />,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            السكن هو أكبر بند في مصاريفك، وهذه المناطق هي الأكثر ملائمة للقادمين الجدد:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>ديرة (Deira):</strong> الرقة، المرقبات، أبو بكر الصديق، صلاح الدين. ميزتها وفرة الخدمات والمطاعم العربية والمترو في كل مكان. متوسط السرير: 500 - 750 درهم.</li>
            <li><strong>بر دبي (Bur Dubai):</strong> الفهيدي، الكرامة، الغبيبة. قريبة من مناطق الشركات وسهلة التنقل. متوسط السرير: 600 - 850 درهم.</li>
            <li><strong>النهدة (Al Nahda Dubai):</strong> هادئة وعائلية وواسعة. خيار رائع إذا كان معك زملاء للبحث عن بارتيشن مشترك.</li>
            <li><strong>قاعدة ذهبية:</strong> لا تدفع أي عربون قبل الدخول ومعاينة السرير والتأكد من توفر مكيف الهواء ونظافة المطبخ وفاتورة DEWA.</li>
          </ul>
        </div>
      )
    },
    {
      title: '4. تجنب النصب وسماسرة التأشيرات "الحرة"',
      icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300">
            ⚠️ <strong>تنبيه قانوني حاسم:</strong> لا يوجد في قانون العمل الإماراتي مسمى "فيزا حرة". هذه تسمية يطلقها السماسرة على تأشيرات شركات وهمية وتعتبر مخالفة لقانون العمل.
          </div>
          <ul className="space-y-2 list-disc list-inside">
            <li>أي شخص يطلب منك 8,000 إلى 15,000 درهم مقابل "فيزا حرة لمدة سنتين مع وظيفة مضمونة" هو سمسار غير قانوني يعرضك للمساءلة القانونية.</li>
            <li>تأشيرة العمل الحقيقية تصدرها الشركة التي توظفك مباشرة، والقانون الإماراتي يفرض على صاحب العمل تحمل كافة تكاليف التأشيرة والفحص الطبي بالكامل.</li>
            <li>تحقق من صلاحية أي تأشيرة أو تصريح عبر البوابة الرسمية للحكومة الاتحادية للهوية والجنسية (ICP).</li>
          </ul>
        </div>
      )
    },
    {
      title: '5. أول 24 ساعة في مطار دبي: ماذا تفعل خطوة بخطوة؟',
      icon: <Coins className="w-5 h-5 text-amber-300" />,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>شريحة الاتصال في المطار:</strong> تقدم إدارات الجوازات شريحة اتصال سياحية مجانية عند ختم الجواز (تحتوي على 1GB إنترنت)، أو يمكنك شراء شريحة رسمية من كشك Du أو e& في صالة الوصول.</li>
            <li><strong>بطاقة المترو (Nol Card):</strong> توجه إلى محطة مترو المطار (Terminal 1 أو Terminal 3) واشترِ "بطاقة نول الفضية (Silver Nol Card)" بسعر 25 درهم (تحتوي على 19 درهم رصيد). هي وسيلتك الأوفر للتنقل.</li>
            <li><strong>صرف العملات:</strong> اصرف ما يعادل 50 إلى 100 دولار فقط في المطار لدفع ثمن المترو ووجبة خفيفة. احتفظ ببقية أموالك لتصريفها في محلات الصرافة داخل المدينة (مثل الأنصاري أو الفردان) حيث يكون سعر الصرف أفضل بكثير.</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold mb-3">
          <span className="text-sm">🇩🇿 🇲🇦 🇹🇳 🇪🇬</span>
          <span>دليل مخصص للوافدين من شمال إفريقيا والوطن العربي</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          دليلك الشامل للبداية الصحيحة في دبي
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
          إرشادات ميدانية واقعية جمعت من تجارب حقيقية لآلاف الشباب العربي لتختصر عليك أخطاء البداية وتوفر ميزانيتك.
        </p>
      </div>

      {/* Accordion Guide Items */}
      <div className="space-y-4 mb-12">
        {guideSections.map((sec, idx) => {
          const isOpen = activeAccordion === idx;
          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all shadow-md"
            >
              <button
                onClick={() => setActiveAccordion(isOpen ? null : idx)}
                className="w-full text-start p-5 flex items-center justify-between gap-4 bg-slate-950/60 hover:bg-slate-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                    {sec.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {sec.title}
                  </h3>
                </div>

                <span className="text-amber-400 text-lg font-mono">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="p-5 sm:p-6 border-t border-slate-800/80 bg-slate-900/50">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab('starter-plan')}
          className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-slate-900 border border-amber-500/40 hover:border-amber-400 text-start transition-all"
        >
          <span className="text-amber-400 text-xs font-bold block mb-1">الخطوة التالية 🚀</span>
          <h4 className="text-base font-bold text-white mb-1">خطة أول 7 أيام بالجدول والحاسبة</h4>
          <p className="text-xs text-slate-400">انتقل لجدول المهام اليومية مع حاسبة ميزانية الشهر الأول.</p>
        </button>

        <button
          onClick={() => setActiveTab('safety')}
          className="p-5 rounded-2xl bg-gradient-to-r from-rose-500/20 to-slate-900 border border-rose-500/40 hover:border-rose-400 text-start transition-all"
        >
          <span className="text-rose-400 text-xs font-bold block mb-1">تنبيه الحماية 🛡️</span>
          <h4 className="text-base font-bold text-white mb-1">الحيل الست الأكثر شيوعاً وعقوباتها</h4>
          <p className="text-xs text-slate-400">راجع أرقام الطوارئ ومكافحة الاحتيال الرسمية في دبي.</p>
        </button>
      </div>

    </div>
  );
};
