    // Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBnwzlS8rXIXwa-6wq2WujaKOcAhZE3hwo",
  authDomain: "site-de-ids.firebaseapp.com",
  databaseURL: "https://site-de-ids-default-rtdb.firebaseio.com",
  projectId: "site-de-ids",
  storageBucket: "site-de-ids.firebasestorage.app",
  messagingSenderId: "496121832291",
  appId: "1:496121832291:web:677052bde3bed1fe856956"
};

   // Inicializa o Firebase
   firebase.initializeApp(firebaseConfig);

   // Conecta o Database
   const database = firebase.database();

  function buscarID() {
  const busca = document.getElementById('campoBusca').value.trim();
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = 'Verificando...';

  if (!busca) {
    resultadoDiv.innerHTML = 'Digite um ID ou servidor para buscar.';
    return;
  }

  const idsRef = database.ref('ids');

  idsRef.once('value', (snapshot) => {
    const data = snapshot.val();
    let encontrados = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const item = data[key];
        if (item.id.includes(busca) || item.servidor.includes(busca)) {
          encontrados.push(item);
        }
      }
    }

    if (encontrados.length === 0) {
      resultadoDiv.innerHTML = 'O ID não está na lista.';
    } else {
      const listaHTML = encontrados
        .map(i => `<p>${i.exibicao}</p>`)
        .join('');
   resultadoDiv.innerHTML = `
  <p style="color: white; margin-bottom: 10px; font-family: 'Roboto', sans-serif";">ID'S ENCONTRADOS:</p>
  ${listaHTML}
`;

    }
  }, (error) => {
    resultadoDiv.innerHTML = 'Erro ao buscar ID: ' + error.message;
  });
}
 
// Partículas
particlesJS("particles-js", {
  particles: {
    number: { value: 20, density: { enable: true, value_area: 700 } },
    color: { value: "#1b1e34", },
    shape: {
      type: "polygon",
      stroke: { width: 0, color: "#000" },
      polygon: { nb_sides: 6 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.9,
      random: true,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 80,
      random: false,
      anim: { enable: true, speed: 10, size_min: 40, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 200,
      color: "#ffffff",
      opacity: 1,
      width: 2
    },
    move: {
      enable: true,
      speed: 20,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "grab" },
      onclick: { enable: false, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

// Tirar zoom
let lastTouchEnd = 0;

document.addEventListener('touchend', function (event) {
  let now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault(); // evita o zoom do double tap
  }
  lastTouchEnd = now;
}, false);
