// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
  // ===== Inicializa AOS =====
  AOS.init({
    duration: 800,
    once: false,
    mirror: true
  });

  // ===== Atualiza o ano no rodapé =====
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // ===== Dark Mode =====
  const darkModeToggle = document.getElementById('darkModeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function setDarkMode(isDark) {
    document.body.classList.toggle('dark-theme', isDark);
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
  }

  // Verifica preferência salva ou do sistema
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode !== null) {
    setDarkMode(savedMode === 'true');
  } else {
    setDarkMode(prefersDark.matches);
  }

  // Alterna o tema manualmente
  darkModeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-theme');
    setDarkMode(isDark);
  });

  // ===== Carrossel de Projetos =====
  const carousel = document.querySelector('.project-carousel');
  const slides = document.querySelectorAll('.project-slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  let currentIndex = 0;

  // Cria os indicadores dinamicamente
  slides.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.classList.add('carousel-indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = document.querySelectorAll('.carousel-indicator');

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  // Navegação com botões
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  // Inicializa o carrossel
  updateCarousel();
});