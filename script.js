(() => {
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  if (header) {
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  document.body.classList.add('is-enhanced');
  document.querySelectorAll('.action-deck a').forEach(node => node.classList.add('metal-edge'));

  const tabs = [...document.querySelectorAll('[data-ready]')];
  const panels = [...document.querySelectorAll('[data-ready-panel]')];
  const tabList = document.querySelector('[data-ready-tabs]');
  function selectReady(key, moveFocus = false) {
    if (!tabs.some(tab => tab.dataset.ready === key)) return;
    tabs.forEach(tab => {
      const active = tab.dataset.ready === key;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && moveFocus) tab.focus();
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.readyPanel !== key; });
  }
  if (tabList) {
    tabList.hidden = false;
    tabList.setAttribute('role', 'tablist');
    tabs.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      tab.addEventListener('click', () => selectReady(tab.dataset.ready));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); selectReady(tabs[next].dataset.ready, true); }
      });
    });
    panels.forEach(panel => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'ready-tab-' + panel.dataset.readyPanel);
    });
    selectReady('home');
  }
  function openDestination(hash) {
    const id = hash.replace(/^#/, '');
    if (id.startsWith('ready-')) selectReady(id.slice(6));
    const destination = document.getElementById(id);
    if (destination?.matches('details')) destination.open = true;
    destination?.closest('details')?.setAttribute('open', '');
  }
  openDestination(location.hash);
  window.addEventListener('hashchange', () => openDestination(location.hash));
  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    if (anchor.dataset.readyTarget) selectReady(anchor.dataset.readyTarget);
    openDestination(anchor.hash);
  });

  const search = document.querySelector('.fire-search');
  const input = document.querySelector('#fire-search');
  const results = document.querySelector('#search-results');
  const matches = document.querySelector('[data-search-matches]');
  const status = document.querySelector('[data-search-status]');
  const township = 'https://ukiahcomputerworks.github.io/brooktrails-township-preview/';
  const index = [
    {title:'Volunteer applications', href:'#volunteer-process', owner:'Fire Department', words:'fire form forms application apply recruitment firefighter join volunteer'},
    {title:'Check burning: fire safety and air quality', href:'#burn', owner:'Fire Department', words:'burn burning smoke status conditions permit permits cal fire aqmd air quality'},
    {title:'Burn permit services', href:'#permit-resources', owner:'Fire resources, official agencies', words:'burn form forms permit permits application cal fire air quality aqmd'},
    {title:'Protect your home', href:'#ready-home', owner:'Fire Department', words:'defensible space property vegetation wildfire prevention prepare preparedness house home inspection'},
    {title:'Find your evacuation zone', href:'#ready-zone', owner:'Fire Department', words:'evacuation zone zones map route leave prepare emergency'},
    {title:'Sign up for emergency alerts', href:'#ready-alerts', owner:'Fire Department', words:'notifications alerts mendoalert warnings signup register emergency'},
    {title:'Contact Fire or find the station', href:'#contact', owner:'Fire Department', words:'phone email address station contact directions fax office help non emergency'},
    {title:'Department services', href:'#services', owner:'Fire Department', words:'response fire rescue medical ems services department about mutual aid'},
    {title:'District forms and records', href:township+'resources/', owner:'Township site ↗', words:'township district form forms application applications water sewer rental community center grove board budget records documents policy ordinance'},
    {title:'Water and sewer services', href:township+'water/', owner:'Township site ↗', words:'water sewer bill rates utility service connection leak'},
    {title:'Building and property review', href:township+'planning/', owner:'Township site ↗', words:'planning building permit permits design property construction review form application'},
    {title:'Parks, trails, golf and facility rentals', href:township+'parks/', owner:'Township site ↗', words:'parks trail trails map golf rentals rent community center ohl redwood grove gathering'},
    {title:'District Board and meetings', href:township+'government/', owner:'Township site ↗', words:'board meeting meetings agenda minutes budget finance district government'},
    {title:'Contact the District Desk', href:township+'contact/', owner:'Township site ↗', words:'township district office phone contact water sewer help'}
  ];
  function renderSearch() {
    const query = input.value.toLowerCase().trim().slice(0, 160);
    matches.replaceChildren();
    if (!query) { results.hidden = true; status.textContent = ''; return; }
    const tokens = query.split(/\s+/).filter(token => !['a','the','i','need','to','for','my','a'].includes(token));
    const found = index.filter(item => tokens.length && tokens.every(token => (item.title+' '+item.words).toLowerCase().includes(token))).slice(0, 8);
    found.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      const strong = document.createElement('strong'); strong.textContent = item.title;
      const small = document.createElement('small'); small.textContent = item.owner;
      a.append(strong, small); matches.append(a);
    });
    if (!found.length) {
      const p = document.createElement('p'); p.textContent = 'No exact match. Try “volunteer”, “burn permit”, “water”, or ask the station.'; matches.append(p);
      const a = document.createElement('a'); a.href = '#contact'; a.textContent = 'Ask Fire for help →'; matches.append(a);
      const b = document.createElement('a'); b.href = township+'resources/'; b.textContent = 'Search district forms on the Township site ↗'; matches.append(b);
    }
    results.hidden = false;
    status.textContent = found.length ? found.length+' matching resources' : 'No exact match. Help links shown.';
    input.setAttribute('aria-expanded', 'true');
  }
  if (search && input && results) {
    input.setAttribute('aria-expanded', 'false');
    input.addEventListener('input', renderSearch);
    input.addEventListener('focus', () => { if (input.value.trim()) renderSearch(); });
    search.addEventListener('submit', event => { event.preventDefault(); renderSearch(); });
    search.addEventListener('keydown', event => {
      if (event.key === 'Escape') { results.hidden = true; input.setAttribute('aria-expanded','false'); input.focus(); }
      const links = [...matches.querySelectorAll('a')];
      if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && !results.hidden && links.length) {
        event.preventDefault();
        const current = links.indexOf(document.activeElement);
        const next = event.key === 'ArrowDown' ? (current + 1) % links.length : (current - 1 + links.length) % links.length;
        links[next].focus();
      }
    });
    matches.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link) return;
      results.hidden = true; input.setAttribute('aria-expanded','false');
      if (link.hash && link.origin === location.origin && link.pathname === location.pathname) {
        openDestination(link.hash);
        const target = document.querySelector(link.hash);
        if (target) { target.tabIndex = -1; target.focus({preventScroll:true}); target.scrollIntoView({block:'start'}); }
      }
    });
    document.addEventListener('click', event => {
      if (!search.contains(event.target)) { results.hidden = true; input.setAttribute('aria-expanded','false'); }
    });
  }

  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        navLinks.forEach(link => {
          if (link.hash === '#'+entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin:'-25% 0px -50% 0px'});
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
})();
