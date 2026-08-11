/**
 * Design philosophy: Araştırma Laboratuvarı — inputs visibly reshape the prompt;
 * each field makes an abstract design component concrete and copyable.
 */
import { useMemo, useState } from "react";
import { CheckCircle2, Clipboard, ClipboardCheck, FlaskConical, Lightbulb, RotateCcw, ShieldAlert, Sparkles } from "lucide-react";
import { templates } from "@/lib/courseData";

type FormState = { role: string; task: string; context: string; constraints: string; format: string; quality: string };
const blank: FormState = { role: "", task: "", context: "", constraints: "", format: "", quality: "" };

const example: FormState = {
  role: "Deneyimli bir Türkçe teknik editörsün.",
  task: "Yeni başlayanlar için prompt mühendisliğinin neden önemli olduğunu açıklayan 500 kelimelik makale yaz.",
  context: "Okur yapay zekâ araçlarını işinde kullanmaya yeni başlıyor; örneklerin iş dünyasından gelmesi yararlı olur.",
  constraints: "Teknik terimleri ilk kullanımda açıkla. Kesin olmayan güncel iddiaları doğrulanmalı diye işaretle. Kişisel veri örneği kullanma.",
  format: "Başlık, 3 ara başlık, kısa sonuç ve 3 maddelik deneme listesi.",
  quality: "Yanıtı vermeden önce: hedef okuyucuya uygunluk, biçim uyumu ve doğrulanması gereken iddialar için kısa kontrol yap.",
};

const labels: { key: keyof FormState; title: string; note: string; required?: boolean }[] = [
  { key: "role", title: "01 · Rol", note: "Modelin hangi uzmanlık perspektifiyle hareket etmesini istediğinizi belirtin." },
  { key: "task", title: "02 · Görev", note: "Tek bir fiille başlayın: yaz, karşılaştır, çıkar, planla, denetle…", required: true },
  { key: "context", title: "03 · Bağlam", note: "Modelin bilmesi gereken ama tahmin etmesini istemediğiniz bilgiyi ekleyin." },
  { key: "constraints", title: "04 · Kısıtlar", note: "Uzunluk, kapsam dışı alan, ton, risk ve sınırları tanımlayın." },
  { key: "format", title: "05 · Çıktı formatı", note: "Başlıklar, tablo, JSON, madde listesi veya şema gibi yapıyı açıkça isteyin." },
  { key: "quality", title: "06 · Kalite kontrolü", note: "Modelden belirsizliği, kaynak ihtiyacını veya eksik bilgiyi işaretlemesini isteyin." },
];

export default function Lab() {
  const [form, setForm] = useState<FormState>(example);
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState("role");
  const prompt = useMemo(() => [
    form.role && `## Rol\n${form.role}`,
    form.task && `## Görev\n${form.task}`,
    form.context && `## Bağlam\n${form.context}`,
    form.constraints && `## Kısıtlar\n${form.constraints}`,
    form.format && `## Çıktı formatı\n${form.format}`,
    form.quality && `## Kontrol\n${form.quality}`,
  ].filter(Boolean).join("\n\n"), [form]);
  const filled = Object.values(form).filter(Boolean).length;
  const quality = [form.task, form.context, form.format, form.quality].filter(Boolean).length;
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const copy = async () => { await navigator.clipboard.writeText(prompt); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  return (
    <div className="page-wrap lab-page">
      <section className="page-hero lab-hero"><div><span className="eyebrow"><span className="signal-dot" /> UYGULAMALI ATÖLYE / CANLI ÖNİZLEME</span><h1>Promptunuzu yazın. <em>Yapısını görün.</em></h1><p>Her alan, modelin cevap alanını farklı biçimde düzenler. Boş bırakın, doldurun, karşılaştırın ve kendi taslağınızı kopyalayın.</p></div><div className="lab-status"><FlaskConical size={28} /><span>LAB RUNNING</span><strong>{filled}/6 katman etkin</strong><div className="status-bar"><span style={{ width: `${(filled / 6) * 100}%` }} /></div></div></section>
      <div className="lab-layout">
        <section className="lab-form-panel"><div className="panel-heading"><div><span className="micro-label">GİRDİ DÜZENLEYİCİ</span><h2>Prompt anatomisi</h2></div><button className="icon-text-button" onClick={() => setForm(blank)}><RotateCcw size={15} /> Temizle</button></div>
          <div className="lab-fields">{labels.map(({ key, title, note, required }) => <label className={`lab-field ${active === key ? "focused" : ""}`} key={key}><span><strong>{title}</strong>{required && <em>Zorunlu</em>}</span><small>{note}</small><textarea value={form[key]} onFocus={() => setActive(key)} onChange={(event) => update(key, event.target.value)} placeholder={`${title.split("·")[1].trim()} ekleyin…`} rows={key === "task" || key === "constraints" ? 4 : 3} /></label>)}</div>
          <div className="lab-toolbox"><Lightbulb size={18} /><div><strong>Hızlı başlangıç</strong><p>Örnek bir eğitim promptu yüklendi. Kendi senaryonuz için alanları değiştirin.</p></div><button onClick={() => setForm(example)}>Örneği geri yükle</button></div>
        </section>
        <aside className="prompt-preview-panel"><div className="preview-heading"><div><span className="micro-label">DERLENMİŞ İSTEM</span><h2>Canlı prompt</h2></div><button onClick={copy} className="copy-button">{copied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}{copied ? "Kopyalandı" : "Kopyala"}</button></div><pre className="prompt-output">{prompt || "İlk görevinizi yazdığınızda promptunuz burada oluşacak."}</pre>
          <div className="quality-meter"><div><span className="micro-label">TASARIM KONTROLÜ</span><strong>{quality === 4 ? "Güçlü taslak" : quality >= 2 ? "Geliştirilebilir taslak" : "Temel taslak"}</strong></div><div className="meter-track"><span style={{ width: `${(quality / 4) * 100}%` }} /></div><ul><li className={form.task ? "pass" : ""}>{form.task ? <CheckCircle2 size={15} /> : <span />} Görev tanımlı</li><li className={form.context ? "pass" : ""}>{form.context ? <CheckCircle2 size={15} /> : <span />} Bağlam var</li><li className={form.format ? "pass" : ""}>{form.format ? <CheckCircle2 size={15} /> : <span />} Format belirli</li><li className={form.quality ? "pass" : ""}>{form.quality ? <CheckCircle2 size={15} /> : <span />} Doğrulama isteği var</li></ul></div>
          <div className="lab-safety-note"><ShieldAlert size={17} /><p><strong>Güvenlik notu:</strong> Gerçek kişi adı, müşteri bilgisi, şifre, ödeme veya sağlık verisi eklemeyin. Belirsiz veya yüksek riskli cevapları bağımsız olarak doğrulayın.</p></div>
        </aside>
      </div>
      <section className="template-strip"><div><span className="micro-label">ŞABLONLAR</span><h2>Bir görev türüyle başlayın.</h2></div><div className="template-pill-list">{templates.slice(0, 5).map((item) => <button key={item.id} onClick={() => { navigator.clipboard.writeText(item.prompt); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }}><Sparkles size={14} /> {item.title}</button>)}</div></section>
    </div>
  );
}
