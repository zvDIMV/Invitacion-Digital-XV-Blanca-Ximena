// --- 1. Configuración del Temporizador ---
const fechaEvento = new Date("Jan 23, 2027 18:00:00").getTime();

function actualizarTemporizador() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    if (distancia < 0) return;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    const timers = [document.getElementById('temporizador1'), document.getElementById('temporizador2')];
    timers.forEach(timer => {
        if(timer) {
            timer.querySelector('.dias').innerText = dias < 10 ? "0" + dias : dias;
            timer.querySelector('.horas').innerText = horas < 10 ? "0" + horas : horas;
            timer.querySelector('.minutos').innerText = minutos < 10 ? "0" + minutos : minutos;
            timer.querySelector('.segundos').innerText = segundos < 10 ? "0" + segundos : segundos;
        }
    });
}
setInterval(actualizarTemporizador, 1000);
actualizarTemporizador();

// --- 2. Animaciones al hacer Scroll ---
const elementosAnimar = document.querySelectorAll('.animar');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });
elementosAnimar.forEach(el => observer.observe(el));

// --- 3. Autoplay de la Música ---
const musica = document.getElementById("musicaFondo");
let reproduciendo = false;

// Intenta reproducir la música con el primer clic del usuario en cualquier parte de la pantalla
document.body.addEventListener('click', () => {
    if (!reproduciendo && musica && musica.paused) {
        musica.play().then(() => {
            reproduciendo = true;
        }).catch(e => console.log("El navegador requiere interacción manual para el audio."));
    }
}, { once: true });


// --- 4. Enviar datos a WhatsApp ---
document.querySelector('.formulario-rsvp')?.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const numeroWhatsApp = "5631062961"; 
    const nombre = document.getElementById('nombreRsvp').value;
    const mensaje = document.getElementById('mensajeRsvp').value;
    const asiste = document.getElementById('asistenciaToggle').checked ? 'SÍ asistiré' : 'NO podré asistir';
    
    let textoEnvio = `¡Hola! Soy *${nombre}*.%0AQuiero confirmar que *${asiste}* a los XV años de Blanca Ximena.`;
    
    if (mensaje.trim() !== "") {
        textoEnvio += `%0A%0ATe dejo este mensaje:%0A_${mensaje}_`;
    }

    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${textoEnvio}`;
    window.open(urlWhatsApp, '_blank');
});
