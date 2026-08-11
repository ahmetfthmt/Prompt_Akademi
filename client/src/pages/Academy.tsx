/**
 * Design philosophy: Araştırma Laboratuvarı — a course map with visible mastery,
 * not a flat list of articles. User actions leave a persistent learning trace.
 */
import { useMemo, useState } from "react";
import { ChevronDown, Check, Clock3, Compass, LockKeyhole, Play, Sparkles, Target } from "lucide-react";
import { getCompleted, modules, setCompleted, totalLessons } from "@/lib/courseData";

function PromptSurgery() {
  const [selected, setSelected] = useState<string[]>([]);
  const problems = [
    { id: "goal", label: "Amaç belirsiz" },
    { id: "audience", label: "Hedef okuyucu eksik" },
    { id: "format", label: "Çıktı formatı tanımsız" },
    { id: "spell", label: "Yazım hatası var" },
  ];
  const toggle = (id: string) => setSelected((value) => value.includes(id) ? value.filter((item) => item !== id) : [...value, id]);
  const correct = ["goal", "audience", "format"].every((item) => selected.includes(item)) && !selected.includes("spell");
  return (
    <section className="surgery-panel">
      <div className="surgery-copy">
        <span className="micro-label">MİNİ ALIŞTIRMA · PROMPT CERRAHİSİ</span>
        <h2>Bu istemde hangi tasarım sorunları var?</h2>
        <p>Önce sorunu görün, sonra çözümü yazın. İyi prompt tasarımı çoğu zaman “daha fazla kelime” değil, doğru eksikliği fark etmektir.</p>
        <div className="bad-prompt">“Yapay zekâ hakkında bir yazı yaz.”</div>
      </div>
      <div className="surgery-actions">
        {problems.map((problem) => (
          <button className={`diagnosis-option ${selected.includes(problem.id) ? "selected" : ""}`} key={problem.id} onClick={() => toggle(problem.id)}>
            <span>{selected.includes(problem.id) ? <Check size={15} /> : ""}</span>{problem.label}
          </button>
        ))}
        {selected.length > 0 && <div className={`diagnosis-feedback ${correct ? "correct" : ""}`}>{correct ? "Doğru tanı. Amaç, hedef kitle ve biçim eklenmeden model neyin başarı olduğunu bilemez." : "İpucu: Yazım hatası değil; talebin karar vermeyi zorlaştıran eksikliklerine bakın."}</div>}
      </div>
    </section>
  );
}

export default function Academy() {
  const [expanded, setExpanded] = useState<string>(modules[0].id);
  const [completed, setCompletedState] = useState<string[]>(() => getCompleted());
  const percentage = useMemo(() => Math.round((completed.length / totalLessons) * 100), [completed]);
  const mark = (id: string) => {
    const updated = completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id];
    setCompletedState(updated);
    setCompleted(updated);
  };
  return (
    <div className="page-wrap academy-page">
      <section className="page-hero editorial-hero">
        <div><span className="eyebrow"><span className="signal-dot" /> MÜFREDAT / 05 MODÜL</span><h1>Ders rotası: her adımda <em>görünür bir beceri</em>.</h1><p>Ön bilgi gerekmez. İlk modülden başlayın; kısa ders, somut örnek ve alıştırmaları kendi hızınızda tamamlayın.</p></div>
        <div className="mastery-card"><div className="mastery-ring" style={{ "--progress": `${percentage}%` } as React.CSSProperties}><span>{percentage}%</span></div><div><span className="micro-label">ÖĞRENME İZİ</span><strong>{completed.length}/{totalLessons} adım tamamlandı</strong><p>Tarayıcınızda saklanır; hesap gerekmez.</p></div></div>
      </section>

      <section className="course-layout">
        <aside className="course-aside"><span className="micro-label">ROTANIZ</span><ol>{modules.map((module) => <li className={expanded === module.id ? "current" : ""} key={module.id}><button onClick={() => setExpanded(module.id)}><span>{module.number}</span>{module.title}</button></li>)}</ol><div className="aside-note"><Compass size={19} /><p>Bir modülün tüm adımlarını tamamladığınızda, ilerleme damgası kalıcı olur.</p></div></aside>
        <div className="course-list">
          {modules.map((module) => {
            const Icon = module.icon;
            const open = expanded === module.id;
            const done = module.lessons.filter((lesson) => completed.includes(lesson.id)).length;
            return (
              <article className={`course-module ${open ? "open" : ""}`} key={module.id}>
                <button className="module-header" onClick={() => setExpanded(open ? "" : module.id)} aria-expanded={open}>
                  <div className={`module-number-chip ${module.color}`}>{module.number}</div>
                  <div className="module-title-group"><span className="micro-label">{module.level} · {module.duration}</span><h2>{module.title}</h2><p>{module.subtitle}</p></div>
                  <div className="module-progress-label"><Icon size={19} /><span>{done}/{module.lessons.length}</span><ChevronDown size={18} className={open ? "rotated" : ""} /></div>
                </button>
                {open && <div className="lesson-list"><div className="module-objective"><Target size={16} /><span><strong>Modül hedefi:</strong> {module.objective}</span></div>{module.lessons.map((lesson, index) => { const isDone = completed.includes(lesson.id); return <div className="lesson-row" key={lesson.id}><button onClick={() => mark(lesson.id)} className={`lesson-check ${isDone ? "done" : ""}`} aria-label={`${lesson.title} tamamlandı olarak işaretle`}>{isDone ? <Check size={15} /> : <span>{index + 1}</span>}</button><div><strong>{lesson.title}</strong><span>{lesson.kind} · <Clock3 size={13} /> {lesson.duration}</span></div><button onClick={() => mark(lesson.id)} className="lesson-action">{isDone ? "Tamamlandı" : <><Play size={14} /> Başla</>}</button></div>})}<div className="module-footer"><span>{done === module.lessons.length ? <><Sparkles size={15} /> Modül damgası kazanıldı</> : "Bir sonraki dersi tamamlayarak ilerleyin."}</span></div></div>}
              </article>
            );
          })}
        </div>
      </section>
      <PromptSurgery />
    </div>
  );
}
