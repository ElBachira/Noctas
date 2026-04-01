document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. SISTEMA DE SONIDOS UI OPTIMIZADO ---
    const sfxHover = document.getElementById('sfx-hover');
    const sfxClick = document.getElementById('sfx-click');
    const sfxOpen = document.getElementById('sfx-open');

    const playSound = (audioEl) => {
        if(audioEl) {
            audioEl.currentTime = 0;
            audioEl.volume = 0.3; 
            audioEl.play().catch(() => {}); 
        }
    };

    // Delegación corregida para no interferir con los enlaces <a>
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('.ui-trigger');
        if (trigger) {
            playSound(sfxClick);
        }
    });

    document.querySelectorAll('.ui-trigger-hover').forEach(el => {
        el.addEventListener('mouseenter', () => playSound(sfxHover), { passive: true });
    });

    // --- 1. PANTALLA DE CARGA ---
    const loader = document.getElementById('loader');
    
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                playSound(sfxOpen);
            }, 800);
        }, 1500);
    }

    // --- 2. SISTEMA DE REPRODUCTOR DE MÚSICA ---
    const songs = [
        {
            title: "Perdón",
            artist: "Camila",
            src: "song.mp3", 
            lyrics: `Prometí quererte para siempre
Y era cierto, no había dudas en mi mente
Si el destino tuvo planes diferentes
Y te herí por accidente, perdón
Si me solté de ti
Si no te defendí
Fue que mi corazón estaba ciego
Qué estupidez perderte, para verlo
Lo siento
No espero amor ni odio
Ya tengo bastante con mi dolor
Maldigo el episodio
Lo peor es que yo fui quien lo escribió
Me esperan los demonios
Que deja tu olvido, que juegan conmigo
Ya sé que es cobarde pedirte en una canción
Perdón
Perdón
Si pudiera regresar el tiempo
Esta vez no escondería lo que siento
El silencio fue el engaño más violento
Mi terrible experimento falló
Si te alejé de mí
Si te fallé y me fui
Fue porque mis mentirás me daban miedo
Tú me creíste y yo me volví tan bueno
Fingiendo
No espero amor ni odio
Ya tengo bastante con mi dolor
Maldigo el episodio
Lo peor es que yo fui quien lo escribió
Me esperan los demonios
Que deja tu olvido, que juegan conmigo
Ya sé que es cobarde pedirte en una canción
Perdón
Perdón`,
        }
    ];

    let currentIdx = 0;
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-pause-btn');
    const playerContainer = document.querySelector('.music-player-container');
    
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');
    const lyricsEl = document.getElementById('lyrics-content');
    const meaningEl = document.getElementById('meaning-content');

    function loadSong(index) {
        if (!titleEl || !artistEl || !lyricsEl || !meaningEl) return;
        const s = songs[index];
        titleEl.innerText = s.title;
        artistEl.innerText = s.artist;
        if(audio) audio.src = s.src;
        lyricsEl.innerText = s.lyrics;
        meaningEl.innerText = s.meaning;
    }

    loadSong(currentIdx);

    if (playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    if(playerContainer) playerContainer.classList.add('playing');
                }).catch(e => console.log("Interacción requerida o error", e));
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                if(playerContainer) playerContainer.classList.remove('playing');
            }
        });
    }

    // --- 3. GALERÍA DE BOTS ---
    const maleGrid = document.getElementById('bots-masculinos');
    const femaleGrid = document.getElementById('bots-femeninos');
    const myName = "Archibald"; 

    if (maleGrid && femaleGrid) {
        if (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) {
            const fragMale = document.createDocumentFragment();
            const fragFemale = document.createDocumentFragment();

            BOTS_LIST.forEach(bot => {
                if (!bot.nombre.includes(myName)) {
                    const item = document.createElement('a');
                    item.href = bot.url || '#';
                    item.target = "_blank"; // Asegura que abra en nueva pestaña
                    item.className = 'bot-item ui-trigger'; 
                    item.style.animation = `fadeIn 0.5s ease forwards`; 
                    
                    item.innerHTML = `
                        <img src="${bot.imagen}" loading="lazy" alt="${bot.nombre}">
                        <span>${bot.nombre}</span>
                    `;

                    if (bot.genero === 'masculino') fragMale.appendChild(item);
                    else fragFemale.appendChild(item);
                }
            });
            maleGrid.appendChild(fragMale);
            femaleGrid.appendChild(fragFemale);
        } else {
            maleGrid.innerHTML = '<p style="color:#555; font-size:0.8rem;">Sin conexión...</p>';
        }
    }

    // --- 4. STICKER INTERACTIVO ---
    const sticker = document.getElementById('honk-sticker');
    const honkAudio = new Audio('https://www.myinstants.com/media/sounds/honk-sound.mp3'); 
    
    if (sticker) {
        sticker.addEventListener('click', () => {
            honkAudio.currentTime = 0;
            honkAudio.volume = 0.5;
            honkAudio.play().catch(() => {});
            
            sticker.style.transform = "scale(0.8) rotate(-20deg)";
            setTimeout(() => sticker.style.transform = "", 150);
        });
    }

    // --- 5. UTILIDADES UI (Tabs & Acordeones) ---
    window.openOverlay = (id) => {
        playSound(sfxOpen);
        const el = document.getElementById(id);
        if(el) requestAnimationFrame(() => el.classList.add('active'));
    };
    
    window.closeOverlay = (id) => {
        playSound(sfxClick);
        const el = document.getElementById(id);
        if(el) el.classList.remove('active');
    };

    window.toggleFold = (id) => {
        playSound(sfxClick);
        const el = document.getElementById(id);
        if (el) {
            document.querySelectorAll('.foldable').forEach(f => {
                if(f.id !== id) f.classList.remove('active');
            });
            requestAnimationFrame(() => {
                el.classList.toggle('active');
            });
        }
    };
});


