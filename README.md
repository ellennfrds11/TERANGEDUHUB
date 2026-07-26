# TERANG EduHub

## Cara menjalankan di VS Code
1. Buka folder ini di VS Code.
2. Install extension **Live Server** (kalau belum ada).
3. Klik kanan `index.html` → **Open with Live Server**.
   (Atau langsung buka `index.html` di browser dengan double-click — sudah jalan tanpa server.)

## Yang perlu kamu ganti sebelum dikumpulkan
Semua ada di `script.js` paling atas:
- `SELF_ASSESSMENT` — 10 pertanyaan asesmen mandiri (sudah sesuai draft).
- `QUIZ` — 10 soal pilihan ganda (contoh sudah dibuat, boleh diedit sesuai materi dosen).
- `TEAM` — ganti `Nama Anggota 1/2/3...` dengan nama asli anggota kelompok KKN kamu.

Ganti juga email/Instagram di `index.html` bagian **#kontak** (masih placeholder).

## Fitur yang sudah jadi
- Nav sticky + smooth scroll + menu mobile
- Hero dengan gauge kWh meter (elemen visual utama)
- 5 modul materi (sesuai draf)
- Kalkulator Energi Listrik — tambah/hapus alat, atur tarif Rp/kWh, hitung otomatis total daya, konsumsi kWh/hari, dan estimasi biaya harian/bulanan/tahunan + rincian per alat
- Self-assessment otomatis skor + kategori
- Kuis 10 soal → skor otomatis, minimal 80 buka sertifikat
- Sertifikat digital digambar di `<canvas>`, bisa diunduh sebagai PNG
- 4 tombol unduhan (buku saku, leaflet, poster, checklist) → buka halaman siap-cetak, tinggal Ctrl+P → Save as PDF
- FAQ accordion, tips per jenis usaha, tim pengembang, kontak

Tidak butuh install apapun (no build tools, no npm) — murni HTML/CSS/JS.
