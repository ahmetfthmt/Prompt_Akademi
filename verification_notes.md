# İlk Tarayıcı Doğrulama Notları

## Ana Sayfa

- Üst gezinmede **Ana Sayfa, Ders Rotası, Laboratuvar, Örnekler, Modeller, Testler ve Güvenlik** rotaları görünür ve bağlantı hedefleri üretilmiştir.
- Giriş alanında iki açık eylem bulunur: ders rotasına girme ve laboratuvara geçme.
- Beş modül, on dokuz uygulama adımı ve on soruluk test vurgusu görünürdür.
- Laboratuvar görseli, anatomi görseli ve marka simgesi için kalıcı web varlığı URL'leri kullanılmıştır.

## Prompt Laboratuvarı

- Rol, görev, bağlam, kısıt, çıktı formatı ve kalite kontrolü için altı düzenlenebilir alan görünürdür.
- Alanlardaki başlangıç örneği, derlenmiş istem panelinde başlıklarıyla birlikte görünürdür.
- Tasarım kontrolü, görev/bağlam/format/doğrulama durumlarını görünür kontrol listesi olarak sunar.
- Kopyalama, örneği geri yükleme ve şablon seçimi eylemleri arayüzde görünürdür.

## Not

Görsel üretim URL'leri, üretim tamamlandığında rezerv yer tutucularının yerine otomatik olarak nihai görselleri gösterecek biçimde sayfaya bağlanmıştır.

## Ustalık Testi

- İlk soru, dört seçenek ve “Yanıtı kontrol et” eylemi görünürdür; test akışı on soruluk bir ilerleme göstergesiyle başlar.
- Soru metni, hedef kitle ve çıktıyı açıklığa kavuşturmanın belirsiz isteği iyileştirmedeki rolünü ölçmektedir.
- İlk sorunun doğru seçeneği işaretlendiğinde, seçilen satır vurgulanmış ve kontrol düğmesi etkin olarak görünmüştür.
- “Yanıtı kontrol et” eylemi sonrasında doğru yanıt vurgulanmış; seçenekten bağımsız, kısa ve gerekçeli geri bildirim görünür olmuştur.

## Canlı Prompt Güncellemesi

- Laboratuvardaki görev alanı, “bağlamın rolü” konusuna ait yeni bir görevle değiştirildiğinde derlenmiş istemin görev bölümü aynı metinle anında güncellenmiştir.

## Ayrıntılı Ders Sayfası

- İlk ders rotası `/dersler/baslangic/what-is` adresinde açıldı; giriş anlatımı, öğrenme hedefleri, açılır kavram bölümleri, iyi–kötü prompt karşılaştırması, mini uygulama, ders tamamlama eylemi ve sonraki ders bağlantısı görünürdür.
- Mini uygulamada doğru B seçeneği işaretlenebiliyor; seçimin ardından yanıt kontrol akışı etkin hâle geliyor. Ders sayfasındaki hareketli sinyal çizimi ve süreç görseli masaüstü görünümünde doğru yerleşti.
- Tarayıcı DOM kontrolünde ders alıştırması dört seçenekle yüklendi; bir seçenek seçildiğinde kontrol düğmesinin etkinleştiği doğrulandı. Gerekçeli geri bildirim, kontrol düğmesine basıldıktan sonra görünür hâle gelir.
- Doğru seçenek için kontrol eylemi sonrası “Doğru bağlantıyı kurdunuz” ve dersin kavramsal gerekçesini içeren geri bildirim paneli görüntülendi.
- Güvenlik modülünün son dersi `/dersler/guvenlik/safety-radar` rotasında ayrıntılı dört sinyal anlatımı, radar görseli, güvenli–kontrolsüz prompt karşılaştırması, alıştırma ve önceki ders bağlantısıyla başarıyla yüklendi.
- `safety-radar` dersi tamamlandığında tarayıcıdaki ilerleme kaydına eklendi. Ders rotasında genel ilerleme `1/19` ve `%5`, güvenlik modülü ilerlemesi ise `1/4` olarak güncellendi; ders bağlantıları ayrıntılı rota adreslerine yönleniyor.

## Model Karşılaştırma İstasyonu

- ChatGPT, Claude ve Gemini için üç ayrı seçim sekmesi görünürdür.
- İlk örnek, görev–girdi–çıktı şeması–kontrol katmanlarıyla yapılandırılmış bir ChatGPT istemini açık biçimde gösterir.
- Uygunluk, yapı uyumu ve kanıt sınırı; aynı görevi karşılaştırmak için görünür değerlendirme ölçütleri olarak listelenmiştir.
