const header = document.querySelector('header');
const menu = document.querySelector('.nav__ul');
const menuBtn = document.querySelector('.menu-btn');

// Crear media query
const mediaQuery = window.matchMedia('(max-width: 768px)');

menuBtn.addEventListener('click', () =>{
    menu.classList.toggle('nav-animation');
    console.log("Modo móvil activado");
  } )

// Función que se ejecuta cuando se detecta el cambio
function handleMobileChange(e) {
  if (e.matches) {

    
  } else {
    // Pantalla más grande
    console.log("Modo escritorio activado");
  }
}

// Ejecutar al cargar
handleMobileChange(mediaQuery);

// Escuchar cambios en el tamaño de pantalla
mediaQuery.addEventListener('change', handleMobileChange);
