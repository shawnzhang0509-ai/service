import { Link } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fence, Paintbrush, Sparkles, Droplets, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  Fence: <Fence className="w-8 h-8" />,
  Paintbrush: <Paintbrush className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  Droplets: <Droplets className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
};

const catKeys: Record<string, { nameKey: string; descKey: string; image: string; icon: string; color: string; bgColor: string; price: string; unitKey: string }> = {
  fence: { nameKey: 'cat_fence', descKey: 'desc_fence', image: '/fence-service.jpg', icon: 'Fence', color: 'text-amber-700', bgColor: 'bg-amber-50', price: '$80-150', unitKey: 'unit_metre' },
  painting: { nameKey: 'cat_painting', descKey: 'desc_painting', image: '/painting-service.jpg', icon: 'Paintbrush', color: 'text-blue-700', bgColor: 'bg-blue-50', price: '$25-45', unitKey: 'unit_sqm' },
  cleaning: { nameKey: 'cat_cleaning', descKey: 'desc_cleaning', image: '/cleaning-service.jpg', icon: 'Sparkles', color: 'text-teal-700', bgColor: 'bg-teal-50', price: '$30-60', unitKey: 'unit_hour' },
  plumbing: { nameKey: 'cat_plumbing', descKey: 'desc_plumbing', image: '/plumbing-service.jpg', icon: 'Droplets', color: 'text-cyan-700', bgColor: 'bg-cyan-50', price: '$80-140', unitKey: 'unit_hour' },
  electrical: { nameKey: 'cat_electrical', descKey: 'desc_electrical', image: '/electrical-service.jpg', icon: 'Zap', color: 'text-amber-600', bgColor: 'bg-amber-50', price: '$90-150', unitKey: 'unit_hour' },
};

const catIds = ['fence', 'painting', 'cleaning', 'plumbing', 'electrical'];

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
          {catIds.map((id) => {
            const cat = catKeys[id];
            return (
              <Link key={id} to={`/quote?category=${id}`}>
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
                          {t(cat.descKey)}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {t('services_price_label')}：{cat.price} <span className="text-gray-400 text-xs">{t(cat.unitKey)}</span>
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
            );
          })}

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
