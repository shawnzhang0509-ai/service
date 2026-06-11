import { Link } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fence, Paintbrush, Sparkles, Droplets, Zap, Truck, Sofa, ArrowRight } from 'lucide-react';
import { baseCategories } from '@/data/services';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  Fence: <Fence className="w-8 h-8" />,
  Paintbrush: <Paintbrush className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  Droplets: <Droplets className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Truck: <Truck className="w-8 h-8" />,
  Sofa: <Sofa className="w-8 h-8" />,
};

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-teal-700 border-teal-200 bg-teal-50">
            {t('services_badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('services_title')}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {t('services_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {baseCategories.map((cat) => (
              <Link key={cat.id} to={`/quote?category=${cat.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-100 cursor-pointer h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img src={cat.image} alt={t(cat.nameKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${cat.bgColor} flex items-center justify-center shrink-0 ${cat.color}`}>
                        {iconMap[cat.icon]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-teal-700 transition-colors">
                          {t(cat.nameKey)}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                          {t(`desc_${cat.id}`)}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {t('services_price_label')}：{cat.averagePrice} <span className="text-gray-400 text-xs">{t(cat.unitKey)}</span>
                          </span>
                          <span className="flex items-center text-sm text-teal-600 font-medium group-hover:translate-x-1 transition-transform">
                            {t('services_cta')}
                            <ArrowRight className="ml-1 w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
          ))}

          <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50 flex items-center justify-center min-h-[280px]">
            <CardContent className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">+</span>
              </div>
              <h3 className="font-bold text-gray-700 mb-2">{t('services_more_title')}</h3>
              <p className="text-sm text-gray-500 mb-4">{t('services_more_desc')}</p>
              <Link to="/provider">
                <span className="text-sm text-teal-600 font-medium hover:underline">
                  {t('services_more_join')}
                </span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
