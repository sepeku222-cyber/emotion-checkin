// ============================================================
// HALAMAN SCAN WAJAH + TEKNIK STOP (Tahap 4 - Diperbarui)
// - Kamera auto-start
// - Scan cepat (5 frame × 50ms)
// - Integrasi Teknik STOP
// - TIDAK ada upload, TIDAK ada simpan
// ============================================================

const LABEL_EMOSI = {
    happy:     { nama: 'Senang',        emoji: '😊', kunci: 'senang' },
    sad:       { nama: 'Sedih',         emoji: '😢', kunci: 'sedih' },
    angry:     { nama: 'Marah',         emoji: '😠', kunci: 'marah' },
    fearful:   { nama: 'Cemas',         emoji: '😨', kunci: 'takut' },
    surprised: { nama: 'Terkejut',      emoji: '😲', kunci: 'terkejut' },
    disgusted: { nama: 'Tidak Nyaman',  emoji: '😒', kunci: 'jijik' },
    neutral:   { nama: 'Netral',        emoji: '😐', kunci: 'netral' }
  };
  
  const EMOSI_MANUAL = [
    { kunci: 'senang',    nama: 'Senang',     emoji: '😊' },
    { kunci: 'sedih',     nama: 'Sedih',      emoji: '😢' },
    { kunci: 'marah',     nama: 'Marah',      emoji: '😠' },
    { kunci: 'takut',     nama: 'Cemas',      emoji: '😨' },
    { kunci: 'lelah',     nama: 'Lelah',      emoji: '😴' },
    { kunci: 'bosan',     nama: 'Bosan',      emoji: '🥱' },
    { kunci: 'bingung',   nama: 'Bingung',    emoji: '😕' },
    { kunci: 'semangat',  nama: 'Semangat',   emoji: '🤩' },
    { kunci: 'bersyukur', nama: 'Bersyukur',  emoji: '🙏' },
    { kunci: 'netral',    nama: 'Biasa saja', emoji: '😐' }
  ];
  
  const TIPS = {
    senang: {
      judul: 'Senang sekali! 😊',
      sub: 'Pertahankan energi baik ini.',
      tips: [
        'Bagikan senyummu ke teman di sebelahmu.',
        'Tulis satu hal yang membuatmu senang hari ini.',
        'Gunakan energi ini untuk belajar hal baru.'
      ]
    },
    sedih: {
      judul: 'Wajar kok merasa sedih 😢',
      sub: 'Perasaan ini akan lewat. Kamu tidak sendiri.',
      tips: [
        'Gunakan Teknik STOP: berhenti, tarik napas, amati, lalu lanjutkan.',
        'Minum air putih dan duduk sebentar.',
        'Cerita ke guru atau teman yang kamu percaya.',
        'Tulis 1 kalimat tentang perasaanmu.'
      ]
    },
    marah: {
      judul: 'Marah itu manusiawi 😠',
      sub: 'Yang penting bagaimana kita mengelolanya.',
      tips: [
        'Gunakan Teknik STOP: tarik napas dalam sebelum bereaksi.',
        'Hitung 1 sampai 10 perlahan.',
        'Jauhkan diri sebentar dari sumber marah jika bisa.',
        'Baru bicara setelah lebih tenang.'
      ]
    },
    takut: {
      judul: 'Cemas itu normal 😨',
      sub: 'Banyak orang juga merasa begitu.',
      tips: [
        'Gunakan Teknik STOP: tarik napas 4 detik, tahan 4, buang 4.',
        'Letakkan tangan di dada, rasakan detak jantungmu.',
        'Fokus pada 3 benda di sekitarmu (Observe).',
        'Cerita ke guru jika kecemasanmu berat.'
      ]
    },
    terkejut: {
      judul: 'Terkejut ya? 😲',
      sub: 'Beri waktu tubuhmu menenangkan diri.',
      tips: [
        'Gunakan Teknik STOP untuk menenangkan diri.',
        'Lihat sekeliling, pastikan kamu aman.',
        'Ceritakan apa yang membuatmu terkejut.'
      ]
    },
    jijik: {
      judul: 'Merasa tidak nyaman 😒',
      sub: 'Itu sinyal tubuh, tidak apa-apa.',
      tips: [
        'Pindah posisi atau cari tempat yang lebih nyaman.',
        'Tarik napas dan alihkan perhatian ke hal netral.',
        'Beri tahu guru jika ada yang mengganggu.'
      ]
    },
    netral: {
      judul: 'Biasa saja 😐',
      sub: 'Tidak apa-apa. Tidak setiap hari harus istimewa.',
      tips: [
        'Coba tanyakan pada diri: ada yang ingin kamu ubah hari ini?',
        'Minum air, regangkan tubuh sebentar.',
        'Siapkan diri untuk belajar dengan tenang.'
      ]
    },
    lelah: {
      judul: 'Kamu lelah 😴',
      sub: 'Tubuhmu minta istirahat.',
      tips: [
        'Minum air putih.',
        'Regangkan leher & bahu 30 detik.',
        'Jika mungkin, tidur lebih awal nanti malam.',
        'Belajar secukupnya, jangan memaksakan.'
      ]
    },
    bosan: {
      judul: 'Bosan ya 🥱',
      sub: 'Itu sinyal butuh variasi.',
      tips: [
        'Ganti posisi duduk atau cara belajar.',
        'Tantang dirimu dengan 1 pertanyaan baru.',
        'Beri dirimu istirahat 2 menit setelah 20 menit belajar.'
      ]
    },
    bingung: {
      judul: 'Bingung itu bagian dari belajar 😕',
      sub: 'Justru tanda kamu sedang berkembang.',
      tips: [
        'Tuliskan apa yang belum kamu pahami.',
        'Tanyakan ke guru atau teman.',
        'Pecah masalah jadi bagian kecil.'
      ]
    },
    semangat: {
      judul: 'Semangat! 🤩',
      sub: 'Energi ini berharga.',
      tips: [
        'Salurkan ke hal yang ingin kamu selesaikan.',
        'Bantu teman yang mungkin butuh semangatmu.',
        'Catat apa yang membuatmu semangat hari ini.'
      ]
    },
    bersyukur: {
      judul: 'Bersyukur 🙏',
      sub: 'Perasaan yang menenangkan.',
      tips: [
        'Tulis 3 hal yang kamu syukuri hari ini.',
        'Berterima kasih pada satu orang hari ini.',
        'Nikmati perasaan ini sejenak.'
      ]
    }
  };
  
  // KONFIGURASI SCAN CEPAT
  const KONFIG = {
    inputSize: 320,        // Diturunkan agar lebih cepat (320 sudah cukup)
    scoreThreshold: 0.3,
    jumlahFrame: 5,        // Cuma 5 frame
    jedaFrameMs: 50,       // Jeda sangat singkat (50ms)
    resolusiKamera: { width: 640, height: 480 }
  };
  
  let video, overlay, statusEl;
  let modelSiap = false;
  let kameraAktif = false;
  let sedangScan = false;
  let loopDeteksiId = null;
  let hasilTerakhir = null;
  let emosiFinal = null;
  
  // ============================================================
  // INISIALISASI
  // ============================================================
  window.addEventListener('DOMContentLoaded', async () => {
    video    = document.getElementById('video');
    overlay  = document.getElementById('overlay');
    statusEl = document.getElementById('status');
  
    const nama = sessionStorage.getItem('namaSesi') || 'Siswa';
    document.getElementById('nama-sesi').textContent = `Halo, ${nama} 👋`;
  
    // Event tombol
    document.getElementById('btn-scan').addEventListener('click', scanWajah);
    document.getElementById('btn-lewati').addEventListener('click', () => tampilkanPanelManual('lewati'));
    document.getElementById('btn-sesuai').addEventListener('click', konfirmasiSesuai);
    document.getElementById('btn-ganti').addEventListener('click', () => tampilkanPanelManual('ganti'));
    document.getElementById('btn-batal-manual').addEventListener('click', batalManual);
    document.getElementById('btn-selesai').addEventListener('click', tampilkanSelesai);
    document.getElementById('btn-ulang').addEventListener('click', ulangCheckin);
    document.getElementById('btn-pulang').addEventListener('click', () => {
      hentikanKamera();
      window.location.href = 'index.html';
    });
  
    // Jalankan muat model, lalu auto-start kamera
    await muatModel();
    if (modelSiap) {
      aktifkanKamera();
    }
  });
  
  // ============================================================
  // MUAT MODEL
  // ============================================================
  async function muatModel() {
    try {
      setStatus('Menyiapkan deteksi…');
      if (typeof faceapi === 'undefined') {
        setStatus('❌ Library gagal dimuat. Cek koneksi internet.');
        return;
      }
      await faceapi.nets.tinyFaceDetector.loadFromUri('models');
      await faceapi.nets.faceExpressionNet.loadFromUri('models');
      modelSiap = true;
      setStatus('Model siap.');
    } catch (err) {
      console.error(err);
      setStatus('❌ Gagal memuat model. Pastikan folder models/ lengkap.');
    }
  }
  
  // ============================================================
  // KAMERA AUTO-START
  // ============================================================
  async function aktifkanKamera() {
    if (!modelSiap) return;
    try {
      setStatus('Meminta izin kamera…');
      document.getElementById('placeholder-teks').textContent = 'Meminta izin…';
  
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width:  { ideal: KONFIG.resolusiKamera.width },
          height: { ideal: KONFIG.resolusiKamera.height }
        },
        audio: false
      });
      video.srcObject = stream;
      kameraAktif = true;
  
      document.getElementById('placeholder').style.display = 'none';
      document.getElementById('btn-scan').disabled = false;
      setStatus('Kamera aktif. Silakan scan!', true);
  
      video.addEventListener('loadedmetadata', () => {
        sesuaikanCanvas();
        mulaiLoopDeteksi();
      });
    } catch (err) {
      console.error(err);
      setStatus('❌ Kamera tidak bisa diakses. Pastikan izin browser aktif.');
      document.getElementById('placeholder-teks').textContent = 'Kamera diblokir';
    }
  }
  
  function sesuaikanCanvas() {
    overlay.width  = video.videoWidth;
    overlay.height = video.videoHeight;
  }
  
  async function mulaiLoopDeteksi() {
    if (loopDeteksiId) return;
    const langkah = async () => {
      if (!kameraAktif) return;
      try {
        const deteksi = await faceapi.detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: KONFIG.inputSize,
            scoreThreshold: KONFIG.scoreThreshold
          })
        );
        const ctx = overlay.getContext('2d');
        ctx.clearRect(0, 0, overlay.width, overlay.height);
        if (deteksi) gambarKotak(deteksi.box);
      } catch (e) { /* diamkan */ }
      loopDeteksiId = requestAnimationFrame(langkah);
    };
    loopDeteksiId = requestAnimationFrame(langkah);
  }
  
  function hentikanLoopDeteksi() {
    if (loopDeteksiId) { cancelAnimationFrame(loopDeteksiId); loopDeteksiId = null; }
    if (overlay) {
      const ctx = overlay.getContext('2d');
      ctx.clearRect(0, 0, overlay.width, overlay.height);
    }
  }
  
  function gambarKotak(box) {
    const ctx = overlay.getContext('2d');
    const skalaX = overlay.width  / video.videoWidth;
    const skalaY = overlay.height / video.videoHeight;
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.strokeRect(box.x * skalaX, box.y * skalaY, box.width * skalaX, box.height * skalaY);
  }
  
  // ============================================================
  // SCAN WAJAH CEPAT (5 frame x 50ms)
  // ============================================================
  async function scanWajah() {
    if (!kameraAktif || sedangScan) return;
    sedangScan = true;
    
    const btnScan = document.getElementById('btn-scan');
    btnScan.disabled = true;
    btnScan.textContent = 'Memproses…';
  
    try {
      const kumpulan = [];
      for (let i = 0; i < KONFIG.jumlahFrame; i++) {
        const deteksi = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({
            inputSize: KONFIG.inputSize,
            scoreThreshold: KONFIG.scoreThreshold
          }))
          .withFaceExpressions();
        if (deteksi) {
          kumpulan.push(deteksi.expressions);
          if (i === 0) gambarKotak(deteksi.detection.box);
        }
        await new Promise(r => setTimeout(r, KONFIG.jedaFrameMs));
      }
  
      if (kumpulan.length === 0) {
        setStatus('❌ Wajah tidak terdeteksi. Dekatkan wajah & pastikan cahaya cukup.');
        btnScan.textContent = '⚡ Scan Wajah Sekarang';
        btnScan.disabled = false;
        sedangScan = false;
        return;
      }
  
      // Rata-rata hasil frame
      const rata = {};
      Object.keys(kumpulan[0]).forEach(k => {
        rata[k] = kumpulan.reduce((sum, e) => sum + e[k], 0) / kumpulan.length;
      });
  
      const daftar = Object.entries(rata)
        .map(([kunci, nilai]) => ({ kunci, nilai, persen: Math.round(nilai * 100) }))
        .sort((a, b) => b.nilai - a.nilai);
  
      const dominan = daftar[0];
      hasilTerakhir = { emosi: dominan.kunci, persen: dominan.persen, semua: daftar };
  
      tampilkanHasil(dominan.kunci, dominan.persen, daftar);
      setStatus('Selesai. Konfirmasi hasil di bawah.', true);
  
    } catch (err) {
      console.error(err);
      setStatus('❌ Terjadi kesalahan saat mendeteksi.');
      btnScan.textContent = '⚡ Scan Wajah Sekarang';
      btnScan.disabled = false;
      sedangScan = false;
    }
  }
  
  // ============================================================
  // TAMPILKAN HASIL
  // ============================================================
  function tampilkanHasil(kunci, persen, daftar) {
    const info = LABEL_EMOSI[kunci] || { nama: kunci, emoji: '🙂', kunci: 'netral' };
  
    document.getElementById('emoji').textContent = info.emoji;
    document.getElementById('label').textContent = info.nama;
    document.getElementById('persen').textContent = `${persen}%`;
  
    const barList = document.getElementById('bar-list');
    barList.innerHTML = '';
    daftar.forEach(item => {
      if (item.persen < 1) return;
      const infoItem = LABEL_EMOSI[item.kunci] || { nama: item.kunci, kunci: 'netral' };
      const div = document.createElement('div');
      div.className = 'bar-item';
      div.innerHTML = `
        <div class="bar-label">
          <span>${infoItem.nama}</span>
          <span>${item.persen}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill fill-${infoItem.kunci}" style="width:${item.persen}%"></div>
        </div>
      `;
      barList.appendChild(div);
    });
  
    document.getElementById('hasil').classList.add('tampil');
    document.getElementById('konfirmasi').style.display = 'block';
    
    // Reset tombol scan
    const btnScan = document.getElementById('btn-scan');
    btnScan.textContent = '⚡ Scan Ulang Wajah';
    btnScan.disabled = false;
    sedangScan = false;
  }
  
  // ============================================================
  // KONFIRMASI MANUAL
  // ============================================================
  function konfirmasiSesuai() {
    if (!hasilTerakhir) return;
    const info = LABEL_EMOSI[hasilTerakhir.emosi] || { nama: hasilTerakhir.emosi, emoji: '🙂', kunci: 'netral' };
    emosiFinal = {
      kunci: info.kunci,
      nama: info.nama,
      emoji: info.emoji,
      sumber: 'kamera'
    };
    tampilkanTips();
  }
  
  // ============================================================
  // PANEL PILIH MANUAL
  // ============================================================
  function tampilkanPanelManual(mode) {
    document.getElementById('panel-scan').style.display = 'none';
    document.getElementById('panel-manual').style.display = 'block';
    document.getElementById('panel-tips').style.display = 'none';
    document.getElementById('panel-selesai').style.display = 'none';
  
    document.getElementById('btn-batal-manual').dataset.mode = mode;
  
    const grid = document.getElementById('grid-emosi');
    grid.innerHTML = '';
    EMOSI_MANUAL.forEach(e => {
      const kartu = document.createElement('div');
      kartu.className = 'kartu-emosi';
      kartu.innerHTML = `<span class="emoji">${e.emoji}</span><span class="nama">${e.nama}</span>`;
      kartu.addEventListener('click', () => pilihManual(e));
      grid.appendChild(kartu);
    });
  }
  
  function pilihManual(e) {
    emosiFinal = { kunci: e.kunci, nama: e.nama, emoji: e.emoji, sumber: 'manual' };
    tampilkanTips();
  }
  
  function batalManual() {
    document.getElementById('panel-manual').style.display = 'none';
    document.getElementById('panel-scan').style.display = 'block';
  }
  
  // ============================================================
  // TIPS & TEKNIK STOP (PSE: Self-Management)
  // ============================================================
  function tampilkanTips() {
    if (!emosiFinal) return;
  
    document.getElementById('panel-scan').style.display = 'none';
    document.getElementById('panel-manual').style.display = 'none';
    document.getElementById('panel-tips').style.display = 'block';
  
    const data = TIPS[emosiFinal.kunci] || TIPS['netral'];
  
    document.getElementById('tips-emoji').textContent = emosiFinal.emoji;
    document.getElementById('tips-judul').textContent = data.judul;
    document.getElementById('tips-sub').textContent = data.sub;
  
    const box = document.getElementById('tips-box');
    box.innerHTML = '';
    data.tips.forEach((t, i) => {
      const li = document.createElement('div');
      li.className = 'tip-item';
      li.innerHTML = `<span class="tip-num">${i + 1}</span><span>${t}</span>`;
      box.appendChild(li);
    });
  
    document.getElementById('pesan-cerita').textContent = '';
    document.querySelectorAll('[data-cerita]').forEach(btn => {
      btn.classList.remove('dipilih');
      btn.onclick = () => pilihCerita(btn.dataset.cerita, btn);
    });
  }
  
  function pilihCerita(target, btn) {
    document.querySelectorAll('[data-cerita]').forEach(b => b.classList.remove('dipilih'));
    btn.classList.add('dipilih');
  
    const pesan = {
      guru:      '💬 Baik. Kamu bisa mendekati guru saat jam istirahat atau setelah kelas. Guru akan mendengarkanmu.',
      teman:     '💬 Baik. Coba ajak teman sebangkumu bicara pelan-pelan saat waktu luang.',
      ortu:      '💬 Baik. Kamu bisa cerita ke orang tua saat di rumah nanti.',
      sendiri:   '💬 Tidak apa-apa. Kadang kita butuh waktu sendiri. Tulis di buku jika ingin.'
    };
    document.getElementById('pesan-cerita').textContent = pesan[target] || '';
  }
  
  // ============================================================
  // SELESAI & HAPUS DATA
  // ============================================================
  function tampilkanSelesai() {
    hentikanKamera();
    hasilTerakhir = null;
    emosiFinal = null;
  
    document.getElementById('panel-scan').style.display = 'none';
    document.getElementById('panel-manual').style.display = 'none';
    document.getElementById('panel-tips').style.display = 'none';
    document.getElementById('panel-selesai').style.display = 'block';
  }
  
  function ulangCheckin() {
    window.location.reload();
  }
  
  // ============================================================
  // HELPER
  // ============================================================
  function setStatus(teks, aktif = false) {
    statusEl.textContent = teks;
    statusEl.classList.toggle('aktif', aktif);
  }
  
  function hentikanKamera() {
    hentikanLoopDeteksi();
    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach(t => t.stop());
      video.srcObject = null;
      kameraAktif = false;
    }
  }
  
  window.addEventListener('beforeunload', hentikanKamera);