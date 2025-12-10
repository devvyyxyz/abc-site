// search.js: filter modpack/mod cards by name, tags, description
(function(){
  function normalize(s){ return (s||'').toString().toLowerCase(); }

  function filterCards(query){
    const q = normalize(query).trim();
    const containers = [document.querySelector('#modpacks-list'), document.querySelector('#mods-list')];
    containers.forEach(container => {
      if(!container) return;
      const cards = Array.from(container.querySelectorAll('.modpack'));
      cards.forEach(card => {
        const text = normalize(card.textContent || '');
        const keep = q === '' || text.includes(q);
        card.style.display = keep ? '' : 'none';
      });
    });
  }

  function attach(){
    const input = document.querySelector('.search');
    if(!input) return;
    input.addEventListener('input', e => filterCards(e.target.value));
    // when modpacks are (re)rendered, re-run filter
    document.addEventListener('modpacksRendered', ()=> filterCards(input.value));
  }

  document.addEventListener('partialsLoaded', ()=> setTimeout(attach, 10));
})();
