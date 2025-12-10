// config.js: Load site configuration and inject into DOM
(function(){
  let config = null;

  async function loadConfig(){
    if(config) return config;
    try{
      const res = await fetch('/config.json');
      if(!res.ok) throw new Error('config fetch failed');
      config = await res.json();
      return config;
    }catch(e){
      console.warn('Failed to load config.json', e);
      return null;
    }
  }

  function injectMetaTags(cfg){
    if(!cfg || !cfg.site) return;
    const s = cfg.site;
    const meta = [
      { name: 'description', content: s.description },
      { name: 'theme-color', content: s.color },
      { property: 'og:title', content: s.title },
      { property: 'og:description', content: s.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: s.url },
      { property: 'og:image', content: s.logo },
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:title', content: s.title },
      { property: 'twitter:description', content: s.description },
      { property: 'twitter:image', content: s.logo },
    ];
    meta.forEach(m=>{
      const el = document.createElement('meta');
      if(m.name) el.setAttribute('name', m.name);
      if(m.property) el.setAttribute('property', m.property);
      el.setAttribute('content', m.content);
      document.head.appendChild(el);
    });
    // Update page title if not already set
    if(!document.title.includes(' — ') && !document.title.includes(' | ')){
      document.title = `${document.title} — ${s.name}`;
    }
  }

  function injectLogo(cfg){
    if(!cfg || !cfg.site || !cfg.site.logo) return;
    const logo = cfg.site.logo;
    // Update any elements with data-config-logo
    document.querySelectorAll('[data-config-logo]').forEach(el=>{
      if(el.tagName === 'IMG') el.src = logo;
      else el.style.backgroundImage = `url(${logo})`;
    });
  }

  function injectSiteName(cfg){
    if(!cfg || !cfg.site || !cfg.site.name) return;
    const name = cfg.site.name;
    // Update elements with data-config-name
    document.querySelectorAll('[data-config-name]').forEach(el=>{
      el.textContent = name;
    });
  }

  async function injectAll(){
    const cfg = await loadConfig();
    injectMetaTags(cfg);
    injectLogo(cfg);
    injectSiteName(cfg);
    window.SiteConfig = cfg;
  }

  document.addEventListener('partialsLoaded', ()=>{
    setTimeout(injectAll, 10);
  });

  window.Config = { loadConfig };
})();
