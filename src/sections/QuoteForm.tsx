import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Send, User, Phone, Mail, MapPin, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import type { FormField } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

/** Values stored by service detail controls (matches rendered input types). */
type ServiceDetailValue = string | number | string[];

interface QuoteFormProps {
  catId: string;
  formFields: FormField[];
}

function fieldIsVisible(field: FormField, data: Record<string, unknown>, translate: (key: string) => string): boolean {
  const cond = field.visibleWhen;
  if (!cond) return true;
  const dep = data[cond.field];
  if (dep === undefined || dep === null || dep === '') return false;
  return cond.anyOfOptionKeys.some((key) => translate(key) === dep);
}

export default function QuoteForm({ catId, formFields }: QuoteFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Partial<Record<string, ServiceDetailValue>>>({});
  const [contactInfo, setContactInfo] = useState({
    name: '', phone: '', email: '', location: '',
    preferredDate: '', budget: '', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (name: string, value: ServiceDetailValue) => {
    setFormData((prev) => {
      const next: Partial<Record<string, ServiceDetailValue>> = { ...prev, [name]: value };
      if (name === 'serviceType' && value === t('opt_new_install')) {
        delete next.damageLevel;
      }
      if (name === 'fenceType' && value !== t('opt_wooden')) {
        delete next.woodType;
      }
      return next;
    });
  };

  const handleContactChange = (field: string, value: string) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote request:', {
      category: catId, fields: formData,
      contact: contactInfo, createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name];

    switch (field.type) {
      case 'text':
        return (
          <Input type="text" placeholder={field.placeholder} value={value || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)} className="w-full" />
        );
      case 'number':
        return (
          <Input type="number" placeholder={field.placeholder} value={value || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full" min={field.min} max={field.max} />
        );
      case 'select': {
        const selectVal = typeof value === 'string' ? value : '';
        return (
          <Select value={selectVal} onValueChange={(v) => handleFieldChange(field.name, v)}>
            <SelectTrigger className="w-full"><SelectValue placeholder={t('opt_select')} /></SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (<SelectItem key={opt} value={opt}>{opt}</SelectItem>))}
            </SelectContent>
          </Select>
        );
      }
      case 'textarea':
        return (
          <Textarea placeholder={field.placeholder} value={value || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)} className="w-full min-h-[100px]" />
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((opt) => {
              const list = Array.isArray(value) ? value : [];
              const checked = list.includes(opt);
              return (
                <div key={opt} className="flex items-center space-x-2">
                  <Checkbox id={`${field.name}-${opt}`} checked={checked}
                    onCheckedChange={(checked) => {
                      const current = Array.isArray(value) ? value : [];
                      if (checked) handleFieldChange(field.name, [...current, opt]);
                      else handleFieldChange(field.name, current.filter((v: string) => v !== opt));
                    }} />
                  <Label htmlFor={`${field.name}-${opt}`} className="text-sm font-normal cursor-pointer">{opt}</Label>
                </div>
              );
            })}
          </div>
        );
      case 'radio': {
        const radioVal = typeof value === 'string' ? value : '';
        return (
          <RadioGroup value={radioVal} onValueChange={(v) => handleFieldChange(field.name, v)} className="space-y-2">
            {field.options?.map((opt) => (
              <div key={opt} className="flex items-center space-x-2">
                <RadioGroupItem value={opt} id={`${field.name}-${opt}`} />
                <Label htmlFor={`${field.name}-${opt}`} className="text-sm font-normal cursor-pointer">{opt}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      }
      case 'date':
        return (
          <Input type="date" value={value || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)} className="w-full" />
        );
      case 'file':
        return (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-teal-300 transition-colors cursor-pointer">
            <p className="text-sm text-gray-500">{t('provider_upload_desc')}</p>
            <p className="text-xs text-gray-400 mt-1">{t('provider_upload_types')}</p>
          </div>
        );
      case 'range':
        return (
          <div className="space-y-2">
            <input type="range" min={field.min || 0} max={field.max || 100} step={field.step || 1}
              value={value || field.min || 0}
              onChange={(e) => handleFieldChange(field.name, Number(e.target.value))}
              className="w-full accent-teal-600" />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{field.min || 0}</span>
              <span className="font-medium text-teal-600">{value || field.min || 0}</span>
              <span>{field.max || 100}</span>
            </div>
          </div>
        );
      default: return null;
    }
  };

  if (submitted) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-10 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('quote_success_title')}</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {t('quote_success_desc')} <strong className="text-teal-700">{t('quote_success_hours')}</strong> {t('quote_success_tip')}
          </p>
          <div className="bg-teal-50 rounded-xl p-4 mb-6 max-w-md mx-auto text-left">
            <p className="text-sm text-teal-800">
              <strong>{t('quote_success_next')}：</strong><br />
              {t('quote_success_tip')}
            </p>
          </div>
          <Button onClick={() => {
            setSubmitted(false); setFormData({});
            setContactInfo({ name: '', phone: '', email: '', location: '', preferredDate: '', budget: '', notes: '' });
          }} className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
            {t('quote_another')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-current uppercase">{catId}</Badge>
            <CardTitle className="text-xl">{t('quote_service_details')}</CardTitle>
          </div>
          <p className="text-sm text-gray-500 mt-1">{t('quote_service_desc')}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {formFields
            .filter((field) => fieldIsVisible(field, formData, t))
            .map((field) => (
            <div key={field.name}>
              <Label className="text-sm font-semibold text-gray-800 mb-2 block">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderField(field)}
              {field.helperText && <p className="text-xs text-gray-400 mt-1.5">{field.helperText}</p>}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="w-5 h-5 text-teal-600" />
            {t('quote_contact_info')}
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">{t('quote_contact_desc')}</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-gray-800 mb-2 block">
                {t('quote_name')} <span className="text-red-500">*</span>
              </Label>
              <Input placeholder={t('ph_name')} value={contactInfo.name}
                onChange={(e) => handleContactChange('name', e.target.value)} required />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-800 mb-2 block">
                {t('quote_phone')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder={t('ph_phone')} value={contactInfo.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)} className="pl-10" required />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-gray-800 mb-2 block">{t('quote_email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="email" placeholder={t('ph_email')} value={contactInfo.email}
                  onChange={(e) => handleContactChange('email', e.target.value)} className="pl-10" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-800 mb-2 block">
                {t('quote_location')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder={t('ph_location')} value={contactInfo.location}
                  onChange={(e) => handleContactChange('location', e.target.value)} className="pl-10" required />
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-gray-800 mb-2 block">{t('quote_date')}</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="date" value={contactInfo.preferredDate}
                  onChange={(e) => handleContactChange('preferredDate', e.target.value)} className="pl-10" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-800 mb-2 block">{t('quote_budget')}</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder={t('ph_budget')} value={contactInfo.budget}
                  onChange={(e) => handleContactChange('budget', e.target.value)} className="pl-10" />
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-800 mb-2 block">{t('quote_notes')}</Label>
            <Textarea placeholder={t('quote_notes_placeholder')}
              value={contactInfo.notes}
              onChange={(e) => handleContactChange('notes', e.target.value)} className="min-h-[80px]" />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg"
          className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all px-8">
          <Send className="w-5 h-5 mr-2" />
          {t('quote_submit')}
        </Button>
        <p className="text-sm text-gray-500">{t('quote_free')}</p>
      </div>
    </form>
  );
}
