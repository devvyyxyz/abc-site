/**
 * Visual Enhancements JavaScript
 * Handles animations, toast notifications, back-to-top, and copy buttons
 */

(function () {
  "use strict";

  // ============================================
  // Intersection Observer for Scroll Animations
  // ============================================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Mark in-viewport elements visible and observe others for animation
  function applyScrollVisibility() {
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < viewportHeight * 0.9;
      if (isVisible) {
        el.classList.add("visible");
      } else {
        animateOnScroll.observe(el);
      }
    });
  }

  // ============================================
  // Toast Notification System
  // ============================================

  const Toast = {
    container: null,

    init() {
      if (!this.container) {
        this.container = document.createElement("div");
        this.container.className = "toast-container";
        document.body.appendChild(this.container);
      }
    },

    show(options = {}) {
      this.init();

      const {
        title = "Notification",
        message = "",
        type = "info", // success, error, warning, info
        duration = 4000,
      } = options;

      const toast = document.createElement("div");
      toast.className = `toast ${type}`;

      const icons = {
        success: "fas fa-check-circle",
        error: "fas fa-times-circle",
        warning: "fas fa-exclamation-triangle",
        info: "fas fa-info-circle",
      };

      toast.innerHTML = `
        <i class="toast-icon ${icons[type]}"></i>
        <div class="toast-content">
          <div class="toast-title">${title}</div>
          ${message ? `<p class="toast-message">${message}</p>` : ""}
        </div>
        <button class="toast-close" aria-label="Close notification">
          <i class="fas fa-times"></i>
        </button>
      `;

      this.container.appendChild(toast);

      // Close button handler
      const closeBtn = toast.querySelector(".toast-close");
      closeBtn.addEventListener("click", () => this.hide(toast));

      // Auto-hide after duration
      if (duration > 0) {
        setTimeout(() => this.hide(toast), duration);
      }

      return toast;
    },

    hide(toast) {
      toast.classList.add("hiding");
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    },

    success(title, message, duration) {
      return this.show({ title, message, type: "success", duration });
    },

    error(title, message, duration) {
      return this.show({ title, message, type: "error", duration });
    },

    warning(title, message, duration) {
      return this.show({ title, message, type: "warning", duration });
    },

    info(title, message, duration) {
      return this.show({ title, message, type: "info", duration });
    },
  };

  // Make Toast globally available
  window.Toast = Toast;

  // ============================================
  // Back to Top Button
  // ============================================

  function initBackToTop() {
    const backToTop = document.createElement("button");
    backToTop.className = "back-to-top";
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute("aria-label", "Back to top");
    document.body.appendChild(backToTop);

    // Show/hide based on scroll position
    let scrollTimeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.pageYOffset > 300) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      }, 100);
    });

    // Scroll to top on click
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ============================================
  // Copy Code Buttons
  // ============================================

  function initCopyButtons() {
    // Find all code blocks
    const codeBlocks = document.querySelectorAll(
      "pre > code, div.highlight, figure.highlight"
    );

    codeBlocks.forEach((block) => {
      // Skip if already has a copy button
      const parent = block.closest("pre, div.highlight, figure.highlight");
      if (parent && parent.querySelector(".copy-code-btn")) {
        return;
      }

      // Create wrapper if needed
      let wrapper = parent;
      if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.className = "code-block-wrapper";
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
      } else if (!wrapper.classList.contains("code-block-wrapper")) {
        wrapper.classList.add("code-block-wrapper");
      }

      // Create copy button
      const button = document.createElement("button");
      button.className = "copy-code-btn";
      button.innerHTML = '<i class="fas fa-copy"></i> Copy';
      button.setAttribute("aria-label", "Copy code to clipboard");

      // Add to wrapper
      wrapper.style.position = "relative";
      wrapper.appendChild(button);

      // Copy functionality
      button.addEventListener("click", async () => {
        let code = block.textContent || block.innerText;

        try {
          await navigator.clipboard.writeText(code);
          button.innerHTML = '<i class="fas fa-check"></i> Copied!';
          button.classList.add("copied");

          // Show toast notification
          if (window.Toast) {
            Toast.success("Copied!", "Code copied to clipboard");
          }

          // Reset button after 2 seconds
          setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i> Copy';
            button.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code:", err);
          button.innerHTML = '<i class="fas fa-times"></i> Failed';

          if (window.Toast) {
            Toast.error("Failed", "Could not copy code to clipboard");
          }

          setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i> Copy';
          }, 2000);
        }
      });
    });
  }

  // ============================================
  // Skeleton Loader Utility
  // ============================================

  const SkeletonLoader = {
    create(type = "card", count = 1) {
      const skeletons = [];

      for (let i = 0; i < count; i++) {
        const skeleton = document.createElement("div");

        switch (type) {
          case "card":
            skeleton.className = "skeleton skeleton-card";
            break;
          case "project-card":
            skeleton.className = "skeleton-project-card";
            skeleton.innerHTML = `
              <div class="skeleton skeleton-circle"></div>
              <div class="skeleton skeleton-title"></div>
              <div class="skeleton skeleton-text"></div>
              <div class="skeleton skeleton-text"></div>
              <div class="skeleton skeleton-text"></div>
            `;
            break;
          case "text":
            skeleton.className = "skeleton skeleton-text";
            break;
          case "title":
            skeleton.className = "skeleton skeleton-title";
            break;
          default:
            skeleton.className = "skeleton";
        }

        skeletons.push(skeleton);
      }

      return count === 1 ? skeletons[0] : skeletons;
    },

    show(container, type = "card", count = 3) {
      if (typeof container === "string") {
        container = document.querySelector(container);
      }

      if (!container) return;

      const skeletons = this.create(type, count);
      const skeletonArray = Array.isArray(skeletons) ? skeletons : [skeletons];

      skeletonArray.forEach((skeleton) => {
        container.appendChild(skeleton);
      });

      return skeletonArray;
    },

    hide(skeletons) {
      const skeletonArray = Array.isArray(skeletons) ? skeletons : [skeletons];
      skeletonArray.forEach((skeleton) => {
        if (skeleton && skeleton.parentElement) {
          skeleton.parentElement.removeChild(skeleton);
        }
      });
    },
  };

  // Make SkeletonLoader globally available
  window.SkeletonLoader = SkeletonLoader;

  // ============================================
  // Initialize on DOM Ready
  // ============================================

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    initBackToTop();
    initCopyButtons();

    // Add animate-on-scroll class to project cards
    document.querySelectorAll(".project").forEach((card, index) => {
      card.classList.add("animate-on-scroll");
      if (index < 6) {
        card.classList.add(`stagger-${(index % 5) + 1}`);
      }
    });

    // Add animate-on-scroll to sections (but NOT hero - it's always visible)
    document.querySelectorAll(".section, .card").forEach((el) => {
      if (!el.classList.contains("animate-on-scroll")) {
        el.classList.add("animate-on-scroll");
      }
    });

    // Apply visibility/observation after classes are attached
    applyScrollVisibility();
  }

  // ============================================
  // Example Usage (for testing)
  // ============================================

  // Uncomment to test toast on page load
  // setTimeout(() => {
  //   Toast.success('Welcome!', 'Visual enhancements are now active');
  // }, 1000);
})();
