// modrinth.js: load projects from static JSON (fetched at build time)
(function(){
  async function loadFromStatic(){
    try{
      const res = await fetch('/data/modpacks.json');
      if(!res.ok) return [];
      return await res.json();
    }catch(e){ return []; }
  }

  function renderInto(container, items){
    container.innerHTML = '';
    items.forEach((m,i)=>{
      const el = document.createElement('div'); el.className='modpack';
      el.style.animationDelay = (i*60)+'ms';
      const thumb = document.createElement('div'); thumb.className='thumb'; thumb.style.backgroundImage = `url(${m.thumbnail || '/assets/img/default-thumb.png'})`;
      const meta = document.createElement('div'); meta.className='meta';
      meta.innerHTML = `<h3>${m.name}</h3><p>${m.description || ''}</p><div class="tags">${(m.tags||[]).slice(0,6).map(t=>`<span>#${t}</span>`).join(' ')}</div>`;
      const action = document.createElement('div'); action.className='actions';
      if(m.download) action.innerHTML = `<a class="btn primary" href="${m.download}" target="_blank" rel="noopener">Open</a>`;
      el.appendChild(thumb); el.appendChild(meta); el.appendChild(action);
      container.appendChild(el);
    });
  }

  // group by type and render to #modpacks-list
  function renderModpacksGrouped(items){
    const container = document.querySelector('#modpacks-list');
    if(!container) return;
    container.innerHTML = '';
    const groups = {};
    items.forEach(it=>{ const t = (it.type||'other').toLowerCase(); (groups[t]=groups[t]||[]).push(it); });
    Object.keys(groups).forEach(group=>{
      const heading = document.createElement('div'); heading.className='section-subheading'; heading.innerHTML = `<h3 style="margin:8px 0 6px;text-transform:capitalize">${group}</h3>`;
      container.appendChild(heading);
      renderInto(container, groups[group]);
    });
  }

  async function loadModpacks(){
    const items = await loadFromStatic();
    if(!items || !items.length){
      const container = document.querySelector('#modpacks-list');
      if(container) container.innerHTML = '<p class="muted">No projects found. Run the fetch script or GitHub Actions workflow to update data.</p>';
      document.dispatchEvent(new CustomEvent('modpacksRendered'));
      return;
    }
    renderModpacksGrouped(items);
    document.dispatchEvent(new CustomEvent('modpacksRendered'));
  }

  document.addEventListener('partialsLoaded', ()=>{
    // Wait a tick then load
    setTimeout(()=> loadModpacks(), 20);
  });

  window.ModrinthLoader = { loadModpacks };
})();
