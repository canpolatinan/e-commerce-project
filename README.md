# 🛒 E-Ticaret Web Sitesi

HTML ve CSS ile hazırlanmış, modern görünümlü bir e-ticaret sitesi arayüzü projesidir. Web geliştirme dersi kapsamında hazırlanmıştır ve JavaScript içermez.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font%20Awesome-528DD7?style=flat&logo=fontawesome&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

---

## 📸 Ekran Görüntüsü

> Siteden bir ekran görüntüsü alıp proje klasörüne `ekran.png` adıyla kaydedersen aşağıdaki satırı açabilirsin:

<!-- ![Site görüntüsü](ekran.png) -->

---

## ✨ Özellikler

- 🔝 Sayfa kaydırılsa da yukarıda sabit kalan üst menü
- 🔍 Yuvarlak köşeli arama çubuğu
- 📂 Fare ile üzerine gelince açılan **Kategoriler** menüsü
- 🎨 İki renk geçişli tanıtım alanı ve "Alışverişe Başla" butonu
- 🚚 Ücretsiz Kargo, Güvenli Ödeme ve Kolay İade bilgi kutuları
- 🛍️ Ürün kartları: resim, ürün adı, puan yıldızları, fiyat ve "İncele" butonu
- 🏷️ "İndirim", "Yeni" ve "Çok Satan" etiketleri
- 💸 İndirimli ürünlerde üstü çizili eski fiyat
- ✨ Kartların üzerine gelince yukarı kalkma ve resim büyütme efekti
- 🔐 Giriş Yap ve Kayıt Ol sayfaları
- 📞 İletişim bilgileri ve sosyal medya ikonları (footer)
- 📱 Mobil uyumlu (responsive) tasarım

## 📁 Dosya Yapısı

```
e-commerce-project/
│
├── Eticaret.html     → Ana sayfa
├── Giris.html        → Giriş sayfası
├── Kayit.html        → Kayıt sayfası
├── Eticaret.css      → Tüm sayfaların tasarım dosyası
├── images/           → Ürün görselleri 
│   ├── laptop.svg
│   ├── ayakkabi.svg
│   ├── kulaklik.svg
│   ├── termos.svg
│   ├── canta.svg
│   ├── saat.svg
│   └── telefon.svg
└── README.md         → Proje açıklaması
```

## 🚀 Nasıl Çalıştırılır?

1. Projeyi bilgisayarına klonla:
   ```
   git clone https://github.com/canpolatinan/e-commerce-project.git
   ```
2. Klasörü aç.
3. `Eticaret.html` dosyasına çift tıkla, site tarayıcıda açılır.

> 💡 İkonların görünmesi için internet bağlantısı gerekir (Font Awesome internetten yüklenir).

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Ne için kullanıldı? |
|---|---|
| HTML5 | Sayfa yapısı |
| CSS3 | Renkler, flexbox ve grid yerleşimi, açılır menü, hover efektleri, mobil uyum |
| Font Awesome 6 | Menü, özellik kutuları ve sosyal medya ikonları |
| SVG | Ürün görselleri |
| Git ve GitHub | Sürüm kontrolü |

## 🧩 Kod Yazım Düzeni

Projede class adları, id'ler ve CSS değişkenleri Türkçe ve anlamlı olacak şekilde yazılmıştır. Renkler `:root` içindeki değişkenlerle tek yerden yönetilir.

| Class | Görevi |
|---|---|
| `.ust-alan` | Üst menü alanı |
| `.tanitim-alani` | Üstteki büyük tanıtım bölümü |
| `.urun-izgarasi` | Ürün kartlarının dizildiği ızgara |
| `.urun-karti` | Tek bir ürün kartı |
| `.alt-bilgi` | Sayfa altı (iletişim ve sosyal medya) |

```css
:root {
    --koyu: #1f2937;
    --ana-renk: #ff6b35;
}
```

`--ana-renk` değerini değiştirmek, butonların, fiyatların ve vurguların rengini tüm sitede tek seferde değiştirir.



📎 Proje bağlantısı: [github.com/canpolatinan/e-commerce-project](https://github.com/canpolatinan/e-commerce-project)
