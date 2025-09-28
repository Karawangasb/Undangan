// --- 1. Konfigurasi Undangan ---
const TARGET_DATE = new Date("November 30, 2025 08:00:00").getTime(); // Sesuaikan Tanggal & Waktu Akad
const COVER_PAGE = document.getElementById('cover-page');
const MAIN_CONTENT = document.getElementById('main-content');
const OPEN_BTN = document.getElementById('open-invitation-btn');
const GUEST_NAME_ELEMENT = document.getElementById('guest-name');
let countdownInterval;

// --- 2. Fungsi Mengambil Nama Tamu dari URL ---
function getGuestName() {
    // Fungsi untuk mendapatkan parameter 'to' dari URL
    const urlParams = new URLSearchParams(window.location.search);
    let guest = urlParams.get('to');

    if (guest) {
        // Mengganti tanda '+' dengan spasi dan membersihkan string
        guest = decodeURIComponent(guest.replace(/\+/g, ' '));
    }

    // Jika nama tamu ditemukan, tampilkan; jika tidak, gunakan placeholder
    GUEST_NAME_ELEMENT.textContent = guest || "Tamu Undangan";
}

// --- 3. Fungsi Hitung Mundur (Countdown Timer) ---
function startCountdown() {
    countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = TARGET_DATE - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Memformat angka agar selalu dua digit
        const formatTime = (time) => String(time).padStart(2, '0');

        // Memperbarui elemen HTML
        document.getElementById("days").textContent = formatTime(days);
        document.getElementById("hours").textContent = formatTime(hours);
        document.getElementById("minutes").textContent = formatTime(minutes);
        document.getElementById("seconds").textContent = formatTime(seconds);

        // Jika waktu sudah habis
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown-timer").innerHTML = "<h2>Acara Bahagia Sedang Berlangsung</h2>";
        }
    }, 1000);
}

// --- 4. Fungsi Membuka Undangan ---
function openInvitation() {
    // Sembunyikan cover page
    COVER_PAGE.style.display = 'none';
    
    // Tampilkan konten utama
    MAIN_CONTENT.classList.remove('hidden');

    // Tambahkan efek scroll halus ke atas konten utama
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Mulai hitung mundur
    startCountdown();
    
    // Opsional: Jika Anda punya musik, mulai putar di sini
    // const audio = document.getElementById('music');
    // audio.play();
}

// --- 5. Fungsi Penanganan RSVP (Simulasi) ---
function handleRSVPSubmit(event) {
    event.preventDefault(); // Mencegah form reload halaman

    const name = document.getElementById('rsvp-name').value;
    const status = document.getElementById('rsvp-status').value;
    const message = document.getElementById('rsvp-message').value;
    const statusText = document.getElementById('rsvp-message-status');

    if (status === "") {
        statusText.textContent = "Mohon pilih status kehadiran Anda.";
        statusText.style.color = "red";
        return;
    }

    // --- SIMULASI PENGIRIMAN DATA ---
    
    // Dalam proyek nyata, data di sini akan dikirim ke server/backend 
    // (misalnya menggunakan fetch() API ke API endpoint atau Google Sheets)
    
    console.log("RSVP Submitted:");
    console.log(`Nama: ${name}`);
    console.log(`Kehadiran: ${status}`);
    console.log(`Ucapan: ${message}`);
    
    // Pesan sukses (tampilan ke user)
    statusText.textContent = `Terima kasih, ${name}! Konfirmasi kehadiran Anda telah dicatat. Semoga doa terbaik untuk Ahmad & Siti.`;
    statusText.style.color = "green";

    // Bersihkan form
    document.getElementById('rsvp-form').reset();
}

// --- 6. Inisialisasi Aplikasi (DOM Loaded) ---
document.addEventListener('DOMContentLoaded', (event) => {
    // Ambil dan tampilkan nama tamu saat halaman dimuat
    getGuestName();

    // Tambahkan event listener untuk tombol Buka Undangan
    OPEN_BTN.addEventListener('click', openInvitation);
    
    // Tambahkan event listener untuk form RSVP
    document.getElementById('rsvp-form').addEventListener('submit', handleRSVPSubmit);
    
    // Pastikan konten utama tersembunyi saat pertama kali loading (jika CSS gagal)
    MAIN_CONTENT.classList.add('hidden');
});

