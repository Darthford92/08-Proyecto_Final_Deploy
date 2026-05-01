class ThemeSwitcher {
  constructor() {
    this.button = document.createElement('button');
    this.button.textContent = '🌙 Modo Matrix';
    this.button.classList.add('theme-btn');
    this.isDark = true;
    this.init();
  }

  init() {
    this.applyTheme();
    const header = document.querySelector('header');
    header.insertAdjacentElement('beforeend', this.button);
    this.button.addEventListener('click', () => {
      this.isDark = !this.isDark;
      this.applyTheme();
    });
  }

  applyTheme() {
    if (this.isDark) {
      document.body.style.backgroundColor = '#0D1117';
      document.body.style.color = '#01FF00';
      this.button.textContent = '🌙 Modo Matrix';
    } else {
      document.body.style.backgroundColor = '#1a2a1a';
      document.body.style.color = '#00cc00';
      this.button.textContent = '☀️ Modo Claro (no blanco)';
    }
  }
}

class ArticleLikes {
  constructor() {
    this.likes = 0;
    this.button = document.createElement('button');
    this.button.textContent = '❤️ Me gusta (0)';
    this.button.classList.add('like-btn');
    this.article = document.querySelector('article');
    if (this.article) {
      this.article.appendChild(this.button);
      this.button.addEventListener('click', () => this.increment());
    }
  }

  increment() {
    this.likes++;
    this.button.textContent = `❤️ Me gusta (${this.likes})`;
  }
}

class NavAlertHandler {
  constructor() {
    this.links = document.querySelectorAll('.navbar a');
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🚧 Sitio en mantenimiento. Vuelve pronto.');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ThemeSwitcher();
  new ArticleLikes();
  new NavAlertHandler();
});