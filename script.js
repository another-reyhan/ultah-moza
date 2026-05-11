document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 0. Autoplay Background Music
    // ==========================================
    const bgMusic = document.getElementById('bg-music');
    
    const playMusic = () => {
        bgMusic.volume = 0.3; // Volume musik latar
        bgMusic.play().catch(err => {
            console.log("Autoplay diblokir browser. Menunggu interaksi klik pertama...");
        });
    };

    // Coba putar langsung
    playMusic();

    // Tunggu klik pertama di mana saja jika browser memblokir autoplay
    document.body.addEventListener('click', () => {
        if(bgMusic.paused) playMusic();
    }, { once: true });
    document.body.addEventListener('touchstart', () => {
        if(bgMusic.paused) playMusic();
    }, { once: true });

    // ==========================================
    // 1. Custom Cursor & Trail
    // ==========================================
    const cursor = document.getElementById('custom-cursor');
    const trailContainer = document.getElementById('cursor-trail-container');

    document.addEventListener('mousemove', (e) => {
        // Move the main cursor
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Add hover effect when hovering over buttons or inputs
        const target = e.target;
        if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'input' || target.closest('.polaroid')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }

        // Create trail randomly to not overflow DOM
        if (Math.random() > 0.8) {
            const trail = document.createElement('i');
            trail.className = 'fa-solid fa-paw paw-trail';
            // Slight offset for messy trail effect
            trail.style.left = (e.clientX + (Math.random() * 15 - 7.5)) + 'px';
            trail.style.top = (e.clientY + (Math.random() * 15 - 7.5)) + 'px';

            // Random rotation
            trail.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;

            trailContainer.appendChild(trail);

            // Remove after animation (1s)
            setTimeout(() => { trail.remove(); }, 1000);
        }
    });

    // ==========================================
    // 2. Floating Background Elements
    // ==========================================
    const bgContainer = document.getElementById('floating-bg');
    const emojis = ['🐾', '💖', '✨', '🐱', '🌸', '🎈', '🧶', '🐟'];

    for (let i = 0; i < 25; i++) {
        const item = document.createElement('div');
        item.className = 'floating-item';
        item.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.animationDuration = (Math.random() * 15 + 15) + 's';
        item.style.animationDelay = (Math.random() * 10) + 's';
        item.style.fontSize = (Math.random() * 25 + 15) + 'px';
        bgContainer.appendChild(item);
    }

    // ==========================================
    // 3. Pre-loader (1 to 20 fast count)
    // ==========================================
    let count = 1;
    const loaderNum = document.getElementById('loader-number');
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');

    const interval = setInterval(() => {
        count++;
        loaderNum.innerText = count;
        if (count >= 20) {
            clearInterval(interval);
            loaderNum.classList.add('explode-num'); // CSS animation scale up

            // Trigger Cat Confetti
            const end = Date.now() + 1.5 * 1000;
            const colors = ['#ff69b4', '#ffb6c1', '#ffffff', '#dda0dd'];
            // Menggunakan library canvas-confetti dengan custom emoji
            const catShape = confetti.shapeFromText({ text: '🐱', scalar: 3 });
            const heartShape = confetti.shapeFromText({ text: '💖', scalar: 2 });

            (function frame() {
                confetti({
                    particleCount: 8,
                    angle: 60,
                    spread: 70,
                    origin: { x: 0 },
                    colors: colors,
                    shapes: [catShape, heartShape]
                });
                confetti({
                    particleCount: 8,
                    angle: 120,
                    spread: 70,
                    origin: { x: 1 },
                    colors: colors,
                    shapes: [catShape, heartShape]
                });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());

            // Transition to Main Content
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    startTypeWriter();
                }, 800); // Wait for CSS fade out
            }, 1000); // Wait for explode effect
        }
    }, 80); // Speed of count

    // ==========================================
    // 4. Hero Section - Typewriter Effect
    // ==========================================
    const textToType = "Selamat Ulang Tahun ke-20, Kesayanganku! 💖";
    const typewriterElement = document.getElementById('typewriter-text');
    let typeIndex = 0;

    function startTypeWriter() {
        if (typeIndex < textToType.length) {
            typewriterElement.innerHTML += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(startTypeWriter, 80); // Typing speed
        }
    }

    // ==========================================
    // 5. Hero Section - Evasive Button
    // ==========================================
    const evasiveBtn = document.getElementById('evasive-btn');
    let hoverCount = 0;

    evasiveBtn.addEventListener('mouseover', () => {
        if (hoverCount < 3) {
            // Calculate random safe position within viewport bounds
            const maxX = window.innerWidth - evasiveBtn.offsetWidth - 50;
            const maxY = window.innerHeight - evasiveBtn.offsetHeight - 50;

            // Random translation (relative to its original position)
            // Just simple random X Y translation
            const randomX = (Math.random() - 0.5) * 300; // -150 to 150
            const randomY = (Math.random() - 0.5) * 300;

            evasiveBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
            hoverCount++;
        }
    });

    evasiveBtn.addEventListener('click', () => {
        // Reset transform just in case
        evasiveBtn.style.transform = `translate(0, 0)`;
        document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
    });

    // ==========================================
    // 6. Memory Gallery - Stacked Polaroids
    // ==========================================
    const stack = document.getElementById('polaroid-stack');
    // Menggunakan placeholder gambar/video
    const items = [
        { type: 'image', src: 'assets/poto1.jpeg' },
        { type: 'image', src: 'assets/poto2.jpeg' },
        { type: 'image', src: 'assets/poto3.jpeg' },
        { type: 'video', src: 'assets/video1.mp4' } // Placeholder video
    ];

    // Reverse array so first item is on top
    items.reverse().forEach((item, index) => {
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        // Random slight rotation for messy look (-10deg to 10deg)
        const rot = Math.random() * 20 - 10;
        polaroid.dataset.rot = rot; // Simpan base rotation
        polaroid.style.transform = `rotate(${rot}deg)`;
        polaroid.style.zIndex = index;

        let mediaEl;
        if (item.type === 'video') {
            mediaEl = document.createElement('video');
            mediaEl.src = item.src;
            mediaEl.autoplay = true;
            mediaEl.loop = true;
            mediaEl.muted = true;
            mediaEl.style.width = '100%';
            mediaEl.style.height = '100%';
            mediaEl.style.objectFit = 'cover';
            mediaEl.style.borderRadius = '4px';
        } else {
            mediaEl = document.createElement('img');
            mediaEl.src = item.src;
            mediaEl.draggable = false; // Prevent default image drag
        }

        polaroid.appendChild(mediaEl);
        stack.appendChild(polaroid);

        // 3D Tilt effect on Hover
        polaroid.addEventListener('mousemove', (e) => {
            if (polaroid !== stack.lastChild) return; // Only apply to top card
            const rect = polaroid.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Adjust sensitivity here (divide by larger number for less tilt)
            polaroid.style.transform = `rotate(${rot}deg) rotateY(${x / 15}deg) rotateX(${-y / 15}deg) scale(1.05)`;
        });

        polaroid.addEventListener('mouseleave', () => {
            polaroid.style.transform = `rotate(${rot}deg) scale(1)`;
        });

        // Swipe / Throw effect (Mouse & Touch)
        let isDragging = false;
        let startX = 0;

        const startDrag = (clientX) => {
            if (polaroid !== stack.lastChild) return;
            isDragging = true;
            startX = clientX;
            polaroid.style.transition = 'none'; // Disable transition for instant drag
        };

        const onDrag = (clientX) => {
            if (!isDragging) return;
            const diff = clientX - startX;
            polaroid.style.transform = `rotate(${rot}deg) translateX(${diff}px)`;
        };

        const endDrag = (clientX) => {
            if (!isDragging) return;
            isDragging = false;
            polaroid.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s';

            const diff = clientX - startX;
            // Jika digeser cukup jauh (lebih dari 80px) atau diklik saja (diff < 5)
            if (Math.abs(diff) > 80 || Math.abs(diff) < 5) {
                polaroid.classList.add('swiped');
                // Remove from DOM after animation
                setTimeout(() => {
                    if (stack.contains(polaroid)) {
                        stack.removeChild(polaroid);
                    }
                    // Jika habis, kembalikan semua
                    if (stack.children.length === 0) {
                        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
            } else {
                // Snap back
                polaroid.style.transform = `rotate(${rot}deg) scale(1)`;
            }
        };

        // Mouse Events
        polaroid.addEventListener('mousedown', (e) => startDrag(e.clientX));
        document.addEventListener('mousemove', (e) => onDrag(e.clientX));
        document.addEventListener('mouseup', (e) => endDrag(e.clientX));

        // Touch Events (Mobile)
        polaroid.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
        document.addEventListener('touchmove', (e) => onDrag(e.touches[0].clientX));
        document.addEventListener('touchend', (e) => endDrag(e.changedTouches[0].clientX));
    });

    // ==========================================
    // 7. Quiz Logic (Gatekeeper)
    // ==========================================
    const submitBtn = document.getElementById('submit-quiz');
    const inputs = document.querySelectorAll('.quiz-input');

    // Tentukan jawaban benar di sini (gunakan huruf kecil semua agar lebih aman)
    const correctAnswers = [
        'muhammad reyhan armadani',          // Jawaban pertanyaan 1
        'kamu',    // Jawaban pertanyaan 2
        'yes'           // Jawaban pertanyaan 3
    ];

    submitBtn.addEventListener('click', () => {
        let allCorrect = true;

        inputs.forEach((input, index) => {
            const val = input.value.trim().toLowerCase(); // Ambil input, buang spasi, jadikan huruf kecil
            
            if (val !== correctAnswers[index]) {
                input.classList.remove('shake');
                void input.offsetWidth; // Trigger reflow untuk restart animasi shake
                input.classList.add('shake');
                input.style.borderColor = '#ff4757'; // Merah jika salah
                allCorrect = false;
            } else {
                input.style.borderColor = '#4cd137'; // Hijau jika benar
                input.classList.remove('shake');
            }
        });

        if (allCorrect) {
            document.getElementById('quiz-success').classList.remove('hidden');
            submitBtn.style.display = 'none';
            inputs.forEach(input => input.disabled = true);
            
            // Tambahan: scroll otomatis ke tombol "Buka Surat"
            setTimeout(() => {
                document.getElementById('quiz-success').scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    });

    // ==========================================
    // 8. Open Love Letter
    // ==========================================
    const openLetterBtn = document.getElementById('open-letter-btn');
    const loveLetterSection = document.getElementById('love-letter');
    const playVnBtn = document.getElementById('play-vn-btn');
    const voiceNote = document.getElementById('voice-note');

    openLetterBtn.addEventListener('click', () => {
        loveLetterSection.classList.remove('hidden');
        
        // Small delay to allow display:block to apply before changing opacity
        setTimeout(() => {
            loveLetterSection.classList.add('visible');
            loveLetterSection.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    });

    playVnBtn.addEventListener('click', () => {
        // Duck bg music (kecilkan volume)
        bgMusic.volume = 0.05;
        playVnBtn.innerHTML = "Sedang Memutar... 🎧";
        playVnBtn.disabled = true;

        voiceNote.play();

        voiceNote.onended = () => {
            // Restore bg music volume
            bgMusic.volume = 0.3;
            playVnBtn.innerHTML = "Dengarkan Pesan Suara 🎧";
            playVnBtn.disabled = false;
        };
    });

    // ==========================================
    // 9. Hug Button (Cat Storm)
    // ==========================================
    const hugBtn = document.getElementById('hug-btn');

    const hugModal = document.getElementById('hug-modal');

    hugBtn.addEventListener('click', () => {
        // 1. Tampilkan layar transparan & GIF pelukan
        hugModal.style.display = 'flex';

        // Animasi pelan-pelan muncul (fade-in)
        setTimeout(() => {
            hugModal.style.opacity = '1';
        }, 10);

        // 2. Ubah teks tombol (mengambil ide dari kodemu sebelumnya biar tetap keren)
        hugBtn.innerHTML = "Dipeluk Kucing! 😻💞";
        hugBtn.disabled = true;

        // 3. Hilangkan GIF otomatis setelah 4 detik
        setTimeout(() => {
            hugModal.style.opacity = '0'; // fade-out
            setTimeout(() => {
                hugModal.style.display = 'none'; // sembunyikan sepenuhnya

                // Kembalikan tombol seperti semula biar bisa diklik lagi
                hugBtn.disabled = false;
                hugBtn.innerHTML = "Klik untuk Pelukan 😻";
            }, 500);
        }, 4000);
    });

    // ==========================================
    // 10. Timeline & Navbar Logic
    // ==========================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => timelineObserver.observe(item));
});
