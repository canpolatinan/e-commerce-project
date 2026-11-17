var varsayilanUrunler = [
  { id: 1, ad: "Laptop Standı", kategori: "Teknoloji", fiyat: 299, eskiFiyat: 399, puan: 4, etiket: "İndirim", resim: "images/laptop.svg", aciklama: "Alüminyum gövdeli, yüksekliği ayarlanabilir laptop standı." },
  { id: 2, ad: "Koşu Ayakkabısı", kategori: "Spor", fiyat: 1299, puan: 5, etiket: "Çok Satan", resim: "images/ayakkabi.svg", aciklama: "Hafif ve esnek tabanlı, günlük koşular için rahat ayakkabı." },
  { id: 3, ad: "Kablosuz Kulaklık", kategori: "Teknoloji", fiyat: 899, eskiFiyat: 1199, puan: 4, etiket: "İndirim", resim: "images/kulaklik.svg", aciklama: "Bluetooth bağlantılı, uzun pil ömürlü kulaklık." },
  { id: 4, ad: "Termos Bardak", kategori: "Spor", fiyat: 199, puan: 4, etiket: "Yeni", resim: "images/termos.svg", aciklama: "Sıcak içecekleri saatlerce sıcak tutan çelik termos." },
  { id: 5, ad: "Sırt Çantası", kategori: "Giyim", fiyat: 549, puan: 5, resim: "images/canta.svg", aciklama: "Geniş hacimli, su itici kumaştan sırt çantası." },
  { id: 6, ad: "Akıllı Saat", kategori: "Teknoloji", fiyat: 1799, puan: 4, etiket: "Yeni", resim: "images/saat.svg", aciklama: "Adım, nabız ve uyku takibi yapan akıllı saat." },
  { id: 7, ad: "Telefon", kategori: "Telefon", fiyat: 5000, puan: 5, etiket: "Çok Satan", resim: "images/telefon.svg", aciklama: "Büyük ekranlı, hızlı işlemcili akıllı telefon." }
];
var kategoriler = ["Teknoloji", "Telefon", "Giyim", "Spor"];
var kategoriResmi = { Teknoloji: "images/laptop.svg", Telefon: "images/telefon.svg", Giyim: "images/canta.svg", Spor: "images/ayakkabi.svg" };

function oku(anahtar, varsayilan) {
  try { var v = localStorage.getItem(anahtar); return v ? JSON.parse(v) : varsayilan; }
  catch (e) { return varsayilan; }
}
function yaz(anahtar, deger) {
  try { localStorage.setItem(anahtar, JSON.stringify(deger)); return true; }
  catch (e) { return false; }
}
function deger(id) { return document.getElementById(id).value.trim(); }
function temizle(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }
function paraYaz(n) { return "₺" + Number(n).toLocaleString("tr-TR"); }
function sorguAl(ad) { return new URLSearchParams(location.search).get(ad) || ""; }
function tumUrunler() { return varsayilanUrunler.concat(oku("eklenenUrunler", [])); }
function urunBul(id) { return tumUrunler().find(function (u) { return u.id == id; }); }
function yildizYaz(p) {
  var s = "";
  for (var i = 1; i <= 5; i++) s += '<i class="fa-' + (i <= p ? "solid" : "regular") + ' fa-star"></i>';
  return s;
}
function hataYaz(mesaj) { document.getElementById("hata").textContent = mesaj; return false; }
function bildirimGoster(mesaj) {
  var b = document.getElementById("bildirim");
  if (!b) { b = document.createElement("div"); b.id = "bildirim"; b.className = "bildirim"; document.body.appendChild(b); }
  b.textContent = mesaj;
  b.classList.add("goster");
  clearTimeout(window.bildirimZamani);
  window.bildirimZamani = setTimeout(function () { b.classList.remove("goster"); }, 2500);
}

function aktifKullanici() { return oku("aktifKullanici", null); }
function cikisYap() { localStorage.removeItem("aktifKullanici"); location.href = "Eticaret.html"; }
function menuAcKapat() { document.getElementById("menu").classList.toggle("acik"); }
function altMenuAc(e) {
  e.preventDefault();
  if (window.innerWidth <= 768) e.currentTarget.parentElement.classList.toggle("acik");
}
function aramaYap() {
  if (document.getElementById("urun-izgarasi")) urunleriGoster();
  else location.href = "Eticaret.html?ara=" + encodeURIComponent(deger("arama-girdisi"));
}
function ortakAlanlariOlustur() {
  var k = aktifKullanici();
  var hesap = k
    ? '<span class="kullanici-yazi"><i class="fa-solid fa-user vurgu-ikon"></i> ' + temizle(k.ad) + '</span><button class="giris-dugmesi cikis-dugmesi" onclick="cikisYap()">Çıkış</button>'
    : '<a href="Giris.html" class="giris-dugmesi">Giriş Yap</a><a href="Kayit.html" class="kayit-dugmesi">Kayıt Ol</a>';
  var altMenu = '<li class="acilir-ogesi"><a href="Eticaret.html" class="acilir-baglantisi">Tümü</a></li>';
  kategoriler.forEach(function (kat) {
    altMenu += '<li class="acilir-ogesi"><a href="Eticaret.html?kategori=' + kat + '" class="acilir-baglantisi">' + kat + '</a></li>';
  });
  var ust = document.getElementById("ust-alan-yer");
  if (ust) {
    ust.innerHTML =
      '<div class="logo"><i class="fa-solid fa-store vurgu-ikon"></i> E-Ticaret</div>' +
      '<button class="menu-dugmesi" onclick="menuAcKapat()"><i class="fa-solid fa-bars"></i></button>' +
      '<div class="arama-kutusu"><input type="text" id="arama-girdisi" class="arama-girdisi" placeholder="Ürün ara..."><button class="arama-dugmesi" onclick="aramaYap()"><i class="fa-solid fa-magnifying-glass"></i></button></div>' +
      '<ul class="menu" id="menu">' +
      '<li class="menu-ogesi"><a href="Eticaret.html" class="menu-baglantisi"><i class="fa-solid fa-house"></i> Ana Sayfa</a></li>' +
      '<li class="menu-ogesi"><a href="#" class="menu-baglantisi" onclick="altMenuAc(event)"><i class="fa-solid fa-list"></i> Kategoriler ▼</a><ul class="acilir-menu">' + altMenu + '</ul></li>' +
      '<li class="menu-ogesi"><a href="Sepet.html" class="menu-baglantisi"><i class="fa-solid fa-basket-shopping"></i> Sepetim <span class="sepet-rozeti" id="sepet-sayisi">0</span></a></li>' +
      '<li class="menu-ogesi"><a href="UrunEkle.html" class="menu-baglantisi"><i class="fa-solid fa-plus"></i> Ürün Ekle</a></li>' +
      '<li class="menu-ogesi"><a href="Iletisim.html" class="menu-baglantisi"><i class="fa-solid fa-address-book"></i> İletişim</a></li>' +
      '</ul><div class="hesap-dugmeleri">' + hesap + '</div>';
    var girdi = document.getElementById("arama-girdisi");
    girdi.value = sorguAl("ara");
    girdi.addEventListener("keyup", function (e) {
      if (e.key === "Enter") aramaYap();
      else if (document.getElementById("urun-izgarasi")) urunleriGoster();
    });
  }
  var alt = document.getElementById("alt-bilgi-yer");
  if (alt) {
    alt.innerHTML =
      '<div class="sosyal"><a href="#" class="sosyal-baglanti"><i class="fa-brands fa-instagram"></i></a><a href="#" class="sosyal-baglanti"><i class="fa-brands fa-x-twitter"></i></a><a href="#" class="sosyal-baglanti"><i class="fa-brands fa-facebook-f"></i></a><a href="#" class="sosyal-baglanti"><i class="fa-brands fa-youtube"></i></a></div>' +
      '<p class="alt-bilgi-yazi"><i class="fa-solid fa-envelope vurgu-ikon"></i> info@eticaret.com &nbsp; | &nbsp; <i class="fa-solid fa-phone vurgu-ikon"></i> 0555 000 00 00</p>' +
      '<p class="alt-bilgi-yazi">© 2026 E-Ticaret - Tüm hakları saklıdır.</p>';
  }
}

function sepetiOku() { return oku("sepet", {}); }
function sepetSayisi() { var s = sepetiOku(), t = 0; for (var id in s) t += s[id]; return t; }
function sepetRozetiniGuncelle() {
  var r = document.getElementById("sepet-sayisi");
  if (r) { var n = sepetSayisi(); r.textContent = n; r.style.display = n ? "inline-block" : "none"; }
}
function sepeteEkleVeBildir(id) {
  var s = sepetiOku();
  s[id] = (s[id] || 0) + 1;
  yaz("sepet", s);
  sepetRozetiniGuncelle();
  bildirimGoster(urunBul(id).ad + " sepete eklendi 🛒");
}
function adetDegistir(id, fark) {
  var s = sepetiOku();
  s[id] += fark;
  if (s[id] <= 0) delete s[id];
  yaz("sepet", s);
  sepetiGoster();
}
function sepettenSil(id) { var s = sepetiOku(); delete s[id]; yaz("sepet", s); sepetiGoster(); }
function sepetiTemizle() { yaz("sepet", {}); sepetiGoster(); }
function siparisiTamamla() {
  if (!aktifKullanici()) {
    bildirimGoster("Sipariş vermek için önce giriş yapmalısın.");
    setTimeout(function () { location.href = "Giris.html"; }, 1500);
    return;
  }
  yaz("sepet", {});
  sepetRozetiniGuncelle();
  document.getElementById("sepet-icerik").innerHTML = '<div class="bos-mesaj"><i class="fa-solid fa-circle-check"></i><p>Siparişiniz alındı, teşekkür ederiz ' + temizle(aktifKullanici().ad) + '!</p><a href="Eticaret.html" class="ana-dugme">Alışverişe Devam Et</a></div>';
}
function sepetiGoster() {
  var kutu = document.getElementById("sepet-icerik");
  if (!kutu) return;
  var sepet = sepetiOku(), html = "", ara = 0;
  for (var id in sepet) {
    var u = urunBul(id);
    if (!u) { delete sepet[id]; continue; }
    var tutar = u.fiyat * sepet[id];
    ara += tutar;
    html += '<div class="sepet-satiri"><img src="' + u.resim + '" class="sepet-resim" alt=""><div class="sepet-bilgi"><div class="urun-adi">' + temizle(u.ad) + '</div><div class="urun-fiyati">' + paraYaz(u.fiyat) + '</div></div>' +
      '<div class="adet-kutusu"><button onclick="adetDegistir(' + id + ',-1)">−</button><span>' + sepet[id] + '</span><button onclick="adetDegistir(' + id + ',1)">+</button></div>' +
      '<div class="sepet-tutar">' + paraYaz(tutar) + '</div><button class="sepet-silme" onclick="sepettenSil(' + id + ')"><i class="fa-solid fa-trash"></i></button></div>';
  }
  yaz("sepet", sepet);
  sepetRozetiniGuncelle();
  if (!html) {
    kutu.innerHTML = '<div class="bos-mesaj"><i class="fa-solid fa-basket-shopping"></i><p>Sepetiniz boş.</p><a href="Eticaret.html" class="ana-dugme">Alışverişe Başla</a></div>';
    return;
  }
  var kargo = ara >= 500 ? 0 : 50;
  kutu.innerHTML = '<div class="sepet-duzeni"><div class="sepet-liste">' + html + '</div><div class="sepet-ozet"><h3 class="ozet-baslik">Sipariş Özeti</h3>' +
    '<div class="ozet-satir"><span>Ara Toplam</span><span>' + paraYaz(ara) + '</span></div>' +
    '<div class="ozet-satir"><span>Kargo</span><span>' + (kargo ? paraYaz(kargo) : "Ücretsiz") + '</span></div>' +
    '<div class="ozet-satir ozet-toplam"><span>Toplam</span><span>' + paraYaz(ara + kargo) + '</span></div>' +
    '<button class="ana-dugme sepet-dugmesi" onclick="siparisiTamamla()">Siparişi Tamamla</button>' +
    '<button class="ana-dugme temizle-dugmesi" onclick="sepetiTemizle()">Sepeti Temizle</button></div></div>';
}

function kartYaz(u) {
  var sinif = u.etiket === "Yeni" ? "yeni" : u.etiket === "Çok Satan" ? "cok-satan" : "";
  return '<div class="urun-karti">' +
    (u.etiket ? '<span class="etiket ' + sinif + '">' + u.etiket + '</span>' : '') +
    '<div class="urun-gorseli"><img src="' + u.resim + '" class="urun-resim' + (u.foto ? ' fotograf' : '') + '" alt="' + temizle(u.ad) + '"></div>' +
    '<div class="urun-kategori">' + u.kategori + '</div><div class="urun-adi">' + temizle(u.ad) + '</div>' +
    '<div class="yildizlar">' + yildizYaz(u.puan) + '</div>' +
    '<div class="urun-fiyati">' + (u.eskiFiyat ? '<span class="eski-fiyat">' + paraYaz(u.eskiFiyat) + '</span> ' : '') + paraYaz(u.fiyat) + '</div>' +
    '<div class="kart-dugmeleri"><button class="ana-dugme" onclick="urunDetayAc(' + u.id + ')">İncele</button>' +
    '<button class="ana-dugme sepet-dugmesi" onclick="sepeteEkleVeBildir(' + u.id + ')"><i class="fa-solid fa-cart-plus"></i> Ekle</button></div></div>';
}
function urunleriGoster() {
  var izgara = document.getElementById("urun-izgarasi");
  if (!izgara) return;
  var kategori = sorguAl("kategori");
  var arama = deger("arama-girdisi").toLocaleLowerCase("tr-TR");
  var siralama = deger("siralama");
  var liste = tumUrunler().filter(function (u) {
    return (!kategori || u.kategori === kategori) && u.ad.toLocaleLowerCase("tr-TR").indexOf(arama) !== -1;
  });
  if (siralama === "artan") liste.sort(function (a, b) { return a.fiyat - b.fiyat; });
  if (siralama === "azalan") liste.sort(function (a, b) { return b.fiyat - a.fiyat; });
  document.getElementById("liste-baslik").textContent = (kategori ? kategori + " Ürünleri" : "Popüler Ürünler") + " (" + liste.length + ")";
  izgara.innerHTML = liste.map(kartYaz).join("");
  document.getElementById("bos-sonuc").style.display = liste.length ? "none" : "block";
}
function kategoriCubuguOlustur() {
  var kutu = document.getElementById("kategori-cubugu");
  if (!kutu) return;
  var secili = sorguAl("kategori");
  var html = '<a href="Eticaret.html" class="kategori-etiketi' + (secili ? '' : ' aktif') + '">Tümü</a>';
  kategoriler.forEach(function (k) {
    html += '<a href="Eticaret.html?kategori=' + k + '" class="kategori-etiketi' + (secili === k ? ' aktif' : '') + '">' + k + '</a>';
  });
  kutu.innerHTML = html;
}
function urunDetayAc(id) {
  var u = urunBul(id);
  var arka = document.createElement("div");
  arka.className = "modal-arka";
  arka.onclick = function (e) { if (e.target === arka) arka.remove(); };
  arka.innerHTML = '<div class="modal-kutu"><button class="modal-kapat" onclick="this.closest(\'.modal-arka\').remove()">×</button>' +
    '<div class="modal-resim"><img src="' + u.resim + '" class="modal-gorsel" alt=""></div><div class="modal-bilgi">' +
    '<div class="urun-kategori">' + u.kategori + '</div><h3 class="modal-baslik">' + temizle(u.ad) + '</h3><div class="yildizlar">' + yildizYaz(u.puan) + '</div>' +
    '<div class="urun-fiyati">' + paraYaz(u.fiyat) + '</div><p class="modal-aciklama">' + temizle(u.aciklama) + '</p>' +
    '<button class="ana-dugme sepet-dugmesi" onclick="sepeteEkleVeBildir(' + u.id + ')">Sepete Ekle</button></div></div>';
  document.body.appendChild(arka);
}

function resmiKucult(dosya, bitince) {
  var okuyucu = new FileReader();
  okuyucu.onload = function () {
    var img = new Image();
    img.onload = function () {
      var oran = Math.min(1, 400 / Math.max(img.width, img.height));
      var tuval = document.createElement("canvas");
      tuval.width = img.width * oran;
      tuval.height = img.height * oran;
      tuval.getContext("2d").drawImage(img, 0, 0, tuval.width, tuval.height);
      bitince(tuval.toDataURL("image/jpeg", 0.8));
    };
    img.src = okuyucu.result;
  };
  okuyucu.readAsDataURL(dosya);
}
function urunKaydet() {
  var ad = deger("urun-ad"), kategori = deger("urun-kategori"), fiyat = Number(deger("urun-fiyat"));
  var aciklama = deger("urun-aciklama"), dosya = document.getElementById("urun-resim-dosya").files[0];
  if (ad.length < 2) return hataYaz("Ürün adı en az 2 karakter olmalı.");
  if (!fiyat || fiyat <= 0) return hataYaz("Geçerli bir fiyat gir.");
  if (dosya && dosya.type.indexOf("image/") !== 0) return hataYaz("Lütfen bir resim dosyası seç.");
  function kaydet(resim, foto) {
    var liste = oku("eklenenUrunler", []);
    liste.push({ id: Date.now(), ad: ad, kategori: kategori, fiyat: fiyat, puan: 5, etiket: "Yeni", resim: resim, foto: foto, aciklama: aciklama || "Açıklama eklenmedi." });
    if (!yaz("eklenenUrunler", liste)) return hataYaz("Kayıt yapılamadı, tarayıcı depolaması dolu olabilir.");
    bildirimGoster("Ürün eklendi ✔");
    document.getElementById("urun-formu").reset();
    hataYaz("");
    eklenenleriGoster();
  }
  if (dosya) resmiKucult(dosya, function (veri) { kaydet(veri, true); });
  else kaydet(kategoriResmi[kategori], false);
  return false;
}
function eklenenSil(id) {
  yaz("eklenenUrunler", oku("eklenenUrunler", []).filter(function (u) { return u.id != id; }));
  eklenenleriGoster();
}
function eklenenleriGoster() {
  var kutu = document.getElementById("eklenen-liste");
  if (!kutu) return;
  var liste = oku("eklenenUrunler", []);
  kutu.innerHTML = liste.length ? liste.map(function (u) {
    return '<div class="eklenen-satir"><img src="' + u.resim + '" class="sepet-resim" alt=""><span class="eklenen-ad">' + temizle(u.ad) + ' <small>(' + u.kategori + ')</small></span><b>' + paraYaz(u.fiyat) + '</b><button class="sepet-silme" onclick="eklenenSil(' + u.id + ')"><i class="fa-solid fa-trash"></i></button></div>';
  }).join("") : '<div class="bos-mesaj"><p>Henüz ürün eklemedin.</p></div>';
}

function kayitOl() {
  var ad = deger("ad"), eposta = deger("eposta").toLowerCase(), sifre = deger("sifre"), tekrar = deger("sifre-tekrar");
  if (ad.length < 2) return hataYaz("Ad soyad en az 2 karakter olmalı.");
  if (!/^\S+@\S+\.\S+$/.test(eposta)) return hataYaz("Geçerli bir e-posta gir.");
  if (sifre.length < 6) return hataYaz("Şifre en az 6 karakter olmalı.");
  if (sifre !== tekrar) return hataYaz("Şifreler aynı değil.");
  var kullanicilar = oku("kullanicilar", []);
  if (kullanicilar.some(function (k) { return k.eposta === eposta; })) return hataYaz("Bu e-posta ile zaten kayıt var.");
  kullanicilar.push({ ad: ad, eposta: eposta, sifre: sifre });
  yaz("kullanicilar", kullanicilar);
  bildirimGoster("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsun...");
  setTimeout(function () { location.href = "Giris.html"; }, 1500);
  return false;
}
function girisYap() {
  var eposta = deger("eposta").toLowerCase(), sifre = deger("sifre");
  var kullanici = oku("kullanicilar", []).find(function (k) { return k.eposta === eposta && k.sifre === sifre; });
  if (!kullanici) return hataYaz("E-posta veya şifre hatalı.");
  yaz("aktifKullanici", { ad: kullanici.ad, eposta: kullanici.eposta });
  location.href = "Eticaret.html";
  return false;
}
function mesajGonder() {
  var ad = deger("ad"), eposta = deger("eposta"), mesaj = deger("mesaj");
  if (ad.length < 2) return hataYaz("Adını yaz.");
  if (!/^\S+@\S+\.\S+$/.test(eposta)) return hataYaz("Geçerli bir e-posta gir.");
  if (mesaj.length < 10) return hataYaz("Mesaj en az 10 karakter olmalı.");
  var mesajlar = oku("mesajlar", []);
  mesajlar.push({ ad: ad, eposta: eposta, mesaj: mesaj, tarih: new Date().toLocaleString("tr-TR") });
  yaz("mesajlar", mesajlar);
  document.getElementById("iletisim-formu").reset();
  hataYaz("");
  bildirimGoster("Mesajın alındı, teşekkürler ✔");
  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  ortakAlanlariOlustur();
  sepetRozetiniGuncelle();
  kategoriCubuguOlustur();
  urunleriGoster();
  sepetiGoster();
  eklenenleriGoster();
});
