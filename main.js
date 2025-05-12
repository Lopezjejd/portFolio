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

async function crearSkills(){
  try{
    const response = await fetch(`skills.json`);
    const data = await response.json();
   const skillsContainer = document.querySelector('.skills__main');
      document.querySelectorAll('.skills__container-card').forEach(card => card.remove());

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
      skillsContainer.appendChild(div);
    });
      
    
  }
  catch (error) {
    console.error('Error al cargar el archivo JSON:', error);
  }
}
crearSkills();


// Ejecutar al cargar
handleMobileChange(mediaQuery);

// Escuchar cambios en el tamaño de pantalla
mediaQuery.addEventListener('change', handleMobileChange);
