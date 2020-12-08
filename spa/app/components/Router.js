import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { PostCard } from "./PostCard.js";
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";

export async function Router() {
  const $main = document.getElementById("main");

  let { hash } = location;
  //console.log(hash);
  $main.innerHTML = null;

  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        // console.log(posts);
        let html = "";
        posts.forEach((post) => (html += PostCard(post)));
        $main.innerHTML = html;
      },
    });
    //console.log(api.POST)
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch");
    if (!query) {
      document.querySelector(".loader").style.display = "none";
      return false;
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        //console.log(search);
        let html = "";
        if (search.length === 0) {
          html = `
          <p class="error">
          No existe resultado de búsqueda para el término <mark>${query}</mark>
          </p>
          `;
        } else {
          search.forEach((post) => (html += SearchCard(post)));
        }
        $main.innerHTML = html;
      },
    });
  } else if (hash === "#/contacto") {
    $main.innerHTML = `<h2>seccion de contacto</h2>`;
  } else {
    $main.innerHTML = `<h2>contenido</h2>`;
    await ajax({
      url: `${api.POST}/${localStorage.getItem("wpPostid")}`,
      cbSuccess: (post) => {
        //console.log(post);
        $main.innerHTML = Post(post);
      },
    });
  }
  document.querySelector(".loader").style.display = "none";
}
