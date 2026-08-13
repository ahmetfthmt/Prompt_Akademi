/**
 * Design philosophy: Araştırma Laboratuvarı — achievement is treated as documented evidence,
 * not as a generic celebration screen. The certificate stays precise, calm, and printable.
 */
import { Link } from "wouter";
import { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Award, CheckCircle2, Download, FileBadge2, FlaskConical, LockKeyhole, Sparkles } from "lucide-react";
import { getCompleted, totalLessons } from "@/lib/courseData";
import { toast } from "sonner";

const NAME_KEY = "pma-certificate-name";

function formatDate() {
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
}

export default function Certificate() {
  const [completed, setCompleted] = useState(0);
  const [name, setName] = useState("");
  const [generating, setGenerating] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const isComplete = completed >= totalLessons;
  const displayName = name.trim() || "Ad Soyad";
  const completionDate = useMemo(() => formatDate(), []);
  const certificateNo = useMemo(() => `PMA-${new Date().getFullYear()}-${String(totalLessons).padStart(2, "0")}`, []);

  useEffect(() => {
    const refresh = () => setCompleted(getCompleted().length);
    setName(localStorage.getItem(NAME_KEY) || "");
    refresh();
    window.addEventListener("pma-progress", refresh);
    return () => window.removeEventListener("pma-progress", refresh);
  }, []);

  const updateName = (value: string) => {
    setName(value);
    localStorage.setItem(NAME_KEY, value);
  };

  const downloadCertificate = async () => {
    if (!isComplete || !name.trim() || !certificateRef.current) return;
    setGenerating(true);
    try {
      await document.fonts.ready;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f1f0e8",
        logging: false,
      });
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 297, 210, undefined, "FAST");
      const safeName = name.trim().toLocaleLowerCase("tr-TR").replace(/[^a-z0-9ğüşöçıİ]/gi, "-").replace(/-+/g, "-");
      pdf.save(`prompt-muhendisligi-akademisi-sertifika-${safeName || "mezun"}.pdf`);
      toast.success("Sertifikanız PDF olarak indirildi.");
    } catch {
      toast.error("PDF hazırlanırken bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="page-wrap certificate-page">
      <section className="certificate-hero">
        <div>
          <span className="eyebrow"><span className="signal-dot" /> KURS BİTİRME SERTİFİKASI</span>
          <h1>Öğrenme iziniz, <em>belgelenecek</em> kadar gerçek.</h1>
          <p>Bu sertifika, Prompt Mühendisliği Akademisi'ndeki 19 uygulamalı öğrenme adımının tamamlandığını gösterir. Adınız yalnızca bu tarayıcıda tutulur ve PDF dosyanıza işlenir.</p>
        </div>
        <div className={`certificate-status ${isComplete ? "unlocked" : "locked"}`}>
          {isComplete ? <Award size={29} /> : <LockKeyhole size={29} />}
          <span className="micro-label">SERTİFİKA DURUMU</span>
          <strong>{isComplete ? "Sertifika hazır" : "Henüz kilitli"}</strong>
          <p>{isComplete ? "Tüm dersleri tamamladınız. Adınızı yazıp PDF'nizi oluşturabilirsiniz." : `${completed}/${totalLessons} ders adımı tamamlandı. Tüm adımlar bittiğinde sertifika açılır.`}</p>
          <div className="certificate-progress"><span style={{ width: `${Math.round((completed / totalLessons) * 100)}%` }} /></div>
        </div>
      </section>

      {!isComplete ? (
        <section className="certificate-lock-panel">
          <div className="lock-emblem"><LockKeyhole size={31} /></div>
          <div>
            <span className="micro-label">SON ADIM ÖNCE</span>
            <h2>Sertifika, ders rotasının tamamı için verilir.</h2>
            <p>Bu ekranı şimdiden görüntüleyebilirsiniz; ancak kişiselleştirme ve PDF indirme, tüm modüller tamamlandığında etkinleşir. İlerlemeniz bu tarayıcıda saklanır.</p>
          </div>
          <Link href="/dersler" className="button button-lime">Ders rotasına dön <FlaskConical size={16} /></Link>
        </section>
      ) : (
        <section className="certificate-workspace">
          <div className="certificate-editor">
            <span className="micro-label">KİŞİSELLEŞTİR</span>
            <h2>Sertifikanızda görünecek adı yazın.</h2>
            <p>İsminiz anlık önizlemeye yansır. Bu bilgi sunucuya gönderilmez; yalnızca tarayıcınızda ve indirdiğiniz PDF'de kullanılır.</p>
            <label className="certificate-name-field">
              <span>AD SOYAD</span>
              <input value={name} onChange={(event) => updateName(event.target.value)} placeholder="Örnek: Deniz Yılmaz" maxLength={72} autoComplete="name" />
            </label>
            <div className="certificate-editor-note"><CheckCircle2 size={17} /><p><strong>Tamamlama doğrulandı.</strong> Beş modül ve tüm uygulama adımları tamamlandı.</p></div>
            <button className="button button-primary certificate-download" disabled={!name.trim() || generating} onClick={downloadCertificate}><Download size={17} /> {generating ? "PDF hazırlanıyor…" : "PDF sertifikayı indir"}</button>
          </div>

          <div className="certificate-preview-wrap">
            <div className="preview-label"><FileBadge2 size={15} /> CANLI ÖNİZLEME</div>
            <div className="certificate-sheet" ref={certificateRef}>
              <div className="certificate-grid" />
              <div className="certificate-corner certificate-corner-tl" />
              <div className="certificate-corner certificate-corner-br" />
              <div className="certificate-seal"><Sparkles size={25} /><span>PMA</span></div>
              <div className="certificate-content">
                <div className="certificate-brand"><span>PROMPT</span><small>Mühendisliği Akademisi</small></div>
                <span className="certificate-overline">KURS BİTİRME SERTİFİKASI</span>
                <p className="certificate-intro">Bu belge,</p>
                <h3>{displayName}</h3>
                <p className="certificate-statement">isimli katılımcının, prompt tasarımının temelleri, teknik seçimi, model değerlendirmesi ve güvenli uygulama alanlarını kapsayan uygulamalı öğrenme rotasını tamamladığını doğrular.</p>
                <div className="certificate-footline">
                  <div><span>TAMAMLAMA TARİHİ</span><strong>{completionDate}</strong></div>
                  <div><span>SERTİFİKA NO</span><strong>{certificateNo}</strong></div>
                  <div className="certificate-sign"><span>AKADEMİ ONAYI</span><strong>Prompt Mühendisliği Akademisi</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="certificate-method-note">
        <Award size={22} />
        <div><span className="micro-label">SERTİFİKA KAPSAMI</span><p>Belge; temel kavramlar, prompt anatomisi, teknik seçimi, model karşılaştırması ve güvenli uygulama olmak üzere beş modülün tamamlanmasına dayanır. Sertifika numarası, programın sürüm ve kapsam bilgisini temsil eder.</p></div>
      </section>
    </div>
  );
}
