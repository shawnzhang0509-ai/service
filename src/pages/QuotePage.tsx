import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { baseCategories, getTranslatedFields, getTranslatedGuides } from '@/data/services';
import QuoteForm from '@/sections/QuoteForm';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fence, Paintbrush, Sparkles, Droplets, Zap, Truck, Sofa, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  Fence: <Fence className="w-6 h-6" />,
  Paintbrush: <Paintbrush className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Droplets: <Droplets className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Truck: <Truck className="w-6 h-6" />,
  Sofa: <Sofa className="w-6 h-6" />,
};

export default function QuotePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showGuidance, setShowGuidance] = useState(true);

  const categoryId = searchParams.get('category');

  useEffect(() => {
    setSelectedId(categoryId);
  }, [categoryId]);

  const selectCategory = (id: string) => {
    setSearchParams({ category: id });
    setSelectedId(id);
    setShowGuidance(true);
  };

  const clearCategory = () => {
    setSearchParams({});
    setSelectedId(null);
  };

  const selectedCat = baseCategories.find((c) => c.id === selectedId);

  const translatedFields = useMemo(() => {
    if (!selectedId) return [];
    return getTranslatedFields(selectedId, t);
  }, [selectedId, t]);

  const translatedGuides = useMemo(() => {
    if (!selectedId) return [];
    return getTranslatedGuides(selectedId, t);
  }, [selectedId, t]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          {selectedId && (
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="sm" onClick={clearCategory} className="text-gray-500">
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t('quote_back')}
              </Button>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {selectedId && selectedCat
              ? `${t(selectedCat.nameKey)} - ${t('quote_title_cat')}`
              : t('quote_title')}
          </h1>
          <p className="text-gray-500 text-lg">
            {selectedId ? t('quote_desc_cat') : t('quote_desc')}
          </p>
        </div>

        {!selectedId ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {baseCategories.map((cat) => (
              <Card
                key={cat.id}
                className="group cursor-pointer hover:shadow-lg transition-all border-gray-200"
                onClick={() => selectCategory(cat.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl ${cat.bgColor} flex items-center justify-center shrink-0 ${cat.color}`}>
                      {iconMap[cat.icon]}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-teal-700 transition-colors">
                        {t(cat.nameKey)}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{t(`desc_${cat.id}`)}</p>
                      <Badge variant="outline" className="text-xs">
                        {t('services_price_label')} {cat.averagePrice} {t(cat.unitKey)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          selectedCat && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <QuoteForm
                  catId={selectedCat.id}
                  formFields={translatedFields}
                />
              </div>

              <div className="space-y-6">
                <Card className="border-gray-100 overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <img src={selectedCat.image} alt={t(selectedCat.nameKey)} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-5">
                    <div className={`w-12 h-12 rounded-xl ${selectedCat.bgColor} flex items-center justify-center mb-3 ${selectedCat.color}`}>
                      {iconMap[selectedCat.icon]}
                    </div>
                    <h3 className="font-bold text-gray-900">{t(selectedCat.nameKey)}</h3>
                  </CardContent>
                </Card>

                <Card className="border-gray-100">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">{t('sidebar_guide')}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowGuidance(!showGuidance)}
                        className="text-teal-600 h-auto py-1"
                      >
                        {showGuidance ? t('sidebar_hide') : t('sidebar_show')}
                      </Button>
                    </div>
                    {showGuidance && (
                      <div className="space-y-4">
                        {translatedGuides.map((guide, idx) => (
                          <div key={idx} className="border-l-3 border-l-teal-400 pl-4 py-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-800 text-sm">{guide.title}</h4>
                              <span className="text-sm font-bold text-teal-700">{guide.priceRange}</span>
                            </div>
                            <p className="text-xs text-gray-500">{guide.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
                  <CardContent className="p-5">
                    <Badge className="mb-3 bg-teal-600 text-white">{t('sidebar_ai_badge')}</Badge>
                    <h3 className="font-bold text-gray-900 mb-2">{t('sidebar_ai_title')}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{t('sidebar_ai_desc')}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
