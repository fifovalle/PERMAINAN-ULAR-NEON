let kanvas, konteks;
window.onload = function () {
  kanvas = document.getElementById("kanvas");
  konteks = kanvas.getContext("2d");
  document.addEventListener("keydown", kontrolDenganKeyboardArahPanah);
  let x = 8;
  setInterval(gambar, 1000 / x);
};

// DUNIA PERMAINANNYA
let ukuranGrid = 20;
let ukuranTile = 20; // 20 x 20 = 400
let berikutnyaX = 0;
let berikutnyaY = 0;
// ULAR
let ukuranEkorDefault = 3;
let ukuranEkor = ukuranEkorDefault;
let jejakUlar = [];
let ularX = 10;
let ularY = 10;
// APEL
let apelX = 15;
let apelY = 15;

// GAMBAR
function gambar() {
  // GERAK ULAR KE POSISI BERIKUTNYA
  ularX += berikutnyaX;
  ularY += berikutnyaY;
  // ULAR KELUAR DUNIA GAME?
  ularX = ularX < 0 ? ukuranGrid - 1 : ularX >= ukuranGrid ? 0 : ularX;
  ularY = ularY < 0 ? ukuranGrid - 1 : ularY >= ukuranGrid ? 0 : ularY;
  // ULAR MEMAKAN APEL
  if (ularX === apelX && ularY === apelY) {
    ukuranEkor++;
    apelX = Math.floor(Math.random() * ukuranGrid);
    apelY = Math.floor(Math.random() * ukuranGrid);
  }
  // GAMBAR LATAR
  konteks.fillStyle = "#1C1D24";
  konteks.fillRect(0, 0, kanvas.width, kanvas.height);
  // GAMBAR ULAR
  // BUAT GRADASI
  let grd = konteks.createLinearGradient(0.0, 150.0, 300.0, 150.0);
  // TAMBAHKAN WARNA GRADASI
  grd.addColorStop(0, "#ff8906");
  grd.addColorStop(0.5, "#f25f4c");
  grd.addColorStop(1, "#e53170");
  konteks.fillStyle = grd;
  for (let i = 0; i < jejakUlar.length; i++) {
    konteks.fillRect(
      jejakUlar[i].x * ukuranTile,
      jejakUlar[i].y * ukuranTile,
      ukuranTile,
      ukuranTile
    );
    // ULAR MEMAKAN EKORNYA SENDIRI?
    ukuranEkor =
      jejakUlar[i].x === ularX && jejakUlar[i].y === ularY
        ? ukuranEkorDefault
        : ukuranEkor;
  }
  // GAMBAR APEL
  konteks.fillStyle = grd;
  konteks.fillRect(
    apelX * ukuranTile,
    apelY * ukuranTile,
    ukuranTile,
    ukuranTile
  );
  // ATUR JEJAK ULAR
  jejakUlar.push({ x: ularX, y: ularY });
  while (jejakUlar.length > ukuranEkor) {
    jejakUlar.shift();
  }
}

// MASUKAN DARI KEYBOARD
function kontrolDenganKeyboardArahPanah(e) {
  switch (e.keyCode) {
    case 37:
      berikutnyaX = -1;
      berikutnyaY = 0;
      break;
    case 38:
      berikutnyaX = 0;
      berikutnyaY = -1;
      break;
    case 39:
      berikutnyaX = 1;
      berikutnyaY = 0;
      break;
    case 40:
      berikutnyaX = 0;
      berikutnyaY = 1;
      break;
  }
}
