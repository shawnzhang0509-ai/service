import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import HowItWorks from '@/sections/HowItWorks';
import { useLanguage } from '@/context/LanguageContext';
import { Zap, FileCheck, Award, ShieldCheck, Users, TrendingUp } from 'lucide-react';

const valueProps = [
  {
    icon: <Zap className="w-10 h-10" />,
    titleKey: 'vp_1_title',
    descKey: 'vp_1_desc_long',
    color: 'bg-amber-100 text-amber-700',
    border: 'border-amber-200',
    stat: 'vp_1_stat',
    statNum: '3-5',
    statUnit: 'vp_1_stat_unit',
  },
  {
    icon: <FileCheck className="w-10 h-10" />,
    titleKey: 'vp_2_title',
    descKey: 'vp_2_desc_long',
    color: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200',
    stat: 'vp_2_stat',
    statNum: '100%',
    statUnit: 'vp_2_stat_unit',
  },
  {
    icon: <Award className="w-10 h-10" />,
    titleKey: 'vp_3_title',
    descKey: 'vp_3_desc_long',
    color: 'bg-teal-100 text-teal-700',
    border: 'border-teal-200',
    stat: 'vp_3_stat',
    statNum: '500+',
    statUnit: 'vp_3_stat_unit',
  },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Services />
        <HowItWorks />

        {/* 3 Core Value Propositions - Dedicated Section */}
        <section id="value-prop" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
                <ShieldCheck className="w-4 h-4" />
                {t('nav_why')}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t('vp_section_title')}
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                {t('vp_section_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valueProps.map((vp, i) => (
                <div key={i} className={`relative bg-white rounded-2xl border-2 ${vp.border} p-8 hover:shadow-xl transition-all duration-300 group`}>
                  <div className={`w-16 h-16 rounded-2xl ${vp.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {vp.icon}
                  </div>

                  <div className="absolute top-6 right-6 text-right">
                    <div className="text-3xl font-extrabold text-gray-900">{vp.statNum}</div>
                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">{t(vp.statUnit)}</div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 pr-20">
                    {t(vp.titleKey)}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-5">
                    {t(vp.descKey)}
                  </p>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{t(vp.stat)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-teal-600" />
                <div>
                  <div className="font-bold text-gray-900">3-5 Quotes</div>
                  <div className="text-xs text-gray-500">Average within 24h</div>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-teal-600" />
                <div>
                  <div className="font-bold text-gray-900">100% Verified</div>
                  <div className="text-xs text-gray-500">All providers checked</div>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-teal-600" />
                <div>
                  <div className="font-bold text-gray-900">Scope Defined</div>
                  <div className="text-xs text-gray-500">No surprises on delivery</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
