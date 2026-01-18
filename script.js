// Portfolio Interactive Features
(() => {
  // Navigation and Scroll
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenu = document.getElementById('mobileMenu');
  const scrollDown = document.querySelector('.scroll-down');
  
  // Mobile menu toggle
  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  // Scroll down button
  if (scrollDown) {
    scrollDown.addEventListener('click', () => {
      const targetId = scrollDown.getAttribute('data-target');
      const target = document.getElementById(targetId || 'about');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Header scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNav() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  // Smooth scroll for all anchor links (only internal # links)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // Only prevent default for internal anchor links, not mailto: or tel:
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards for animation
  const animatedElements = document.querySelectorAll('.card, .section-title');
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Particle cursor effect (optional, lightweight)
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll('.btn, .card, .social-link, .nav-link');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // Typing effect for hero subtitle
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
    const text = typewriter.textContent;
    typewriter.textContent = '';
    typewriter.style.borderRight = '2px solid var(--cyan)';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      } else {
        setTimeout(() => {
          typewriter.style.borderRight = 'none';
        }, 500);
      }
    }
    
    setTimeout(typeWriter, 500);
  }

  // Add parallax effect to background blobs
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.blob');
    
    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.05;
      blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Copy email functionality
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const email = link.href.replace('mailto:', '').split('?')[0];
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showNotification('Email copied to clipboard!');
        });
      }
    });
  });

  // Copy phone functionality
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const phone = link.href.replace('tel:', '');
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(phone).then(() => {
          showNotification('Phone number copied to clipboard!');
        });
      }
    });
  });

  // Notification system
  function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: linear-gradient(135deg, #0891b2, #3b82f6);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Add CSS for notification animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debouncing to scroll-heavy functions
  const debouncedHighlight = debounce(highlightNav, 100);
  window.removeEventListener('scroll', highlightNav);
  window.addEventListener('scroll', debouncedHighlight);

  // Loading animation completion
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Enhanced project cards with tilt effect
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Mail link - Open custom message modal
  const mailLink = document.getElementById('mailLink');
  const modal = document.getElementById('messageModal');
  const closeModal = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const sendBtn = document.getElementById('sendBtn');
  const messageInput = document.getElementById('messageInput');

  if (mailLink && modal) {
    mailLink.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      messageInput.focus();
    });

    // Close modal handlers
    const closeModalHandler = () => {
      modal.classList.remove('active');
      messageInput.value = '';
    };

    closeModal.addEventListener('click', closeModalHandler);
    cancelBtn.addEventListener('click', closeModalHandler);
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModalHandler();
      }
    });

    // Send button handler
    sendBtn.addEventListener('click', () => {
      const message = messageInput.value.trim();
      if (message) {
        // Create temporary link for better mobile compatibility
        const mailtoLink = document.createElement('a');
        mailtoLink.href = `mailto:guptakshitij266@gmail.com?subject=Message from Portfolio&body=${encodeURIComponent(message)}`;
        mailtoLink.target = '_blank';
        document.body.appendChild(mailtoLink);
        mailtoLink.click();
        document.body.removeChild(mailtoLink);
        closeModalHandler();
      }
    });

    // Allow Enter key with Ctrl/Cmd to send
    messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        sendBtn.click();
      }
    });
  }

  console.log('%c👋 Welcome to my portfolio!', 'color: #22d3ee; font-size: 1.5rem; font-weight: bold;');
  console.log('%cBuilt with vanilla HTML, CSS & JavaScript', 'color: #94a3b8; font-size: 1rem;');
  console.log('%cFeel free to explore the code!', 'color: #3b82f6;');
})();
