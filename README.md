
Task Manager, günlük görevlerinizi kolayca organize etmenizi sağlayan basit ama genişletilebilir bir görev yönetim uygulamasıdır. Kullanıcı dostu arayüzü sayesinde görev ekleme, düzenleme, silme ve tamamlama gibi temel işlemleri hızlıca yapabilirsiniz.

 [Ekran Kaydı 2025-08-27 031055.zip](https://github.com/user-attachments/files/21998610/Ekran.Kaydi.2025-08-27.031055.zip)

🚀 Özellikler

* ✅ Görev ekleme, düzenleme ve silme
* 📅 Görevlerin durumunu güncelleme (tamamlandı / tamamlanmadı)
* 🔍 Temiz ve anlaşılır arayüz
* ⚡ Hızlı ve performanslı yapı
* 🎨 TailwindCSS / Bootstrap ile şık tasarım
* 🔌 Geliştirilmeye uygun altyapı (React Native, WebSocket entegrasyonu vs. eklenebilir)

 📂 Proje Yapısı

```bash
task-manager-main/
├── public/          # Statik dosyalar
├── src/
│   ├── components/  # Reusable UI bileşenleri
│   ├── pages/       # Sayfa bazlı componentler
│   ├── services/    # API çağrıları ve veri yönetimi
│   ├── styles/      # Tailwind/Bootstrap stilleri
│   └── App.js       # Ana uygulama dosyası
├── package.json     # Proje bağımlılıkları
└── README.md        # Proje dökümantasyonu
```

 ⚙️ Kurulum

Projeyi kendi bilgisayarınızda çalıştırmak için şu adımları takip edin:

```bash
# 1. Projeyi klonla
git clone https://github.com/kullanici/task-manager-main.git

# 2. Proje klasörüne gir
cd task-manager-main

# 3. Bağımlılıkları yükle
npm install

# 4. Uygulamayı çalıştır
npm start
```

Ardından uygulama varsayılan olarak `http://localhost:5000` adresinde çalışacaktır.

## 🛠️ Kullanılan Teknolojiler

* *Frontend:* Vue.js / React (opsiyonel yapılandırmaya göre)
* *Stil:* TailwindCSS, Bootstrap
* *Backend (opsiyonel):* Node.js, Express.js
* *Veritabanı (opsiyonel):* MySQL

 🌱 Geliştirme Planı

Proje ilk sürümde basit bir görev yöneticisi olarak hazırlandı. Gelecekte eklenebilecek bazı geliştirmeler:

* 📲 **React Native mobil uygulama** entegrasyonu
* 🔔 **Bildirim sistemi** (görev hatırlatma)
* 🌐 **WebSocket** desteği ile anlık güncelleme
* 👥 **Kullanıcı yönetimi** (giriş/çıkış, rol bazlı görevler)

 🤝 Katkıda Bulunma

1. Bu projeyi forklayın
2. Yeni bir dal (branch) açın (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Dalınızı push edin (`git push origin yeni-ozellik`)
5. Pull request açın 🎉


