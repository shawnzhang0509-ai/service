import { ClipboardList, MessageSquare, Scale, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

const stepIcons = [
  <ClipboardList className="w-7 h-7" />,
  <MessageSquare className="w-7 h-7" />,
  <Scale className="w-7 h-7" />,
  <CheckCircle className="w-7 h-7" />,
];

const stepColors = [
  'bg-teal-100 text-teal-700',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('hiw_title')}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {t('hiw_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white relative overflow-hidden">
              <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 leading-none select-none">
                {i}
              </div>
              <CardContent className="p-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${stepColors[i - 1]} flex items-center justify-center mb-5`}>
                  {stepIcons[i - 1]}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  {t(`hiw_step${i}_title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`hiw_step${i}_desc`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
