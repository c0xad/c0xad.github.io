/**
 * Dashboard Analytics Module
 * 
 * Data Structure Guide:
 * Each data object contains 4 items (for 4 metric cards) with:
 * - value: Target number for animation
 * - caption: Main label text
 * - subtext: Progress bar description
 * - percentage: Progress bar fill (0-100)
 * - trend: Trend indicator text
 * 
 * To extend: Add new data objects following the same 4-item structure,
 * then add corresponding tab buttons with data-tab="your-tab-name"
 */

// Data sets for different dashboard views
const overviewData = [
  {
    value: 150,
    caption: "Loan Applications Analyzed",
    subtext: "92% Processing Efficiency",
    percentage: 92,
    trend: "+15%"
  },
  {
    value: 200,
    caption: "Customer Engagements",
    subtext: "88% Satisfaction Score",
    percentage: 88,
    trend: "+22%"
  },
  {
    value: 25,
    caption: "Financial Reports",
    subtext: "95% Accuracy Rate",
    percentage: 95,
    trend: "+18%"
  },
  {
    value: 12,
    caption: "Risk Models Applied",
    subtext: "90% Model Precision",
    percentage: 90,
    trend: "+8%"
  }
];

const performanceData = [
  {
    value: 187,
    caption: "Applications Processed",
    subtext: "94% Completion Rate",
    percentage: 94,
    trend: "+23%"
  },
  {
    value: 245,
    caption: "Client Meetings",
    subtext: "91% Success Rate",
    percentage: 91,
    trend: "+18%"
  },
  {
    value: 38,
    caption: "Analysis Reports",
    subtext: "97% Accuracy Rate",
    percentage: 97,
    trend: "+28%"
  },
  {
    value: 16,
    caption: "Risk Assessments",
    subtext: "93% Validation Rate",
    percentage: 93,
    trend: "+12%"
  }
];

const growthData = [
  {
    value: 320,
    caption: "Skills Developed",
    subtext: "85% Mastery Level",
    percentage: 85,
    trend: "+45%"
  },
  {
    value: 156,
    caption: "Training Hours",
    subtext: "98% Completion Rate",
    percentage: 98,
    trend: "+67%"
  },
  {
    value: 8,
    caption: "Certifications Earned",
    subtext: "100% Pass Rate",
    percentage: 100,
    trend: "+100%"
  },
  {
    value: 42,
    caption: "Mentorship Sessions",
    subtext: "96% Effectiveness",
    percentage: 96,
    trend: "+31%"
  }
];

// Map tab names to data
const dataMap = {
  overview: overviewData,
  performance: performanceData,
  growth: growthData
};

class DashboardController {
  constructor() {
    this.cards = document.querySelectorAll('.kpi-card');
    this.tabButtons = document.querySelectorAll('[role="tab"]');
    this.tabContainer = document.querySelector('[role="tablist"]');
    this.currentTab = 'overview';
    this.counters = new Map();
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }

  init() {
    this.setupTabs();
    this.setupCards();
    this.loadTabData(this.currentTab);
    this.bindEvents();
  }

  setupTabs() {
    // Set up proper ARIA attributes
    if (this.tabContainer) {
      this.tabContainer.setAttribute('role', 'tablist');
      this.tabContainer.setAttribute('aria-label', 'Dashboard Analytics');
    }

    this.tabButtons.forEach((button, index) => {
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      button.setAttribute('tabindex', index === 0 ? '0' : '-1');
      button.setAttribute('id', `tab-${button.dataset.tab}`);
      button.setAttribute('aria-controls', `panel-${button.dataset.tab}`);
    });
  }

  setupCards() {
    this.cards.forEach((card, index) => {
      card.setAttribute('role', 'region');
      card.setAttribute('aria-labelledby', `metric-${index}`);
      card.setAttribute('id', `panel-metric-${index}`);
      
      const label = card.querySelector('.kpi-label');
      if (label) {
        label.setAttribute('id', `metric-${index}`);
      }
    });
  }

  bindEvents() {
    // Tab click events
    this.tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });

      button.addEventListener('keydown', (e) => {
        this.handleTabKeydown(e);
      });
    });

    // Card hover events for gentle bounce
    this.cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.bounceCard(card);
      });
    });

    // Throttled resize listener
    this.throttledResize = this.throttle(() => {
      this.handleResize();
    }, 100);
    
    window.addEventListener('resize', this.throttledResize);
  }

  switchTab(tabName) {
    if (tabName === this.currentTab) return;

    // Update ARIA attributes
    this.tabButtons.forEach(button => {
      const isSelected = button.dataset.tab === tabName;
      button.setAttribute('aria-selected', isSelected);
      button.setAttribute('tabindex', isSelected ? '0' : '-1');
      button.classList.toggle('active', isSelected);
    });

    // Fade out, change data, fade in
    this.fadeCards(false, () => {
      this.currentTab = tabName;
      this.loadTabData(tabName);
      this.fadeCards(true);
    });
  }

  loadTabData(tabName) {
    const data = dataMap[tabName];
    if (!data) return;

    this.cards.forEach((card, index) => {
      if (data[index]) {
        this.updateCard(card, data[index]);
      }
    });
  }

  updateCard(card, data) {
    const counter = card.querySelector('.counter');
    const label = card.querySelector('.kpi-label');
    const progressText = card.querySelector('.progress-text');
    const progressFill = card.querySelector('.progress-fill');
    const trendValue = card.querySelector('.trend-value');

    // Update content
    if (label) label.textContent = data.caption;
    if (progressText) progressText.textContent = data.subtext;
    if (trendValue) trendValue.textContent = data.trend;
    
    // Update progress bar
    if (progressFill) {
      progressFill.setAttribute('data-percentage', data.percentage);
      setTimeout(() => {
        progressFill.style.width = `${data.percentage}%`;
      }, 100);
    }

    // Start counter animation
    if (counter) {
      counter.setAttribute('data-target', data.value);
      this.startCounter(counter, data.value);
    }
  }

  startCounter(element, target) {
    // Stop any existing animation
    if (this.counters.has(element)) {
      cancelAnimationFrame(this.counters.get(element));
    }

    const startValue = 0;
    const duration = this.prefersReducedMotion ? 0 : this.getAnimationDuration(target);
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
      
      element.textContent = currentValue;

      if (progress < 1) {
        const animationId = requestAnimationFrame(animate);
        this.counters.set(element, animationId);
      } else {
        element.textContent = target;
        this.counters.delete(element);
      }
    };

    if (this.prefersReducedMotion) {
      element.textContent = target;
    } else {
      const animationId = requestAnimationFrame(animate);
      this.counters.set(element, animationId);
    }
  }

  getAnimationDuration(target) {
    // Proportional timing: 600ms for ≤200, up to 1000ms for larger
    if (target <= 200) return 600;
    return Math.min(600 + (target - 200) * 2, 1000);
  }

  bounceCard(card) {
    if (this.prefersReducedMotion) return;

    card.style.transform = 'translateY(-2px) scale(1.02)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);
  }

  fadeCards(fadeIn, callback) {
    const opacity = fadeIn ? '1' : '0';
    const duration = 200;

    this.cards.forEach(card => {
      card.style.transition = `opacity ${duration}ms ease`;
      card.style.opacity = opacity;
    });

    if (callback) {
      setTimeout(callback, fadeIn ? 0 : duration);
    }
  }

  handleTabKeydown(e) {
    let targetTab = null;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        targetTab = this.getPreviousTab();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        targetTab = this.getNextTab();
        break;
      case 'Home':
        e.preventDefault();
        targetTab = this.tabButtons[0];
        break;
      case 'End':
        e.preventDefault();
        targetTab = this.tabButtons[this.tabButtons.length - 1];
        break;
    }

    if (targetTab) {
      targetTab.focus();
      this.switchTab(targetTab.dataset.tab);
    }
  }

  getPreviousTab() {
    const currentIndex = Array.from(this.tabButtons).findIndex(
      button => button.getAttribute('aria-selected') === 'true'
    );
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : this.tabButtons.length - 1;
    return this.tabButtons[prevIndex];
  }

  getNextTab() {
    const currentIndex = Array.from(this.tabButtons).findIndex(
      button => button.getAttribute('aria-selected') === 'true'
    );
    const nextIndex = currentIndex < this.tabButtons.length - 1 ? currentIndex + 1 : 0;
    return this.tabButtons[nextIndex];
  }

  handleResize() {
    // Recalculate any responsive elements if needed
    console.log('Dashboard resized');
  }

  // Throttle utility
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Cleanup method
  destroy() {
    // Cancel all running animations
    this.counters.forEach((animationId) => {
      cancelAnimationFrame(animationId);
    });
    this.counters.clear();

    // Remove event listeners
    window.removeEventListener('resize', this.throttledResize);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.dashboardController = new DashboardController();
  });
} else {
  window.dashboardController = new DashboardController();
}

// Export for module usage
export { DashboardController, dataMap }; 