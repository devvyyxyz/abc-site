// include.js — simple partial include loader that looks for `data-include` attributes
(async function(){
  async function includeAll(){
    const nodes = Array.from(document.querySelectorAll('[data-include]'))
    if(!nodes.length) return
    for(const node of nodes){
      const src = node.getAttribute('data-include')
      if(!src) continue
      try{
        const res = await fetch(src)
        if(!res.ok) { console.warn('include failed', src); continue }
        const html = await res.text()
        node.innerHTML = html
        node.removeAttribute('data-include')
      }catch(e){
        console.warn('include error', src, e)
      }
    }
    // handle nested includes recursively if any remain
    if(document.querySelectorAll('[data-include]').length) await includeAll()
  }

  // run on DOMContentLoaded so elements exist
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', includeAll)
  } else {
    includeAll()
  }
})()
