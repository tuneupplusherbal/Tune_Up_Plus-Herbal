import { Ingredient, Benefit, Testimonial, ProductPackage } from './types';
import kalonjiImage from './assets/images/kalonji_ingredient_1781621027237.jpg';
import ashwagandhaImage from './assets/images/ashwagandha_ingredient_1781621049527.jpg';
import moringaImage from './assets/images/moringa_ingredient_1781621068029.jpg';
import gingerImage from './assets/images/ginger_ingredient_1781621087030.jpg';

export const TRUST_BADGES = [
  {
    id: 'steroid-free',
    title: 'Steroid-Free Guaranteed',
    urduTitle: 'سٹیرائڈ سے مکمل پاک',
    description: '100% checked and guaranteed chemical steroid-free. Crafted solely for natural recovery and healthy organic strengthening without side effects.',
    iconName: 'ShieldAlert',
  },
  {
    id: 'pcsir-tested',
    title: 'PCSIR Lab Tested',
    urduTitle: 'ہیڈ لیبارٹری ٹیسٹڈ',
    description: 'Rigorously tested, approved, and verified by the Pakistan Council of Scientific and Industrial Research for high quality safety standards.',
    iconName: 'Award',
  },
  {
    id: 'herbal-organic',
    title: '100% Food Herbs',
    urduTitle: 'سو فیصد قدرتی جڑی بوٹیاں',
    description: 'Pure bio-active food herbs matching the tagline "Herbs of Foods". Contains zero artificial fillers, heavy metals, or active synthetics.',
    iconName: 'Leaf',
  },
];

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'black-seed',
    name: 'Black Seed (Kalonji)',
    urduName: 'کلونجی (الشفاء)',
    scientificName: 'Nigella Sativa',
    description: 'Hailed as the "Seed of Blessing", Kalonji has been trusted for centuries across Pakistan as a comprehensive immunity shield, digestion tonic, and cellular revitalizer.',
    benefits: [
      'Boosts global immunity shielding against seasonal bugs',
      'Supports peak cardiovascular and metabolic functions',
      'Enhances lung capacity and respiratory ease',
    ],
    image: kalonjiImage,
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha (Asgandh)',
    urduName: 'اسگندھ ناگوری',
    scientificName: 'Withania Somnifera',
    description: 'A sovereign adaptogen that targets stress, addresses muscle wastage, calms hyperactive nerves, and eases persistent joint inflammation in older individuals.',
    benefits: [
      'Reduces harmful cortisol (stress hormone) levels',
      'Promotes muscle development and joint elasticity',
      'Combats insomnia, inducing natural and deep resting cycles',
    ],
    image: ashwagandhaImage,
  },
  {
    id: 'moringa',
    name: 'Moringa (Sohanjna)',
    urduName: 'سوہانجنا (کرشماتی درخت)',
    scientificName: 'Moringa Oleifera',
    description: 'Known worldwide as the Miracle Tree of Nutrition. Loaded with 90+ multi-nutrients, calcium, and amino acids, vital for growing children and bone mineral density in seniors.',
    benefits: [
      'Delivers massive organic calcium for healthy bone structures',
      'Supercharges daily stamina, reducing maternal and mental exhaustion',
      'Rich in vital iron, purifying bloodstream and elevating focus',
    ],
    image: moringaImage,
  },
  {
    id: 'saffron',
    name: 'Saffron (Zafran)',
    urduName: 'خالص کشمیری زعفران',
    scientificName: 'Crocus Sativus',
    description: 'The luxurious royal spice that triggers cellular energy, lightens skin glow, sharpens eye sight, and triggers dopamine receptors for continuous joyful moods.',
    benefits: [
      'Triggers immediate neurological clarity and memory recall',
      'Rich in carotenoid antioxidants, safeguarding optical health',
      'Refines skin health and natural vascular circulation',
    ],
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ginseng',
    name: 'Ginseng (Shaakh-al-Shifa)',
    urduName: 'جنسنگ جڑ',
    scientificName: 'Panax Ginseng',
    description: 'The ultimate tonic for physical fortitude and rapid body recuperation. Amplifies tissue oxidation and accelerates metabolic clean-up from intense activity or age.',
    benefits: [
      'Dramatically shortens recuperation from physical fatigue',
      'Maintains clean executive focus and cognitive performance',
      'Sustains high athletic power and organic endurance',
    ],
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ginger',
    name: 'Dry Ginger (Sonth)',
    urduName: 'سنڈھ / خشک ادرک',
    scientificName: 'Zingiber Officinale',
    description: 'A strong gastrointestinal thermogenic compound that helps clear modern gut toxins, aids natural food breakdown, and targets morning stiffness.',
    benefits: [
      'Alleviates persistent severe bloating and abdominal spasms',
      'Accelerates natural digestive enzyme functions',
      'Soothes respiratory airways, liquefying chest congestion',
    ],
    image: gingerImage,
  },
];

export const BENEFITS: Benefit[] = [
  {
    id: 'immunity',
    title: 'Complete Immune Fortification',
    subtitle: 'مضبوط قوت مدافعت',
    description: 'Formed from rich natural micro-nutrients, our capsules create a sturdy protective shield for your family. Helps defensive cells actively block modern seasonal cold, flu, and toxic pathogens without chemical aid.',
    iconName: 'Shield',
    suitableFor: ['Children', 'Adults', 'Elderly'],
  },
  {
    id: 'energy-stamina',
    title: 'Sustained Physical Stamina',
    subtitle: 'بھرپور توانائی اور طاقت',
    description: 'Fights perpetual exhaustion, lazy mornings, and afternoon energy dips. It enhances natural energy production at the cellular level, ensuring you have the energy to power through demanding professional and home hours.',
    iconName: 'Zap',
    suitableFor: ['Adults'],
  },
  {
    id: 'bone-joint',
    title: 'Elderly Bone & Joint Relief',
    subtitle: 'جوڑوں اور ہڈیوں کی تکلیف کا علاج',
    description: 'Infuses organic calcium, Moringa compounds, and anti-inflammatory ginger active elements to lubricate joints, soothe persistent muscle aches, and assist seniors in praying and walking comfortably.',
    iconName: 'Activity',
    suitableFor: ['Elderly'],
  },
  {
    id: 'focus-calm',
    title: 'Stress Relief & Mental Focus',
    subtitle: 'دماغی سکون اور بہترین یادداشت',
    description: 'Features natural therapeutic adaptogens like Ashwagandha and Zafran that stabilize erratic mood hormones, dissolve stress blocks, and enable working professionals and students to maintain focus.',
    iconName: 'Brain',
    suitableFor: ['Adults', 'Children'],
  },
  {
    id: 'digestion',
    title: 'Toxin-Free Healthy Digestion',
    subtitle: 'معدے اور ہاضمے کی درستگی',
    description: 'Heals the stomach lining, eliminates acute flatulence, regulates bowel patterns, and ensures maximum extraction of healthy vitamins and minerals from your daily meals, living up to "Herbs of Foods".',
    iconName: 'Sparkles',
    suitableFor: ['Children', 'Adults', 'Elderly'],
  },
  {
    id: 'weight-swelling',
    title: 'Weight Loss & Swelling Relief',
    subtitle: 'سوجن کا خاتمہ اور وزن میں کمی',
    description: 'Jism ki andarooni sujan (bloating) aur barhay huay wazan ko qudrati tor par kam karne ke liye intahai asardaar nuskha hai jo jism ko chust aur mutawazin banata hai.',
    iconName: 'weight-swelling',
    suitableFor: ['Adults', 'Elderly'],
  },
  {
    id: 'hair-fall',
    title: 'Hair Fall Prevention for Girls',
    subtitle: 'لڑکیوں کے گرتے بالوں کا علاج',
    description: 'Larkiyon ke baalon ke girne ki raftar ko kam karta hai, hair follicles ko qudrati mineral aur vitamins faraham kar ke mazboot, ghana aur lamba banata hai.',
    iconName: 'hair-fall',
    suitableFor: ['Children', 'Adults'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Chaudhary Muhammad Salim',
    age: 62,
    city: 'Lahore',
    relation: 'Retired Govt. Officer & Grandfather',
    text: 'ماشاء اللہ! میں پچھلے دو مہینوں سے ٹیون اپ پلس استعمال کر رہا ہوں۔ پہلے میرے گھٹنوں میں شدید درد تھا اور فجر کے لیے اٹھنا عذاب لگتا تھا۔ اب مجھے ہڈیوں میں بہت طاقت محسوس ہوتی ہے اور نماز بھی اب آسانی سے کھڑے ہو کر ادا کر رہا ہوں بغیر کسی تکلیف کے۔ یہ بالکل سٹیرائڈ سے پاک ہے، اور اس کا کوئی سائیڈ افیکٹ نہیں دیکھا یعنی مجھے یہ سو فیصد مطمئن کر گیا ہے۔',
    rating: 5,
    date: '12 May 2026',
    isVerified: true,
    avatarSeed: 'salim',
  },
  {
    id: 'test-2',
    name: 'Dr. Aisha Rehman',
    age: 38,
    city: 'Karachi',
    relation: 'Consultant Nutritionist & Mother',
    text: 'As a healthcare practitioner, I am naturally skeptical of "herbal cures" in Pakistan that hide heavy chemicals or steroids. However, when I got the PCSIR reports for TUNE-UP+ and reviewed their formulation containing Kalonji, Moringa, and Ginger, I ordered it for my husband and mother. Their organic composition is truly clinical, helping clean the body of toxins while safely building back cellular stamina.',
    rating: 5,
    date: '28 April 2026',
    isVerified: true,
    avatarSeed: 'aisha',
  },
  {
    id: 'test-3',
    name: 'Zainab Bibi',
    age: 44,
    city: 'Rawalpindi',
    relation: 'Homemaker & Mother of 3 Kids',
    text: 'بچے سکول سے آکر تھک جاتے تھے اور میں بھی سارا دن گھر کے کاموں سے نڈھال رہتی تھی۔ میرے بھائی نے یہ ڈبہ ہمیں لا کر دیا اور اب گھر بھر کے لوگ روزانہ ایک کیپسول لیتے ہیں۔ بچوں کی بھوک بھی بہت بہتر ہوئی ہے اور ان کا پڑھائی میں دل لگتا ہے۔ پنڈی کی سرد ہواؤں میں بھی اس دفعہ بچے نزلہ زکام سے بچے رہے جو ہمارے لیے ایک معجزہ ہے۔',
    rating: 5,
    date: '03 June 2026',
    isVerified: true,
    avatarSeed: 'zainab',
  },
  {
    id: 'test-4',
    name: 'Muhammad Bilal Shah',
    age: 29,
    city: 'Peshawar',
    relation: 'Software Engineer & Gym Goer',
    text: 'Working 10 hours on a desk, then heading to the gym used to leave my muscles sore and body completely drained. Taking Tune-Up+ daily with milk has completely replaced my expensive imported multi-vitamin supplements. It gives a sustained clean energy boost without caffeine jitter or palpitations. Fully recommend this to active young adults across Khyber Pakhtunkhwa.',
    rating: 4,
    date: '20 May 2026',
    isVerified: true,
    avatarSeed: 'bilal',
  },
  {
    id: 'test-5',
    name: 'Farzana Kausar',
    age: 51,
    city: 'Multan',
    relation: 'School Headmistress',
    text: 'ڈائبیٹک مریض ہونے کی وجہ سے جسم میں ہر وقت درد اور سستی چھائی رہتی تھی۔ میرے معالج نے مشورہ دیا کہ ادویات کے ساتھ ٹیون اپ پلس جیسی پیور ہربل ٹونیک لیں۔ الحمدللہ اب دن بھر کام کرنے کے باوجود نقاہت طاری نہیں ہوتی، اور ہاضمہ بھی بہترین ہو گیا ہے۔ یہ واقعی پاکستانی فیملیز کے لیے ایک بہترین تحفہ ہے۔',
    rating: 5,
    date: '18 May 2026',
    isVerified: true,
    avatarSeed: 'farzana',
  },
];

export const PRODUCT_PACKAGES: ProductPackage[] = [
  {
    id: 'starter',
    name: 'Starter Vitality Pack',
    volume: '1 Bottle (60 Capsules)',
    price: 1850,
    originalPrice: 2500,
    savedAmount: 650,
    badge: 'Trial Friendly',
    capsuleCount: 60,
    duration: '1 Month Course',
  },
  {
    id: 'couple',
    name: 'Power Couple Health Pack',
    volume: '2 Bottles (120 Capsules)',
    price: 3400,
    originalPrice: 5000,
    savedAmount: 1600,
    badge: 'Most Popular Choice',
    capsuleCount: 120,
    duration: '2 Months Course',
    popular: true,
  },
  {
    id: 'family',
    name: 'Supreme Family Wellness Saver',
    volume: '4 Bottles (240 Capsules)',
    price: 6200,
    originalPrice: 10000,
    savedAmount: 3800,
    badge: 'Max Savings (Free Delivery)',
    capsuleCount: 240,
    duration: '4 Months Course',
  },
];

export const FAQS = [
  {
    q: 'Are these capsules completely steroid and chemical free?',
    a: 'Absolutely! TUNE-UP+ is 100% steroid-free. It has been tested and certified by the Pakistan Council of Scientific and Industrial Research (PCSIR). We use purely certified herbal and food-grade extracts, ensuring there are zero anabolic steroids, heavy metals, or chemical impurities.'
  },
  {
    q: 'How should TUNE-UP+ organic capsules be consumed?',
    a: 'For adults and teenagers (above 12 years), the recommended dosage is 1 to 2 capsules daily, preferably with lukewarm water or warm milk after meals. For children aged 6 to 12 years, 1 capsule daily after any main meal is recommended. Consistent daily use for at least 3 weeks is advised for optimal wellness results.'
  },
  {
    q: 'What makes "Herbs of Foods" different from other medicines?',
    a: 'Medicines are chemical compounds targeting temporary symptom suppression and often carrying metabolic burdens. Our concept "Herbs of Foods" utilizes high-grade, bio-active organic plant concentrates that behave like super-foods. They nurture your organs, restore natural metabolic efficiency, and cleanse cellular toxins safely.'
  },
  {
    q: 'Do you charge for delivery inside Pakistan?',
    a: 'Currently, we are offering FREE Cash on Delivery (COD) across Pakistan on all orders! Whether you are in Lahore, Karachi, Peshawar, the Northern regions, or small towns, your parcel will be delivered to your doorstep within 3 to 5 business days with no shipping charges.'
  },
  {
    q: 'Can elderly people with high blood pressure or joint pain use it?',
    a: 'Yes, TUNE-UP+ is highly beneficial for elderly family members. Ingredients like Moringa, Ginger and Ashwagandha gently soothe inflamed joint tissues, build bone density, and support blood circulation. Since it is entirely natural, it does not interfere with conventional lifestyle medications. However, consult your family physician if they have special chronic conditions.'
  },
];
