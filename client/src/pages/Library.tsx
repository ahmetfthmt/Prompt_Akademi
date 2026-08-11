/**
 * Design philosophy: Araştırma Laboratuvarı — examples are inspectable specimens,
 * with a clear purpose, editable ingredients, and a one-click copy action.
 */
import { useMemo, useState } from "react";
import { Check, Clipboard, ClipboardCheck, Filter, Search, Sparkles, Tags } from "lucide-react";
import { templates } from "@/lib/courseData";

const categories = ["Tümü", ...Array.from(new Set(templates.map((item) => item.category)))];

export default function Library() {
  const [category, setCategory] = useState("Tümü");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState("article");
  const [copied, setCopied] = useState("");
  const filtered = useMemo(() => templates.filter((item) => (category === "Tümü" || item.category === category) && `${item.title} ${item.description}`.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))), [category, query]);
  const copy = async (id: string, text: string) => { await navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(""), 1600); };
  return (
    <div className="page-wrap library-page">
      <section className="page-hero compact-hero"><div><span className="eyebrow"><span className="signal-dot" /> 09 UYGULANABİLİR ŞABLON</span><h1>Örnekleri kopyalayın; <em>boşlukları kendi işinizle doldurun.</em></h1><p>Her şablonun amacı, sınırı ve çıktı yapısı belli. Uygulamadan önce köşeli parantez içindeki alanları kendi bağlamınızla değiştirin.</p></div><img src="/manus-storage/prompt-scenarios_314a3234.png" alt="Eğitim, yazılım, içerik ve güvenlik senaryolarını bağlayan soyut öğrenme rotası" /></section>
      <section className="library-tools"><div className="search-wrap"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Örneklerde ara: e-posta, ders, analiz…" aria-label="Örnek promptlarda ara" /></div><div className="category-list"><Filter size={16} />{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></section>
      <p className="library-count"><Tags size={16} /> {filtered.length} şablon gösteriliyor. Şablonlar temsilîdir; güncel bilgi ve kurum politikanız için çıktıyı doğrulayın.</p>
      <section className="template-library-grid">{filtered.map((item, index) => { const isOpen = open === item.id; return <article className={`template-specimen ${isOpen ? "open" : ""}`} key={item.id}><div className="specimen-marker">{String(index + 1).padStart(2, "0")}</div><div className="specimen-header"><span className="template-tag">{item.category}</span><h2>{item.title}</h2><p>{item.description}</p></div><div className="specimen-actions"><button onClick={() => setOpen(isOpen ? "" : item.id)}>{isOpen ? "Şablonu kapat" : "Şablonu incele"}</button><button className="copy-button compact" onClick={() => copy(item.id, item.prompt)}>{copied === item.id ? <ClipboardCheck size={15} /> : <Clipboard size={15} />}{copied === item.id ? "Kopyalandı" : "Kopyala"}</button></div>{isOpen && <div className="specimen-body"><pre>{item.prompt}</pre><div className="specimen-tip"><Sparkles size={16} /><span><strong>Özelleştirme ipucu:</strong> Köşeli parantez içindeki alanları kendi görevinizle doldurun; sonra çıktıyı format, doğruluk ve güvenlik açısından değerlendirin.</span></div></div>}</article>})}</section>
    </div>
  );
}
