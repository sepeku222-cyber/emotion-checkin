// ============================================================
// LOGIKA HALAMAN PILIH NAMA (index.html)
// ============================================================

let siswaTerpilih = null;

function renderDaftarSiswa() {
  const grid = document.getElementById('grid-siswa');
  grid.innerHTML = '';

  DAFTAR_SISWA.forEach((nama) => {
    const kartu = document.createElement('div');
    kartu.className = 'kartu-siswa';
    kartu.textContent = nama;
    kartu.dataset.nama = nama;
    kartu.addEventListener('click', () => pilihSiswa(kartu, nama));
    grid.appendChild(kartu);
  });
}

function pilihSiswa(kartu, nama) {
  document.querySelectorAll('.kartu-siswa').forEach(k => {
    k.classList.remove('terpilih');
  });

  kartu.classList.add('terpilih');
  siswaTerpilih = nama;

  const btn = document.getElementById('btn-lanjut');
  btn.disabled = false;
  btn.textContent = `Lanjut Scan Wajah — ${nama}`;
}

function lanjutScan() {
  if (!siswaTerpilih) return;

  // Hanya menyimpan NAMA ke sessionStorage, bukan emosi.
  // sessionStorage otomatis hilang saat tab ditutup.
  sessionStorage.setItem('namaSesi', siswaTerpilih);

  window.location.href = 'checkin.html';
}

document.addEventListener('DOMContentLoaded', () => {
  renderDaftarSiswa();
  document.getElementById('btn-lanjut').addEventListener('click', lanjutScan);
});