const API = 'https://api.modrinth.com/v2'

const el = id => document.getElementById(id)
const orgInput = el('org-input')
const loadOrgBtn = el('load-org')
const orgDesc = el('org-desc')
const orgLink = el('org-link')
const projectsEl = el('projects')

// Partials are loaded via `data-include` and `include.js`.
// Load partials into elements with ids `navbar` and `footer` if present
async function loadPartial(id, path){
  const holder = document.getElementById(id)
  if(!holder) return
  try{
    const res = await fetch(path)
    if(!res.ok) return
    holder.innerHTML = await res.text()
  }catch(e){/* ignore */}
}

// create a simple project card
function createProjectCard(p){
  const div = document.createElement('div')
  div.className = 'version'

  const left = document.createElement('div')
  left.className = 'project-row'

  const img = document.createElement('img')
  img.src = p.icon_url || '/assets/logo.png'
  img.alt = p.title || p.slug

  const meta = document.createElement('div')
  meta.className = 'meta'
  const title = document.createElement('div')
  title.innerHTML = `<strong>${p.title || p.slug}</strong> <div style="font-size:13px;color:var(--muted-2)">${p.slug}</div>`
  const short = document.createElement('div')
  short.style.fontSize = '13px'
  short.style.color = 'var(--muted-2)'
  short.textContent = p.description || p.short_description || ''

  meta.appendChild(title)
  meta.appendChild(short)

  left.appendChild(img)
  left.appendChild(meta)

  const right = document.createElement('div')
  right.style.display = 'flex'
  right.style.flexDirection = 'column'
  right.style.alignItems = 'flex-end'
  right.style.gap = '8px'

  const openA = document.createElement('a')
  openA.className = 'btn'
  openA.href = `https://modrinth.com/project/${p.slug}`
  openA.target = '_blank'
  openA.rel = 'noopener'
  openA.textContent = 'Open'

  const dlA = document.createElement('a')
  dlA.className = 'btn'
  dlA.textContent = 'Loading...'
  dlA.href = `https://modrinth.com/project/${p.slug}`
  dlA.target = '_blank'
  dlA.rel = 'noopener'

  right.appendChild(openA)
  right.appendChild(dlA)

  div.appendChild(left)
  div.appendChild(right)

  return {card: div, downloadLink: dlA}
}

// Try to load pre-fetched projects JSON produced during deploy. If not present, fallback to public API.
// Default orgId is the Modrinth organization id requested: CiTVkRcY
const DEFAULT_ORG_ID = 'CiTVkRcY'
const DEFAULT_ORG_SLUG = 'abcxyz'
async function loadProjectsFromData(orgId=DEFAULT_ORG_ID){
  try{
    const res = await fetch('/data/projects.json')
    if(res.ok){
      const data = await res.json()
      // If the fetched data contains an object wrapper, try to extract array
      if(Array.isArray(data)) return data
      if(data.projects && Array.isArray(data.projects)) return data.projects
    }
  }catch(e){/* ignore and fallback */}
  // fallback: try public API without token
  try{
    const res2 = await fetch(`${API}/organization/${encodeURIComponent(orgId)}/projects`)
    if(res2.ok) return res2.json()
  }catch(e){/* ignore */}
  return []
}

async function fetchVersions(projectId){
  try{
    const res = await fetch(`${API}/project/${projectId}/version`)
    if(!res.ok) return []
    return res.json()
  }catch(e){return []}
}

async function renderOrganization(orgId=DEFAULT_ORG_ID, orgSlug=DEFAULT_ORG_SLUG){
  if(orgLink) orgLink.href = `https://modrinth.com/organization/${orgSlug}`
  if(projectsEl) projectsEl.innerHTML = ''
  if(orgDesc) orgDesc.textContent = 'Loading projects…'
  try{
    const projects = await loadProjectsFromData(orgId)
    if(!projects || !projects.length){ if(orgDesc) orgDesc.textContent = 'No projects found.'; return }
    if(orgDesc) orgDesc.textContent = `${projects.length} project(s) found.`

    const cards = projects.map(p => {
      const {card, downloadLink} = createProjectCard(p)
      projectsEl.appendChild(card)
      return {p, downloadLink}
    })

    // fetch latest versions sequentially to avoid rate limits
    for(const item of cards){
      try{
        const versions = await fetchVersions(item.p.project_id)
        if(versions && versions.length){
          versions.sort((a,b)=> new Date(b.date_published) - new Date(a.date_published))
          const newest = versions[0]
          if(newest && newest.files && newest.files[0] && newest.files[0].url){
            item.downloadLink.href = newest.files[0].url
            item.downloadLink.textContent = `Download ${newest.version_number}`
            item.downloadLink.className = 'btn primary'
          } else {
            item.downloadLink.href = `https://modrinth.com/project/${item.p.slug}`
            item.downloadLink.textContent = 'View'
          }
        } else {
          item.downloadLink.href = `https://modrinth.com/project/${item.p.slug}`
          item.downloadLink.textContent = 'View'
        }
      }catch(e){
        item.downloadLink.href = `https://modrinth.com/project/${item.p.slug}`
        item.downloadLink.textContent = 'View'
      }
    }

  }catch(err){
    if(orgDesc) orgDesc.textContent = err.message || 'Failed to load organization'
  }
}

// initialize partials and render depending on page
document.addEventListener('DOMContentLoaded', async ()=>{
  // include.js will load `./partials/*` into elements that have `data-include`.
  // Wait a short time to allow include.js to populate navbar/footer, then render projects.
  // (include.js runs on DOMContentLoaded too; this small wait ensures includes are applied.)
  await new Promise(r => setTimeout(r, 80))
  if(document.getElementById('projects')){
    // render the organization projects grid using the configured org id
    renderOrganization(DEFAULT_ORG_ID, DEFAULT_ORG_SLUG)
  }
})
