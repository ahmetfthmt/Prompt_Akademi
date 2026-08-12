# GitHub Yükleme Rehberi

Bu belge, proje klasörünü kişisel GitHub hesabınıza yüklemeniz için kısa bir kontrol listesi sunar. GitHub'da yeni ve boş bir depo oluşturduktan sonra, terminali proje kökünde açın ve aşağıdaki komutları sırayla çalıştırın.

```bash
git init
git add .
git status
git commit -m "feat: prompt mühendisliği akademisi"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/DEPO_ADINIZ.git
git push -u origin main
```

`git status` komutunda `node_modules`, `.env`, `dist`, `.manus-logs` veya ZIP dosyası görünmemelidir. Bu dosyalardan biri görünüyorsa, işlemi durdurup `.gitignore` kurallarını kontrol edin.

İlk gönderimden sonra GitHub Actions sekmesinde **CI** iş akışını kontrol edin. İş akışı, proje tip denetimi ile üretim derlemesini çalıştırır; yeşil durum işareti, kaynaktan üretim derlemesinin oluşturulabildiğini gösterir.
