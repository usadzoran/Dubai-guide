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

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Top Header */}
      <Header />

      {/* Main Content Dynamic Switching */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <Hero />
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

      {/* Global Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <BottomNav />

      {/* Global Report Fraud Modal */}
      <ReportModal />
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
