// ===== PORTFOLIO JAVASCRIPT =====
// Modern JavaScript with ES6+ features and advanced functionality

class Portfolio {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeAnimations();
    this.setupCustomCursor();
    this.updateYear();
    this.setupScrollAnimations();
    this.setupSkillBars();
    this.setupMobileMenu();
    this.setupBackToTop();
    this.setupSmoothScrolling();
    this.setupNavbarScroll();
    this.setupThemeSwitching();
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
      });

      // Close menu when clicking on links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // ===== CUSTOM CURSOR =====
  setupCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 0}px, ${mouseY - 0}px) translate(-50%, -50%)`;
    });

    // Smooth follower animation
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
      
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
      cursor.style.display = 'none';
      cursorFollower.style.display = 'none';
    }
  }

  // ===== SCROLL ANIMATIONS =====
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(`
      .hero-text,
      .hero-visual,
      .section-header,
      .project-card,
      .about-text,
      .about-image,
      .skill-category,
      .tech-tags,
      .contact-info,
      .contact-cta
    `);

    animatedElements.forEach((el, index) => {
      el.classList.add('fade-in');
      el.style.animationDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
  }

  // ===== SKILL BARS ANIMATION =====
  setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          setTimeout(() => {
            entry.target.style.width = width;
          }, 200);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
      skillObserver.observe(bar);
    });
  }

  // ===== MOBILE MENU =====
  setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== BACK TO TOP BUTTON =====
  setupBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== SMOOTH SCROLLING =====
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ===== NAVBAR SCROLL EFFECT =====
  setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
      }
    });
  }

  // ===== THEME SWITCHING =====
  setupThemeSwitching() {
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(themeToggle, savedTheme);

    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      this.updateThemeIcon(themeToggle, next);
    });
  }

  updateThemeIcon(button, theme) {
    button.innerHTML = theme === 'light' 
      ? '<i class="fas fa-sun" aria-hidden="true"></i>' 
      : '<i class="fas fa-moon" aria-hidden="true"></i>';
  }

  // ===== INITIALIZE ANIMATIONS =====
  initializeAnimations() {
    // Add stagger animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // ===== UPDATE YEAR =====
  updateYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// ===== INITIALIZE PORTFOLIO =====
document.addEventListener('DOMContentLoaded', () => {
  const portfolio = new Portfolio();
  
  // Make portfolio instance globally available for debugging
  window.portfolio = portfolio;
});
