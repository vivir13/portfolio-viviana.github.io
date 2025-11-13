let menuVisible = false

// === FUNCIÓN QUE OCULTA O MUESTRA EL MENÚ ===
function mostrarOcultarMenu() {
  const nav = document.getElementById('nav')
  nav.classList.toggle('active')
  menuVisible = nav.classList.contains('active')
}

function seleccionar() {
  const nav = document.getElementById('nav')
  nav.classList.remove('active')
  menuVisible = false
}

// === DETECTAR SCROLL ===
window.onscroll = function () {}

// ----------------------------------------------------
// ❗ MENÚ HAMBURGUESA ❗
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle')
  if (navToggle) {
    navToggle.addEventListener('click', mostrarOcultarMenu)
  }
})

// ----------------------------------------------------
// 💬 BOTÓN WHATSAPP CON EFECTO DE APARICIÓN SUAVE
// ----------------------------------------------------
const whatsappBtn = document.querySelector('.whatsapp-float')
let lastScrollY = window.scrollY

window.addEventListener('scroll', () => {
  // Si el scroll baja, ocultar botón
  if (window.scrollY > lastScrollY) {
    gsap.to(whatsappBtn, {
      y: 100,
      opacity: 0,
      duration: 10,
      ease: 'power2.out',
    })
  } else {
    // Si el scroll sube, mostrar botón
    gsap.to(whatsappBtn, {
      y: 0,
      opacity: 1,
      duration: 10,
      ease: 'power2.out',
    })
  }
  lastScrollY = window.scrollY
})

// ----------------------------------------------------
// ❗ ANIMACIONES CON GSAP ❗
// ----------------------------------------------------
gsap.registerPlugin(ScrollTrigger)

// === ANIMACIÓN INICIAL DEL HEADER ===
const headerTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

headerTimeline
  .from('.logo', { opacity: 0, y: -30, duration: 0.8 })
  .from('#nav ul li', { opacity: 0, y: -20, stagger: 0.1 }, '-=0.5')
  .from(
    '.acciones-header', // Ajustado a contenedor principal de acciones
    { opacity: 0, y: -20, duration: 0.6 },
    '-=0.5'
  )

// ====================================================
// === ANIMACIÓN DE LA SECCIÓN INICIO (HERO) ===
// ====================================================

const inicioTL = gsap.timeline({
  defaults: { ease: 'power2.out' },
  scrollTrigger: {
    trigger: '#inicio',
    start: 'top 80%',
    toggleActions: 'restart none none restart',
  },
})

inicioTL
  .from('#inicio h1', { opacity: 0, y: 40, duration: 1 })
  .from('#inicio h2', { opacity: 0, y: 30, duration: 0.8 }, '<0.2') // '<0.2' inicia 0.2s después del paso anterior
  .from('#inicio p', { opacity: 0, y: 20, duration: 0.8 }, '<0.3') // 🚀 ANIMACIÓN DE ÍCONOS DE REDES SOCIALES (CORREGIDA)
  .from(
    '.redes a',
    {
      opacity: 1,
      y: 20,
      scale: 0.8,
      stagger: 0.15,
      duration: 0.5,
      ease: 'back.out(1.5)',
    },
    '<0.3' // Comienza 0.3s después del párrafo
  ) // Animación de la Imagen

  .from('.contenedor-img img', { opacity: 0, scale: 0.9, duration: 1 }, '<0.5')

// ----------------------------------------------------
// 🌌 EFECTO PARALLAX EN LA IMAGEN DEL HERO (CORREGIDO)
// ----------------------------------------------------
gsap.to('.contenedor-img img', {
  yPercent: 10,
  ease: 'none',
  scrollTrigger: {
    trigger: '.inicio',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
})

// ----------------------------------------------------
// 🌌 EFECTO 3D EN IMAGEN DEL HERO (PC, TABLET Y MÓVIL)
// ----------------------------------------------------
const heroImg = document.querySelector('.contenedor-img img')

// --- FUNCIONES PARA EFECTO 3D CON SOMBRA ---
function apply3DEffect(x, y) {
  gsap.to(heroImg, {
    rotationY: x,
    rotationX: y,
    transformPerspective: 600,
    ease: 'power1.out',
    duration: 0.5, // Corregida la sintaxis de box-shadow para ser un string válido.
    boxShadow: `${x * -0.5}px ${
      y * 0.5
    }px 15px rgba(168, 23, 185, 0.9), 0 0 15px rgba(168, 23, 185, 0.9)`,
    scale: 1.05,
  })
}

function reset3DEffect() {
  gsap.to(heroImg, {
    rotationY: 0,
    rotationX: 0,
    scale: 1,
    boxShadow: '0 0 15px rgba(168, 23, 185, 0.9)', // Corregida la propiedad
    duration: 0.8,
    ease: 'power2.out',
  })
}

// --- EFECTO PARA PC (mouse) ---
document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.pageX) / 25
  const y = (window.innerHeight / 2 - e.pageY) / 25
  apply3DEffect(x, y)
})

document.addEventListener('mouseleave', reset3DEffect)

// --- EFECTO PARA TABLETS Y MÓVILES (táctil) ---
heroImg.addEventListener('touchmove', (e) => {
  const touch = e.touches[0]
  const x = (window.innerWidth / 2 - touch.pageX) / 25
  const y = (window.innerHeight / 2 - touch.pageY) / 25
  apply3DEffect(x, y)
})

heroImg.addEventListener('touchend', reset3DEffect)

// ----------------------------------------------------
// === ANIMACIONES AL HACER SCROLL ===
// ----------------------------------------------------

// -- PROYECTOS --
gsap.utils.toArray('.proyecto').forEach((proyecto) => {
  gsap.from(proyecto, {
    scrollTrigger: {
      trigger: proyecto,
      start: 'top 85%',
      toggleActions: 'restart none none restart',
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power2.out',
  })
})

// -- HABILIDADES --
gsap.utils.toArray('.tarjeta').forEach((tarjeta, i) => {
  gsap.from(tarjeta, {
    scrollTrigger: {
      trigger: tarjeta,
      start: 'top 80%',
      toggleActions: 'restart none none restart',
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    delay: i * 0.2,
    ease: 'power2.out',
  })
})

// 🚀 -- CONTACTO (Optimizado con un solo Timeline) -- 🚀
const contactoTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.contacto-inf',
    start: 'top 80%',
    toggleActions: 'restart none none restart',
  },
  defaults: {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  },
})

contactoTL
  .from('.contacto-inf h2', { y: 50 })
  .from('.contacto-inf p', { y: 30 }, '<0.5')
  .from(
    '.contacto-inf .red a',
    {
      scale: 0.8,
      stagger: 1,
      ease: 'back.out(1.7)',
    },
    '<0.9'
  )

// === FOOTER ===
gsap.from('.pie-pagina .pagina', {
  scrollTrigger: {
    trigger: '.pie-pagina',
    start: 'top 90%',
  },
  opacity: 0,
  y: 20,
  duration: 0.8,
})

// Corregido el selector para animar solo los iconos y no el texto del footer (si fuera el caso)
gsap.from('.pie-pagina .redes-footer i', {
  scrollTrigger: {
    trigger: '.pie-pagina',
    start: 'top 90%',
  },
  opacity: 0,
  scale: 0.8,
  stagger: 0.2,
  duration: 0.8,
  delay: 0.2,
})

// === FECHA AUTOMÁTICA EN FOOTER ===
document.getElementById('year').textContent = new Date().getFullYear()

// === EFECTO SUAVE EN LOS BOTONES ===
const botones = document.querySelectorAll('.btn, .contact-button a')
botones.forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.05, duration: 0.2, ease: 'power1.out' })
  })
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power1.in' })
  })
})
// ----------------------------------------------------
// 🚀 REINICIAR ANIMACIONES AL NAVEGAR ENTRE SECCIONES
// ----------------------------------------------------
document.querySelectorAll('#nav a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const destino = document.querySelector(link.getAttribute('href'))

    if (destino) {
      // Scroll suave hacia la sección
      destino.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

      // Cierra el menú móvil si está abierto
      seleccionar()

      // Espera a que termine el scroll y reinicia las animaciones
      setTimeout(() => {
        // Refresca los triggers para reposicionar
        ScrollTrigger.refresh()

        // Reproduce las animaciones dentro de la vista actual
        ScrollTrigger.getAll().forEach((trigger) => {
          const anim = trigger.animation
          if (anim && trigger.isActive) {
            anim.restart(true, false)
          }
        })
      }, 1000) // Tiempo ajustado para que el scroll termine suavemente
    }
  })
})
