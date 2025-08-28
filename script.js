function toggleMenu(){
  const m = document.getElementById('mainmenu');
  const t = document.querySelector('.menu-toggle');
  m.classList.toggle('open');
  const open = m.classList.contains('open');
  t.setAttribute('aria-expanded', open ? 'true' : 'false');
}
document.getElementById('year').textContent = new Date().getFullYear();

/* Generate a circular favicon from files/profile.jpg (tab icon) */
(function(){
  try{
    var img = new Image();
    img.onload = function(){
      var size = 64, c = document.createElement('canvas');
      c.width = size; c.height = size;
      var ctx = c.getContext('2d');
      ctx.beginPath(); ctx.arc(size/2, size/2, size/2, 0, Math.PI*2); ctx.closePath(); ctx.clip();
      var r = Math.max(size / img.width, size / img.height);
      var w = img.width * r, h = img.height * r;
      ctx.drawImage(img, (size - w)/2, (size - h)/2, w, h);
      var link = document.querySelector('link[rel="icon"]') || document.createElement('link');
      link.rel = 'icon'; link.type = 'image/png'; link.href = c.toDataURL('image/png');
      document.head.appendChild(link);
    };
    img.src = 'files/profile.jpg';
  }catch(e){}
})();




/* === Dark mode toggle === */
(function initTheme(){
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
})();

function toggleTheme(){
  const isDark = !document.body.classList.contains('dark');
  const theme = isDark ? 'dark' : 'light';
  applyTheme(theme);
  localStorage.setItem('theme', theme);
}

function applyTheme(theme){
  document.body.classList.toggle('dark', theme === 'dark');
  updateThemeToggleIcon(theme);
}

function updateThemeToggleIcon(theme){
  const btn = document.querySelector('.theme-toggle');
  if(!btn) return;
  btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  // show SUN when dark (to indicate switching back), MOON when light
  btn.innerHTML = theme === 'dark' ? iconSun() : iconMoon();
  // keep toggle icon white in dark; readable in light
  btn.style.color = theme === 'dark' ? '#ffffff' : 'var(--text)';
}


function iconSun(){
  return `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.76 4.84 5.34 3.42 3.92 4.84l1.42 1.42 1.42-1.42Zm10.48 0 1.42-1.42 1.42 1.42-1.42 1.42-1.42-1.42ZM12 4V2h0v2Zm0 18v-2h0v2Zm8-10h2v0h-2ZM2 12H0v0h2Zm3.76 7.16L4.34 20.6l1.42 1.42 1.42-1.42-1.42-1.42Zm12.48 0 1.42 1.42 1.42-1.42-1.42-1.42-1.42 1.42ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/>
    </svg>`;
}

function iconMoon(){
  return `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`;
}
