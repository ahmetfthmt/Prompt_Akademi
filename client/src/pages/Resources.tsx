/**
 * Design philosophy: Araştırma Laboratuvarı — sources are surfaced as a usable
 * verification toolkit, not hidden behind generic footer links.
 */
import { ArrowUpRight, BookMarked, ExternalLink, FileText, GraduationCap, Youtube } from "lucide-react";
import { sourceLinks } from "@/lib/courseData";

const videos = [
  { title: "OpenAI Developers — Prompting resources", url: "https://www.youtube.com/@OpenAI" },
  { title: "Google for Developers — Gemini API içerikleri", url: "https://www.youtube.com/@GoogleDevelopers" },
  { title: "Anthropic — araştırma ve ürün konuşmaları", url: "https://www.youtube.com/@AnthropicAI" },
];

export default function Resources() {
  return <div className="page-wrap resources-page"><section className="page-hero compact-hero"><div><span className="eyebrow"><span className="signal-dot" /> KAYNAK MERKEZİ / DOĞRULAMA ARAÇ KUTUSU</span><h1>Bir promptu geliştirirken, <em>kaynağı da geliştirin.</em></h1><p>Bu platformun ders yapısı, model sağlayıcılarının resmî prompt tasarım rehberleri ve açık öğrenme kaynaklarıyla çapraz kontrol edilmiştir. Dokümanlar güncellenebileceği için kritik kullanımlarda güncel sürümü mutlaka inceleyin.</p></div><div className="resource-stat"><BookMarked size={29} /><strong>{sourceLinks.length} seçilmiş kaynak</strong><span>Resmî dokümantasyon öncelikli</span></div></section><section className="resource-section"><div className="section-header-row"><div><span className="micro-label">BİRİNCİL KAYNAKLAR</span><h2>Model sağlayıcılarının güncel rehberleri</h2></div><FileText size={28} /></div><div className="resource-list">{sourceLinks.map((source, index) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="resource-row"><span>{String(index + 1).padStart(2, "0")}</span><div><small>{source.tag}</small><h3>{source.title}</h3><p>Yeni sekmede açılır. Kritik kullanımlarda model sürümü, fiyatlama ve güncelleme notlarını ayrıca kontrol edin.</p></div><ArrowUpRight size={20} /></a>)}</div></section><section className="resource-section two-column"><div><div className="section-header-row"><div><span className="micro-label">VİDEO KANALLARI</span><h2>Resmî açıklamalı içerikler</h2></div><Youtube size={27} /></div><div className="video-links">{videos.map((video) => <a href={video.url} target="_blank" rel="noreferrer" key={video.url}><Youtube size={17} />{video.title}<ExternalLink size={14} /></a>)}</div></div><div className="resource-callout"><GraduationCap size={28} /><h2>Öğrenme alışkanlığı: belgele, test et, sürümle.</h2><p>Bir promptu “iyi” kabul etmeden önce başarı ölçütlerini yazın; farklı örnek girdilerle deneyin; değişiklikleri kaydedin; güncel model davranışını yeniden değerlendirin.</p></div></section><section className="citation-note"><strong>Kaynak notu:</strong> Platformda yer alan “ChatGPT, Claude ve Gemini” karşılaştırmaları, kesin performans iddiası değildir. Aynı görevi; açık talimat, bağlam, format ve değerlendirme ölçütü bakımından nasıl uyarlayabileceğinizi öğretir.</section></div>;
}
