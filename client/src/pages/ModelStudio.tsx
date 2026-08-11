/**
 * Design philosophy: Araştırma Laboratuvarı — model comparison is a transparent
 * design exercise: same goal, different structure, explicit evaluation criteria.
 */
import { useState } from "react";
import { CheckCircle2, Clipboard, ClipboardCheck, FlaskConical, Gauge, Layers3, Sparkles } from "lucide-react";

const models = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    marker: "01",
    focus: "Açık görev, net çıktı şeması ve değerlendirme maddeleri",
    prompt: `## Rol\nSen deneyimli bir içerik stratejistisin.\n\n## Görev\nAşağıdaki ürün notundan hedef kitleye uygun kampanya fikri üret.\n\n## Girdi\n[ ÜRÜN NOTU ]\n\n## Çıktı şeması\n1. Hedef kitle\n2. Ana mesaj\n3. 3 kampanya fikri\n4. Her fikir için risk ve doğrulama sorusu\n\n## Kontrol\nÜrün notunda olmayan özellikleri iddia etme.`,
    notes: ["Görev ve çıktı biçimi açık olduğunda gözden geçirme daha kolaylaşır.", "İddia sınırı; pazarlama metninin varsayım üretmesini azaltır.", "Aynı girdiyi farklı müşteri örnekleriyle test edin."],
  },
  {
    id: "claude",
    name: "Claude",
    marker: "02",
    focus: "Uzun bağlamı ve içerik bölümlerini ayırmak için düzenli etiketleme",
    prompt: `<rol>\nSen deneyimli bir içerik stratejistisin.\n</rol>\n\n<gorev>\nÜrün notundan hedef kitleye uygun kampanya fikirleri üret.\n</gorev>\n\n<urun_notu>\n[ ÜRÜN NOTU ]\n</urun_notu>\n\n<kurallar>\n- Yalnızca ürün notuna dayalı kal.\n- Belirsiz bilgileri "doğrulanmalı" olarak işaretle.\n</kurallar>\n\n<cevap_formati>\nHedef kitle / ana mesaj / 3 fikir / riskler / doğrulama soruları\n</cevap_formati>`,
    notes: ["Bölümleri belirgin ayırmak, uzun veya karışık bağlamda inceleme kolaylığı sağlar.", "Kural ve kaynak bölümlerini veriden ayırmak, prompt denetimini güçlendirir.", "Etiket isimleri tutarlı olmalı; farklı örneklerde aynı yapı korunmalıdır."],
  },
  {
    id: "gemini",
    name: "Gemini",
    marker: "03",
    focus: "Açık kısıtlar, bağlam ve çok modlu ekler için gözlem–yorum ayrımı",
    prompt: `Amaç: Ürün notu ve ekli görselden hedef kitleye uygun kampanya fikri üret.\n\nGirdi:\n- Ürün notu: [ ÜRÜN NOTU ]\n- Görsel: [ GÖRSEL ]\n\nTalimatlar:\n1. Önce görselden doğrudan gözlemleri listele.\n2. Sonra ürün notu ile uyumlu 3 kampanya fikri geliştir.\n3. Gözleme dayanmayan yorumu "varsayım" olarak işaretle.\n4. Ürün notunda yer almayan özellik ekleme.\n\nYanıt formatı:\nGözlemler | Ana mesaj | 3 fikir | Varsayımlar | Doğrulama soruları`,
    notes: ["Görsel ve metin içeren görevlerde gözlem ile yorumu ayırmak önemli bir denetim katmanıdır.", "Kısıtlar ve yanıt biçimi, karşılaştırılabilir sonuç üretmeye yardım eder.", "Parametre veya model sürümü değiştiğinde aynı değerlendirme setiyle tekrar test edin."],
  },
];

export default function ModelStudio() {
  const [active, setActive] = useState("chatgpt");
  const [copied, setCopied] = useState(false);
  const model = models.find((item) => item.id === active) || models[0];
  const copy = async () => { await navigator.clipboard.writeText(model.prompt); setCopied(true); setTimeout(() => setCopied(false), 1600); };
  return <div className="page-wrap model-page"><section className="page-hero model-hero"><div><span className="eyebrow"><span className="signal-dot" /> AYNI AMAÇ / FARKLI YAPI</span><h1>Modeli değil, <em>tasarım kararını</em> karşılaştırın.</h1><p>Her model ailesi için “tek doğru prompt” yoktur. Bunun yerine, aynı görevde hangi yapıların kontrol, okunabilirlik ve değerlendirme sürecini kolaylaştırdığını test edin.</p></div><div className="model-protocol"><FlaskConical size={27} /><span className="micro-label">DENEY PROTOKOLÜ</span><strong>1 görev · 3 yapı · 1 ölçüt seti</strong><small>Canlı sonuç değil; test tasarımı öğretir.</small></div></section><section className="model-lab"><aside className="model-tabs">{models.map((item) => <button className={active === item.id ? "active" : ""} onClick={() => { setActive(item.id); setCopied(false); }} key={item.id}><span>{item.marker}</span><div><strong>{item.name}</strong><small>{item.focus}</small></div></button>)}</aside><div className="model-workbench"><div className="workbench-top"><div><span className="micro-label">{model.name.toUpperCase()} İÇİN ÖRNEK İSTEM</span><h2>Ürün notundan kampanya fikri</h2></div><button onClick={copy} className="copy-button">{copied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}{copied ? "Kopyalandı" : "Kopyala"}</button></div><pre className="model-prompt">{model.prompt}</pre><div className="model-focus"><Layers3 size={19} /><div><strong>Tasarım odağı</strong><p>{model.focus}</p></div></div></div></section><section className="evaluation-grid"><div className="evaluation-intro"><span className="micro-label">KARŞILAŞTIRMA ÖLÇÜTLERİ</span><h2>Bir cevabı beğenmek yerine, ölçütlerle değerlendirin.</h2><p>Aynı görevi aynı temsilî girdilerle çalıştırın. Sonucu yalnızca akıcılığa göre değil; kanıt, format ve güvenlik açısından da işaretleyin.</p></div><div className="criteria-stack"><article><Gauge size={19} /><div><strong>Uygunluk</strong><p>Görevi, hedef kitleyi ve kapsamı karşıladı mı?</p></div><CheckCircle2 size={18} /></article><article><Sparkles size={19} /><div><strong>Yapı uyumu</strong><p>İstenen tablo, başlık veya şemayı tutarlı biçimde verdi mi?</p></div><CheckCircle2 size={18} /></article><article><Layers3 size={19} /><div><strong>Kanıt sınırı</strong><p>Verilmeyen bilgiyi uydurmadan belirsizliği belirtti mi?</p></div><CheckCircle2 size={18} /></article></div></section><section className="experiment-note"><strong>Profesyonel ipucu:</strong> Prompt değiştirmeden model karşılaştırmak da, modeli değiştirmeden prompt karşılaştırmak da tek başına yeterli değildir. Sürüm, görev, temsilî veri ve puanlama ölçütünü kaydedin; sonra tek değişkenli denemeler yapın.</section></div>;
}
