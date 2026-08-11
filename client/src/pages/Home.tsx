/**
 * Design philosophy: Araştırma Laboratuvarı — an asymmetric editorial launchpad
 * that moves a beginner from curiosity to a concrete next learning action.
 */
import { Link } from "wouter";
import { ArrowRight, BadgeCheck, BookOpenCheck, CheckCircle2, CircleDashed, Clock3, FlaskConical, Layers3, ShieldCheck, Sparkles, Target, Telescope } from "lucide-react";
import { modules, totalLessons } from "@/lib/courseData";

const facts = [
  { icon: Target, label: "Önce ölçüt", text: "İyi prompt, önce nasıl bir sonucu başarılı sayacağınızı tanımlar." },
  { icon: Layers3, label: "Sonra yapı", text: "Rol, görev, bağlam, kısıt ve format; modelin karar alanını daraltır." },
  { icon: Telescope, label: "En son iterasyon", text: "İlk taslakla yetinmez; örnek ve geri bildirimle kontrollü iyileştirme yaparsınız." },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-grid">
        <div className="hero-copy fade-up">
          <div className="eyebrow"><span className="signal-dot" /> TÜRKÇE · UYGULAMALI · AÇIK ÖĞRENME</div>
          <h1>Yapay zekâya <em>ne söyleyeceğinizi</em> değil, nasıl düşüneceğinizi öğrenin.</h1>
          <p className="hero-lead">Prompt Mühendisliği Akademisi, sizi rastgele denemelerden; ölçülebilir, güvenli ve tekrar kullanılabilir prompt tasarımına taşır.</p>
          <div className="hero-actions">
            <Link href="/dersler" className="button button-primary"><BookOpenCheck size={18} /> Ders rotasına gir <ArrowRight size={18} /></Link>
            <Link href="/laboratuvar" className="button button-ghost"><FlaskConical size={18} /> Hemen bir prompt kur</Link>
          </div>
          <div className="hero-proof">
            <span><BadgeCheck size={17} /> {modules.length} modül</span>
            <span><BadgeCheck size={17} /> {totalLessons} uygulama adımı</span>
            <span><BadgeCheck size={17} /> 10 soruluk ustalık testi</span>
          </div>
        </div>
        <div className="hero-visual fade-up delay-1">
          <div className="visual-corner-label">LAB / 01</div>
          <img src="/manus-storage/prompt-lab-hero_59d9fdef.png" alt="Katmanlı bir prompt kartı ile model sinyali arasındaki ilişkiyi anlatan soyut laboratuvar görseli" />
          <div className="hero-annotation annotation-top"><CircleDashed size={16} /> Amaç net mi?</div>
          <div className="hero-annotation annotation-bottom"><CheckCircle2 size={16} /> Çıktı formatı tanımlı</div>
        </div>
      </section>

      <section className="statement-band">
        <p>“Modeli değil, talimatı değiştirin: aynı görevden <strong>daha kontrol edilebilir sonuç</strong> alın.”</p>
        <Link href="/ornek-kutuphanesi">Örnek kütüphanesini aç <ArrowRight size={16} /></Link>
      </section>

      <section className="content-section section-split" aria-labelledby="start-heading">
        <div className="section-kicker"><span>01</span> BAŞLANGIÇ NOKTASI</div>
        <div>
          <h2 id="start-heading">Prompt, “akla geleni yazmak” değildir.</h2>
          <p className="section-intro">Prompt; modeli bir sonuç üretmeye yönlendiren görev tasarımıdır. İyi bir tasarım, modelden çok görev, bağlam, sınır ve başarı ölçütü hakkındaki düşüncenizi görünür kılar.</p>
          <div className="fact-grid">
            {facts.map(({ icon: Icon, label, text }, index) => (
              <article className="fact-card" key={label}>
                <div className="fact-index">0{index + 1}</div>
                <Icon size={23} />
                <h3>{label}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="module-preview content-section" aria-labelledby="route-heading">
        <div className="section-header-row">
          <div>
            <div className="section-kicker"><span>02</span> ÖĞRENME ROTASI</div>
            <h2 id="route-heading">Kavramdan uygulamaya, küçük ama düzenli deneylerle.</h2>
          </div>
          <Link href="/dersler" className="text-action">Tüm müfredatı gör <ArrowRight size={16} /></Link>
        </div>
        <div className="module-preview-grid">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link href="/dersler" className={`module-card module-card--${module.color}`} key={module.id}>
                <div className="module-card-top"><span>{module.number}</span><Icon size={21} /></div>
                <h3>{module.title}</h3>
                <p>{module.subtitle}</p>
                <div className="module-meta"><span>{module.level}</span><span><Clock3 size={14} /> {module.duration}</span></div>
                <div className="module-line"><span /></div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="practice-banner content-section">
        <div className="practice-copy">
          <div className="section-kicker light"><span>03</span> İLK DENEY</div>
          <h2>İyi bir promptu parçalara ayırın, sonra kendi senaryonuza kurun.</h2>
          <p>Laboratuvar; rol, görev, bağlam, kısıt, çıktı formatı ve kalite kontrolünü birlikte kurmanıza yardım eder. Her seçiminiz, oluşan promptu anında değiştirir.</p>
          <Link href="/laboratuvar" className="button button-lime"><Sparkles size={17} /> Prompt laboratuvarını başlat <ArrowRight size={17} /></Link>
        </div>
        <img src="/manus-storage/prompt-anatomy_40941d89.png" alt="Altı bileşenli bir prompt anatomisini sembolize eden soyut blok görseli" />
      </section>

      <section className="content-section safety-strip">
        <div className="safety-icon"><ShieldCheck size={34} /></div>
        <div><span className="micro-label">GÜVENLİ UYGULAMA</span><h2>Yaratıcılık kadar sınır koyma da bir prompt becerisidir.</h2><p>Hassas veri, doğrulanmamış iddia, kaynak belirsizliği ve prompt enjeksiyonu için düzenli bir kontrol listesi kullanın.</p></div>
        <Link href="/guvenlik" className="text-action">Güvenlik radarını aç <ArrowRight size={16} /></Link>
      </section>
    </div>
  );
}
