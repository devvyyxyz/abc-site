// social-links.js: Render social links from config
(function(){
  function renderSocialLinks(containerId){
    const container = document.getElementById(containerId);
    if(!container || !window.SiteConfig) return;
    
    const social = window.SiteConfig.social || {};
    const links = [
      { key: 'modrinth', icon: '🎮', label: 'Modrinth' },
      { key: 'discord', icon: '💬', label: 'Discord' },
      { key: 'twitter', icon: '𝕏', label: 'Twitter' },
      { key: 'github', icon: '🐙', label: 'GitHub' },
    ];

    container.innerHTML = '';
    links.forEach(link => {
      const url = social[link.key];
      if(!url) return;
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.title = link.label;
      a.style.cssText = 'display:inline-flex;align-items:center;gap:4px;padding:6px 10px;border-radius:8px;background:var(--glass);color:var(--muted);text-decoration:none;font-size:16px;margin:0 4px;transition:all .2s';
      a.innerHTML = `<span>${link.icon}</span>`;
      a.addEventListener('mouseenter', () => {
        a.style.background = 'var(--accent)';
        a.style.color = '#042233';
      });
      a.addEventListener('mouseleave', () => {
        a.style.background = 'var(--glass)';
        a.style.color = 'var(--muted)';
      });
      container.appendChild(a);
    });
  }

  document.addEventListener('partialsLoaded', () => {
    setTimeout(() => {
      renderSocialLinks('social-links-nav');
      renderSocialLinks('social-links-footer');
    }, 20);
  });

  window.SocialLinks = { renderSocialLinks };
})();
