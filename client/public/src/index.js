/*
CREDIT

urlpattern-polyfill: https://github.com/kenchris/urlpattern-polyfill/blob/main/LICENSE
*/

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

import "./appbar.js";
import "./IconButton.js";
import "./login.js";
import "./photos.js";

// Polyfills
// import { URLPattern } from "https://cdn.jsdelivr.net/npm/urlpattern-polyfill@5.0.3/dist/urlpattern.js";
if (!window.URLPattern) { 
  const { URLPattern } = await import("https://cdn.jsdelivr.net/npm/urlpattern-polyfill@5.0.3/dist/urlpattern.js");
  window.URLPattern = URLPattern;
}else{
  console.log("Polyfill: URLPattern exists!")
}

// app-root compoment
class App extends LitElement{
  // render website layout
  render(){
    return html`
      <app-topbar></app-topbar>
      <login-dialog></login-dialog>
      <photos-grid></photos-grid>
    `;
  }
}

// define app root
customElements.define("app-root", App);// 