import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import { Menu, X, Wrench, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const isHome = location.pathname === '/';

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'zh' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
                NZ Trade Hub
              </span>
              <span className="text-[10px] text-gray-500 -mt-0.5 leading-tight">
                {lang === 'en' ? "NZ's Local Services" : '新西兰生活服务平台'}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-teal-700">
              {t('nav_services')}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('value-prop')} className="text-gray-700 hover:text-teal-700">
              {t('nav_why')}
            </Button>
            <Link to="/provider">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-teal-700">
                {t('nav_provider')}
              </Button>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Prominent Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-teal-600 transition-colors text-sm font-semibold shadow-md"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? '中文' : 'English'}
            </button>
            <Link to="/quote">
              <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all text-sm font-semibold px-5">
                {t('nav_quote')}
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 shadow-lg">
          <Button variant="ghost" className="w-full justify-start" onClick={() => scrollToSection('services')}>
            {t('nav_services')}
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => scrollToSection('value-prop')}>
            {t('nav_why')}
          </Button>
          <Link to="/provider" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              {t('nav_provider')}
            </Button>
          </Link>
          <button
            onClick={() => { toggleLang(); setMobileOpen(false); }}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-gray-900 hover:bg-teal-600 rounded-full transition-colors"
          >
            <Globe className="w-4 h-4" />
            {lang === 'en' ? '切换到 中文' : 'Switch to English'}
          </button>
          <Link to="/quote" onClick={() => setMobileOpen(false)}>
            <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold">
              {t('nav_quote')}
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
