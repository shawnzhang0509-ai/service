import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { baseCategories } from '@/data/services';
import {
  UserPlus, Briefcase, MapPin, Phone, Mail, Award,
  FileText, CheckCircle, Upload, Star, Users, TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProviderPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-teal-600" />
              </div>
              <Badge className="mb-4 bg-teal-600 text-white">{t('provider_success_title')}</Badge>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {t('provider_success_desc')} <strong className="text-teal-700">{t('provider_success_days')}</strong>
              </p>
              <div className="bg-teal-50 rounded-xl p-4 mb-6 max-w-md mx-auto text-left">
                <h4 className="font-semibold text-teal-800 mb-2">{t('provider_success_review')}：</h4>
                <ol className="text-sm text-teal-700 space-y-1 list-decimal list-inside">
                  <li>{t('provider_step_check')}</li>
                  <li>{t('provider_step_verify')}</li>
                  <li>{t('provider_step_confirm')}</li>
                  <li>{t('provider_step_active')}</li>
                </ol>
              </div>
              <Button onClick={() => { setSubmitted(false); setStep(1); setSelectedCategories([]); }}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                {t('provider_success_home')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-700 to-cyan-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-0">{t('provider_recruiting')}</Badge>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('provider_title')}<br />{t('provider_subtitle')}</h1>
              <p className="text-teal-100 text-lg leading-relaxed mb-6">{t('provider_desc')}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Users className="w-5 h-5 text-teal-300" />
                  <span className="text-sm">500+ {t('provider_stat1')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <TrendingUp className="w-5 h-5 text-teal-300" />
                  <span className="text-sm">{t('provider_stat2')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Star className="w-5 h-5 text-teal-300" />
                  <span className="text-sm">{t('provider_stat3')}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                {[
                  { name: 'Mr Li', nameCn: '李师傅', service: 'Plumbing', detail: 'provider_stat1' },
                  { name: 'Mr Wang', nameCn: '王师傅', service: 'Electrical', detail: 'provider_stat1' },
                  { name: 'Mike', nameCn: '', service: 'Fence Repair', detail: 'provider_stat1' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${['bg-teal-400 text-teal-900', 'bg-cyan-400 text-cyan-900', 'bg-amber-400 text-amber-900'][i]}`}>
                      {['李', '王', 'M'][i]}
                    </div>
                    <div>
                      <p className="font-semibold">{p.name} {p.nameCn} - {p.service}</p>
                      <p className="text-sm text-teal-200">{t('provider_stat1')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <span className="font-bold">1</span>
              <span className="text-sm">{t('provider_step1')}</span>
            </div>
            <div className="h-0.5 flex-1 bg-gray-200 rounded">
              <div className={`h-full bg-teal-600 rounded transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <span className="font-bold">2</span>
              <span className="text-sm">{t('provider_step2')}</span>
            </div>
          </div>

          {step === 1 ? (
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-teal-600" />
                  {t('provider_step1')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">{t('provider_name')} <span className="text-red-500">*</span></Label>
                    <Input placeholder={t('provider_name_ph')} required />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">{t('provider_mobile')} <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder={t('ph_phone')} className="pl-10" required />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">{t('provider_email')} <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input type="email" placeholder={t('ph_email')} className="pl-10" required />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">{t('provider_area')} <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder={t('ph_location')} className="pl-10" required />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">{t('provider_exp')}</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder={t('opt_select')} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3">{t('exp_1_3')}</SelectItem>
                        <SelectItem value="3-5">{t('exp_3_5')}</SelectItem>
                        <SelectItem value="5-10">{t('exp_5_10')}</SelectItem>
                        <SelectItem value="10+">{t('exp_10')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">{t('provider_insurance')}</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder={t('opt_select')} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">{t('ins_public')}</SelectItem>
                        <SelectItem value="no">{t('ins_none')}</SelectItem>
                        <SelectItem value="applying">{t('ins_applying')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-sm font-semibold mb-2 block">{t('provider_profile')}</Label>
                  <Textarea placeholder={t('provider_profile_ph')} className="min-h-[100px]" />
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setStep(2)} className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                    {t('provider_step2')} &rarr;
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="border-gray-100 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-teal-600" />
                    {t('provider_select_cat')}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{t('provider_select_desc')}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {baseCategories.map((cat) => (
                      <div key={cat.id}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedCategories.includes(cat.id) ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => toggleCategory(cat.id)}>
                        <div className="flex items-center gap-3">
                          <Checkbox checked={selectedCategories.includes(cat.id)} onCheckedChange={() => toggleCategory(cat.id)} />
                          <div className={`w-10 h-10 rounded-lg ${cat.bgColor} flex items-center justify-center ${cat.color}`}>
                            <span className="text-sm font-bold">{t(cat.nameKey).charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{t(cat.nameKey)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedCategories.length === 0 && <p className="text-sm text-amber-600 mt-3">{t('provider_select_warn')}</p>}
                </CardContent>
              </Card>

              <Card className="border-gray-100 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Award className="w-5 h-5 text-teal-600" />
                    {t('provider_licence')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">{t('provider_licence_type')}</Label>
                    <div className="space-y-2">
                      {['lic_elec', 'lic_plumb', 'lic_lbp', 'lic_none', 'opt_other'].map((key) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox id={`license-${key}`} />
                          <Label htmlFor={`license-${key}`} className="text-sm font-normal cursor-pointer">{t(key)}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">{t('provider_upload')}</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-teal-300 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">{t('provider_upload_desc')}</p>
                      <p className="text-xs text-gray-400 mt-1">{t('provider_upload_types')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-100 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-600" />
                    {t('provider_service_detail')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">{t('provider_select_desc')}</Label>
                    <Textarea placeholder={t('provider_profile_ph')} className="min-h-[100px]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">{t('provider_service_area')}</Label>
                      <Input placeholder={t('ph_provider_area')} />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">{t('provider_work_hours')}</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder={t('opt_select')} /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekday">{t('provider_weekday')}</SelectItem>
                          <SelectItem value="weekend">{t('provider_weekend')}</SelectItem>
                          <SelectItem value="evening">{t('provider_evening')}</SelectItem>
                          <SelectItem value="anytime">{t('provider_anytime')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  {t('provider_back')}
                </Button>
                <Button type="submit" size="lg"
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg px-8"
                  disabled={selectedCategories.length === 0}>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {t('provider_submit')}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
