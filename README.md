# DeutschAI Production Starter

Bu paket, DeutschAI'yi gerçek web uygulamasına taşımak için başlangıç kodudur.

## İçerik
- Next.js web sitesi
- Supabase e-posta/şifre kimlik doğrulaması ve oturum koruması
- Açık kayıt yerine admin davetiyle öğrenci hesabı
- PostgreSQL tabloları ve kullanıcı bazlı Row Level Security
- Gemini veya OpenAI sunucu tarafı sağlayıcı seçimi
- AI seviye değerlendirmesi ve veritabanına kayıt
- AI Almanca sohbeti ve sohbet geçmişi kaydı

## Kurulum
1. Node.js 20.9+ yükle.
2. `npm install` çalıştır.
3. `.env.example` dosyasını `.env.local` olarak kopyala ve Supabase URL/anon key ile seçtiğin AI anahtarını gir.
4. Supabase SQL Editor'de `supabase/schema.sql` dosyasını çalıştır.
5. Supabase Authentication ayarlarında public sign-up/kayıt seçeneğini kapat.
6. Supabase Dashboard üzerinden ilk admin kullanıcını davet et. Kullanıcı oluşunca SQL Editor'de `update public.profiles set role='admin' where id=(select id from auth.users where email='SENIN_EPOSTAN');` çalıştır.
7. `npm run dev` ile `http://localhost:3000` adresinde aç.

## GitHub / Vercel
Projeyi private GitHub repository'ye yükle, Vercel'de import et ve `.env.local` içindeki değişkenleri Vercel Environment Variables alanına gir.

**Güvenlik:** `.env.local`, API anahtarları ve `SUPABASE_SERVICE_ROLE_KEY` GitHub'a yüklenmemeli. Service-role key yalnızca sunucu ortamında tutulur.

## API uçları
- `POST /api/assessment`
- `POST /api/chat`
- `POST /api/admin/invite` (admin rolü gerekir)

## Üretim öncesi tamamlanacaklar
Rate limiting/kullanım kotası, parola sıfırlama ve e-posta doğrulama akışları, audit log, gelişmiş admin paneli, gerçek sesli konuşma, dinleme içerikleri ve adaptif Goethe soru bankası eklenmelidir. İlk seviye taraması yazılı ön değerlendirmedir; tek başına resmî CEFR seviye belgesi değildir. Resmî Goethe materyalleri telif koşullarına uygun bağlantılarla sunulmalıdır.
