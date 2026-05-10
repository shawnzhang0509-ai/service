import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, ShieldCheck, FileCheck, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const valueProps = [
  {
    icon: <Zap className="w-5 h-5" />,
    key: 'vp_1_title',
    descKey: 'vp_1_desc',
    bg: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-500',
    text: 'text-amber-900',
  },
  {
    icon: <FileCheck className="w-5 h-5" />,
    key: 'vp_2_title',
    descKey: 'vp_2_desc',
    bg: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-500',
    text: 'text-blue-900',
  },
  {
    icon: <Award className="w-5 h-5" />,
    key: 'vp_3_title',
    descKey: 'vp_3_desc',
    bg: 'bg-teal-50 border-teal-200',
    iconBg: 'bg-teal-500',
    text: 'text-teal-900',
  },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[680px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/hero-bg.jpg" alt="NZ Home Services" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 text-teal-300 text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            {t('hero_badge')}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-5">
            {t('hero_title1')}<br />
            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              {t('hero_title2')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
            {t('hero_subtitle')}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/quote">
              <Button size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white shadow-xl hover:shadow-2xl transition-all px-8 text-base font-semibold h-12">
                {t('hero_cta1')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/provider">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/15 backdrop-blur-sm px-8 text-base font-semibold h-12 bg-white/5">
                {t('hero_cta2')}
              </Button>
            </Link>
          </div>

          {/* 3 Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {valueProps.map((vp, i) => (
              <div key={i} className={`${vp.bg} border backdrop-blur-sm rounded-xl p-4`}>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className={`w-8 h-8 ${vp.iconBg} rounded-lg flex items-center justify-center text-white`}>
                    {vp.icon}
                  </div>
                  <span className={`font-bold text-sm ${vp.text}`}>{t(vp.key)}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{t(vp.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
