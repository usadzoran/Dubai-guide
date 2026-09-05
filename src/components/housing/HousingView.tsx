import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BedDouble, 
  MapPin, 
  Train, 
  DollarSign, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  X, 
  Filter,
  Bookmark,
  MessageCircle,
  Phone
} from 'lucide-react';
import { HOUSING_AREAS } from '../../data/housing';
import { HousingListing, HousingType, VerificationStatus } from '../../types';
import { HousingDetailModal } from './HousingDetailModal';
import { AdFeedCard } from '../ads/AdFeedCard';

export const HousingView: React.FC = () => {
  const { 
    housing, 
    searchQuery, 
    setSearchQuery, 
    selectedHousing, 
    setSelectedHousing, 
    savedHousingIds, 
    toggleSaveHousing 
  } = useApp();

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [nearMetroOnly, setNearMetroOnly] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const housingTypes: { id: string; label: string }[] = [
    { id: 'all', label: 'جميع أنواع السكن' },
    { id: 'bed_space', label: '🛏️ Bed Space (سرير)' },
    { id: 'shared_room', label: '👥 غرفة مشتركة' },
    { id: 'partition', label: '🚪 Partition (بارتيشن)' },
    { id: 'private_room', label: '🏠 غرفة خاصة' },
    { id: 'studio', label: '🏢 Studio (استوديو)' }
  ];

  const filteredListings = useMemo(() => {
    return housing.filter(item => {
      // Type
      if (selectedType !== 'all' && item.type !== selectedType) return false;

      // Area
      if (selectedArea !== 'all' && item.area !== selectedArea) return false;

      // Near Metro
      if (nearMetroOnly && !item.nearMetro) return false;

      // Status
      if (selectedStatus !== 'all' && item.verificationStatus !== selectedStatus) return false;

      // Price Range
      if (priceRange === 'under_500' && item.price >= 500) return false;
      if (priceRange === '500_700' && (item.price < 500 || item.price > 700)) return false;
      if (priceRange === '700_1000' && (item.price < 700 || item.price > 1000)) return false;
      if (priceRange === '1000_plus' && item.price <= 1000) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${item.title} ${item.address} ${item.area} ${item.description}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    });
  }, [housing, selectedType, selectedArea, priceRange, nearMetroOnly, selectedStatus, searchQuery]);

  const resetFilters = () => {
    setSelectedType('all');
    setSelectedArea('all');
    setPriceRange('all');
    setNearMetroOnly(false);
    setSelectedStatus('all');
    setSearchQuery('');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/25 text-xs font-bold mb-2">
          <BedDouble className="w-3.5 h-3.5" />
          <span>سكن للقادمين الجدد قرب المترو</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          أبحث عن سكن في دبي (Housing & Bed Space)
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
          خيارات سكن اقتصادية ومتنوعة (Bed Space، بارتيشن، غرف خاصة واستوديوهات) مرتبطة بمحطات المترو مع نظام تدقيق وفحص للتحذير من الاحتيال.
        </p>

        {/* Mandatory Warning Banner (Prompt 10) */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-slate-900 border-2 border-amber-400/60 shadow-lg text-amber-200 text-xs sm:text-sm flex items-start sm:items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <span className="font-extrabold text-amber-300 block sm:inline me-2 text-sm">
              قاعدة ذهبية لحمايتك:
            </span>
            <span>
              لا تحول عربونًا أبدًا قبل معاينة السكن والتحقق من العقد والجهة المؤجرة وفاتورة كهرباء دبي (DEWA). أي طلب لتحويل مسبق هو علامة خطر!
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-lg space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالمنطقة أو اسم المحطة أو التفاصيل (ديرة، بر دبي، النهدة، الاتحاد)..."
            className="w-full ps-10 pe-10 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 text-xs">
          
          {/* Housing Type */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">نوع السكن</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              {housingTypes.map(t => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Area */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">المنطقة</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              {HOUSING_AREAS.map(a => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">الميزانية الشهرية</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              <option value="all">كافة الأسعار</option>
              <option value="under_500">أقل من 500 درهم</option>
              <option value="500_700">500 – 700 درهم</option>
              <option value="700_1000">700 – 1000 درهم</option>
              <option value="1000_plus">أكثر من 1000 درهم</option>
            </select>
          </div>

          {/* Verification Filter */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">حالة التحقق والأمان</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              <option value="all">كافة الحالات</option>
              <option value="verified">🟢 معلومات موثقة</option>
              <option value="check_before_payment">🟡 تحقق قبل الدفع</option>
              <option value="suspicious">🔴 إعلانات مشبوهة / تحذير</option>
            </select>
          </div>

          {/* Near Metro Toggle */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-end">
            <button
              onClick={() => setNearMetroOnly(!nearMetroOnly)}
              className={`w-full p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                nearMetroOnly 
                  ? 'bg-sky-500/20 text-sky-400 border-sky-500/50' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Train className="w-3.5 h-3.5" />
              <span>قرب المترو فقط</span>
            </button>
          </div>

        </div>

      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
          <BedDouble className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">لا توجد خيارات سكن مطابقة للفلاتر</h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-4">
            جرب اختيار منطقة أخرى أو توسيع الميزانية المحددة
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredListings.map((item, index) => {
            const isSaved = savedHousingIds.includes(item.id);
            return (
              <React.Fragment key={item.id}>
                <div
                  className={`group bg-slate-900 border rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all ${
                    item.verificationStatus === 'suspicious'
                      ? 'border-rose-800/70 bg-rose-950/20'
                      : 'border-slate-800 hover:border-amber-400/50'
                  }`}
                >
                <div>
                  
                  {/* Photo Thumbnail */}
                  <div 
                    onClick={() => setSelectedHousing(item)}
                    className="relative h-44 w-full bg-slate-950 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={item.images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Price Pill */}
                    <div className="absolute bottom-2 start-2 px-3 py-1 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-amber-400 font-black text-sm">
                      {item.price} <span className="text-xs font-normal text-slate-300">درهم / شهر</span>
                    </div>

                    {/* Save button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSaveHousing(item.id); }}
                      className={`absolute top-2 end-2 p-2 rounded-xl backdrop-blur-md transition-colors ${
                        isSaved ? 'bg-amber-400 text-slate-950' : 'bg-slate-950/80 text-white hover:bg-slate-900'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-slate-950' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4">
                    
                    {/* Status & Metro Tag */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-2">
                      {item.verificationStatus === 'verified' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                          🟢 موثق
                        </span>
                      )}
                      {item.verificationStatus === 'check_before_payment' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/25">
                          🟡 عاين قبل الدفع
                        </span>
                      )}
                      {item.verificationStatus === 'suspicious' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          🔴 تنبيه: مشبوه
                        </span>
                      )}

                      {item.nearMetro && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-sky-500/10 text-sky-400 flex items-center gap-1">
                          <Train className="w-3 h-3" />
                          <span>{item.metroWalkMinutes} د دقائق للمترو</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setSelectedHousing(item)}
                      className="font-bold text-white text-sm sm:text-base group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1 mb-1.5"
                    >
                      {item.title}
                    </h3>

                    {/* Address */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{item.address}</span>
                    </div>

                    {/* Bills included pill */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-300 mb-3">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {item.billsIncluded ? 'فواتير مشمولة (DEWA + Net)' : 'فواتير منفصلة'}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {item.gender === 'men' ? 'شباب' : item.gender === 'women' ? 'سيدات' : 'مشترك'}
                      </span>
                    </div>

                  </div>

                </div>

                {/* Card Action Buttons */}
                <div className="p-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedHousing(item)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                  >
                    معاينة التفاصيل
                  </button>

                  {item.whatsapp && (
                    <a
                      href={`https://wa.me/${item.whatsapp}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن إعلان السكن: ${item.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors"
                      title="مراسلة واتساب"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}

                  <a
                    href={`tel:${item.contactPhone}`}
                    className="p-2 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 hover:bg-amber-400/30 transition-colors"
                    title="اتصال هاتفي"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

              </div>

              {index === 2 && (
                <div className="col-span-full">
                  <AdFeedCard placement="housing_feed" adIndex={0} />
                </div>
              )}
              {index === 5 && (
                <div className="col-span-full">
                  <AdFeedCard placement="housing_feed" adIndex={1} />
                </div>
              )}
            </React.Fragment>
          );
        })}
        </div>
      )}

      {/* Detail Modal */}
      <HousingDetailModal
        housing={selectedHousing}
        onClose={() => setSelectedHousing(null)}
      />

    </div>
  );
};
