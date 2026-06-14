
/**
 * TED AI Stage — Site Configuration
 * Edit this file to update all site content easily.
 */

const SITE_CONFIG = {
  // ===== Meta =====
  siteName: "TED AI Stage",
  siteTagline: "أمتلك صوتاً",

  // ===== Hero =====
  hero: {
    title: "مسرح رقمي لأعمالي ومبادراتي",
    subtitle:
      "مساحة تفاعلية لعرض الفيديوهات، الوثائق، الإنجازات، والمشاريع بأسلوب احترافي.",
    cta1: "ادخل المسرح",
    cta2: "استعرض الملفات",
    stats: [
      { value: "١٢+", label: "فيديو مبادرة" },
      { value: "٢", label: "وثيقة" },
      { value: "١٠٠٪", label: "محتوى أصيل" },
      { value: "٢٠٢٦", label: "سنة الإطلاق" },
    ],
  },

  // ===== About =====
  about: {
    title: "عني",
    description:
      "اكتب هنا نبذة تعريفية قصيرة عنك، تخصصك، اهتماماتك، وأبرز المجالات التي تعمل عليها.",
    tags: ["TED AI Stage", "أمتلك صوتاً", "مبادرات طلابية", "الذكاء الاصطناعي"],
  },

  // ===== Skills =====
  skills: [
    { icon: "✦", name: "تصميم المحتوى", desc: "أضف وصفاً للمهارة" },
    { icon: "◈", name: "إدارة المبادرات", desc: "أضف وصفاً للمهارة" },
    { icon: "◎", name: "العرض والتقديم", desc: "أضف وصفاً للمهارة" },
    { icon: "⬡", name: "الذكاء الاصطناعي", desc: "أضف وصفاً للمهارة" },
    { icon: "▶", name: "صناعة الفيديو", desc: "أضف وصفاً للمهارة" },
    { icon: "◉", name: "التواصل", desc: "أضف وصفاً للمهارة" },
    { icon: "⊕", name: "البحث والتنظيم", desc: "أضف وصفاً للمهارة" },
    { icon: "⬢", name: "العمل الجماعي", desc: "أضف وصفاً للمهارة" },
  ],

  // ===== Achievements =====
  achievements: [
    {
      year: "٢٠٢٦",
      title: "أضف هنا الإنجاز",
      desc: "أضف هنا وصفاً مختصراً للإنجاز.",
      type: "مبادرة",
    },
    {
      year: "٢٠٢٦",
      title: "أضف هنا الإنجاز",
      desc: "أضف هنا وصفاً مختصراً للإنجاز.",
      type: "جائزة",
    },
    {
      year: "٢٠٢٦",
      title: "أضف هنا الإنجاز",
      desc: "أضف هنا وصفاً مختصراً للإنجاز.",
      type: "مشروع",
    },
  ],

  // ===== Videos =====
  // Each entry maps to a file in assets/videos/
  videos: [
    {
      file: "مبادرة من إيدين ستي_720p_caption.mp4",
      title: "مبادرة من إيدين ستي",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "مبادرة",
    },
    {
      file: "مبادرة لن ننسى، نتامل املا آلاء_720p_caption.mp4",
      title: "مبادرة لن ننسى — نتأمل أملاً",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "مبادرة",
    },
    {
      file: "ركن_الاستماع_جسر_نجاة_-_رئام_ناطور_with_captions.mp4",
      title: "ركن الاستماع — جسر نجاة",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "مبادرة",
    },
    {
      file: "نائلة كيوان - الأقصى .mp4",
      title: "نائلة كيوان — الأقصى",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "عرض",
    },
    {
      file: "__قوة النية - مع سجود عسلي_1080p_caption_.mp4",
      title: "قوة النية — مع سجود عسلي",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "عرض",
    },
    {
      file: "فيديو نهائي.mp4",
      title: "الفيديو النهائي",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "إنتاج",
    },
    {
      file: "Avatar_IV_Video.mp4",
      title: "فيديو الأفاتار IV",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "إنتاج",
    },
    {
      file: "Avatar_IV_Video (1).mp4",
      title: "فيديو الأفاتار IV — نسخة ٢",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "إنتاج",
    },
    {
      file: "https://drive.google.com/file/d/1zfbgKg9szpfLcdCRiUMbxEKUJmNmZIpc/preview",
      title: "قوة النية — جودة عالية",
      desc: "فيديو بجودة عالية (يعرض عبر درايف).",
      category: "عرض",
    },
    {
      file: "https://drive.google.com/file/d/1eCJKl6ugm1WADD00CB3RfY4rPSPNM2vY/preview",
      title: "تسجيل الأقصى",
      desc: "تسجيل نائلة كيوان (يعرض عبر درايف).",
      category: "إنتاج",
    },
    {
      file: "https://drive.google.com/file/d/1f0D34UM8Lijv8pGoyZf21DU4eyfxFToU/preview",
      title: "Avatar IV",
      desc: "فيديو الأفاتار الأساسي (يعرض عبر درايف).",
      category: "إنتاج",
    },
    {
      file: "ScreenRecording_05-06-2026 22-53-54_1.mp4",
      title: "تسجيل الشاشة — ٢٢:٥٣",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "تقني",
    },

    {
      file: "VIDEO-2026-05-06-23-16-33.mp4",
      title: "مقطع فيديو — ١",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
    {
      file: "VIDEO-2026-05-07-00-00-50.mp4",
      title: "مقطع فيديو — ٢",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
    {
      file: "WhatsApp Video 2026-05-05 at 8.00.05 PM.mp4",
      title: "واتساب — ٥ مايو ٢٠٢٦",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
    {
      file: "WhatsApp Video 2026-05-06 at 19.19.34.mp4",
      title: "واتساب — ٦ مايو ١٩:١٩",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
    {
      file: "WhatsApp Video 2026-05-06 at 19.20.20.mp4",
      title: "واتساب — ٦ مايو ١٩:٢٠",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
    {
      file: "WhatsApp Video 2026-05-06 at 21.00.01.mp4",
      title: "واتساب — ٦ مايو ٢١:٠٠",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
    {
      file: "WhatsApp Video 2026-05-06 at 21.28.23.mp4",
      title: "واتساب — ٦ مايو ٢١:٢٨",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
    {
      file: "WhatsApp Video 2026-05-06 at 23.29.09.mp4",
      title: "واتساب — ٦ مايو ٢٣:٢٩",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },

    {
      file: "WhatsApp Video 2026-06-07 at 18.57.51.mp4",
      title: "واتساب — ٧ يونيو ٢٠٢٦",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
    {
      file: "فيديو بدون عنوان (3).mp4",
      title: "فيديو بدون عنوان — ٣",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
    {
      file: "فيديو بدون عنوان (4).mp4",
      title: "فيديو بدون عنوان — ٤",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
    {
      file: "video.mp4",
      title: "مقطع قصير",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },

    {
      file: "a2cc567b-2a78-4f9a-ab72-bc248fe7fa10.mov",
      title: "تسجيل — ب",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
    {
      file: "bd73b597-d4f3-48fb-9bb7-8b8d417f2ecd.mov",
      title: "تسجيل — ج",
      desc: "أضف وصفاً مختصراً لهذا الفيديو.",
      category: "فيديو",
    },
  ],

  // ===== Documents =====
  documents: [
    {
      file: "مبادرة احلام حسن .docx",
      title: "مبادرة أحلام حسن",
      desc: "أضف وصفاً مختصراً لهذه الوثيقة.",
      category: "مبادرة",
    },
    {
      file: "Document (19) copy.docx",
      title: "وثيقة — ١٩",
      desc: "أضف وصفاً مختصراً لهذه الوثيقة.",
      category: "ملف",
    },
  ],

  // ===== Contact =====
  contact: {
    email: "أضف بريدك الإلكتروني هنا",
    instagram: "أضف رابط إنستغرام هنا",
    linkedin: "أضف رابط لينكدإن هنا",
    phone: "أضف رقم التواصل هنا",
  },
};
