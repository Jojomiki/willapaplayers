const hero=document.querySelector('.hero');
const toggle=document.getElementById('curtainToggle');
const openButton=document.getElementById('openCurtains');
const panel=document.getElementById('spotInfo');
const panelTitle=document.getElementById('infoTitle');
const panelDescription=document.getElementById('infoDescription');
const panelGo=document.getElementById('infoGo');
const destinations={
 past:['Our Past','Explore our history, stories, and digital production archives.','past.html'],
 present:['Our Present','See what’s happening on stage and the projects underway.','present.html'],
 future:['Our Future','Auditions, volunteers, technical crew, builders, artists, and all kinds of talents are welcome.','future.html'],
 accessibility:['Accessibility','Information about visiting the Playhouse and accessibility details.','#accessibility'],
 players:['Willapa Players','Meet the volunteer-run organization behind the Playhouse.','#about'],
 calendar:['Calendar','Upcoming performances, concerts, and community events.','present.html#calendar'],
 building:['History of Willapa Playhouse','Discover the building and the stories within its walls.','past.html#building'],
 music:['Music at the Playhouse','Concerts, live music, and community jam sessions.','present.html#music'],
 visit:['Plan Your Visit','Tickets, concessions, accessibility, parking, and directions.','#visit'],
 guest:['Guest Book','Join our mailing list, leave a note, or ask us a question.','#guest'],
 explore:['Explore the Theater','A closer look backstage, upstairs, the balcony, sound booth, and downstairs.','#explore']
};
function setCurtains(closed){hero.classList.toggle('closed',closed);toggle.textContent=closed?'Open curtains':'Close curtains';toggle.setAttribute('aria-expanded',String(!closed));panel.hidden=true;}
toggle.addEventListener('click',()=>setCurtains(!hero.classList.contains('closed')));
openButton.addEventListener('click',()=>setCurtains(false));
// Keep curtains closed until the visitor chooses to open them.
setCurtains(true);
let currentKey=null;
document.querySelectorAll('.spot').forEach(btn=>btn.addEventListener('click',()=>{
 const key=btn.dataset.key; if(!panel.hidden&&currentKey===key){panel.hidden=true;return;}
 currentKey=key;const [title,desc,href]=destinations[key];panelTitle.textContent=title;panelDescription.textContent=desc;panelGo.href=href;panel.hidden=false;
}));
document.getElementById('infoClose').addEventListener('click',()=>panel.hidden=true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')panel.hidden=true});
// All unfinished destinations show a clearly marked preview, never a dead link.
const knownIds=new Set([...document.querySelectorAll('[id]')].map(x=>x.id));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const id=a.getAttribute('href').slice(1);if(knownIds.has(id))return;
 e.preventDefault();const title=a.textContent.trim();document.getElementById('destinationTitle').textContent=title;
 document.getElementById('destinationCopy').textContent='This page is a placeholder while the Willapa Players website is being built. The navigation and layout are ready for its content.';
 const section=document.getElementById('destination');section.hidden=false;section.scrollIntoView({behavior:'smooth'});
}));

// Mobile-only top navigation toggle.
const homeMenuButton=document.getElementById('homeMenuButton');
const homeMobileNav=document.getElementById('homeMobileNav');
homeMenuButton?.addEventListener('click',()=>{const expanded=homeMenuButton.getAttribute('aria-expanded')==='true';homeMenuButton.setAttribute('aria-expanded',String(!expanded));homeMobileNav.hidden=expanded;});
homeMobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{homeMobileNav.hidden=true;homeMenuButton.setAttribute('aria-expanded','false');}));
