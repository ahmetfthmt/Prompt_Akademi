/**
 * Design philosophy: Araştırma Laboratuvarı — assessment must explain reasoning,
 * not merely label an answer right or wrong.
 */
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, CircleHelp, RefreshCw, Sparkles, XCircle } from "lucide-react";
import { quizQuestions } from "@/lib/courseData";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const result = step === quizQuestions.length;
  const question = quizQuestions[step];
  const score = useMemo(() => answers.reduce((count, answer, index) => count + (answer === quizQuestions[index].answer ? 1 : 0), 0), [answers]);
  const next = () => { if (selected === null) return; setAnswers((list) => [...list, selected]); setSelected(null); setRevealed(false); setStep((value) => value + 1); };
  const restart = () => { setStep(0); setAnswers([]); setSelected(null); setRevealed(false); };
  if (result) {
    const note = score === 10 ? "Ustalık damgası sizde. Şimdi laboratuvarda kendi iş senaryonuz için bir şablon çıkarın." : score >= 8 ? "Çok iyi temel. Model karşılaştırma ve güvenlik laboratuvarı ile beceriyi derinleştirin." : score >= 5 ? "Temel mantık yerleşiyor. Prompt anatomisi ve teknik seçiciye geri dönmek faydalı olur." : "Önce amaç–bağlam–format üçlüsünü tekrar gözden geçirin; sonra testi yeniden deneyin.";
    return <div className="page-wrap quiz-page"><section className="result-panel"><span className="eyebrow"><span className="signal-dot" /> DEĞERLENDİRME TAMAMLANDI</span><div className="score-orbit"><span>{score}</span><small>/ 10</small></div><h1>{score === 10 ? "Prompt ustalığı: doğrulandı." : "Sonucu ölçtünüz; şimdi iyileştirme zamanı."}</h1><p>{note}</p><div className="result-actions"><button onClick={restart} className="button button-primary"><RefreshCw size={17} /> Testi yeniden başlat</button><a href="/laboratuvar" className="button button-ghost">Laboratuvara geç <ArrowRight size={17} /></a></div><div className="result-breakdown">{answers.map((answer, index) => <span className={answer === quizQuestions[index].answer ? "right" : "wrong"} key={index}>{answer === quizQuestions[index].answer ? <CheckCircle2 size={16} /> : <XCircle size={16} />} {index + 1}</span>)}</div></section></div>;
  }
  const chosenCorrect = selected === question.answer;
  return (
    <div className="page-wrap quiz-page">
      <section className="quiz-hero"><div><span className="eyebrow"><span className="signal-dot" /> MASTERY CHECK / 10 SORU</span><h1>Doğru cevaptan önce, <em>doğru nedeni</em> bulun.</h1><p>Bu test; ezber yerine görev seçimi, sınır koyma ve değerlendirme mantığını ölçer. Her sorudan sonra gerekçeyi görün.</p></div><div className="quiz-meter"><span>SORU {step + 1} / {quizQuestions.length}</span><div><i style={{ width: `${(step / quizQuestions.length) * 100}%` }} /></div><strong>{Math.round((step / quizQuestions.length) * 100)}% tamamlandı</strong></div></section>
      <section className="question-card"><div className="question-label"><CircleHelp size={19} /> BİLGİ KONTROLÜ · {String(step + 1).padStart(2, "0")}</div><h2>{question.q}</h2><div className="answer-list">{question.options.map((option, index) => { const state = revealed ? index === question.answer ? "right" : index === selected ? "wrong" : "" : selected === index ? "chosen" : ""; return <button className={`answer-option ${state}`} onClick={() => !revealed && setSelected(index)} disabled={revealed} key={option}><span>{String.fromCharCode(65 + index)}</span>{option}{revealed && index === question.answer && <CheckCircle2 size={19} />}</button>; })}</div>{revealed && <div className={`answer-explanation ${chosenCorrect ? "correct" : ""}`}><Sparkles size={20} /><div><strong>{chosenCorrect ? "Doğru düşünce." : "Buradaki ayrımı kaçırmayın."}</strong><p>{question.explain}</p></div></div>}<div className="question-actions">{!revealed ? <button className="button button-primary" disabled={selected === null} onClick={() => setRevealed(true)}>Yanıtı kontrol et <ArrowRight size={17} /></button> : <button className="button button-primary" onClick={next}>{step === quizQuestions.length - 1 ? "Sonuçları gör" : "Sonraki soru"} <ArrowRight size={17} /></button>}</div></section>
    </div>
  );
}
