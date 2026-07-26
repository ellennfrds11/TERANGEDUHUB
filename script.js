/* =========================================================
   TERANG EduHub — script.js
   Edit the DATA arrays below (SELF_ASSESSMENT, QUIZ, TEAM)
   to customise content without touching the markup.
   ========================================================= */

/* ---------------- DATA ---------------- */

const SELF_ASSESSMENT = [
  "Apakah Anda menggunakan lampu LED?",
  "Apakah Anda mematikan lampu saat siang hari?",
  "Apakah charger dicabut setelah digunakan?",
  "Apakah freezer dibersihkan secara rutin?",
  "Apakah Anda menggunakan terminal listrik secara aman?",
  "Apakah peralatan listrik dimatikan setelah selesai digunakan?",
  "Apakah Anda memanfaatkan cahaya alami?",
  "Apakah Anda menggunakan alat listrik sesuai kebutuhan?",
  "Apakah Anda melakukan pengecekan instalasi listrik?",
  "Apakah Anda memahami cara penggunaan MCB?"
];

const QUIZ = [
  { q: "Lampu yang paling hemat energi adalah", opts: ["Lampu pijar", "Halogen", "LED", "Neon"], correct: 2 },
  { q: "Mode pada rice cooker yang sebaiknya dimatikan jika tidak diperlukan adalah", opts: ["Cook", "Warm", "Timer", "Steam"], correct: 1 },
  { q: "Agar freezer lebih hemat energi, sebaiknya kita", opts: ["Sering membuka pintu freezer", "Membiarkan bunga es menumpuk", "Membersihkan bunga es secara rutin", "Mengatur suhu seminim mungkin"], correct: 2 },
  { q: "Manfaat efisiensi energi bagi UMKM adalah", opts: ["Menambah biaya operasional", "Menghemat biaya listrik", "Mempercepat kerusakan alat", "Mengurangi kualitas layanan"], correct: 1 },
  { q: "Yang sebaiknya dilakukan terhadap charger setelah selesai digunakan adalah", opts: ["Dibiarkan tetap tercolok", "Dicabut dari stop kontak", "Dipindah ke stop kontak lain", "Dinyalakan kembali"], correct: 1 },
  { q: "Tindakan aman saat menggunakan stop kontak adalah", opts: ["Menumpuk banyak terminal listrik", "Menggunakan sesuai kapasitas", "Menyentuh dengan tangan basah", "Menggunakan kabel yang terkelupas"], correct: 1 },
  { q: "Jika terjadi korsleting listrik, yang harus segera dilakukan adalah", opts: ["Membiarkannya", "Menyiram dengan air", "Mematikan MCB", "Menyalakan lebih banyak alat"], correct: 2 },
  { q: "Cara memanfaatkan cahaya alami untuk hemat energi adalah", opts: ["Menutup semua tirai sepanjang hari", "Menyalakan lampu meski siang hari", "Membuka jendela/tirai pada siang hari", "Menambah jumlah lampu"], correct: 2 },
  { q: "Contoh perilaku yang justru memboroskan energi listrik adalah", opts: ["Mematikan alat setelah digunakan", "Menyalakan beberapa peralatan berdaya besar bersamaan", "Menggunakan lampu LED", "Merawat peralatan secara rutin"], correct: 1 },
  { q: "Perawatan rutin terhadap peralatan listrik bertujuan agar", opts: ["Alat cepat rusak", "Konsumsi listrik meningkat", "Alat tetap bekerja optimal dan hemat energi", "Biaya operasional bertambah"], correct: 2 }
];

const TEAM = [
  { name: "Kukuh Muliasa", role: "Koordinator Desa" },
  { name: "Ellena Nayla Firdausi", role: "Penanggung Jawab Program" },
  { name: "Dr. Barokah Isdaryanti, S.Pd., M.Pd", role: "DPL KKN Giat 16" }
];

/* ---------------- LOADER ---------------- */
window.addEventListener("load", () => {
  document.getElementById("loader").classList.add("is-hidden");
});

/* ---------------- NAV ---------------- */
const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("mainNav");
hamburger.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  hamburger.setAttribute("aria-expanded", isOpen);
});
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mainNav.classList.remove("is-open");
  hamburger.setAttribute("aria-expanded", "false");
}));

const navLinks = document.querySelectorAll("[data-nav]");
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute("href")));
const setActiveNav = () => {
  let current = sections[0];
  const y = window.scrollY + 120;
  sections.forEach(sec => { if (sec && sec.offsetTop <= y) current = sec; });
  navLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + current.id));
};
window.addEventListener("scroll", setActiveNav);
setActiveNav();

/* ---------------- METER GAUGE HELPER ---------------- */
function setMeter(percent, arcId, needleId) {
  const arc = document.getElementById(arcId);
  const needle = document.getElementById(needleId);
  if (!arc || !needle) return;
  const len = arc.getTotalLength();
  arc.style.strokeDasharray = len;
  arc.style.strokeDashoffset = len * (1 - Math.max(0, Math.min(100, percent)) / 100);
  const angle = -90 + (Math.max(0, Math.min(100, percent)) / 100) * 180;
  needle.style.transform = `rotate(${angle}deg)`;
}
// decorative hero meter
window.addEventListener("load", () => setMeter(62, "meterArcHero", "meterNeedleHero"));

/* ---------------- KALKULATOR ENERGI ---------------- */
const DEFAULT_APPLIANCES = [
  { name: "Rice Cooker", watt: 400, qty: 1, hours: 2 },
  { name: "Freezer", watt: 150, qty: 1, hours: 24 },
  { name: "Lampu LED", watt: 10, qty: 4, hours: 6 },
  { name: "Blender", watt: 300, qty: 1, hours: 0.5 },
  { name: "Pompa Air", watt: 125, qty: 1, hours: 1 }
];

const calcRows = document.getElementById("calcRows");

function addCalcRow(data = { name: "", watt: "", qty: 1, hours: "" }) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="text" class="calc-name" placeholder="cth. Rice Cooker" value="${data.name}"></td>
    <td><input type="number" class="calc-watt" min="0" step="1" placeholder="watt" value="${data.watt}"></td>
    <td><input type="number" class="calc-qty" min="1" step="1" value="${data.qty}"></td>
    <td><input type="number" class="calc-hours" min="0" step="0.5" placeholder="jam" value="${data.hours}"></td>
    <td><button type="button" class="calc-row__remove" title="Hapus alat">✕</button></td>`;
  tr.querySelector(".calc-row__remove").addEventListener("click", () => {
    tr.remove();
  });
  calcRows.appendChild(tr);
}

DEFAULT_APPLIANCES.forEach(addCalcRow);

document.getElementById("calcAddRow").addEventListener("click", () => addCalcRow());

function formatRupiah(num) {
  return "Rp" + Math.round(num).toLocaleString("id-ID");
}

document.getElementById("calcCompute").addEventListener("click", () => {
  const tariff = parseFloat(document.getElementById("calcTariff").value) || 0;
  const rows = [...calcRows.querySelectorAll("tr")];
  let totalWatt = 0, totalKwhDay = 0;
  const items = [];

  rows.forEach(tr => {
    const name = tr.querySelector(".calc-name").value.trim();
    const watt = parseFloat(tr.querySelector(".calc-watt").value) || 0;
    const qty = parseFloat(tr.querySelector(".calc-qty").value) || 0;
    const hours = parseFloat(tr.querySelector(".calc-hours").value) || 0;
    if (!name || watt <= 0 || qty <= 0 || hours <= 0) return;
    const kwhDay = (watt * qty * hours) / 1000;
    totalWatt += watt * qty;
    totalKwhDay += kwhDay;
    items.push({ name, watt, qty, hours, kwhDay, costDay: kwhDay * tariff });
  });

  if (items.length === 0) {
    alert("Isi minimal satu alat dengan daya, jumlah, dan lama pakai yang valid.");
    return;
  }

  const costDay = totalKwhDay * tariff;
  const costMonth = costDay * 30;
  const costYear = costDay * 365;

  document.getElementById("calcTotalWatt").textContent = totalWatt.toLocaleString("id-ID");
  document.getElementById("calcKwhDay").textContent = totalKwhDay.toFixed(2);
  document.getElementById("calcCostDay").textContent = formatRupiah(costDay);
  document.getElementById("calcCostMonth").textContent = formatRupiah(costMonth);
  document.getElementById("calcCostYear").textContent = formatRupiah(costYear);

  const table = document.getElementById("calcBreakdownTable");
  table.innerHTML = `
    <thead>
      <tr><th>Alat</th><th>Daya Total</th><th>kWh/Hari</th><th>Biaya/Hari</th><th>Biaya/Bulan</th></tr>
    </thead>
    <tbody>
      ${items.map(it => `
        <tr>
          <td>${it.name} ${it.qty > 1 ? `(x${it.qty})` : ""}</td>
          <td>${(it.watt * it.qty).toLocaleString("id-ID")} W</td>
          <td>${it.kwhDay.toFixed(2)}</td>
          <td>${formatRupiah(it.costDay)}</td>
          <td>${formatRupiah(it.costDay * 30)}</td>
        </tr>`).join("")}
    </tbody>`;

  const biggest = items.reduce((a, b) => (b.costDay > a.costDay ? b : a));
  document.getElementById("calcTip").textContent =
    `💡 Kontributor biaya terbesar: ${biggest.name}, sekitar ${formatRupiah(biggest.costDay * 30)} per bulan. ` +
    `Terapkan tips hemat energi pada Modul 3 & 4 untuk alat ini agar penghematan lebih terasa.`;

  document.getElementById("calcResult").hidden = false;
  document.getElementById("calcResult").scrollIntoView({ behavior: "smooth", block: "nearest" });
});

/* ---------------- SELF ASSESSMENT ---------------- */
const assessmentForm = document.getElementById("assessmentForm");
SELF_ASSESSMENT.forEach((question, i) => {
  const row = document.createElement("div");
  row.className = "check-item";
  row.innerHTML = `
    <span class="check-item__q">${i + 1}. ${question}</span>
    <div class="toggle">
      <label><input type="radio" name="sa-${i}" value="1"><span>Ya</span></label>
      <label><input type="radio" name="sa-${i}" value="0"><span>Tidak</span></label>
    </div>`;
  assessmentForm.appendChild(row);
});

function categoryFor(score) {
  if (score >= 80) return { label: "Sangat Baik", reco: "Pertahankan kebiasaan hemat energi Anda — usaha Anda sudah menerapkan efisiensi energi dengan sangat baik." };
  if (score >= 60) return { label: "Baik", reco: "Kebiasaan hemat energi sudah cukup baik. Perhatikan kembali poin yang masih terlewat agar semakin optimal." };
  if (score >= 40) return { label: "Cukup", reco: "Masih ada beberapa kebiasaan yang perlu diperbaiki. Coba terapkan tips pada Modul 4 secara bertahap." };
  return { label: "Perlu Ditingkatkan", reco: "Penerapan hemat energi pada usaha Anda masih minim. Pelajari kembali materi edukasi dan mulai terapkan satu per satu." };
}

document.getElementById("assessmentSubmit").addEventListener("click", () => {
  let answered = 0, yes = 0;
  SELF_ASSESSMENT.forEach((_, i) => {
    const checked = assessmentForm.querySelector(`input[name="sa-${i}"]:checked`);
    if (checked) { answered++; yes += Number(checked.value); }
  });
  if (answered < SELF_ASSESSMENT.length) {
    alert("Mohon jawab semua pertanyaan terlebih dahulu.");
    return;
  }
  const score = yes * 10;
  const { label, reco } = categoryFor(score);
  document.getElementById("assessmentScoreLabel").textContent = score;
  document.getElementById("assessmentCategory").textContent = label;
  document.getElementById("assessmentReco").textContent = reco;
  const result = document.getElementById("assessmentResult");
  result.hidden = false;
  setMeter(score, "meterArcAssess", "meterNeedleAssess");
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

/* ---------------- QUIZ ---------------- */
const quizContainer = document.getElementById("quizContainer");
QUIZ.forEach((item, i) => {
  const block = document.createElement("div");
  block.className = "quiz-q";
  block.innerHTML = `
    <p class="quiz-q__num">Soal ${i + 1} / ${QUIZ.length}</p>
    <p class="quiz-q__text">${item.q}</p>
    <div class="quiz-q__opts">
      ${item.opts.map((opt, j) => `
        <label class="quiz-opt">
          <input type="radio" name="quiz-${i}" value="${j}">
          <span>${opt}</span>
        </label>`).join("")}
    </div>`;
  quizContainer.appendChild(block);
});

quizContainer.addEventListener("change", () => {
  const answered = QUIZ.filter((_, i) => quizContainer.querySelector(`input[name="quiz-${i}"]:checked`)).length;
  document.getElementById("quizProgress").style.width = `${(answered / QUIZ.length) * 100}%`;
});

let lastQuizScore = 0;

document.getElementById("quizSubmit").addEventListener("click", () => {
  let answered = 0, correct = 0;
  QUIZ.forEach((item, i) => {
    const checked = quizContainer.querySelector(`input[name="quiz-${i}"]:checked`);
    if (checked) { answered++; if (Number(checked.value) === item.correct) correct++; }
  });
  if (answered < QUIZ.length) {
    alert("Mohon jawab seluruh soal terlebih dahulu.");
    return;
  }
  const score = correct * 10;
  lastQuizScore = score;
  const passed = score >= 80;
  document.getElementById("quizScoreLabel").textContent = score;
  document.getElementById("quizCategory").textContent = passed ? "Lulus" : "Belum Lulus";
  document.getElementById("quizReco").textContent = passed
    ? `Anda menjawab ${correct} dari ${QUIZ.length} soal dengan benar. Selamat, sertifikat digital sudah dapat diambil!`
    : `Anda menjawab ${correct} dari ${QUIZ.length} soal dengan benar. Nilai minimal 80 diperlukan untuk membuka sertifikat — pelajari kembali materi dan coba lagi.`;
  document.getElementById("quizToCert").style.display = passed ? "inline-block" : "none";
  const result = document.getElementById("quizResult");
  result.hidden = false;
  setMeter(score, "meterArcQuiz", "meterNeedleQuiz");
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  unlockCertificateGate();
});

/* ---------------- CERTIFICATE ---------------- */
function unlockCertificateGate() {
  const lockMsg = document.getElementById("certLockMsg");
  const form = document.getElementById("certForm");
  if (lastQuizScore >= 80) {
    lockMsg.hidden = true;
    form.hidden = false;
  } else {
    lockMsg.hidden = false;
    lockMsg.textContent = "🔒 Nilai kuis Anda belum mencukupi. Coba kerjakan kembali kuis dengan nilai minimal 80.";
    form.hidden = true;
  }
}

document.getElementById("certForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (lastQuizScore < 80) return;
  const name = document.getElementById("certName").value.trim();
  const origin = document.getElementById("certOrigin").value.trim();
  if (!name || !origin) return;
  drawCertificate(name, origin, lastQuizScore);
  const wrap = document.getElementById("certWrap");
  wrap.hidden = false;
  wrap.scrollIntoView({ behavior: "smooth", block: "start" });
});

function drawCertificate(name, origin, score) {
  const canvas = document.getElementById("certCanvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  // background
  ctx.fillStyle = "#FBF7EC";
  ctx.fillRect(0, 0, W, H);

  // border
  ctx.strokeStyle = "#1B1B1B";
  ctx.lineWidth = 8;
  ctx.strokeRect(24, 24, W - 48, H - 48);
  ctx.strokeStyle = "#F2B705";
  ctx.lineWidth = 3;
  ctx.strokeRect(42, 42, W - 84, H - 84);

  // header band
  ctx.fillStyle = "#0A3B3F";
  ctx.fillRect(42, 42, W - 84, 120);

  ctx.fillStyle = "#F2B705";
  ctx.font = "700 26px 'Space Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("⚡ TERANG EDUHUB", W / 2, 95);
  ctx.fillStyle = "#FBF7EC";
  ctx.font = "400 15px 'Space Mono', monospace";
  ctx.fillText("KKN GIAT 16 · UNIVERSITAS NEGERI SEMARANG", W / 2, 128);

  // title
  ctx.fillStyle = "#1B1B1B";
  ctx.font = "400 22px 'Space Mono', monospace";
  ctx.fillText("SERTIFIKAT PENYELESAIAN", W / 2, 235);
  ctx.font = "italic 16px Georgia, serif";
  ctx.fillStyle = "#444";
  ctx.fillText("diberikan kepada", W / 2, 270);

  // name
  ctx.fillStyle = "#0F5257";
  ctx.font = "700 52px Georgia, serif";
  ctx.fillText(name, W / 2, 340);
  ctx.strokeStyle = "#E8552D";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 220, 358);
  ctx.lineTo(W / 2 + 220, 358);
  ctx.stroke();

  // body
  ctx.fillStyle = "#1B1B1B";
  ctx.font = "16px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText(`dari ${origin}`, W / 2, 395);
  wrapText(ctx,
    `Telah berhasil menyelesaikan seluruh materi edukasi "Terampil Mengelola Energi (TERANG)" dan lulus asesmen kuis dengan nilai ${score} dari 100 pada program edukasi digital efisiensi energi listrik bagi pelaku UMKM Kelurahan Genuk.`,
    W / 2, 430, 760, 24);

  // meter graphic
  drawCertMeter(ctx, W / 2, 560, score);

  // date
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  ctx.font = "14px 'Space Mono', monospace";
  ctx.fillStyle = "#444";
  ctx.fillText(`Diterbitkan pada ${today}`, W / 2, 660);

  // signatures
  ctx.textAlign = "center";
  ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
  const sigY = 760;
  ctx.beginPath(); ctx.moveTo(180, sigY); ctx.lineTo(420, sigY); ctx.strokeStyle = "#1B1B1B"; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillText("Ketua Kelompok KKN", 300, sigY + 22);

  ctx.beginPath(); ctx.moveTo(W - 420, sigY); ctx.lineTo(W - 180, sigY); ctx.stroke();
  ctx.fillText("Dosen Pembimbing Lapangan", W - 300, sigY + 22);
}

function drawCertMeter(ctx, cx, cy, score) {
  const r = 55;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI, 0, false);
  ctx.strokeStyle = "#E8E0C8";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.stroke();

  const frac = Math.max(0, Math.min(100, score)) / 100;
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI, Math.PI + Math.PI * frac, false);
  ctx.strokeStyle = "#F2B705";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.fillStyle = "#1B1B1B";
  ctx.font = "700 26px 'Space Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(score, cx, cy - 4);
  ctx.font = "12px 'Space Mono', monospace";
  ctx.fillText("SKOR KUIS", cx, cy + 16);
  ctx.restore();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  ctx.font = "16px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  for (let n = 0; n < words.length; n++) {
    const test = line + words[n] + " ";
    if (ctx.measureText(test).width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
}

document.getElementById("certDownload").addEventListener("click", () => {
  const canvas = document.getElementById("certCanvas");
  const link = document.createElement("a");
  link.download = "sertifikat-terang-eduhub.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

/* ---------------- DOWNLOAD / PRINTABLES ---------------- */

// Shared page chrome (header band + closing footer) so every document
// carries the same colourful identity as the rest of the site.
function printableHead(eyebrow, title, subtitle, headerBg) {
  return `
    <div class="page__header" style="background:${headerBg};">
      <p class="p-eyebrow">⚡ ${eyebrow}</p>
      <h1>${title}</h1>
      <p class="p-subtitle">${subtitle}</p>
    </div>`;
}
function printableFoot() {
  return `
    <div class="page__footer">
      <span>⚡ TERANG EduHub</span>
      <span>KKN Giat 16 · Universitas Negeri Semarang · Kelurahan Genuk</span>
    </div>`;
}

const PRINTABLES = {

  booklet: {
    title: "Buku Saku Hemat Energi",
    body: `
      <div class="page">
        ${printableHead("TERANG EduHub", "Buku Saku<br>Hemat Energi", "Ringkasan 5 modul edukasi efisiensi energi listrik bagi UMKM", "var(--teal-dark)")}
        <div class="page__body">

          <div class="mblock mblock--teal">
            <span class="mblock__num">01</span>
            <div class="mblock__content">
              <h2>Mengenal Efisiensi Energi</h2>
              <p>Efisiensi energi adalah penggunaan energi secara optimal untuk memperoleh manfaat maksimal dengan konsumsi energi seminimal mungkin.</p>
              <div class="pill-row">
                <span class="pill pill--teal">Hemat biaya</span>
                <span class="pill pill--amber">Alat awet</span>
                <span class="pill pill--terracotta">Ramah lingkungan</span>
              </div>
            </div>
          </div>

          <div class="mblock mblock--terracotta">
            <span class="mblock__num">02</span>
            <div class="mblock__content">
              <h2>Mengapa UMKM Perlu Hemat Listrik?</h2>
              <p>Penggunaan energi secara efisien membantu meningkatkan keuntungan karena biaya operasional menjadi lebih rendah.</p>
              <div class="example-box">
                <strong>Contoh:</strong> Hemat Rp5.000/hari ≈ <strong>Rp150.000/bulan</strong>.
              </div>
            </div>
          </div>

          <div class="mblock mblock--amber">
            <span class="mblock__num">03</span>
            <div class="mblock__content">
              <h2>Peralatan Listrik pada UMKM</h2>
              <div class="chip-grid">
                <div class="chip-card"><span>🍚</span><b>Rice Cooker</b><p>Matikan mode warm bila tak perlu.</p></div>
                <div class="chip-card"><span>❄️</span><b>Freezer</b><p>Bersihkan bunga es rutin.</p></div>
                <div class="chip-card"><span>🧃</span><b>Blender</b><p>Gunakan sesuai kapasitas.</p></div>
                <div class="chip-card"><span>💡</span><b>Lampu</b><p>Gunakan LED &amp; cahaya alami.</p></div>
                <div class="chip-card"><span>💧</span><b>Pompa Air</b><p>Matikan bila tak digunakan.</p></div>
              </div>
            </div>
          </div>

          <div class="mblock mblock--teal">
            <span class="mblock__num">04</span>
            <div class="mblock__content">
              <h2>Tips Hemat Energi</h2>
              <ul class="tick">
                <li>Gunakan lampu LED, lebih hemat &amp; awet.</li>
                <li>Cabut charger setelah digunakan.</li>
                <li>Manfaatkan cahaya alami di siang hari.</li>
                <li>Hindari menyalakan alat berdaya besar bersamaan.</li>
                <li>Rawat peralatan listrik secara rutin.</li>
              </ul>
            </div>
          </div>

          <div class="mblock mblock--terracotta">
            <span class="mblock__num">05</span>
            <div class="mblock__content">
              <h2>Keselamatan Penggunaan Listrik</h2>
              <ul class="warn">
                <li>Gunakan stop kontak sesuai kapasitas.</li>
                <li>Hindari terminal listrik bertumpuk.</li>
                <li>Jangan gunakan kabel yang terkelupas.</li>
                <li>Pastikan tangan kering saat menyentuh listrik.</li>
                <li>Segera matikan MCB saat korsleting.</li>
                <li>Hubungi teknisi bila ada kerusakan instalasi.</li>
              </ul>
            </div>
          </div>

        </div>
        ${printableFoot()}
      </div>`
  },

  leaflet: {
    title: "Leaflet Edukasi Efisiensi Energi",
    body: `
      <div class="page page--split">
        <div class="split__side">
          <p class="p-eyebrow p-eyebrow--onDark">⚡ TERANG EduHub</p>
          <h1 class="split__title">Hemat Listrik,<br>Untung Berlipat</h1>
          <p class="split__lede">Hemat energi listrik bukan hanya baik untuk lingkungan — tapi juga baik untuk keuntungan usaha Anda.</p>
          <div class="split__badge">💡</div>
        </div>
        <div class="split__main">
          <h2>3 Alasan UMKM Perlu Hemat Listrik</h2>
          <div class="reason">
            <span class="reason__num reason__num--teal">1</span>
            <p>Menekan biaya operasional harian.</p>
          </div>
          <div class="reason">
            <span class="reason__num reason__num--amber">2</span>
            <p>Memperpanjang umur peralatan usaha.</p>
          </div>
          <div class="reason">
            <span class="reason__num reason__num--terracotta">3</span>
            <p>Mendukung lingkungan yang lebih ramah energi.</p>
          </div>
          <div class="example-box example-box--big">
            <strong>Mulai dari langkah kecil:</strong> ganti lampu pijar dengan LED, cabut charger
            setelah digunakan, dan matikan peralatan yang tidak dipakai. Hemat Rp5.000/hari saja
            berarti sekitar <strong>Rp150.000/bulan</strong>.
          </div>
        </div>
      </div>`
  },

  poster: {
    title: "Poster 5 Langkah Hemat Energi",
    body: `
      <div class="page page--poster">
        <p class="p-eyebrow p-eyebrow--onDark" style="text-align:center;">⚡ TERANG EduHub</p>
        <h1 class="poster__title">5 Langkah<br>Hemat Energi</h1>
        <div class="poster__steps">
          <div class="pstep pstep--teal"><span>1</span><p>Gunakan lampu <b>LED</b>.</p></div>
          <div class="pstep pstep--terracotta"><span>2</span><p>Cabut <b>charger</b> setelah dipakai.</p></div>
          <div class="pstep pstep--teal"><span>3</span><p>Manfaatkan <b>cahaya alami</b> siang hari.</p></div>
          <div class="pstep pstep--terracotta"><span>4</span><p>Jangan nyalakan alat berdaya besar bersamaan.</p></div>
          <div class="pstep pstep--teal"><span>5</span><p>Rawat peralatan listrik secara rutin.</p></div>
        </div>
      </div>`
  },

  checklist: {
    title: "Checklist Hemat Energi Harian",
    body: `
      <div class="page">
        ${printableHead("TERANG EduHub", "Checklist Hemat<br>Energi Harian", "Centang setiap hari — pantau kebiasaan hemat energi usaha Anda", "var(--teal-dark)")}
        <div class="page__body page__body--tight">
          <table class="ctable">
            <thead><tr><th>#</th><th>Aktivitas</th><th>Senin</th><th>Selasa</th><th>Rabu</th></tr></thead>
            <tbody>
              ${SELF_ASSESSMENT.map((q, i) => `
                <tr class="${i % 2 === 0 ? "row-a" : "row-b"}">
                  <td class="ctable__num">${i + 1}</td>
                  <td>${q.replace("Apakah Anda ", "").replace("Apakah ", "").replace("?", "")}</td>
                  <td><span class="cbox"></span></td>
                  <td><span class="cbox"></span></td>
                  <td><span class="cbox"></span></td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
        ${printableFoot()}
      </div>`
  }
};

document.querySelectorAll(".download-card").forEach(card => {
  card.addEventListener("click", () => {
    const doc = PRINTABLES[card.dataset.doc];
    const win = window.open("", "_blank");
    win.document.write(`
      <!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">
      <title>${doc.title} — TERANG EduHub</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
      <style>
        :root{
          --ink:#1B1B1B; --paper:#FBF7EC; --paper-dim:#F2ECDA;
          --teal:#0F5257; --teal-dark:#0A3B3F; --amber:#F2B705; --terracotta:#E8552D;
        }
        *{ box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
        body{
          margin:0; background:#E7E1CC; color:var(--ink);
          font-family:'Plus Jakarta Sans',sans-serif; padding:28px 16px 60px;
        }
        h1,h2{ font-family:'Anton',sans-serif; text-transform:uppercase; font-weight:400; margin:0 0 0.3em; letter-spacing:0.01em; }
        h1{ font-size:2rem; line-height:1.05; }
        h2{ font-size:1.15rem; color:var(--teal); }
        p{ margin:0 0 0.8em; line-height:1.55; }

        .page{ max-width:720px; margin:0 auto; background:var(--paper); border:3px solid var(--ink); box-shadow:10px 10px 0 var(--ink); overflow:hidden; }
        .page__header{ color:var(--paper); padding:32px 34px; }
        .p-eyebrow{ font-family:'Space Mono',monospace; text-transform:uppercase; letter-spacing:0.14em; font-size:0.75rem; color:var(--amber); margin:0 0 0.6em; }
        .p-eyebrow--onDark{ color:var(--amber); }
        .p-subtitle{ opacity:0.85; margin:0; font-size:0.95rem; }
        .page__body{ padding:30px 34px; display:flex; flex-direction:column; gap:0; }
        .page__body--tight{ padding:24px 30px; }
        .page__footer{
          background:var(--ink); color:var(--paper); font-family:'Space Mono',monospace;
          font-size:0.7rem; text-transform:uppercase; letter-spacing:0.04em;
          display:flex; justify-content:space-between; padding:14px 34px;
        }

        .mblock{ display:flex; gap:18px; padding:20px 0; border-bottom:1px dashed rgba(27,27,27,0.15); border-left:8px solid var(--teal); padding-left:18px; }
        .mblock:last-child{ border-bottom:none; }
        .mblock--teal{ border-color:var(--teal); }
        .mblock--terracotta{ border-color:var(--terracotta); }
        .mblock--amber{ border-color:var(--amber); }
        .mblock__num{ font-family:'Space Mono',monospace; font-weight:700; font-size:1.8rem; color:var(--teal); min-width:44px; }
        .mblock--terracotta .mblock__num{ color:var(--terracotta); }
        .mblock--amber .mblock__num{ color:var(--amber-dim, #C99406); }
        .mblock__content{ flex:1; }

        .pill-row{ display:flex; gap:8px; flex-wrap:wrap; margin-top:6px; }
        .pill{ font-family:'Space Mono',monospace; font-size:0.68rem; text-transform:uppercase; letter-spacing:0.03em; padding:5px 12px; border-radius:20px; color:var(--paper); }
        .pill--teal{ background:var(--teal); }
        .pill--amber{ background:var(--amber); color:var(--ink); }
        .pill--terracotta{ background:var(--terracotta); }

        .example-box{ background:var(--paper-dim); border-left:4px solid var(--amber); padding:12px 16px; border-radius:4px; font-size:0.92rem; }
        .example-box--big{ margin-top:18px; font-size:0.95rem; }

        .chip-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:8px; }
        .chip-card{ background:var(--paper-dim); border-radius:6px; padding:12px; text-align:center; }
        .chip-card span{ font-size:1.4rem; display:block; margin-bottom:4px; }
        .chip-card b{ display:block; font-size:0.85rem; }
        .chip-card p{ font-size:0.72rem; opacity:0.75; margin:4px 0 0; }

        .tick{ list-style:none; padding:0; margin:8px 0 0; }
        .tick li{ padding-left:26px; position:relative; margin-bottom:8px; }
        .tick li::before{ content:"✓"; position:absolute; left:0; color:var(--teal); font-weight:700; }
        .warn{ list-style:none; padding:0; margin:8px 0 0; }
        .warn li{ background:#FFF3EC; border-radius:4px; padding:8px 8px 8px 30px; position:relative; margin-bottom:6px; font-size:0.92rem; }
        .warn li::before{ content:"⚠"; position:absolute; left:8px; color:var(--terracotta); }

        /* leaflet split layout */
        .page--split{ display:grid; grid-template-columns:34% 66%; min-height:520px; }
        .split__side{ background:var(--terracotta); color:var(--paper); padding:30px 24px; position:relative; }
        .split__title{ font-size:1.7rem; margin:14px 0; }
        .split__lede{ font-size:0.9rem; opacity:0.92; }
        .split__badge{ font-size:2.4rem; position:absolute; bottom:24px; left:24px; }
        .split__main{ padding:34px; }
        .reason{ display:flex; align-items:flex-start; gap:14px; margin-bottom:14px; }
        .reason__num{ min-width:34px; height:34px; border-radius:50%; color:var(--paper); display:flex; align-items:center; justify-content:center; font-family:'Space Mono',monospace; font-weight:700; }
        .reason__num--teal{ background:var(--teal); }
        .reason__num--amber{ background:var(--amber); color:var(--ink); }
        .reason__num--terracotta{ background:var(--terracotta); }
        .reason p{ margin:6px 0 0; }

        /* poster layout */
        .page--poster{ background:var(--amber); padding:40px 34px; text-align:center; }
        .poster__title{ font-size:3rem; color:var(--ink); margin:10px 0 26px; }
        .poster__steps{ display:flex; flex-direction:column; gap:14px; text-align:left; }
        .pstep{ display:flex; align-items:center; gap:16px; background:var(--paper); border:2px solid var(--ink); border-radius:8px; padding:14px 18px; }
        .pstep span{ font-family:'Space Mono',monospace; font-weight:700; font-size:1.4rem; color:var(--paper); width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .pstep--teal span{ background:var(--teal); }
        .pstep--terracotta span{ background:var(--terracotta); }
        .pstep p{ margin:0; font-size:1.05rem; }

        /* checklist table */
        .ctable{ width:100%; border-collapse:collapse; font-size:0.9rem; }
        .ctable th{ text-align:left; background:var(--teal); color:var(--paper); font-family:'Space Mono',monospace; font-size:0.72rem; text-transform:uppercase; letter-spacing:0.04em; padding:10px 8px; }
        .ctable th:not(:first-child){ text-align:center; }
        .ctable td{ padding:10px 8px; }
        .ctable__num{ font-family:'Space Mono',monospace; color:var(--terracotta); font-weight:700; }
        .row-a{ background:var(--paper-dim); }
        .cbox{ display:inline-block; width:16px; height:16px; border:2px solid var(--teal); border-radius:3px; margin:0 auto; }

        .print-bar{ max-width:720px; margin:20px auto 0; text-align:center; }
        .print-bar button{
          font-family:'Space Mono',monospace; font-weight:700; text-transform:uppercase; letter-spacing:0.04em;
          font-size:0.85rem; padding:12px 26px; border-radius:6px; border:2px solid var(--ink);
          background:var(--amber); color:var(--ink); cursor:pointer; box-shadow:6px 6px 0 var(--ink);
        }
        @media print{
          body{ background:#fff; padding:0; }
          .page{ box-shadow:none; margin:0; max-width:none; }
          .print-bar{ display:none; }
        }
      </style></head><body>
      ${doc.body}
      <div class="print-bar"><button onclick="window.print()">🖨️ Cetak / Simpan sebagai PDF</button></div>
      </body></html>`);
    win.document.close();
  });
});

/* ---------------- FAQ ACCORDION ---------------- */
document.querySelectorAll(".accordion__q").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("is-open");
  });
});

/* ---------------- TEAM ---------------- */
const teamGrid = document.getElementById("teamGrid");
TEAM.forEach(member => {
  const initials = member.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const card = document.createElement("div");
  card.className = "team-card";
  card.innerHTML = `
    <div class="team-card__avatar">${initials}</div>
    <h3>${member.name}</h3>
    <p class="team-card__role">${member.role}</p>`;
  teamGrid.appendChild(card);
});
