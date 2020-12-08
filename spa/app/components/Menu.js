export function Menu() {
  const $menu = document.createElement("nav");
  $menu.classList.add("menu");
  $menu.innerHTML = `
    <a href="#/">Home</a>
    <span></span>
    <a href="#/search">Búsqueda</a>
    <span></span>
    <a href="https://aprendejavascript.org" target="_blanck" rel="noopener">Aprende Javascript.org</a>
   `;
  return $menu;
}
