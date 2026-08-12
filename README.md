# Prompt Mühendisliği Akademisi

Prompt Mühendisliği Akademisi; prompt tasarımını Türkçe, uygulamalı ve ölçülebilir biçimde öğretmek için hazırlanmış etkileşimli bir React eğitim platformudur. Platform; modüler ders rotası, canlı istem oluşturucu, örnek prompt kütüphanesi, ChatGPT–Claude–Gemini karşılaştırma istasyonu, gerekçeli bilgi kontrolleri ve güvenlik radarı içerir.

## İçerik Haritası

| Alan | Açıklama |
|---|---|
| Ders Rotası | Beş modül ve on dokuz öğrenme adımıyla temel kavramdan güvenli uygulamaya ilerleyen müfredat. |
| Prompt Laboratuvarı | Rol, görev, bağlam, kısıt, çıktı formatı ve kalite kontrolünden canlı prompt üretir. |
| Örnek Kütüphanesi | İçerik, eğitim, yazılım, analiz, araştırma ve güvenlik senaryoları için düzenlenebilir şablonlar. |
| Model Karşılaştırması | Aynı görevin ChatGPT, Claude ve Gemini için nasıl yapılandırılabileceğini ve çıktının nasıl ölçüleceğini gösterir. |
| Testler ve Güvenlik | On soruluk gerekçeli değerlendirme ile hassas veri, enjeksiyon, doğrulama ve kapsam riski kontrolü. |

## Gereksinimler

Projeyi çalıştırmak için **Node.js 22** ve **pnpm 10** önerilir. Sürümler, `package.json` içindeki paket yöneticisi bilgisinde tanımlıdır.

```bash
corepack enable
pnpm install --frozen-lockfile
```

## Yerel Geliştirme

Geliştirme sunucusunu başlatmak için aşağıdaki komutu çalıştırın. Uygulama varsayılan olarak Vite geliştirme sunucusunda açılır.

```bash
pnpm dev
```

Tip denetimi ve üretim derlemesini doğrulamak için:

```bash
pnpm run check
pnpm run build
```

Üretim derlemesini yerelde çalıştırmak için önce `pnpm run build`, ardından aşağıdaki komutu kullanın.

```bash
pnpm start
```

## GitHub'a Yükleme

GitHub üzerinde boş bir depo oluşturun. Depo oluşturma ekranında README, `.gitignore` veya lisans eklemeyin; bu dosyalar proje içinde zaten bulunur. Ardından bu klasörde aşağıdaki komutları kendi GitHub kullanıcı adınız ve depo adınızla çalıştırın.

```bash
git init
git add .
git commit -m "feat: prompt mühendisliği akademisi"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/DEPO_ADINIZ.git
git push -u origin main
```

> `node_modules`, derleme çıktıları, yerel ortam değişkenleri, günlükler ve Manus'a özgü çalışma dosyaları `.gitignore` tarafından dışlanır. Bu nedenle GitHub'a yalnızca kaynak kod, yapılandırma ve belgeler gider.

## Sürekli Doğrulama

`.github/workflows/ci.yml`, her `push` ve `pull request` işleminde bağımlılıkları kilit dosyasından kurar, TypeScript denetimini çalıştırır ve üretim derlemesini oluşturur. İş akışı herhangi bir gizli anahtar gerektirmez.

## Görsel Varlıklar ve Harici Yayınlama

Bu proje Manus ortamında oluşturulmuş kalıcı `/manus-storage/` görsel yolları kullanır. Uygulamayı GitHub'dan farklı bir barındırma ortamına taşıyacaksanız, `client/src/pages/` ve `client/src/components/AppShell.tsx` içindeki bu yolları kendi CDN veya genel `client/public/assets/` dosya yollarınızla değiştirmelisiniz. Görsel bağlantılarının hedef ortamda erişilebilir olduğunu yayınlamadan önce kontrol edin.

## Lisans

Bu proje MIT lisansı ile dağıtılır. Ayrıntılar için [LICENSE](./LICENSE) dosyasına bakın.

## Güvenlik ve Öğrenme Notu

Platformdaki model panelleri, canlı model çağrısı yapmaz; prompt yapısını öğretmek için temsilî örnekler sunar. Hassas veri, şifre, ödeme bilgisi veya kişinin tanımlanmasına yarayan verileri promptlarda kullanmayın. Kritik iş sonuçlarını her zaman uygun uzman ve birincil kaynaklarla doğrulayın.
