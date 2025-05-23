const header = document.querySelector('header');
const menu = document.querySelector('.nav__ul');
const menuBtn = document.querySelector('.menu-btn');

const slider = '.skills__main';
const sliderItem = '.skills__container-card';
const flechaIzquierda = '.skills__btn-prev';
const flechaDerecha = '.skills__btn-next';
const indicadoresSelector = '.skills__indicators';

const modal      = document.getElementById('projectModal');
const modalContent = modal.querySelector('.modal-content');
const modalClose = document.createElement('span');
modalClose.classList.add('modal-close');
modalClose.innerHTML = '&times;';
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

async function crearSkills(){
  try{
    const response = await fetch(`skills.json`);
    const data = await response.json();
   const skillsContainer = document.querySelector('.skills__main');
      document.querySelectorAll('.skills__container-card').forEach(card => card.remove());
  // agregamos tambien la parte de proyectos
    const projectsContainer = document.querySelector('.projects__container');
    projectsContainer.innerHTML = '';
      
    const projects = data.projects; 

    projects.forEach(project => {
      //creacion de la targeta
      const div = document.createElement('div');
      div.classList.add(`projects__card`);

      const img = document.createElement('img');
      img.classList.add('projects__card--img');
      img.src = project.img;
      img.alt = project.titulo;

      const titulo = document.createElement('h3');
      titulo.classList.add('projects__card--title');
      titulo.textContent = project.titulo;

      const descripcion = document.createElement('p');
      descripcion.classList.add('projects__card--text');
      descripcion.textContent = project.descripcion;

      const link = document.createElement('a');
      link.classList.add('projects__card--link');
      link.href = project.link;
      link.target = '_blank';

      const linkLogo = document.createElement('img');
      linkLogo.src = project.linkLogo;
      //agregamos todos los elementos al div
      link.appendChild(linkLogo);
      div.appendChild(img);
      div.appendChild(titulo);
      div.appendChild(descripcion);
      div.appendChild(link);
      //y lo agregamos al DOM
      projectsContainer.appendChild(div);

      //agregamos el evento de click para abrir el modal
      div.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modalContent.innerHTML = `
        <span class="modal-close">&times;</span>
        <img src=${project.img} alt=${project.titulo}>
        <h3>${project.titulo}</h3>
        <p>${project.descripcion}</p>
        <a href=${project.link} target="_blank">
          <img src=${project.linkLogo} alt="link">
        </a>
        `;
        modalContent.appendChild(modalClose);
        
        //evento para cerrar el modal
       modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
        modalContent.innerHTML = '';
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) { //cierra si se hace click solo en el fondo osea en el p
          modal.classList.add('hidden');
          modalContent.innerHTML = '';
        }
      });
    });
  });
    const skills = data.skills;
    skills.forEach(skill => {
      const div = document.createElement('div');
      div.classList.add('skills__container-card');
      div.innerHTML = `
        <div class="skills__card">
                    <img src=${skill.img} alt="html">
                    <h3 class="skills__card--title">${skill.titulo}</h3>
                    <p class="skills__card--text">${skill.descripcion}</p>
                </div>
      `;
      if(!skill.active){
        div.classList.add('skills__coming-soon');
        div.style.pointerEvents = 'none';
        div.firstElementChild.classList.add(`skills__coming-soon-overlay`);
        let soon = document.createElement('div');
        soon.classList.add('skills__coming-soon-text');
        soon.textContent = `PRONTO`;
        div.appendChild(soon);
      }
      skillsContainer.appendChild(div);
    });
      crearSlider({
  contenedor:slider,
  itemSelector: sliderItem,
  flechaIzquierda,
  flechaDerecha,
  indicadoresSelector,
  casillasMovil: 2,
  casillasEscritorio: 4
});
    
  }
  catch (error) {
    console.error('Error al cargar el archivo JSON:', error);
  }
}



// Ejecutar al cargar
handleMobileChange(mediaQuery);


// Escuchar cambios en el tamaño de pantalla
mediaQuery.addEventListener('change', handleMobileChange);
// Corrección de selectores




function crearSlider({
  contenedor,
  itemSelector,
  flechaIzquierda,
  flechaDerecha,
  indicadoresSelector,
  casillasMovil = 2,
  casillasEscritorio = 4
}) {
  
  const fila = document.querySelector(contenedor);
  const items = Array.from(document.querySelectorAll(itemSelector));
  const arrowLeft = document.querySelector(flechaIzquierda);
  const arrowRight = document.querySelector(flechaDerecha);
  const indicadores = document.querySelector(indicadoresSelector);

 if (!fila) {
  console.error('❌ Slider: contenedor no encontrado (selector incorrecto o no existe en el DOM).');
  return;
}
if (items.length === 0) {
  console.error('❌ Slider: no se encontraron los elementos del itemSelector.');
  return;
}
if (!arrowLeft) {
  console.error('❌ Slider: flecha izquierda no encontrada.');
  return;
}
if (!arrowRight) {
  console.error('❌ Slider: flecha derecha no encontrada.');
  return;
}
if (!indicadores) {
  console.error('❌ Slider: contenedor de indicadores no encontrado.');
  return;
}

  // calcula gap entre ítems
  const gap = parseFloat(getComputedStyle(fila).gap) || 0;
  let casillas, desplazamiento;

  const actualizarLayout = () => {
    casillas = window.innerWidth <= 800 ? casillasMovil : casillasEscritorio;
    desplazamiento = (items[0].offsetWidth + gap) * casillas;
    generarIndicadores();
    actualizarFlechas();
    actualizarIndicadoresActivos();
  };

  const actualizarFlechas = () => {
    arrowLeft.disabled = fila.scrollLeft <= 0;
    arrowRight.disabled = fila.scrollLeft >= fila.scrollWidth - fila.clientWidth;
  };

  const generarIndicadores = () => {
    indicadores.innerHTML = '';
    const paginas = Math.ceil(items.length / casillas);

    for (let i = 0; i < paginas; i++) {
      const btn = document.createElement('button');
      btn.dataset.index = i;
      
      btn.addEventListener('click', () => moverASeccion(i));
      indicadores.appendChild(btn);
        
      
    }
  };

  const actualizarIndicadoresActivos = () => {
    const paginas = indicadores.children.length;
    const ratio = fila.scrollLeft / (fila.scrollWidth - fila.clientWidth);
    const activo = Math.round(ratio * (paginas - 1));
    Array.from(indicadores.children).forEach((btn, i) => {
      btn.classList.toggle('activo', i === activo);
    });
  };

  const moverASeccion = index => {
    const maxScroll = fila.scrollWidth - fila.clientWidth;
    const target = maxScroll * (index / (indicadores.children.length - 1));
    fila.scrollTo({ left: target, behavior: 'smooth' });
  };

  // eventos de flechas
  arrowRight.addEventListener('click', () => {
    fila.scrollBy({ left: desplazamiento, behavior: 'smooth' });
  });
  arrowLeft.addEventListener('click', () => {
    fila.scrollBy({ left: -desplazamiento, behavior: 'smooth' });
  });

  // actualiza estado al hacer scroll
  fila.addEventListener('scroll', () => {
    actualizarFlechas();
    actualizarIndicadoresActivos();
  });

  // reajusta al redimensionar
  window.addEventListener('resize', actualizarLayout);

  // inicialización
  actualizarLayout();
}
document.addEventListener('DOMContentLoaded', () => {
  crearSkills();
});

