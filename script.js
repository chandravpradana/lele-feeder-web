const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby0XHgI23zR088aGty8HKJ2mwzNGRtrcoNqnh-Y2GJoKQVafAv2VdAMaPP2HeT9dcrQ/exec';
const TELEGRAM_BOT_TOKEN = '8190460652:AAHu2L_0O_jzTJmxBo4mkQTSERPZYAmghjI';
const TELEGRAM_CHAT_ID = '-2637747100/29';

document.getElementById('feedForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const form = new FormData(this);
  const data = {
    kolam: form.get('kolam'),
    jenis_pakan: form.get('jenis_pakan'),
    jumlah: form.get('jumlah'),
    catatan: form.get('catatan'),
    pelaksana: form.get('pelaksana')
  };

  try {
    // Kirim ke Google Sheets
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    // Kirim ke Telegram
    const message = `📥 *Data Pemberian Pakan*\n\n🕒 ${new Date().toLocaleString()}\n🐟 Kolam: ${data.kolam}\n🍽️ Jenis Pakan: ${data.jenis_pakan}\n⚖️ Jumlah: ${data.jumlah} gram\n🧑 Pelaksana: ${data.pelaksana}\n📝 Catatan: ${data.catatan || '-'}`;
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });

    alert('Data berhasil dikirim!');
    this.reset();
  } catch (err) {
    alert('Gagal mengirim data. Periksa koneksi atau konfigurasi.');
    console.error(err);
  }
});
