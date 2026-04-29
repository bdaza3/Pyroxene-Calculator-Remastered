export function navbuttons(){
  const aboutPopup = document.getElementById('about-popup');
  const aboutNav = document.getElementById('about-nav');
  const aboutBtn = document.getElementById('about-btn');
  if (aboutNav) aboutNav.addEventListener('click', () => aboutPopup?.classList.add('active'));
  if (aboutBtn) aboutBtn.addEventListener('click', () => aboutPopup?.classList.add('active'));

  const closeAboutBtn = document.getElementById('close-about');
  if (closeAboutBtn) closeAboutBtn.addEventListener('click', () => aboutPopup?.classList.remove('active'));

  window.addEventListener('click', (event) => {
    if (event.target === aboutPopup) aboutPopup.classList.remove('active');
  });

  const contactPopup = document.getElementById('contact-popup');
  const contactNav = document.getElementById('contact-nav');
  const contactBtn = document.getElementById('contact-btn');
  if (contactNav) contactNav.addEventListener('click', () => contactPopup?.classList.add('active'));
  if (contactBtn) contactBtn.addEventListener('click', () => contactPopup?.classList.add('active'));

  const closeContactBtn = document.getElementById('close-contact');
  if (closeContactBtn) closeContactBtn.addEventListener('click', () => contactPopup?.classList.remove('active'));

  window.addEventListener('click', (event) => {
    if (event.target === contactPopup) contactPopup.classList.remove('active');
  });
}

export function menuDropdown(){
  const menuIcon = document.getElementById('menu-icon');
  const dropdownMenu = document.getElementById('dropdown-menu');
  if (!menuIcon || !dropdownMenu) return;
  menuIcon.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });
  document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = 'none';
    }
  });
}
