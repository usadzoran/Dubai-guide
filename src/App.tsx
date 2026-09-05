import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
import { Hero } from './components/home/Hero';
import { CategoryCards } from './components/home/CategoryCards';
import { SafetyAlert } from './components/home/SafetyAlert';
import { AlgerianGuideBanner } from './components/home/AlgerianGuideBanner';
import { JobsView } from './components/jobs/JobsView';
import { HousingView } from './components/housing/HousingView';
import { RecruitmentView } from './components/recruitment/RecruitmentView';
import { SafetyView } from './components/safety/SafetyView';
import { StarterPlanView } from './components/starter/StarterPlanView';
import { MapView } from './components/map/MapView';
import { AlgerianGuideView } from './components/guide/AlgerianGuideView';
import { MoreView } from './components/more/MoreView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ReportModal } from './components/common/ReportModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AdTopBanner } from './components/ads/AdTopBanner';
import { AdHeroBanner } from './components/ads/AdHeroBanner';
import { AdFloatingBadge } from './components/ads/AdFloatingBadge';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminStatusBadge } from './components/admin/AdminStatusBadge';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 relative">
      {/* Top Promotional Ad Banner */}
      <AdTopBanner />

      {/* Secret Admin floating status badge when logged in */}
      <AdminStatusBadge />

      {/* Sticky Top Header */}
      <Header />

      {/* Main Content Dynamic Switching with mobile bottom nav spacing */}
      <main className="flex-1 pb-20 md:pb-0">
        {activeTab === 'home' && (
          <div>
            <Hero />
            <AdHeroBanner />
            <SafetyAlert />
            <CategoryCards />
            <AlgerianGuideBanner />
          </div>
        )}

        {activeTab === 'jobs' && <JobsView />}
        {activeTab === 'housing' && <HousingView />}
        {activeTab === 'recruitment' && <RecruitmentView />}
        {activeTab === 'safety' && <SafetyView />}
        {activeTab === 'starter-plan' && <StarterPlanView />}
        {activeTab === 'map' && <MapView />}
        {activeTab === 'algeria-guide' && <AlgerianGuideView />}
        {activeTab === 'more' && <MoreView />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating Corner Ad & Quick Assistance Widget */}
      <AdFloatingBadge />

      {/* Global Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <BottomNav />

      {/* Global Report Fraud Modal */}
      <ReportModal />

      {/* Protected Admin Secret Login Modal */}
      <AdminLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
