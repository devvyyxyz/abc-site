const API = 'https://api.modrinth.com/v2'

const el = id => document.getElementById(id)
const slugInput = el('slug-input')
const loadBtn = el('load-btn')
const titleEl = el('project-title')
const descEl = el('project-desc')
const iconEl = el('icon')
const downloadBtn = el('download-btn')
const projectLink = el('project-link')
const versionsEl = el('versions')

async function fetchProject(slug){
  const res = await fetch(`${API}/project/${encodeURIComponent(slug)}`)
  if(!res.ok) throw new Error('Project not found')
  return res.json()
}

async function fetchVersions(projectId){
  const res = await fetch(`${API}/project/${projectId}/version`) 
  if(!res.ok) throw new Error('Versions not found')
  return res.json()
}

function renderProject(p){
  titleEl.textContent = p.title || p.slug
  descEl.textContent = p.description || p.summary || 'No description provided.'
  projectLink.href = `https://modrinth.com/project/${p.slug}`
  downloadBtn.href = `https://modrinth.com/project/${p.slug}`
  if(p.icon_url){ iconEl.src = p.icon_url }
  else{ iconEl.style.display = 'none' }
}

function renderVersions(list){
  versionsEl.innerHTML = ''
  if(!list.length){ versionsEl.textContent = 'No versions found.'; return }
  // sort by date published descending
  list.sort((a,b)=> new Date(b.date_published) - new Date(a.date_published))
  list.slice(0,6).forEach(v=>{
    const div = document.createElement('div')
    div.className = 'version'
    const left = document.createElement('div')
    left.innerHTML = `<strong>${v.name || v.version_number}</strong><div style="font-size:12px;color:var(--muted)">${v.version_number} • ${v.loaders?.join(', ')||'unknown'}</div>`
    const right = document.createElement('div')
    const file = (v.files && v.files[0]) || null
    const a = document.createElement('a')
    a.className = 'btn'
    a.target = '_blank'
    a.rel = 'noopener'
    if(file && file.url){
      a.href = file.url
      a.textContent = 'Download'
    } else if(v.project_id){
      a.href = `https://modrinth.com/project/${v.project_id}`
      a.textContent = 'Open'
    } else {
      a.href = '#'
      a.textContent = 'Open'
    }
    right.appendChild(a)
    div.appendChild(left)
    div.appendChild(right)
    versionsEl.appendChild(div)
  })
  // set primary download to newest file if possible
  const newest = list[0]
  if(newest && newest.files && newest.files[0] && newest.files[0].url){
    downloadBtn.href = newest.files[0].url
    downloadBtn.textContent = `Download ${newest.version_number}`
  }
}

async function load(slug='abc'){
  try{
    descEl.textContent = 'Loading project…'
    const p = await fetchProject(slug)
    renderProject(p)
    const versions = await fetchVersions(p.project_id)
    renderVersions(versions)
  }catch(err){
    titleEl.textContent = 'Not found'
    descEl.textContent = err.message || 'Failed to load project'
    versionsEl.innerHTML = ''
    downloadBtn.href = `https://modrinth.com/organization/abcxyz`
    downloadBtn.textContent = 'Open on Modrinth'
  }
}

loadBtn.addEventListener('click', ()=>{
  const slug = slugInput.value.trim() || 'abc'
  load(slug)
})

// init: attempt default slug 'abc'
document.addEventListener('DOMContentLoaded', ()=> load('abc'))
