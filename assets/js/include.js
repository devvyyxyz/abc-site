// include.js: partial include loader with nested relative support
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

  function resolveNestedIncludes(tmp, basePath){
    tmp.querySelectorAll('[data-include]').forEach(el=>{
      const inc = el.getAttribute('data-include');
      if(!inc) return;
      if(!/^(https?:)?\/\//i.test(inc) && !inc.startsWith('/')){
        const resolved = (basePath? basePath + '/' : '') + inc;
        el.setAttribute('data-include', resolved.replace(/\/+/g, '/'));
      }
    });
  }

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
          if(path.toLowerCase().includes('head.html')){
            const tmp = document.createElement('div'); tmp.innerHTML = text;
            runScripts(tmp);
            Array.from(tmp.childNodes).forEach(node => document.head.appendChild(node));
            el.remove();
            return;
          }
          const base = dirname(path);
          const tmp = document.createElement('div'); tmp.innerHTML = text;
          resolveNestedIncludes(tmp, base);
          runScripts(tmp);
          el.replaceWith(...Array.from(tmp.childNodes));
        }catch(e){
          console.warn('Include failed',path,e);
        }
      }));
    }
    if(iterations>=maxIter) console.warn('includePartials hit max iterations; possible recursive includes');
    // notify that partials are loaded
    document.dispatchEvent(new CustomEvent('partialsLoaded'));
  }

  document.addEventListener('DOMContentLoaded', includePartials);

  window.Include = { includePartials };
})();
