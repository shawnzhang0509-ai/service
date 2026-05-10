import type { ServiceCategory, FormField } from '@/types';

// Raw form field definitions using translation keys
const rawFormFields: Record<string, Array<{
  name: string;
  labelKey: string;
  type: FormField['type'];
  optionKeys?: string[];
  placeholderKey?: string;
  required?: boolean;
  helperKey?: string;
  min?: number;
  max?: number;
  step?: number;
  visibleWhen?: FormField['visibleWhen'];
}>> = {
  fence: [
    { name: 'fenceType', labelKey: 'fl_fence_type', type: 'select', optionKeys: ['opt_wooden','opt_metal','opt_pvc','opt_concrete','opt_other'], required: true },
    { name: 'serviceType', labelKey: 'fl_service_type', type: 'select', optionKeys: ['opt_new_install','opt_partial','opt_full','opt_heighten','opt_other'], required: true },
    { name: 'totalLength', labelKey: 'fl_total_length', type: 'number', placeholderKey: 'ph_fence_length', required: true, helperKey: 'hlp_fence_length' },
    { name: 'fenceHeight', labelKey: 'fl_fence_height', type: 'select', optionKeys: ['opt_0_9','opt_1_2','opt_1_5','opt_1_8','opt_2_0'], required: true },
    { name: 'woodType', labelKey: 'fl_wood_pref', type: 'select', optionKeys: ['opt_pine','opt_treated','opt_hardwood','opt_redwood','opt_no_pref'], required: false, visibleWhen: { field: 'fenceType', anyOfOptionKeys: ['opt_wooden'] } },
    { name: 'damageLevel', labelKey: 'fl_damage', type: 'select', optionKeys: ['opt_minor','opt_moderate','opt_severe','opt_none'], required: true, visibleWhen: { field: 'serviceType', anyOfOptionKeys: ['opt_partial','opt_full','opt_heighten','opt_other'] } },
    { name: 'includeGate', labelKey: 'fl_need_gate', type: 'checkbox', optionKeys: ['opt_single','opt_double','opt_sliding','opt_no_gate'], required: false },
    { name: 'postType', labelKey: 'fl_post', type: 'radio', optionKeys: ['opt_wood_post','opt_metal_post','opt_concrete_post'], required: false },
  ],
  painting: [
    { name: 'paintArea', labelKey: 'fl_paint_area', type: 'select', optionKeys: ['opt_interior','opt_exterior','opt_roof','opt_doors','opt_whole','opt_other'], required: true },
    { name: 'areaSize', labelKey: 'fl_area_size', type: 'number', placeholderKey: 'ph_area', required: true, helperKey: 'hlp_paint_area' },
    { name: 'roomCount', labelKey: 'fl_room_count', type: 'number', placeholderKey: 'ph_rooms', required: false },
    { name: 'surfaceCondition', labelKey: 'fl_surface', type: 'select', optionKeys: ['opt_new_surface','opt_good','opt_fair','opt_poor'], required: true },
    { name: 'paintType', labelKey: 'fl_paint_type', type: 'select', optionKeys: ['opt_latex','opt_oil','opt_eco','opt_mould','opt_not_sure'], required: true },
    { name: 'colorChoice', labelKey: 'fl_colour', type: 'text', placeholderKey: 'ph_color', required: false, helperKey: 'hlp_colour' },
    { name: 'needPrimer', labelKey: 'fl_need_primer', type: 'radio', optionKeys: ['opt_yes','opt_no','opt_unsure'], required: false },
    { name: 'includeCeiling', labelKey: 'fl_ceiling', type: 'checkbox', optionKeys: ['opt_include'], required: false },
    { name: 'includeTrim', labelKey: 'fl_trim', type: 'checkbox', optionKeys: ['opt_yes','opt_no','opt_unsure'], required: false },
  ],
  cleaning: [
    { name: 'propertyType', labelKey: 'fl_prop_type', type: 'select', optionKeys: ['opt_apartment','opt_house','opt_townhouse','opt_commercial','opt_other'], required: true },
    { name: 'areaSize', labelKey: 'fl_area_size', type: 'number', placeholderKey: 'ph_area', required: true },
    { name: 'bedroomCount', labelKey: 'fl_bedrooms', type: 'select', optionKeys: ['opt_1','opt_2','opt_3','opt_4','opt_5plus'], required: true },
    { name: 'bathroomCount', labelKey: 'fl_bathrooms', type: 'select', optionKeys: ['opt_1','opt_1_5bath','opt_2','opt_2_5bath','opt_3plus_bath'], required: true },
    { name: 'cleaningType', labelKey: 'fl_cleaning_type', type: 'select', optionKeys: ['opt_regular','opt_deep','opt_move_in','opt_move_out','opt_post_reno','opt_other'], required: true },
    { name: 'frequency', labelKey: 'fl_frequency', type: 'select', optionKeys: ['opt_one_off','opt_weekly','opt_fortnightly','opt_monthly','opt_as_needed'], required: true },
    { name: 'specialServices', labelKey: 'fl_special', type: 'checkbox', optionKeys: ['opt_carpet','opt_window','opt_oven','opt_fridge','opt_cupboard','opt_outdoor'], required: false },
    { name: 'hasPets', labelKey: 'fl_pets', type: 'radio', optionKeys: ['opt_cat','opt_dog','opt_other_pet','opt_none_pet'], required: false, helperKey: 'hlp_pets' },
  ],
  plumbing: [
    { name: 'issueType', labelKey: 'fl_issue', type: 'select', optionKeys: ['opt_leak','opt_blocked','opt_tap','opt_toilet','opt_hot_water','opt_pipe','opt_kitchen_plumb','opt_other'], required: true },
    { name: 'urgency', labelKey: 'fl_urgency', type: 'select', optionKeys: ['opt_immediate','opt_24h','opt_this_week','opt_flexible'], required: true },
    { name: 'propertyType', labelKey: 'fl_prop_type', type: 'select', optionKeys: ['opt_house','opt_apartment','opt_townhouse','opt_commercial','opt_other'], required: true },
    { name: 'locationDetails', labelKey: 'fl_prob_loc', type: 'select', optionKeys: ['opt_kitchen','opt_bath_main','opt_bath_guest','opt_laundry','opt_garden','opt_basement','opt_multiple'], required: true },
    { name: 'description', labelKey: 'fl_prob_desc', type: 'textarea', placeholderKey: 'ph_desc_plumb', required: true, helperKey: 'hlp_plumb_desc' },
    { name: 'hasPhotos', labelKey: 'fl_photos', type: 'radio', optionKeys: ['opt_photo_yes','opt_photo_no'], required: false },
    { name: 'accessTime', labelKey: 'fl_avail', type: 'select', optionKeys: ['opt_weekday','opt_evening','opt_weekend','opt_anytime'], required: true },
  ],
  electrical: [
    { name: 'projectType', labelKey: 'fl_project', type: 'select', optionKeys: ['opt_fault','opt_light','opt_socket','opt_circuit_up','opt_safety','opt_switchboard','opt_outdoor_power','opt_other'], required: true },
    { name: 'urgency', labelKey: 'fl_urgency', type: 'select', optionKeys: ['opt_immediate','opt_24h','opt_this_week','opt_flexible'], required: true },
    { name: 'propertyType', labelKey: 'fl_prop_type', type: 'select', optionKeys: ['opt_house','opt_apartment','opt_townhouse','opt_commercial','opt_other'], required: true },
    { name: 'circuitCondition', labelKey: 'fl_circuit', type: 'select', optionKeys: ['opt_unknown','opt_old','opt_medium','opt_modern','opt_new_build'], required: false },
    { name: 'description', labelKey: 'fl_proj_desc', type: 'textarea', placeholderKey: 'ph_desc_elec', required: true },
    { name: 'itemCount', labelKey: 'fl_quantity', type: 'number', placeholderKey: 'ph_items', required: false },
    { name: 'needCertification', labelKey: 'fl_cert', type: 'radio', optionKeys: ['opt_need_coc','opt_no'], required: false, helperKey: 'hlp_cert' },
    { name: 'accessTime', labelKey: 'fl_avail', type: 'select', optionKeys: ['opt_weekday','opt_evening','opt_weekend','opt_anytime'], required: true },
  ],
};

// Guide keys for each category
const guideKeys: Record<string, Array<{ titleKey: string; descKey: string; priceRange: string }>> = {
  fence: [
    { titleKey: 'guide_fence_pine_title', descKey: 'guide_fence_pine_desc', priceRange: '$80 - $120 /米' },
    { titleKey: 'guide_fence_treated_title', descKey: 'guide_fence_treated_desc', priceRange: '$100 - $150 /米' },
    { titleKey: 'guide_fence_hard_title', descKey: 'guide_fence_hard_desc', priceRange: '$150 - $250 /米' },
    { titleKey: 'guide_fence_metal_title', descKey: 'guide_fence_metal_desc', priceRange: '$120 - $200 /米' },
    { titleKey: 'guide_fence_repair_title', descKey: 'guide_fence_repair_desc', priceRange: '$200 - $800 起' },
  ],
  painting: [
    { titleKey: 'guide_paint_int_title', descKey: 'guide_paint_int_desc', priceRange: '$25 - $45 /平方米' },
    { titleKey: 'guide_paint_ext_title', descKey: 'guide_paint_ext_desc', priceRange: '$35 - $55 /平方米' },
    { titleKey: 'guide_paint_roof_title', descKey: 'guide_paint_roof_desc', priceRange: '$45 - $70 /平方米' },
    { titleKey: 'guide_paint_new_title', descKey: 'guide_paint_new_desc', priceRange: '$20 - $35 /平方米' },
    { titleKey: 'guide_paint_re_title', descKey: 'guide_paint_re_desc', priceRange: '$40 - $60 /平方米' },
  ],
  cleaning: [
    { titleKey: 'guide_clean_reg_title', descKey: 'guide_clean_reg_desc', priceRange: '$30 - $50 /小时' },
    { titleKey: 'guide_clean_deep_title', descKey: 'guide_clean_deep_desc', priceRange: '$45 - $65 /小时' },
    { titleKey: 'guide_clean_move_title', descKey: 'guide_clean_move_desc', priceRange: '$350 - $800' },
    { titleKey: 'guide_clean_reno_title', descKey: 'guide_clean_reno_desc', priceRange: '$400 - $1000' },
    { titleKey: 'guide_clean_carpet_title', descKey: 'guide_clean_carpet_desc', priceRange: '$80 - $150 /房间' },
  ],
  plumbing: [
    { titleKey: 'guide_plumb_em_title', descKey: 'guide_plumb_em_desc', priceRange: '$120 - $250 /小时' },
    { titleKey: 'guide_plumb_reg_title', descKey: 'guide_plumb_reg_desc', priceRange: '$80 - $140 /小时' },
    { titleKey: 'guide_plumb_inst_title', descKey: 'guide_plumb_inst_desc', priceRange: '$150 - $500 /件' },
    { titleKey: 'guide_plumb_hot_title', descKey: 'guide_plumb_hot_desc', priceRange: '$300 - $2000+' },
    { titleKey: 'guide_plumb_pipe_title', descKey: 'guide_plumb_pipe_desc', priceRange: '$500 - $3000+' },
  ],
  electrical: [
    { titleKey: 'guide_elec_em_title', descKey: 'guide_elec_em_desc', priceRange: '$150 - $280 /小时' },
    { titleKey: 'guide_elec_reg_title', descKey: 'guide_elec_reg_desc', priceRange: '$90 - $150 /小时' },
    { titleKey: 'guide_elec_light_title', descKey: 'guide_elec_light_desc', priceRange: '$60 - $150 /盏' },
    { titleKey: 'guide_elec_socket_title', descKey: 'guide_elec_socket_desc', priceRange: '$80 - $200 /个' },
    { titleKey: 'guide_elec_circuit_title', descKey: 'guide_elec_circuit_desc', priceRange: '$2000 - $8000+' },
  ],
};

// Base category data (non-translatable)
const baseCategories = [
  { id: 'fence', nameKey: 'cat_fence', image: '/fence-service.jpg', icon: 'Fence', color: 'text-amber-700', bgColor: 'bg-amber-50', averagePrice: '$80-150', unitKey: 'unit_metre' },
  { id: 'painting', nameKey: 'cat_painting', image: '/painting-service.jpg', icon: 'Paintbrush', color: 'text-blue-700', bgColor: 'bg-blue-50', averagePrice: '$25-45', unitKey: 'unit_sqm' },
  { id: 'cleaning', nameKey: 'cat_cleaning', image: '/cleaning-service.jpg', icon: 'Sparkles', color: 'text-teal-700', bgColor: 'bg-teal-50', averagePrice: '$30-60', unitKey: 'unit_hour' },
  { id: 'plumbing', nameKey: 'cat_plumbing', image: '/plumbing-service.jpg', icon: 'Droplets', color: 'text-cyan-700', bgColor: 'bg-cyan-50', averagePrice: '$80-140', unitKey: 'unit_hour' },
  { id: 'electrical', nameKey: 'cat_electrical', image: '/electrical-service.jpg', icon: 'Zap', color: 'text-amber-600', bgColor: 'bg-amber-50', averagePrice: '$90-150', unitKey: 'unit_hour' },
];

// Helper to translate fields using a t function
export function getTranslatedFields(catId: string, t: (key: string) => string): FormField[] {
  const raw = rawFormFields[catId];
  if (!raw) return [];
  return raw.map((f) => ({
    name: f.name,
    label: t(f.labelKey),
    type: f.type,
    options: f.optionKeys?.map((k) => t(k)),
    placeholder: f.placeholderKey ? t(f.placeholderKey) : undefined,
    required: f.required,
    helperText: f.helperKey ? t(f.helperKey) : undefined,
    min: f.min,
    max: f.max,
    step: f.step,
    visibleWhen: f.visibleWhen,
  }));
}

export function getTranslatedGuides(catId: string, t: (key: string) => string) {
  return (guideKeys[catId] || []).map((g) => ({
    title: t(g.titleKey),
    description: t(g.descKey),
    priceRange: g.priceRange,
  }));
}

export function getCategoryById(id: string): ServiceCategory | undefined {
  const base = baseCategories.find((c) => c.id === id);
  if (!base) return undefined;
  return {
    id: base.id,
    name: base.nameKey,
    nameEn: '',
    description: '',
    image: base.image,
    icon: base.icon,
    color: base.color,
    bgColor: base.bgColor,
    averagePrice: base.averagePrice,
    priceUnit: base.unitKey,
    formFields: [],
    quoteGuidance: [],
  };
}

export { baseCategories };
