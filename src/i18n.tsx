import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Locale = 'en' | 'ar'

const KEY = 'namaa-locale'

const ar: Record<string, string> = {
  'Smart Agrivoltaics': 'الزراعة الفولتية الذكية',
  'Prepared by': 'إعداد',
  'Sign out': 'خروج',
  'Vision 2030': 'رؤية 2030',
  'Government operations': 'عمليات الجهة الحكومية',
  'Main Dashboard': 'لوحة القيادة',
  'IoT & AI Management': 'إنترنت الأشياء والذكاء الاصطناعي',
  'Precision Irrigation': 'الري الدقيق',
  'Vertical Farming / CEA': 'الزراعة العمودية',
  'Agrivoltaics & Energy': 'الطاقة الزراعية',
  'Cost & Economic Impact': 'التكلفة والأثر الاقتصادي',
  'Analytics & Reports': 'التحليلات والتقارير',
  'Targets & investor access': 'المستهدفات ووصول المستثمرين',
  'Land & investor access': 'الأراضي ووصول المستثمرين',
  'Ratios & Benchmarks': 'النسب والمعايير',
  'Strategic Goals': 'الأهداف الاستراتيجية',
  'My land': 'أراضيّ',
  Holdings: 'الحيازات',
  'Investor access': 'وصول المستثمرين',
  'Sale or exploitation': 'بيع أو استغلال',
  'Requests on your land': 'الطلبات على أراضيك',
  'Buy requests': 'طلبات الشراء',
  'Exploitation requests': 'طلبات الاستغلال',
  'No requests yet.': 'لا توجد طلبات بعد.',
  'wants to buy': 'يريد شراء',
  'wants to exploit': 'يريد استغلال',
  Accept: 'قبول',
  Refuse: 'رفض',
  Accepted: 'مقبول',
  Refused: 'مرفوض',
  Pending: 'قيد الانتظار',
  Offered: 'معروض',
  'Your offer': 'عرضك',
  'Kept private': 'خاص',
  'For sale': 'للبيع',
  'Open for exploitation': 'مفتوح للاستغلال',
  'Keep private': 'أبقِها خاصة',
  Sell: 'بيع',
  Buy: 'شراء',
  Exploit: 'استغلال',
  'Buy the land': 'اشترِ الأرض',
  'Exploit the land': 'استغل الأرض',
  'Request sent': 'أُرسل الطلب',
  'Still offered': 'ما زال معروضاً',
  'Proprietor withdrew the offer': 'سحب المالك العرض',
  'Proprietor offer': 'عرض المالك',
  'for sale or exploitation': 'للبيع أو للاستغلال',
  'Only parcels registered to your estate. You choose whether each one stays private, is offered for sale, or is opened for exploitation.':
    'فقط القطع المسجلة باسمك. أنت تختار: تبقى خاصة، أو تُعرض للبيع، أو تُفتح للاستغلال.',
  'Sell or open for exploitation': 'بيع أو فتح للاستغلال',
  'You decide for each parcel. Sell it, open it so an investor can exploit it, or keep it private. Investors only see what you offer.':
    'أنت تقرر لكل قطعة. بعها، أو افتحها ليتمكن مستثمر من استغلالها، أو أبقِها خاصة. المستثمر لا يرى إلا ما تعرضه.',
  'Lands for sale or exploitation': 'أراضٍ للبيع أو للاستغلال',
  'You only see parcels a proprietor has offered. Buy a parcel that is for sale, or ask to exploit one that is open.':
    'لا ترى إلا ما عرضه المالك. اشترِ قطعة معروضة للبيع، أو اطلب استغلال قطعة مفتوحة.',
  'No parcels are offered. Proprietors have not put land up for sale or exploitation.':
    'لا توجد قطع معروضة. الملاك لم يطرحوا أرضاً للبيع أو للاستغلال.',
  'Buy requests and exploitation requests you have sent. If the proprietor withdraws the offer, the parcel is no longer available.':
    'طلبات الشراء والاستغلال التي أرسلتها. إذا سحب المالك العرض، لم تعد القطعة متاحة.',
  'No request yet. Buy a parcel that is for sale, or exploit one that is open.':
    'لا يوجد طلب بعد. اشترِ قطعة للبيع، أو استغل قطعة مفتوحة.',
  '10,000 ha desert target. Private proprietors decide their own parcels. You set the offer and accept or refuse requests only on public land.':
    'مستهدف 10,000 هكتار. المالك الخاص يقرر قطعه. أنت تحدد العرض وتقبل أو ترفض الطلبات على الأرض العامة فقط.',
  'Investor requests': 'طلبات المستثمرين',
  'Accept or refuse requests on public land only. Private proprietors decide their own parcels.':
    'اقبل أو ارفض الطلبات على الأرض العامة فقط. المالك الخاص يقرر قطعه.',
  'Private owners choose sale or exploitation. You can change only public land.':
    'الملاك الخاصون يختارون البيع أو الاستغلال. أنت تغيّر الأرض العامة فقط.',
  'External investment': 'الاستثمار الخارجي',
  'Open lands': 'الأراضي المتاحة',
  'My interest': 'اهتماماتي',
  Government: 'جهة حكومية',
  'Land proprietor': 'مالك الأرض',
  'Land proprietors': 'ملاك الأراضي',
  'External investor': 'مستثمر خارجي',
  Investor: 'مستثمر',
  'MEWA Operator': 'مشغّل الوزارة',
  'Al-Nakheel Holdings': 'مجموعة النخيل',
  'Gulf Green Capital': 'الخليج الأخضر',
  'Waha Desert Estates': 'واحة العقارية',
  'Public land (state)': 'أرض عامة (الدولة)',
  'Vision 2030 · Desert Reclamation': 'رؤية 2030 · استصلاح الصحراء',
  'Unknown account. Use one of the demo roles below.':
    'الحساب غير معروف. استخدم أحد الأدوار التجريبية أدناه.',
  'Smart agrivoltaics': 'الزراعة الفولتية الذكية',
  'One desert program. Three doors.': 'برنامج صحراوي واحد. ثلاثة أبواب.',
  'Government runs the national portal. Proprietors decide to sell a parcel or open it for exploitation. Investors buy or exploit only what is offered.':
    'الجهة الحكومية تدير البوابة الوطنية. المالك يقرر البيع أو فتح الاستغلال. المستثمر يشتري أو يستغل ما يُعرض فقط.',
  'Vision 2030 · demo roles': 'رؤية 2030 · أدوار تجريبية',
  'Sign in with a portal role.': 'ادخل بدور من أدوار البوابة.',
  'Sign in': 'دخول',
  'Password for every demo account is': 'كلمة المرور لكل الحسابات التجريبية هي',
  Email: 'البريد',
  Password: 'كلمة المرور',
  'Enter portal': 'ادخل البوابة',
  'Full operations portal. Decide which parcels external investors may exploit.':
    'بوابة العمليات كاملة. المالك الخاص يقرر البيع أو الاستغلال، وأنت تدير الأرض العامة.',
  'Your holdings only. You decide to sell a parcel or open it for exploitation.':
    'حيازاتك فقط. أنت تقرر بيع القطعة أو فتحها للاستغلال.',
  'Only parcels the government has released for external exploitation.':
    'فقط القطع التي عرضها المالك للبيع أو للاستغلال.',
  'نماء · Smart agrivoltaic command': 'نماء · قيادة الزراعة الفولتية',
  'Namaa : Toward Sustainable Investment of Underutilized Lands in the Kingdom.':
    'نماء: نحو استثمار مستدام للأراضي غير المستغلة في المملكة.',
  'A digital platform that seamlessly and transparently connects underutilized lands with reclamation, rehabilitation, and investment opportunities.':
    'منصة رقمية تربط بسلاسة وشفافية الأراضي غير المستغلة بفرص الاستصلاح والتأهيل والاستثمار.',
  'Live energy, water, and land-equivalent performance across desert reclamation units — dual-use PV + agriculture for Vision 2030.':
    'أداء حي للطاقة والمياه ومكافئ الأرض عبر وحدات الاستصلاح — طاقة شمسية وزراعة معاً لرؤية 2030.',
  'Open IoT map': 'خريطة الحساسات',
  'Land allocation': 'توزيع الأراضي',
  'Target reclamation': 'مستهدف الاستصلاح',
  'Farm units': 'وحدات زراعية',
  'Per unit PV': 'طاقة لكل وحدة',
  'Current LER': 'مكافئ الأرض الحالي',
  'Solar output': 'إنتاج الطاقة الشمسية',
  'Live · +4.8% vs yesterday': 'مباشر · +4.8% عن الأمس',
  'Water consumption': 'استهلاك المياه',
  '−37.4% vs conventional': '−37.4% مقارنة بالري التقليدي',
  'Land Equivalent Ratio': 'مكافئ إنتاجية الأرض',
  '+62% vs mono-use land': '+62% مقارنة بالاستخدام الأحادي',
  'Active farm units': 'الوحدات الزراعية العاملة',
  '1.2 MW each · 256.8 MW online': '1.2 ميغاواط لكل وحدة · 256.8 ميغاواط تعمل',
  'PV generation vs dispatch': 'توليد الطاقة مقابل التوزيع',
  'Today · MW': 'اليوم · ميغاواط',
  Generated: 'المولَّد',
  Pumps: 'المضخات',
  Battery: 'البطاريات',
  Microclimate: 'المناخ المصغّر',
  'Soil, humidity, wind and irradiance under PV vs open desert.':
    'التربة والرطوبة والرياح والإشعاع تحت الألواح مقارنة بالصحراء المكشوفة.',
  'Under PV canopy': 'تحت مظلة الألواح',
  'Crop inter-row': 'بين صفوف المحصول',
  'Open desert control': 'صحراء مكشوفة (مرجع)',
  Soil: 'تربة',
  'IoT & AI': 'إنترنت الأشياء والذكاء',
  'Sensor network & recommendations': 'شبكة الحساسات والتوصيات',
  'Field sensors plotted across the Kingdom of Saudi Arabia, plus AI irrigation and shading advice from solar tracking and weather.':
    'حساسات ميدانية على خريطة المملكة، مع توصيات ري وتظليل من تتبع الشمس والطقس.',
  'Site sensor map': 'خريطة حساسات الموقع',
  'Kingdom of Saudi Arabia': 'المملكة العربية السعودية',
  online: 'متصل',
  degraded: 'متدهور',
  offline: 'غير متصل',
  'conf.': 'ثقة',
  Irrigation: 'ري',
  Shading: 'تظليل',
  Energy: 'طاقة',
  'Advance night irrigation on Units 12–18': 'تقديم الري الليلي للوحدات 12–18',
  'Soil moisture trending −8% with forecast 41°C peak. Shift 2.4h of drip to 01:00–04:00 to cut evaporative loss.':
    'رطوبة التربة تنخفض 8% مع ذروة متوقعة 41°. انقل 2.4 ساعة من التنقيط إلى 01:00–04:00 لتقليل التبخر.',
  'Est. +1.8% water saved this week': 'تقدير: +1.8% توفير مياه هذا الأسبوع',
  'Increase PV tracking tilt 6° (west) after 14:30': 'زد ميل التتبع 6° غرباً بعد 14:30',
  'Afternoon irradiance on crop rows is 18% above stress threshold. Extra shade protects leafy greens without losing >2% yield.':
    'إشعاع العصر على الصفوف أعلى من حد الإجهاد بـ 18%. ظل إضافي يحمي الورقيات دون خسارة تتجاوز 2% من الإنتاج.',
  'Hold soil ΔT at −2.5°C': 'أبقِ فرق حرارة التربة عند −2.5°',
  'Charge battery bank B before 11:20': 'اشحن بنك البطاريات B قبل 11:20',
  'Cloud band incoming 13:40. Pre-charging 18 MWh keeps irrigation pumps off-grid through the dip.':
    'شريط سحب يصل 13:40. شحن 18 ميغاواط ساعة مسبقاً يبقي مضخات الري خارج الشبكة أثناء الانخفاض.',
  'Avoid 3.1 MWh grid draw': 'تجنّب سحب 3.1 ميغاواط ساعة من الشبكة',
  'Soil moisture': 'رطوبة التربة',
  Irradiance: 'الإشعاع',
  'Temp / RH': 'حرارة / رطوبة',
  Wind: 'رياح',
  'Flow meter': 'عداد تدفق',
  'Nutrient EC': 'ملوحة المغذيات',
  Unit: 'وحدة',
  Riyadh: 'الرياض',
  Qassim: 'القصيم',
  Hail: 'حائل',
  'Al Jawf': 'الجوف',
  Tabuk: 'تبوك',
  Madinah: 'المدينة المنورة',
  Makkah: 'مكة المكرمة',
  Asir: 'عسير',
  Najran: 'نجران',
  Jazan: 'جازان',
  'Eastern Province': 'المنطقة الشرقية',
  AlUla: 'العلا',
  Jeddah: 'جدة',
  Dates: 'نخيل',
  Vegetables: 'خضار',
  Forage: 'أعلاف',
  Pilot: 'تجريبي',
  'CEA · Water': 'بيئة محكومة · مياه',
  'Automated sub-surface drip': 'تنقيط تحت سطحي آلي',
  'Schedule and control drip lines to cut evaporation. Conservation target: 35–40% versus flood / surface irrigation.':
    'جدولة خطوط التنقيط والتحكم بها لتقليل التبخر. المستهدف 35–40% مقارنة بالري بالغمر أو السطحي.',
  'Fleet water save': 'توفير مياه الأسطول',
  'Inside the 35–40% band': 'داخل نطاق 35–40%',
  'Active duty': 'التشغيل الحالي',
  '2 zones': 'منطقتان',
  'Night-shift preferred': 'يفضَّل في الليل',
  'Today’s volume': 'حجم اليوم',
  '−11,020 m³ vs baseline': '−11,020 م³ عن خط الأساس',
  running: 'يعمل',
  scheduled: 'مجدول',
  paused: 'متوقف',
  'Duty cycle': 'دورة التشغيل',
  'Water saved': 'مياه موفَّرة',
  'Next window': 'النافذة التالية',
  Run: 'تشغيل',
  Pause: 'إيقاف',
  'Dates · Units 1–40': 'نخيل · الوحدات 1–40',
  'Forage · Units 41–90': 'أعلاف · الوحدات 41–90',
  'Vegetables · Units 91–140': 'خضار · الوحدات 91–140',
  'Pilots · Units 141–214': 'تجارب · الوحدات 141–214',
  'Controlled environment': 'بيئة محكومة',
  'Vertical farming management': 'إدارة الزراعة العمودية',
  'Nutrient and climate telemetry for high-value organic crops in CEA modules.':
    'قياسات المغذيات والمناخ لمحاصيل عضوية عالية القيمة داخل وحدات البيئة المحكومة.',
  'kg YTD': 'كغ منذ بداية السنة',
  'Basil · organic': 'ريحان · عضوي',
  'Lettuce · organic': 'خس · عضوي',
  'Strawberry · organic': 'فراولة · عضوية',
  Microgreens: 'أوراق صغيرة',
  Agrivoltaics: 'طاقة زراعية',
  'PV generation & energy routing': 'توليد الطاقة وتوجيهها',
  'Real-time solar output routed to irrigation pumps or battery storage.':
    'إنتاج شمسي لحظي يوجَّه إلى مضخات الري أو إلى التخزين.',
  Live: 'مباشر',
  'Fleet generation now': 'توليد الأسطول الآن',
  'Irrigation load': 'حمل الري',
  Storage: 'تخزين',
  'Charging batteries': 'شحن البطاريات',
  'Dispatch by hour': 'التوزيع حسب الساعة',
  'Financial viability': 'الجدوى المالية',
  'CapEx & OpEx optimization': 'تحسين رأس المال والتشغيل',
  'Static demo figures in SAR millions. Smart devices and water automation pull cost below plan.':
    'أرقام تجريبية بملايين الريالات. الأجهزة الذكية وأتمتة المياه تخفض التكلفة عن الخطة.',
  'CapEx': 'رأس مال',
  'OpEx / year': 'تشغيل / سنة',
  capex: 'رأس مال',
  opex: 'تشغيل',
  'vs plan': 'مقابل الخطة',
  Line: 'البند',
  Type: 'النوع',
  Plan: 'الخطة',
  Actual: 'الفعلي',
  'PV + trackers (CapEx)': 'ألواح وتتبع (رأس مال)',
  'Drip + sensors (CapEx)': 'تنقيط وحساسات (رأس مال)',
  'CEA racks (CapEx)': 'رفوف الزراعة العمودية (رأس مال)',
  'Water & pumping (OpEx / yr)': 'مياه وضخ (تشغيل / سنة)',
  'O&M labour (OpEx / yr)': 'عمالة التشغيل (تشغيل / سنة)',
  'Spare parts (OpEx / yr)': 'قطع غيار (تشغيل / سنة)',
  Analytics: 'تحليلات',
  'Sustainability & Vision 2030 reports': 'تقارير الاستدامة ورؤية 2030',
  'Periodic impact figures for partners, investors, and regulators. Exports are generated in-browser from static demo data.':
    'أرقام أثر دورية للشركاء والمستثمرين والجهات التنظيمية. التصدير يتم في المتصفح من بيانات تجريبية.',
  'Excel / CSV': 'إكسل / CSV',
  'PDF pack (text)': 'حزمة PDF (نص)',
  'CO₂ avoided': 'ثاني أكسيد الكربون المتجنَّب',
  'Annual, renewable displacement': 'سنوي، بإحلال الطاقة المتجددة',
  'Desert reclaimed': 'صحراء مستصلحة',
  'Of 10,000 ha target': 'من مستهدف 10,000 هكتار',
  'Vs conventional irrigation': 'مقارنة بالري التقليدي',
  'Organic yield': 'إنتاج عضوي',
  'CEA + field organics': 'بيئة محكومة ومحاصيل حقلية عضوية',
  'Q3 2026 · draft for stakeholders': 'الربع الثالث 2026 · مسودة لأصحاب المصلحة',
  'Narrative summary': 'ملخص سردي',
  'NAMAA dual-uses unprepared desert land: 1.2 MW agrivoltaic blocks shade crops, cut soil temperature by 2.5°C, and power sub-surface drip. Water use is 37.4% below baseline (target 35–40%). Land Equivalent Ratio is 1.62 — a 62% productivity lift versus single-use farming. Exports above are dummy files for the demo; a production build would stream signed PDF/XLSX from the reporting service.':
    'نماء تستخدم الأرض الصحراوية غير المهيأة استخداماً مزدوجاً: كتل 1.2 ميغاواط تظلّل المحصول، وتخفض حرارة التربة 2.5°، وتشغّل التنقيط تحت السطحي. استهلاك المياه أقل من خط الأساس بـ 37.4% (المستهدف 35–40%). مكافئ الأرض 1.62، أي رفع إنتاجية 62% مقارنة بالزراعة الأحادية. ملفات التصدير أعلاه تجريبية؛ النسخة الإنتاجية تصدّر PDF وXLSX موقّعين من خدمة التقارير.',
  'Targets · land': 'المستهدفات · الأرض',
  'Land allocation & GIS status': 'توزيع الأراضي وحالة الخريطة',
  '10,000 ha desert target. Open a parcel when the government allows an external investor to exploit it. Closed parcels stay off the investor portal.':
    'مستهدف 10,000 هكتار. افتح القطعة حين تسمح الحكومة لمستثمر خارجي باستغلالها. القطع المغلقة لا تظهر في بوابة المستثمر.',
  'Targeted area': 'المساحة المستهدفة',
  Reclaimed: 'المستصلح',
  Units: 'الوحدات',
  'active / planned': 'عامل / مخطط',
  'Open to investors': 'مفتوح للمستثمرين',
  'sample parcels released': 'قطع تجريبية متاحة',
  'Parcel map (sample units)': 'خريطة القطع (عينة)',
  'Active cultivation': 'زراعة قائمة',
  'Fully prepared': 'مهيأة بالكامل',
  'Under preparation': 'قيد التهيئة',
  'No parcels with this cultivation status.': 'لا توجد قطع بهذه الحالة.',
  'Investor exploitation': 'استغلال المستثمرين',
  'Government switch. Proprietors and investors cannot change this.':
    'مفتاح حكومي. المالك والمستثمر لا يغيّرانه.',
  interest: 'اهتمام',
  Closed: 'مغلق',
  'Open to external investors': 'مفتوح للمستثمرين الخارجيين',
  'Not released': 'غير متاح',
  'Targets · ratios': 'المستهدفات · النسب',
  'Reclamation, LER, water & soil': 'الاستصلاح ومكافئ الأرض والمياه والتربة',
  'Benchmarks versus conventional farming and the 80%+ uncultivated land challenge in Saudi Arabia.':
    'معايير مقابل الزراعة التقليدية وتحدي أن أكثر من 80% من أراضي المملكة غير مزروعة.',
  Target: 'المستهدف',
  'Reclamation ratio': 'نسبة الاستصلاح',
  '% of 10,000 ha': '% من 10,000 هكتار',
  'Focus: 80%+ of KSA land is uncultivated desert.':
    'التركيز: أكثر من 80% من أرض المملكة صحراء غير مزروعة.',
  'Land Equivalent Ratio boost': 'رفع مكافئ إنتاجية الأرض',
  '% vs conventional': '% مقارنة بالتقليدي',
  'Target ≥ 60% productivity lift from dual-use agrivoltaics.':
    'المستهدف رفع إنتاجية لا يقل عن 60% بالاستخدام المزدوج.',
  'Water conservation': 'توفير المياه',
  '% saved': '% موفَّر',
  'Sub-surface drip target band: 35–40%.': 'نطاق التنقيط تحت السطحي: 35–40%.',
  'Soil temperature reduction': 'خفض حرارة التربة',
  '°C under canopy': '°م تحت المظلة',
  'Panel shading microclimate vs open desert control.':
    'مناخ التظليل بالألواح مقارنة بالصحراء المكشوفة.',
  'Targets · strategy': 'المستهدفات · الاستراتيجية',
  'Strategic impact dashboard': 'لوحة الأثر الاستراتيجي',
  'Clean energy, carbon, organic yield, and cost targets for the full 500-unit build-out.':
    'مستهدفات الطاقة النظيفة والكربون والإنتاج العضوي والتكلفة لاكتمال 500 وحدة.',
  'Clean energy per unit': 'طاقة نظيفة لكل وحدة',
  'Powers irrigation pumps and site automation.': 'تشغّل مضخات الري وأتمتة الموقع.',
  'Fleet PV capacity': 'قدرة الأسطول الشمسية',
  '500 units × 1.2 MW when fully deployed.': '500 وحدة × 1.2 ميغاواط عند الاكتمال.',
  'Carbon offset': 'تعويض الكربون',
  'Avoided emissions from renewable generation.': 'انبعاثات متجنَّبة من التوليد المتجدد.',
  'Organic crop yield': 'إنتاج المحاصيل العضوية',
  'CEA + shaded field crops (high-value organics).':
    'بيئة محكومة ومحاصيل حقلية مظللة (عضويات عالية القيمة).',
  'CapEx vs plan': 'رأس المال مقابل الخطة',
  'Cost-effective sensors and modular PV.': 'حساسات مجدية وألواح معيارية.',
  'OpEx vs plan': 'التشغيل مقابل الخطة',
  'Water + labour savings from automation.': 'توفير مياه وعمالة بالأتمتة.',
  Parcels: 'القطع',
  Area: 'المساحة',
  'Opened to investors': 'مفتوح للمستثمرين',
  'Only parcels registered to your estate. The government decides which of them external investors may exploit.':
    'فقط القطع المسجلة باسمك. الحكومة تقرر أيها يجوز للمستثمر الخارجي استغلاله.',
  Parcel: 'القطعة',
  Crop: 'المحصول',
  Status: 'الحالة',
  'Government decision': 'قرار الحكومة',
  'Investor interest': 'اهتمام المستثمر',
  'Not offered': 'غير معروض',
  Private: 'خاص',
  'Investor access on your land': 'وصول المستثمرين إلى أرضك',
  'You cannot open a parcel yourself. MEWA marks land as available for external exploitation. You only see the decision.':
    'لا تستطيع فتح القطعة بنفسك. الوزارة هي من تتيحها للاستغلال الخارجي. أنت ترى القرار فقط.',
  'Government allowed external investors': 'الحكومة سمحت للمستثمرين الخارجيين',
  'Held by the proprietor': 'باقية لدى المالك',
  'Lands open for exploitation': 'أراضٍ متاحة للاستغلال',
  'You only see parcels the government has released. Closed land stays off this portal.':
    'لا ترى إلا ما أتاحته الحكومة. الأرض المغلقة لا تظهر في هذه البوابة.',
  'Open parcels': 'قطع مفتوحة',
  Capacity: 'السعة',
  'Your requests': 'طلباتك',
  Proprietor: 'المالك',
  'Government released': 'أتاحتها الحكومة',
  'Interest sent': 'أُرسل الاهتمام',
  'Express interest': 'أبدِ الاهتمام',
  'No parcels are open. The government has not released land for external investors.':
    'لا توجد قطع مفتوحة. الحكومة لم تتح أرضاً للمستثمرين الخارجيين.',
  'Requests stay only on parcels the government still keeps open. If they close a parcel, it drops off the open list.':
    'الطلبات تبقى على القطع التي ما زالت الحكومة تبقيها مفتوحة. إذا أُغلقت قطعة تختفي من قائمة المتاح.',
  'Still open': 'ما زال مفتوحاً',
  'Government closed it': 'أغلقته الحكومة',
  Withdraw: 'سحب',
  'No interest filed yet. Open a released parcel and send a request.':
    'لا يوجد اهتمام بعد. افتح قطعة متاحة وأرسل طلباً.',
  Language: 'العربية',
}

const enLabel = 'English'

type I18nValue = {
  locale: Locale
  dir: 'rtl' | 'ltr'
  t: (text: string) => string
  toggle: () => void
  languageLabel: string
}

const I18nContext = createContext<I18nValue | null>(null)

function apply(locale: Locale) {
  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = localStorage.getItem(KEY)
    const next: Locale = stored === 'ar' ? 'ar' : 'en'
    apply(next)
    return next
  })

  useEffect(() => {
    apply(locale)
  }, [locale])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      dir: locale === 'ar' ? 'rtl' : 'ltr',
      t: (text) => (locale === 'ar' ? (ar[text] ?? text) : text),
      toggle: () => {
        setLocale((current) => {
          const next: Locale = current === 'ar' ? 'en' : 'ar'
          localStorage.setItem(KEY, next)
          return next
        })
      },
      languageLabel: locale === 'ar' ? enLabel : 'العربية',
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n outside I18nProvider')
  return ctx
}
