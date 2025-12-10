// Partial include loader with nested relative path support and Modrinth loader
(function(){
  function runScripts(container){
    container.querySelectorAll('script').forEach(oldScript => {
      const script = document.createElement('script');
      if (oldScript.src) script.src = oldScript.src;
      if (oldScript.type) script.type = oldScript.type;
      script.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(script, oldScript);
    });
  }

  function dirname(path){
    return path.replace(/\/[^\/]*$/, '');
  }

  // Resolve nested include paths inside a fetched fragment relative to its file
  function resolveNestedIncludes(tmp, basePath){
    tmp.querySelectorAll('[data-include]').forEach(el=>{
      const inc = el.getAttribute('data-include');
      if(!inc) return;
      // if relative (no leading / or protocol), join with basePath
      if(!/^(https?:)?\\//i.test(inc) && !inc.startsWith('/')){
        const resolved = (basePath? basePath + '/' : '') + inc;
        el.setAttribute('data-include', resolved.replace(/\/+/g, '/'));
      }
    });
  }

  // includePartials loops until no data-include remain (or a safety limit)
  async function includePartials(){
    let iterations = 0; const maxIter = 10;
    while(document.querySelector('[data-include]') && iterations < maxIter){
      iterations++;
      const nodes = Array.from(document.querySelectorAll('[data-include]'));
      await Promise.all(nodes.map(async el => {
        const path = el.getAttribute('data-include');
        try{
          const res = await fetch(path);
          if(!res.ok) throw new Error('Not found: '+path);
          const text = await res.text();
          // if head include, insert into <head>
          if(path.toLowerCase().includes('head.html')){
            const tmp = document.createElement('div'); tmp.innerHTML = text;
            runScripts(tmp);
            Array.from(tmp.childNodes).forEach(node => document.head.appendChild(node));
            el.remove();
            return;
          }

          // create fragment and resolve nested includes relative to the fetched file
          const base = dirname(path);
          const tmp = document.createElement('div'); tmp.innerHTML = text;
          resolveNestedIncludes(tmp, base);
          runScripts(tmp);
          // replace element with the fragment's children
          el.replaceWith(...Array.from(tmp.childNodes));
        }catch(e){
          console.warn('Include failed',path,e);
        }
      }));
    }
    if(iterations>=maxIter) console.warn('includePartials hit max iterations; possible recursive includes');
  }

  // --- Modrinth loader ---
  // config file: data/modrinth.json { "orgSlug": "your-org", "token": "OPTIONAL_TOKEN" }
  async function fetchModrinthProjects(orgSlug, token){
    // Try team endpoint first, fallback to user endpoint
    const headers = token? { 'Authorization': token } : {};
    const tryUrls = [
      `https://api.modrinth.com/v2/team/${encodeURIComponent(orgSlug)}/projects`,
      `https://api.modrinth.com/v2/user/${encodeURIComponent(orgSlug)}/projects`,
    ];
    for(const url of tryUrls){
      try{
        const res = await fetch(url, {headers});
        if(!res.ok) continue;
        const json = await res.json();
        // Expect array of projects for these endpoints
        if(Array.isArray(json)) return json;
        // some endpoints might wrap in an object
        if(json.projects && Array.isArray(json.projects)) return json.projects;
      }catch(e){ console.warn('Modrinth fetch error',url,e); }
    }
    return null;
  }

  function mapProjectToCard(p){
    return {
      id: p.project_id || p.id || p.slug || p.title,
      name: p.title || p.name || p.project_id,
      description: (p.description || '').replace(/(<([^>]+)>)/gi, '').slice(0,180),
      thumbnail: (p.icon || p.logo_url) || (p.gallery && p.gallery[0]) || '/assets/img/default-thumb.png',
      download: `https://modrinth.com/project/${p.slug || p.project_id}`,
      type: p.project_type || (p.categories && p.categories[0]) || 'other',
      tags: p.tags || []
    };
  }

  async function loadFromModrinth(){
    try{
      const cfgRes = await fetch('/data/modrinth.json');
      if(!cfgRes.ok) return null;
      const cfg = await cfgRes.json();
      if(!cfg.orgSlug) return null;
      const projects = await fetchModrinthProjects(cfg.orgSlug, cfg.token);
      if(!projects) return null;
      return projects.map(mapProjectToCard);
    }catch(e){ console.warn('Failed Modrinth loader',e); return null; }
  }

  // render cards grouped by type
  function renderModpacksGrouped(items){
    const container = document.querySelector('#modpacks-list');
    if(!container) return;
    container.innerHTML = '';
    const groups = {};
    items.forEach(it=>{ const t = (it.type||'other').toLowerCase(); (groups[t]=groups[t]||[]).push(it); });
    Object.keys(groups).forEach(group=>{
      const heading = document.createElement('div'); heading.className='section-subheading'; heading.innerHTML = `<h3 style="margin:8px 0 6px;text-transform:capitalize">${group}</h3>`;
      container.appendChild(heading);
      groups[group].forEach((m,i)=>{
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
    });
  }

  // fallback to static data/modpacks.json
  async function loadFromStatic(){
    try{
      const res = await fetch('/data/modpacks.json');
      if(!res.ok) return [];
      return await res.json();
    }catch(e){ return []; }
  }

  async function loadModpacks(){
    // prefer Modrinth if configured
    const modrinthItems = await loadFromModrinth();
    if(modrinthItems && modrinthItems.length){ renderModpacksGrouped(modrinthItems); return; }
    const staticItems = await loadFromStatic();
    if(staticItems && staticItems.length) renderModpacksGrouped(staticItems);
  }

  function showNotification(text='Saved!'){
    const n = document.createElement('div'); n.className='notification'; n.textContent = text;
    document.body.appendChild(n);
    setTimeout(()=> n.remove(), 3800);
  }

  document.addEventListener('DOMContentLoaded', async ()=>{
    await includePartials();
    const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
    await loadModpacks();
    const b = document.getElementById('notify-sample'); if(b) b.addEventListener('click', ()=>showNotification('Hello from MC Show!'));
  });

  window.MCShow = {loadModpacks, showNotification, fetchModrinthProjects};
})();
