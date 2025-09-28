// --- 1. Konfigurasi Undangan & Variabel Global ---
const TARGET_DATE = new Date("November 30, 2025 08:00:00").getTime(); // Sesuaikan Tanggal & Waktu Akad
const COVER_PAGE = document.getElementById('cover-page');
const MAIN_CONTENT = document.getElementById('main-content');
const OPEN_BTN = document.getElementById('open-invitation-btn');
const GUEST_NAME_ELEMENT = document.getElementById('guest-name');

let countdownInterval;

// --- 2. Fungsi Mengambil Nama Tamu dari URL ---
function getGuestName() {
    // Mendapatkan parameter 'to' dari URL (Contoh: index.html?to=Bapak+Budi)
    const urlParams = new URLSearchParams(window.location.search);
    let guest = urlParams.get('to');

    if (guest) {
        // Mengganti tanda '+' dengan spasi dan membersihkan string
        guest = decodeURIComponent(guest.replace(/\+/g, ' '));
    }

    // Tampilkan nama tamu, default jika tidak ada parameter
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

// --- 4. Fungsi Kontrol Musik (Play/Pause) ---
function setupMusicToggle() {
    const audio = document.getElementById('background-music');
    const musicToggleBtn = document.getElementById('music-toggle');

    if (musicToggleBtn && audio) {
        // Tambahkan listener untuk tombol kontrol musik
        musicToggleBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                musicToggleBtn.textContent = '⏸️'; // Ikon Pause
            } else {
                audio.pause();
                musicToggleBtn.textContent = '▶️'; // Ikon Play
            }
        });
    }
}

// --- 5. Fungsi Membuka Undangan ---
function openInvitation() {
    const audio = document.getElementById('background-music');
    const musicToggleBtn = document.getElementById('music-toggle');

    // Sembunyikan cover page
    COVER_PAGE.style.display = 'none';
    
    // Tampilkan konten utama
    MAIN_CONTENT.classList.remove('hidden');

    // Mulai hitung mundur
    startCountdown();
    
    // Memutar Musik (Hanya akan diputar setelah interaksi user)
    if (audio) {
        audio.volume = 0.5; // Atur volume
        audio.play().catch(error => {
            console.log("Audio play prevented:", error);
        });
        
        // Tampilkan tombol kontrol musik
        if (musicToggleBtn) {
            musicToggleBtn.style.display = 'block';
            musicToggleBtn.textContent = audio.paused ? '▶️' : '⏸️';
        }
    }

    // Scroll halus ke bagian atas konten
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// --- 6. Fungsi Penanganan RSVP (Simulasi) ---
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
    // Di dunia nyata, Anda akan menggunakan fetch() atau AJAX untuk mengirim data ini ke server.
    
    console.log("RSVP Submitted:");
    console.log(`Nama: ${name}, Kehadiran: ${status}, Ucapan: ${message}`);
    
    // Pesan sukses (tampilan ke user)
    statusText.textContent = `Terima kasih, ${name}! Konfirmasi Anda telah dicatat.`;
    statusText.style.color = "green";

    // Bersihkan form
    document.getElementById('rsvp-form').reset();
}

// --- 7. Inisialisasi Aplikasi (DOM Loaded) ---
document.addEventListener('DOMContentLoaded', (event) => {
    // 1. Ambil dan tampilkan nama tamu saat halaman dimuat
    getGuestName();

    // 2. Setup event listener untuk tombol Buka Undangan
    OPEN_BTN.addEventListener('click', openInvitation);
    
    // 3. Setup event listener untuk form RSVP
    document.getElementById('rsvp-form').addEventListener('submit', handleRSVPSubmit);
    
    // 4. Setup tombol kontrol musik
    setupMusicToggle(); 
    
    // 5. Pastikan konten utama tersembunyi saat loading pertama
    MAIN_CONTENT.classList.add('hidden');
});
