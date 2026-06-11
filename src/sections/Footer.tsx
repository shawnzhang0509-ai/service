import { Link } from 'react-router';
import { Wrench, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/LanguageContext';
import { baseCategories } from '@/data/services';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">NZ Trade Hub</span>
                <span className="text-[10px] text-gray-400 -mt-0.5 leading-tight">Service Platform</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">{t('footer_tagline')}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400"><Mail className="w-4 h-4" /><span>contact@nztradehub.co.nz</span></div>
              <div className="flex items-center gap-2 text-gray-400"><Phone className="w-4 h-4" /><span>0800 NZTRADE</span></div>
              <div className="flex items-center gap-2 text-gray-400"><MapPin className="w-4 h-4" /><span>Auckland, New Zealand</span></div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer_services')}</h3>
            <ul className="space-y-2 text-sm">
              {baseCategories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/quote?category=${cat.id}`} className="hover:text-teal-400 transition-colors">
                    {t(cat.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer_links')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">{t('footer_home')}</Link></li>
              <li><Link to="/quote" className="hover:text-teal-400 transition-colors">{t('footer_quote')}</Link></li>
              <li><Link to="/provider" className="hover:text-teal-400 transition-colors">{t('footer_provider')}</Link></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">{t('footer_about')}</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">{t('footer_faq')}</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer_zone')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/provider" className="hover:text-teal-400 transition-colors">{t('footer_apply')}</Link></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">{t('footer_guide')}</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">{t('footer_quote_sys')}</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">{t('footer_ai')}</span></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>{new Date().getFullYear()} NZ Trade Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">{t('footer_privacy')}</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">{t('footer_terms')}</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">{t('footer_cookies')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
