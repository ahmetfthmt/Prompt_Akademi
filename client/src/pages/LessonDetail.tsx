/**
 * Design philosophy: Araştırma Laboratuvarı — every lesson alternates between a
 * calm explanation, a visible process model, a contrast, and a small decision.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, CheckCircle2, ChevronLeft, ChevronRight, CircleAlert, Clipboard, Compass, Eye, FlaskConical, Layers3, LockKeyhole, Play, ShieldCheck, Sparkles, Target, X } from "lucide-react";
import { findLesson } from "@/lib/lessonContent";
import { getCompleted, modules, setCompleted, totalLessons } from "@/lib/courseData";

function LessonVisual({ type }: { type: string }) {
  const common = <><span className="visual-orb orb-one" /><span className="visual-orb orb-two" /></>;
  if (type === "blocks" || type === "role" || type === "context" || type === "format") {
    const labels = type === "role" ? ["Bakış", "Görev", "Okuyucu"] : type === "context" ? ["Veri", "Sınır", "Amaç"] : type === "format" ? ["İçerik", "Şema", "Teslim"] : ["Rol", "Bağlam", "Format"];
    return <div className="lesson-visual visual-blocks">{common}<div className="visual-caption">PROMPT / BUILD</div><div className="block-stack">{labels.map((label, index) => <div className={`concept-block block-${index + 1}`} key={label}><span>0{index + 1}</span>{label}</div>)}</div><div className="signal-thread" /></div>;
  }
  if (type === "pipeline" || type === "chain" || type === "models" || type === "matrix") {
    const labels = type === "models" ? ["Görev", "Yapı", "Ölçüt"] : type === "matrix" ? ["Deneme", "Rubrik", "Karar"] : type === "chain" ? ["Çıkar", "Kontrol", "Yaz"] : ["Girdi", "Yorum", "Çıktı"];
    return <div className="lesson-visual visual-pipeline">{common}<div className="visual-caption">FLOW / {type.toUpperCase()}</div><div className="pipeline-track">{labels.map((label, index) => <div className="pipeline-node" key={label}><span>{index + 1}</span><strong>{label}</strong></div>)}</div><div className="traveling-signal" /></div>;
  }
  if (type === "cycle" || type === "evaluate" || type === "rubric") {
    const labels = type === "rubric" ? ["Ölç", "Puanla", "Gerekçelendir"] : type === "evaluate" ? ["Dene", "Gözlemle", "İyileştir"] : ["Gözlem", "Değiştir", "Tekrarla"];
    return <div className="lesson-visual visual-cycle">{common}<div className="visual-caption">LOOP / IMPROVE</div><div className="cycle-core"><Sparkles size={23} /></div>{labels.map((label, index) => <div className={`cycle-node cycle-node-${index + 1}`} key={label}><span>0{index + 1}</span>{label}</div>)}</div>;
  }
  if (type === "shield" || type === "data" || type === "verify" || type === "radar") {
    const labels = type === "data" ? ["Gerekli", "Anonim", "Güvenli"] : type === "verify" ? ["Kaynak", "Belirsizlik", "Kontrol"] : ["Veri", "Talimat", "Kanıt", "Kapsam"];
    return <div className="lesson-visual visual-radar">{common}<div className="visual-caption">SAFE / CHECK</div><div className="radar-grid" /><div className="radar-pulse" /><ShieldCheck className="radar-shield" size={34} />{labels.map((label, index) => <div className={`radar-label radar-label-${index + 1}`} key={label}>{label}</div>)}</div>;
  }
  return <div className="lesson-visual visual-signal">{common}<div className="visual-caption">FOCUS / CLARITY</div><div className="signal-line"><span /><span /><span /></div><div className="signal-card">Amaç net mi?</div></div>;
}

export default function LessonDetail() {
  const [, params] = useRoute("/dersler/:moduleId/:lessonId");
  const lesson = findLesson(params?.moduleId || "", params?.lessonId || "");
  const module = modules.find((item) => item.id === lesson?.moduleId);
  const lessonMeta = module?.lessons.find((item) => item.id === lesson?.id);
  const [completed, setCompletedState] = useState<string[]>(() => getCompleted());
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); setSelected(null); setChecked(false); }, [params?.moduleId, params?.lessonId]);

  const orderedLessons = useMemo(() => modules.flatMap((item) => item.lessons.map((lessonItem) => ({ ...lessonItem, moduleId: item.id }))), []);
  const currentIndex = lesson ? orderedLessons.findIndex((item) => item.id === lesson.id && item.moduleId === lesson.moduleId) : -1;
  const previous = currentIndex > 0 ? orderedLessons[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 && currentIndex < orderedLessons.length - 1 ? orderedLessons[currentIndex + 1] : undefined;
  const isDone = lesson ? completed.includes(lesson.id) : false;
  const progress = Math.round((completed.length / totalLessons) * 100);

  if (!lesson || !module) return <div className="page-wrap lesson-not-found"><span className="eyebrow"><span className="signal-dot" /> DERS BULUNAMADI</span><h1>Bu ders henüz bulunamadı.</h1><Link href="/dersler" className="button button-primary">Ders rotasına dön <ChevronRight size={17} /></Link></div>;

  const toggleComplete = () => {
    const updated = isDone ? completed.filter((item) => item !== lesson.id) : [...completed, lesson.id];
    setCompletedState(updated);
    setCompleted(updated);
  };
  const correct = checked && selected === lesson.activity.answer;

  return <div className="lesson-page">
    <div className="lesson-breadcrumb page-wrap"><Link href="/dersler"><ChevronLeft size={15} /> Ders Rotası</Link><span>/</span><span>{module.number}</span><span>/</span><strong>{lessonMeta?.title ?? lesson.id}</strong></div>
    <section className="lesson-hero page-wrap">
      <div className="lesson-hero-copy"><span className="eyebrow"><span className="signal-dot" /> {lesson.eyebrow}</span><h1>{lesson.hook}</h1><p>{lesson.summary}</p><div className="lesson-meta-row"><span><Compass size={15} /> {module.title}</span><span><Play size={14} /> {module.lessons.find((item) => item.id === lesson.id)?.duration}</span><span><Layers3 size={15} /> {currentIndex + 1}/{orderedLessons.length}</span></div></div>
      <LessonVisual type={lesson.visual} />
    </section>

    <section className="lesson-objectives page-wrap"><div><span className="micro-label">BU DERSTEN SONRA</span><h2>Ne yapabileceksiniz?</h2></div><div className="outcome-list">{lesson.outcomes.map((outcome, index) => <div key={outcome}><span>0{index + 1}</span><p>{outcome}</p></div>)}</div></section>

    <section className="lesson-content page-wrap">
      <div className="lesson-main">
        <div className="lesson-start-note"><Eye size={19} /><div><strong>Önce gözlemleyin.</strong><p>Bu derste metni aceleyle uygulamaya çalışmayın. Önce hangi kararın neden alındığını görün; sonra kendi senaryonuza aktarın.</p></div></div>
        <Accordion type="single" collapsible defaultValue="section-0" className="lesson-accordion">
          {lesson.sections.map((section, index) => <AccordionItem value={`section-${index}`} key={section.title} className="lesson-accordion-item"><AccordionTrigger className="lesson-accordion-trigger"><span className="accordion-number">0{index + 1}</span><span><small>{section.label}</small><strong>{section.title}</strong></span></AccordionTrigger><AccordionContent className="lesson-accordion-content"><div className="lesson-prose">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div></AccordionContent></AccordionItem>)}
        </Accordion>

        <section className="comparison-lab"><div className="comparison-heading"><span className="micro-label">KARŞILAŞTIRMA MASASI</span><h2>Aynı niyet, farklı kontrol düzeyi.</h2><p>Soldaki örnek modelin daha çok tahmin yapmasına neden olur. Sağdaki örnek, yalnızca gerekli kararları görünür hâle getirir.</p></div><div className="prompt-compare"><article className="prompt-specimen prompt-specimen-bad"><div><span className="specimen-state"><X size={15} /> {lesson.comparison.badLabel}</span><Clipboard size={18} /></div><pre>{lesson.comparison.bad}</pre></article><article className="prompt-specimen prompt-specimen-good"><div><span className="specimen-state"><CheckCircle2 size={15} /> {lesson.comparison.goodLabel}</span><Clipboard size={18} /></div><pre>{lesson.comparison.good}</pre></article></div><div className="comparison-why"><Sparkles size={18} /><p><strong>Neden fark yaratır?</strong> {lesson.comparison.why}</p></div></section>

        <section className="lesson-activity"><div className="activity-title"><span className="micro-label">MİNİ UYGULAMA</span><h2>Kendinizi kontrol edin.</h2><p>{lesson.activity.prompt}</p></div><div className="activity-choices">{lesson.activity.choices.map((choice, index) => { const state = checked ? index === lesson.activity.answer ? "correct" : index === selected ? "incorrect" : "" : selected === index ? "selected" : ""; return <button className={`activity-choice ${state}`} onClick={() => !checked && setSelected(index)} disabled={checked} key={choice}><span>{String.fromCharCode(65 + index)}</span>{choice}{checked && index === lesson.activity.answer && <Check size={18} />}</button>; })}</div>{checked && <div className={`activity-feedback ${correct ? "correct" : ""}`}>{correct ? <CheckCircle2 size={19} /> : <CircleAlert size={19} />}<div><strong>{correct ? "Doğru bağlantıyı kurdunuz." : "Kavrama yeniden bakın."}</strong><p>{lesson.activity.feedback}</p></div></div>}<div className="activity-actions"><button className="button button-primary" disabled={selected === null || checked} onClick={() => setChecked(true)}>Yanıtı kontrol et <ChevronRight size={17} /></button></div></section>
      </div>

      <aside className="lesson-side"><div className="lesson-side-card"><span className="micro-label">DERS İZİ</span><div className="lesson-progress-circle"><span>{progress}%</span></div><p>{completed.length}/{totalLessons} adım tamamlandı.</p><button className={`complete-lesson-button ${isDone ? "done" : ""}`} onClick={toggleComplete}>{isDone ? <><Check size={16} /> Tamamlandı</> : <><Target size={16} /> Dersi tamamla</>}</button></div><div className="lesson-side-card quiet"><LockKeyhole size={18} /><strong>Güvenli pratik</strong><p>Kendi deneyinizde gerçek kişi, ödeme, şifre veya sağlık verisi kullanmayın. Örnekleri anonimleştirin.</p></div><Link href="/laboratuvar" className="lesson-side-link"><FlaskConical size={17} /> Bu kavramı laboratuvarda dene <ChevronRight size={15} /></Link></aside>
    </section>

    <section className="lesson-takeaway"><div className="page-wrap"><span className="micro-label">DERSİN ÖZÜ</span><p>{lesson.takeaway}</p></div></section>
    <section className="lesson-navigation page-wrap"><div>{previous ? <Link href={`/dersler/${previous.moduleId}/${previous.id}`} className="lesson-nav-link previous"><ChevronLeft size={18} /><span><small>ÖNCEKİ DERS</small><strong>{previous.title}</strong></span></Link> : <span />}{next ? <Link href={`/dersler/${next.moduleId}/${next.id}`} className="lesson-nav-link"><span><small>SONRAKİ DERS</small><strong>{next.title}</strong></span><ChevronRight size={18} /></Link> : <Link href="/dersler" className="lesson-nav-link"><span><small>ROTAYI TAMAMLA</small><strong>Ders rotasına dön</strong></span><ChevronRight size={18} /></Link>}</div></section>
  </div>;
}
