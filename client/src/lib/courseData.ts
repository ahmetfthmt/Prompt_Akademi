/**
 * Design philosophy: Araştırma Laboratuvarı — code-like precision, visible learning progress,
 * and evidence-based Turkish education. This module owns the learning vocabulary used everywhere.
 */
import {
  BookOpenCheck,
  BrainCircuit,
  Braces,
  FlaskConical,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  kind: "Ders" | "Örnek" | "Alıştırma";
};

export type Module = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  level: "Başlangıç" | "Temel" | "Orta";
  color: string;
  icon: typeof BookOpenCheck;
  objective: string;
  lessons: Lesson[];
};

export const modules: Module[] = [
  {
    id: "baslangic",
    number: "01",
    title: "Zihinsel modeli kur",
    subtitle: "Prompt nedir, neden sonuç değişir?",
    duration: "18 dk",
    level: "Başlangıç",
    color: "lime",
    icon: BookOpenCheck,
    objective: "Bir promptun amaç, bağlam ve çıktı beklentisi taşıyan tasarlanmış bir talimat olduğunu açıklayabilmek.",
    lessons: [
      { id: "what-is", title: "Prompt nedir; ne değildir?", duration: "6 dk", kind: "Ders" },
      { id: "input-output", title: "Girdi → model → çıktı zinciri", duration: "5 dk", kind: "Ders" },
      { id: "ambiguity", title: "Belirsizliği yakalama", duration: "7 dk", kind: "Alıştırma" },
    ],
  },
  {
    id: "anatomi",
    number: "02",
    title: "Prompt anatomisi",
    subtitle: "Altı katmanla kontrol alanı kurun.",
    duration: "24 dk",
    level: "Temel",
    color: "teal",
    icon: Braces,
    objective: "Rol, görev, bağlam, kısıt, çıktı formatı ve kalite kontrolünü tek bir promptta bilinçli kullanabilmek.",
    lessons: [
      { id: "role", title: "Rol ve hedef okuyucu", duration: "5 dk", kind: "Ders" },
      { id: "context", title: "Bağlam ve sınırlar", duration: "6 dk", kind: "Ders" },
      { id: "format", title: "Çıktı biçimi tasarımı", duration: "5 dk", kind: "Örnek" },
      { id: "anatomy-lab", title: "Anatomi laboratuvarı", duration: "8 dk", kind: "Alıştırma" },
    ],
  },
  {
    id: "teknikler",
    number: "03",
    title: "Tekniği göreve uydur",
    subtitle: "Zero-shot’tan iterasyona doğru seçim.",
    duration: "32 dk",
    level: "Orta",
    color: "coral",
    icon: BrainCircuit,
    objective: "Görevin belirsizliğine ve riskine göre zero-shot, few-shot, rol, ayrıştırma ve doğrulama yaklaşımlarını seçebilmek.",
    lessons: [
      { id: "zero-few", title: "Zero-shot ve few-shot", duration: "8 dk", kind: "Ders" },
      { id: "decompose", title: "Görevi adımlara ayırma", duration: "7 dk", kind: "Ders" },
      { id: "iteration", title: "İterasyon ve geri bildirim", duration: "7 dk", kind: "Örnek" },
      { id: "technique-choice", title: "Teknik seçici", duration: "10 dk", kind: "Alıştırma" },
    ],
  },
  {
    id: "modeller",
    number: "04",
    title: "Model ve değerlendirme",
    subtitle: "Aynı amaç, farklı model düzeni.",
    duration: "26 dk",
    level: "Orta",
    color: "violet",
    icon: FlaskConical,
    objective: "Başarı ölçütü belirleyerek model davranışını karşılaştırmak ve promptu sürümleyerek geliştirmek.",
    lessons: [
      { id: "criteria", title: "Başarı ölçütü kurma", duration: "6 dk", kind: "Ders" },
      { id: "model-shape", title: "ChatGPT, Claude, Gemini", duration: "8 dk", kind: "Örnek" },
      { id: "evaluate", title: "Çıktıyı değerlendirme", duration: "6 dk", kind: "Ders" },
      { id: "compare", title: "Karşılaştırma matrisi", duration: "6 dk", kind: "Alıştırma" },
    ],
  },
  {
    id: "guvenlik",
    number: "05",
    title: "Güvenli uygulama",
    subtitle: "Veri, kaynak, önyargı ve enjeksiyon riskleri.",
    duration: "24 dk",
    level: "Orta",
    color: "amber",
    icon: ShieldCheck,
    objective: "Hassas veri, doğrulanmamış iddia ve prompt enjeksiyonu risklerini belirleyip güvenli bir istem yazabilmek.",
    lessons: [
      { id: "data", title: "Veri minimizasyonu", duration: "6 dk", kind: "Ders" },
      { id: "injection", title: "Prompt enjeksiyonu farkındalığı", duration: "7 dk", kind: "Ders" },
      { id: "verify", title: "Kaynak ve doğrulama", duration: "5 dk", kind: "Örnek" },
      { id: "safety-radar", title: "Güvenlik radarı", duration: "6 dk", kind: "Alıştırma" },
    ],
  },
];

export const templates = [
  {
    id: "article",
    category: "İçerik",
    title: "Açıklayıcı makale",
    description: "Konuya yeni başlayanlar için anlaşılır, kaynak ihtiyacını belirten yazı.",
    prompt: `## Rol\nSen deneyimli bir Türkçe eğitim içerik editörüsün.\n\n## Görev\n[ KONU ] hakkında 700 kelimelik açıklayıcı bir makale yaz.\n\n## Bağlam\nOkur konuya yabancı; amacı temel kavramları ve pratik etkileri anlamak.\n\n## Kısıtlar\n- Teknik terimi ilk geçtiği yerde sade biçimde açıkla.\n- Emin olmadığın güncel iddialar için "doğrulanmalı" notu düş.\n- Üç ara başlık kullan.\n\n## Çıktı formatı\nBaşlık, kısa özet, üç bölüm, 3 maddelik sonuç.`,
  },
  {
    id: "email",
    category: "İş",
    title: "Müşteri e-postası",
    description: "Sakin, çözüm odaklı ve kişisel veri istemeyen yanıt şablonu.",
    prompt: `## Rol\nSen müşteri deneyimi uzmanısın.\n\n## Görev\nAşağıdaki müşteri mesajına Türkçe bir yanıt taslağı yaz.\n\n## Müşteri mesajı\n[ MESAJ ]\n\n## Kısıtlar\n- Empatiyle başla, suç kabul etme.\n- Eksik bilgiyi güvenli kanaldan talep et; kart veya kimlik bilgisi isteme.\n- En fazla 130 kelime yaz.\n\n## Çıktı formatı\nKonu satırı + e-posta metni + önerilen sonraki adım.`,
  },
  {
    id: "lesson",
    category: "Eğitim",
    title: "Ders planı",
    description: "Farklı seviyelere uyarlanabilir 40 dakikalık aktif öğrenme planı.",
    prompt: `## Rol\nSen deneyimli bir öğretim tasarımcısısın.\n\n## Görev\n[ KONU ] için [ SINIF/YAŞ ] grubuna yönelik 40 dakikalık ders planı oluştur.\n\n## Bağlam\nÖğrenciler [ ÖN BİLGİ ] düzeyinde.\n\n## Kısıtlar\n- En az bir aktif öğrenme etkinliği ekle.\n- Her hedef gözlemlenebilir bir fiille başlasın.\n- Sadece erişilebilir sınıf malzemeleri kullan.\n\n## Çıktı formatı\nHedefler, akış, etkinlik, ölçme sorusu, uyarlama önerisi.`,
  },
  {
    id: "data",
    category: "Analiz",
    title: "Veri özeti",
    description: "Yüklenmiş tablo veya metindeki bulguyu tahminden ayıran analiz çerçevesi.",
    prompt: `## Rol\nSen dikkatli bir veri analistisin.\n\n## Görev\nAşağıdaki veri özetinden karar verici için kısa içgörü raporu çıkar.\n\n## Veri\n[ VERİ / TABLO / NOT ]\n\n## Kısıtlar\n- Gözlem ile yorumları ayrı başlıkta yaz.\n- Veri dışına taşan çıkarımlar için kesin dil kullanma.\n- Eksik veri veya olası yanlılığı belirt.\n\n## Çıktı formatı\n3 bulgu, 2 risk, 2 doğrulama sorusu, önerilen sonraki analiz.`,
  },
  {
    id: "code",
    category: "Yazılım",
    title: "Hata ayıklama",
    description: "Hata nedenini, sınır durumlarını ve testleri birlikte isteyen geliştirme promptu.",
    prompt: `## Rol\nSen güvenlik ve test odaklı kıdemli bir [ DİL ] geliştiricisisin.\n\n## Görev\nAşağıdaki kodu analiz et; olası hatayı açıkla ve minimal bir düzeltme öner.\n\n## Kod\n\`\`\`\n[ KOD ]\n\`\`\`\n\n## Beklenen davranış\n[ BEKLENEN SONUÇ ]\n\n## Çıktı formatı\n1. Kök neden\n2. Düzeltme\n3. İki sınır durum testi\n4. Güvenlik veya performans notu.`,
  },
  {
    id: "meeting",
    category: "İş",
    title: "Toplantıdan eylem listesi",
    description: "Atanmamış görevleri görünür kılan, belirsizliği açıkça işaretleyen özet.",
    prompt: `## Rol\nSen proje koordinatörüsün.\n\n## Görev\nAşağıdaki toplantı notlarını eylem odaklı özete dönüştür.\n\n## Notlar\n[ TOPLANTI NOTLARI ]\n\n## Kısıtlar\n- Notta geçmeyen sahip veya tarih uydurma.\n- Belirsiz işleri "netleştirilecek" olarak işaretle.\n\n## Çıktı formatı\nKararlar, eylemler (sahip/tarih/durum), açık sorular, riskler.`,
  },
  {
    id: "visual",
    category: "Çok Modlu",
    title: "Görsel analizi",
    description: "Bir görselin gözlemini, yorumunu ve doğrulanması gerekenleri ayırır.",
    prompt: `## Rol\nSen erişilebilirlik duyarlılığı olan bir görsel içerik analistisin.\n\n## Görev\nEkli görseli analiz et.\n\n## Kısıtlar\n- Doğrudan gözlem ile yorumu ayır.\n- Görselde okunamayan metni tahmin etme.\n- Gerekirse alternatif metin üret.\n\n## Çıktı formatı\nGözlemler, olası mesaj, erişilebilirlik notu, doğrulanacak noktalar, 120 karakterlik alt metin.`,
  },
  {
    id: "research",
    category: "Araştırma",
    title: "Kaynak tabanlı özet",
    description: "Verilen kaynak sınırlarında kalmayı ve iddiaları izlemeyi öğretir.",
    prompt: `## Rol\nSen araştırma asistanısın.\n\n## Görev\nAşağıdaki kaynak parçalarından [ SORU ] sorusuna yanıt ver.\n\n## Kaynaklar\n[ KAYNAK PARÇALARI ]\n\n## Kısıtlar\n- Yalnızca verilen kaynaklardaki bilgiyi kullan.\n- Her ana iddianın sonuna [K1], [K2] benzeri işaret koy.\n- Kaynaklar yetersizse bunu açıkça belirt.\n\n## Çıktı formatı\nKısa yanıt, kanıt tablosu, belirsizlikler, sonraki araştırma soruları.`,
  },
  {
    id: "safe-support",
    category: "Güvenlik",
    title: "Güvenli destek yanıtı",
    description: "Hassas yardım senaryolarında kapsam sınırını ve doğrulama ihtiyacını belirtir.",
    prompt: `## Rol\nSen güvenlik odaklı bir destek temsilcisisin.\n\n## Görev\nAşağıdaki soruna çözüm adımları sun.\n\n## Durum\n[ DURUM ]\n\n## Kısıtlar\n- Kimlik, şifre, kart veya sağlık verisi isteme.\n- Kesin olmayan bilgiyi kesinmiş gibi sunma.\n- Riskli durumda resmi destek kanalına yönlendir.\n\n## Çıktı formatı\nGüvenli ilk adım, kontrol listesi, ne zaman destek alınmalı, kısa uyarı.`,
  },
];

export const quizQuestions = [
  {
    q: "Belirsiz bir istekten önce en etkili ilk iyileştirme hangisidir?",
    options: ["Daha uzun yazmak", "Amaç, hedef kitle ve beklenen çıktıyı belirtmek", "Aynı cümleyi büyük harflerle yazmak", "Modelden tahmin etmesini istemek"],
    answer: 1,
    explain: "Amaç, bağlam ve çıktı formatı; modelin hangi sonucun başarılı olduğunu anlamasına yardım eder.",
  },
  {
    q: "Few-shot prompting ne zaman özellikle yararlıdır?",
    options: ["Modelin takip etmesini istediğiniz biçim veya sınıflama örneği varken", "Yalnızca tek kelimelik yanıt istenirken", "İnternet bağlantısı yokken", "Prompt hiç bağlam içermediğinde"],
    answer: 0,
    explain: "Az sayıda, tutarlı örnek; modelin beklenen kalıbı görmesini sağlar.",
  },
  {
    q: "Hangisi güvenli prompt tasarımının iyi bir örneğidir?",
    options: ["Kart numarasını paylaşmasını istemek", "Eksik bağlamda kesin tıbbi teşhis vermek", "Kişisel veriyi en aza indirip resmi kanala yönlendirmek", "Kısıtları yok saymasını istemek"],
    answer: 2,
    explain: "Gereksiz hassas veriyi istememek ve yüksek riskte yetkili kanala yönlendirmek temel bir güvenlik pratiğidir.",
  },
  {
    q: "Çıktı formatını belirtmenin ana yararı nedir?",
    options: ["Modeli daha yaratıcı yapar", "Yanıtı kullanılabilir ve tutarlı bir yapıya yönlendirir", "Her zaman daha kısa yanıt üretir", "Modelin kaynak kontrolünü gereksiz kılar"],
    answer: 1,
    explain: "Tablo, JSON, başlıklar veya maddeler gibi formatlar, çıktının doğrudan kullanılmasını kolaylaştırır.",
  },
  {
    q: "Prompt iterasyonunda doğru yaklaşım hangisidir?",
    options: ["İlk yanıtı mutlak doğru saymak", "Tüm promptu rastgele değiştirmek", "Başarı ölçütüne göre tek tek değişiklikleri değerlendirmek", "Değerlendirme yapmadan modeli değiştirmek"],
    answer: 2,
    explain: "Kontrollü değişiklikler, hangi bölümün çıktıyı iyileştirdiğini anlamanızı sağlar.",
  },
  {
    q: "Modelin bir kaynaktan uydurma bilgi eklemesini azaltmak için ne istenir?",
    options: ["Kaynakları ve sınırı belirtip belirsizliği işaretlemesini istemek", "Daha etkileyici bir ton", "Sadece daha çok emoji", "Rolü kaldırmak"],
    answer: 0,
    explain: "Kaynak sınırı ve belirsizlik talimatı, doğrulama ihtiyacını görünür kılar.",
  },
  {
    q: "Karmaşık bir iş akışını küçük parçalara bölmek hangi tekniktir?",
    options: ["Görev ayrıştırma / prompt chaining", "Sadece zero-shot", "Renk kodlama", "Token tahmini"],
    answer: 0,
    explain: "Ayrıştırma, her adımın çıktısını kontrol etmeyi ve hatayı lokalize etmeyi kolaylaştırır.",
  },
  {
    q: "Bir model karşılaştırmasında en sağlıklı soru hangisidir?",
    options: ["Hangisi daima en iyidir?", "Aynı görevde önceden tanımlı ölçütleri hangisi daha iyi karşılıyor?", "Hangisi daha uzun yanıt veriyor?", "Hangisinin logosu daha güzel?"],
    answer: 1,
    explain: "Mutlak kazanan yerine; görev, ölçüt, maliyet, hız ve kalite bağlamında karşılaştırma yapılmalıdır.",
  },
  {
    q: "Prompt enjeksiyonu farkındalığında ilk savunma katmanı nedir?",
    options: ["Girdiyi talimatlardan ayırmak ve güvenilmeyen içeriği veri olarak ele almak", "Girdideki her emri uygulamak", "Daha fazla gizli talimat eklemek", "Kullanıcıyı görmezden gelmek"],
    answer: 0,
    explain: "Güvenilmeyen içerik talimat değil, veri olarak değerlendirilmelidir; rol ve yetki sınırları korunmalıdır.",
  },
  {
    q: "Bir promptun kalitesini ölçmek için hangi yaklaşım uygundur?",
    options: ["Yalnızca kulağa iyi gelmesine bakmak", "Doğruluk, kapsam, biçim uyumu ve güvenlik gibi ölçütler belirlemek", "Her seferinde farklı görev kullanmak", "Çıktıyı hiç okumamak"],
    answer: 1,
    explain: "Başarı ölçütleri, prompt tasarımını ölçülebilir ve tekrarlanabilir bir çalışma hâline getirir.",
  },
];

const STORAGE_KEY = "pma-completed-lessons";
export const getCompleted = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};
export const setCompleted = (ids: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("pma-progress"));
};
export const totalLessons = modules.reduce((count, module) => count + module.lessons.length, 0);

export const sourceLinks = [
  { title: "OpenAI · Prompt engineering", url: "https://developers.openai.com/api/docs/guides/prompt-engineering", tag: "Resmî dokümantasyon" },
  { title: "Anthropic · Prompt engineering overview", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview", tag: "Resmî dokümantasyon" },
  { title: "Google · Gemini prompting strategies", url: "https://ai.google.dev/gemini-api/docs/prompting-strategies", tag: "Resmî dokümantasyon" },
  { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", tag: "Açık öğrenme kaynağı" },
  { title: "Anthropic · Interactive tutorial", url: "https://github.com/anthropics/prompt-eng-interactive-tutorial", tag: "Uygulamalı eğitim" },
];

export const ModelBadge = Sparkles;
