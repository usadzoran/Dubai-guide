import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Trash2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    try {
      window.location.hash = '';
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  private handleReset = () => {
    try {
      localStorage.clear();
      window.location.hash = '';
      window.location.reload();
    } catch (e) {
      console.error(e);
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      const isDev = Boolean(import.meta.env.DEV);

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-cairo" dir="rtl">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <h2 className="text-xl font-bold text-white">حدث خطأ أثناء تحميل Dubai Guide</h2>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              نعتذر عن هذا العطل غير المتوقع. يمكنك تحديث الصفحة أو العودة مباشرة إلى الصفحة الرئيسية.
            </p>

            {isDev && this.state.error && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs font-mono text-rose-300 text-left overflow-auto max-h-28">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة تحميل الصفحة</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <Home className="w-4 h-4 text-amber-400" />
                <span>العودة إلى الصفحة الرئيسية</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={this.handleReset}
                className="text-[11px] text-slate-500 hover:text-slate-400 flex items-center justify-center gap-1 mx-auto transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>إعادة ضبط البيانات المحلية والتحديث</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
