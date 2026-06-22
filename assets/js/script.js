/**
 * Escrow Platform - Main JavaScript
 * Professional Interactions & Animations
 */

// ========================================
// NAVIGATION
// ========================================
class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.init();
  }

  init() {
    this.handleScroll();
    this.handleMobileMenu();
    this.handleDropdowns();
  }

  handleScroll() {
    if (!this.navbar) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  handleMobileMenu() {
    if (!this.navToggle || !this.navMenu) return;

    this.navToggle.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
      this.navToggle.classList.toggle('active');
    });

    // Close menu on link click
    const navLinks = this.navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
      });
    });
  }

  handleDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav-link');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          if (window.innerWidth <= 992) {
            e.preventDefault();
            dropdown.classList.toggle('active');
          }
        });
      }
    });
  }
}

// ========================================
// SIDEBAR (Dashboard)
// ========================================
class Sidebar {
  constructor() {
    this.sidebar = document.querySelector('.sidebar');
    this.toggle = document.querySelector('.mobile-menu-toggle');
    this.init();
  }

  init() {
    if (!this.sidebar || !this.toggle) return;

    this.toggle.addEventListener('click', () => {
      this.sidebar.classList.toggle('active');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.sidebar.contains(e.target) && !this.toggle.contains(e.target)) {
        this.sidebar.classList.remove('active');
      }
    });
  }
}

// ========================================
// COUNTER ANIMATION
// ========================================
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('[data-count]');
    this.init();
  }

  init() {
    if (this.counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = prefix + this.formatNumber(Math.floor(current)) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = prefix + this.formatNumber(target) + suffix;
      }
    };

    updateCounter();
  }

  formatNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('[data-animate]');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.elements.forEach(el => observer.observe(el));
  }
}

// ========================================
// FAQ ACCORDION
// ========================================
class FAQAccordion {
  constructor() {
    this.items = document.querySelectorAll('.faq-item');
    this.init();
  }

  init() {
    this.items.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close all items
          this.items.forEach(i => i.classList.remove('active'));

          // Open clicked item if it wasn't active
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }
}

// ========================================
// MODALS
// ========================================
class Modal {
  constructor() {
    this.triggers = document.querySelectorAll('[data-modal]');
    this.modals = document.querySelectorAll('.modal-overlay');
    this.init();
  }

  init() {
    // Open modal triggers
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
          this.openModal(modal);
        }
      });
    });

    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) this.closeModal(modal);
      });
    });

    // Close on overlay click
    this.modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) this.closeModal(activeModal);
      }
    });
  }

  openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ========================================
// TABS
// ========================================
class Tabs {
  constructor() {
    this.containers = document.querySelectorAll('[data-tabs]');
    this.init();
  }

  init() {
    this.containers.forEach(container => {
      const tabs = container.querySelectorAll('[data-tab]');
      const panels = container.querySelectorAll('[data-panel]');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const targetPanel = tab.dataset.tab;

          // Update tabs
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          // Update panels
          panels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.dataset.panel === targetPanel) {
              panel.classList.add('active');
            }
          });
        });
      });
    });
  }
}

// ========================================
// FORM VALIDATION
// ========================================
class FormValidation {
  constructor() {
    this.forms = document.querySelectorAll('[data-validate]');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (this.validateForm(form)) {
          this.showSuccess(form);
        }
      });
    });
  }

  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const required = input.hasAttribute('required');

    // Clear previous error
    this.clearError(input);

    // Check required
    if (required && !value) {
      this.showError(input, 'This field is required');
      return false;
    }

    // Validate email
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showError(input, 'Please enter a valid email');
        return false;
      }
    }

    // Validate phone
    if (type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-+()]{10,}$/;
      if (!phoneRegex.test(value)) {
        this.showError(input, 'Please enter a valid phone number');
        return false;
      }
    }

    return true;
  }

  showError(input, message) {
    input.classList.add('error');
    const errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.textContent = message;
    errorEl.style.cssText = 'color: #ef4444; font-size: 0.75rem; margin-top: 4px; display: block;';
    input.parentNode.appendChild(errorEl);
  }

  clearError(input) {
    input.classList.remove('error');
    const errorEl = input.parentNode.querySelector('.form-error');
    if (errorEl) errorEl.remove();
  }

  showSuccess(form) {
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
    submitBtn.style.background = '#22c55e';

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      form.reset();
    }, 3000);
  }
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
class Search {
  constructor() {
    this.inputs = document.querySelectorAll('[data-search]');
    this.init();
  }

  init() {
    this.inputs.forEach(input => {
      const target = document.querySelector(input.dataset.search);
      if (!target) return;

      input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const items = target.querySelectorAll('[data-searchable]');

        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          if (text.includes(query)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}

// ========================================
// FILTER FUNCTIONALITY
// ========================================
class Filter {
  constructor() {
    this.containers = document.querySelectorAll('[data-filter-group]');
    this.init();
  }

  init() {
    this.containers.forEach(container => {
      const btns = container.querySelectorAll('[data-filter]');
      const items = document.querySelectorAll('[data-filter-item]');

      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.dataset.filter;

          // Update buttons
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Filter items
          items.forEach(item => {
            if (filter === 'all' || item.dataset.filterItem === filter) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    });
  }
}

// ========================================
// SMOOTH SCROLL
// ========================================
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// ========================================
// COPY TO CLIPBOARD
// ========================================
class CopyToClipboard {
  constructor() {
    this.buttons = document.querySelectorAll('[data-copy]');
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const text = btn.dataset.copy;
        try {
          await navigator.clipboard.writeText(text);
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }
}

// ========================================
// TOOLTIP
// ========================================
class Tooltip {
  constructor() {
    this.triggers = document.querySelectorAll('[data-tooltip]');
    this.init();
  }

  init() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', (e) => {
        const text = trigger.dataset.tooltip;
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
          position: absolute;
          background: #0f172a;
          color: #f8fafc;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          z-index: 10000;
          white-space: nowrap;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        `;

        document.body.appendChild(tooltip);

        const rect = trigger.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width/2 - tooltip.offsetWidth/2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + window.scrollY + 'px';

        trigger._tooltip = tooltip;
      });

      trigger.addEventListener('mouseleave', () => {
        if (trigger._tooltip) {
          trigger._tooltip.remove();
          trigger._tooltip = null;
        }
      });
    });
  }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
class Notification {
  static show(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 0.5rem;
      font-size: 0.9375rem;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// ========================================
// PROGRESS BAR
// ========================================
class ProgressBar {
  constructor() {
    this.bars = document.querySelectorAll('[data-progress]');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const progress = bar.dataset.progress;
          const fill = bar.querySelector('.progress-fill');
          if (fill) {
            fill.style.width = progress + '%';
          }
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    this.bars.forEach(bar => observer.observe(bar));
  }
}

// ========================================
// EVIDENCE UPLOAD
// ========================================
class EvidenceUpload {
  constructor() {
    this.areas = document.querySelectorAll('.evidence-upload');
    this.init();
  }

  init() {
    this.areas.forEach(area => {
      const input = area.querySelector('input[type="file"]');
      const preview = area.querySelector('.upload-preview');

      if (!input) return;

      area.addEventListener('dragover', (e) => {
        e.preventDefault();
        area.classList.add('dragover');
      });

      area.addEventListener('dragleave', () => {
        area.classList.remove('dragover');
      });

      area.addEventListener('drop', (e) => {
        e.preventDefault();
        area.classList.remove('dragover');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
          input.files = files;
          this.handleFiles(files, preview);
        }
      });

      input.addEventListener('change', () => {
        this.handleFiles(input.files, preview);
      });
    });
  }

  handleFiles(files, preview) {
    if (!preview) return;

    preview.innerHTML = '';
    Array.from(files).forEach(file => {
      const item = document.createElement('div');
      item.className = 'upload-item';
      item.innerHTML = `
        <i class="fas fa-file"></i>
        <span>${file.name}</span>
        <span class="upload-size">${this.formatFileSize(file.size)}</span>
      `;
      item.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem;
        background: rgba(34, 197, 94, 0.1);
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
      `;
      preview.appendChild(item);
    });
  }

  formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}

// ========================================
// CHART RENDERER
// ========================================
class ChartRenderer {
  constructor() {
    this.charts = document.querySelectorAll('[data-chart]');
    this.init();
  }

  init() {
    this.charts.forEach(chart => {
      const type = chart.dataset.chart;
      const bars = parseInt(chart.dataset.bars || 12);
      const maxValue = parseInt(chart.dataset.maxValue || 100);

      if (type === 'bar') {
        this.renderBarChart(chart, bars, maxValue);
      } else if (type === 'line') {
        this.renderLineChart(chart);
      }
    });
  }

  renderBarChart(container, bars, maxValue) {
    container.innerHTML = '';

    for (let i = 0; i < bars; i++) {
      const value = Math.random() * maxValue;
      const height = (value / maxValue) * 200;
      const bar = document.createElement('div');
      bar.className = 'chart-bar';
      bar.style.height = height + 'px';
      bar.style.animationDelay = (i * 0.1) + 's';
      container.appendChild(bar);
    }
  }

  renderLineChart(container) {
    // Placeholder for line chart
    container.innerHTML = '<i class="fas fa-chart-line" style="font-size: 3rem; color: #22c55e; opacity: 0.3;"></i>';
  }
}

// ========================================
// TABLE SORT
// ========================================
class TableSort {
  constructor() {
    this.tables = document.querySelectorAll('[data-sortable]');
    this.init();
  }

  init() {
    this.tables.forEach(table => {
      const headers = table.querySelectorAll('th[data-sort]');
      headers.forEach(header => {
        header.addEventListener('click', () => {
          const column = header.dataset.sort;
          const order = header.dataset.order || 'asc';
          this.sortTable(table, column, order);

          // Toggle order
          header.dataset.order = order === 'asc' ? 'desc' : 'asc';
        });
      });
    });
  }

  sortTable(table, column, order) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
      const aVal = a.querySelector(`td:nth-child(${column})`).textContent;
      const bVal = b.querySelector(`td:nth-child(${column})`).textContent;

      // Check if numeric
      const aNum = parseFloat(aVal.replace(/[^0-9.-]/g, ''));
      const bNum = parseFloat(bVal.replace(/[^0-9.-]/g, ''));

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return order === 'asc' ? aNum - bNum : bNum - aNum;
      }

      return order === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

    rows.forEach(row => tbody.appendChild(row));
  }
}

// ========================================
// DATE FORMATTER
// ========================================
const DateUtils = {
  format(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  formatDateTime(date) {
    return this.format(date) + ' ' + this.formatTime(date);
  },

  timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval + ' ' + unit + (interval > 1 ? 's' : '') + ' ago';
      }
    }

    return 'Just now';
  }
};

// ========================================
// LOCAL STORAGE HELPER
// ========================================
const Storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },

  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Storage error:', e);
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};

// ========================================
// INITIALIZE ON DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  new Navigation();
  new Sidebar();
  new SmoothScroll();

  // UI components
  new CounterAnimation();
  new ScrollAnimations();
  new FAQAccordion();
  new Modal();
  new Tabs();
  new Tooltip();

  // Form handling
  new FormValidation();

  // Data handling
  new Search();
  new Filter();
  new TableSort();
  new CopyToClipboard();

  // Specialized
  new ProgressBar();
  new EvidenceUpload();
  new ChartRenderer();

  // Add hover effects to cards
  document.querySelectorAll('.card, .feature-card, .pricing-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Initialize dashboard sidebar active state
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  console.log('Escrow Platform initialized successfully');
});

// ========================================
// UTILITY FUNCTIONS (Global)
// ========================================
window.EscrowPlatform = {
  Notification,
  DateUtils,
  Storage
};
