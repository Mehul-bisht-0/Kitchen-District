const menus = {
  morning: [
    ['French Toast', 'A golden start, with cream, maple syrup, and chocolate.'],
    ['Eggs Benedict', 'Poached eggs on an English muffin, with chicken salami and hollandaise.'],
    ["Homemade Baker’s Basket", 'A morning assortment of croissant, muffin, Danish pastry, and doughnut.']
  ],
  comfort: [
    ['Mushroom Cappuccino', 'Earthy mushrooms, thyme, and a touch of cream.'],
    ['Classic Cream of Tomato Soup', 'A familiar favourite, finished with cream and a pesto crostini.'],
    ['Tomato Gazpacho', 'A cool beginning from the soup selection.']
  ],
  indian: [
    ['Pudina Paneer Tikka', 'Cottage cheese meets mint, coriander, and a light yoghurt marinade.'],
    ['Murgh Malai Tikka', 'Chicken from the grill, made rich with cashew and cheese.'],
    ['Tandoori Bharwan Aloo', 'Stuffed potatoes with nuts, yoghurt, and cheese.']
  ]
};
const items = document.querySelector('#menu-items');
const tabs = [...document.querySelectorAll('[data-category]')];
function selectMenu(tab) {
  tabs.forEach(t => { t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1; });
  document.querySelector('#menu-panel').setAttribute('aria-labelledby', tab.id);
  items.replaceChildren(...menus[tab.dataset.category].map(([name, description], i) => {
    const article = document.createElement('article'); article.className = 'menu-item';
    const num = document.createElement('span'); num.className = 'dish-no'; num.textContent = `0${i + 1}`;
    const title = document.createElement('h3'); title.textContent = name;
    const copy = document.createElement('p'); copy.textContent = description;
    article.append(num, title, copy); return article;
  }));
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectMenu(tab));
  tab.addEventListener('keydown', e => {
    let next;
    if(e.key === 'ArrowRight') next = tabs[(index+1)%tabs.length];
    if(e.key === 'ArrowLeft') next = tabs[(index+tabs.length-1)%tabs.length];
    if(e.key === 'Home') next=tabs[0]; if(e.key === 'End') next=tabs.at(-1);
    if(next){e.preventDefault();selectMenu(next);next.focus();}
  });
});
selectMenu(tabs[0]);
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('#navigation');
function closeNav(){mobileToggle.setAttribute('aria-expanded','false');mobileToggle.setAttribute('aria-label','Open navigation');nav.classList.remove('is-open');}
mobileToggle.addEventListener('click',()=>{const open=mobileToggle.getAttribute('aria-expanded')!=='true';mobileToggle.setAttribute('aria-expanded',String(open));mobileToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('is-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav();});
const reservation = document.querySelector('#reservation-dialog');
const form = document.querySelector('#reservation-form');
const result = document.querySelector('#reservation-result');
const date = document.querySelector('#reservation-date');
const today = new Date(); const localDate = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
date.min=localDate; date.value=localDate;
document.querySelectorAll('[data-reserve]').forEach(b=>b.addEventListener('click',()=>{closeNav();reservation.showModal();}));
document.querySelectorAll('dialog').forEach(d=>{
  d.querySelector('.dialog-close').addEventListener('click',()=>d.close());
  d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
  d.addEventListener('close',()=>{document.body.style.overflow='';});
});
const observer=new MutationObserver(()=>{document.body.style.overflow=document.querySelector('dialog[open]')?'hidden':'';});
document.querySelectorAll('dialog').forEach(d=>observer.observe(d,{attributes:true,attributeFilter:['open']}));
form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const values=new FormData(form);const prettyDate=new Date(`${values.get('date')}T12:00:00`).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
  result.replaceChildren();
  const heading=document.createElement('h3');heading.textContent='A lovely plan.';
  const summary=document.createElement('p');summary.textContent=`${prettyDate} · ${values.get('time')} · ${values.get('guests')}`;
  const note=document.createElement('p');note.textContent='This is a demo preview, not a confirmed reservation. Call the restaurant below to arrange your visit.';note.style.marginTop='15px';
  const edit=document.createElement('button');edit.type='button';edit.textContent='Change the details';edit.addEventListener('click',()=>{result.hidden=true;form.hidden=false;date.focus();});
  result.append(heading,summary,note,edit);form.hidden=true;result.hidden=false;edit.focus();
});
const gallery=[
  {src:'assets/drinks.jpg',alt:'Sunlight falling across colourful chairs and a table set for a leisurely meal',caption:'A table worth lingering at.'},
  {src:'assets/dining-room.jpg',alt:'The dining room with warm wood, sculptural lighting, and tables set for dinner',caption:'Warm light. Good company. A little more time.'}
];
let current=0;const photo=document.querySelector('#gallery-photo');
function showPhoto(index){current=(index+gallery.length)%gallery.length;photo.src=gallery[current].src;photo.alt=gallery[current].alt;document.querySelector('#gallery-caption').textContent=gallery[current].caption;document.querySelector('#gallery-count').textContent=`0${current+1} / 02`;document.querySelector('#gallery-open').setAttribute('aria-label',`Enlarge photograph: ${gallery[current].caption}`);}
document.querySelector('#gallery-prev').addEventListener('click',()=>showPhoto(current-1));
document.querySelector('#gallery-next').addEventListener('click',()=>showPhoto(current+1));
document.querySelector('#gallery-open').addEventListener('click',()=>{const p=document.querySelector('#lightbox-photo');p.src=gallery[current].src;p.alt=gallery[current].alt;document.querySelector('#lightbox-caption').textContent=gallery[current].caption;document.querySelector('#lightbox').showModal();});
