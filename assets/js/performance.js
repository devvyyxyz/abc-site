// Performance utilities

// Debounce function for scroll/resize events
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle function for frequent events
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Lazy load images with blur-up effect
function initLazyLoad() {
  const images = document.querySelectorAll("img[data-src]");

  const imageLoadHandler = (img) => {
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });
    img.src = img.dataset.src;
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            imageLoadHandler(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "50px" }
    );

    images.forEach((img) => observer.observe(img));
  } else {
    images.forEach(imageLoadHandler);
  }
}

// Preload critical resources
function preloadResources() {
  const resources = [
    // Add critical resources here if needed
  ];

  resources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    Object.assign(link, resource);
    document.head.appendChild(link);
  });
}

// Prefetch navigation links
function prefetchLinks() {
  const links = document.querySelectorAll('a[href^="/"]');

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const prefetchLink = document.createElement("link");
      prefetchLink.rel = "prefetch";
      prefetchLink.href = link.href;
      document.head.appendChild(prefetchLink);
    });
  });
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initLazyLoad();
    preloadResources();
    prefetchLinks();
  });
} else {
  initLazyLoad();
  preloadResources();
  prefetchLinks();
}

// Performance monitoring
if ("PerformanceObserver" in window) {
  try {
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 3000) {
          console.warn(
            "Slow interaction detected:",
            entry.name,
            entry.duration + "ms"
          );
        }
      }
    });
    // Use supported entry types only
    if (
      PerformanceObserver.supportedEntryTypes &&
      PerformanceObserver.supportedEntryTypes.includes("longtask")
    ) {
      perfObserver.observe({ entryTypes: ["longtask"] });
    }
  } catch (e) {
    // Graceful fallback if PerformanceObserver not fully supported
  }
}
