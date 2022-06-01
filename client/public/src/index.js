/*
CREDIT

urlpattern-polyfill: https://github.com/kenchris/urlpattern-polyfill/blob/main/LICENSE
*/

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

import "./appbar.js";
import "./IconButton.js";
import "./login.js";
import "./photos.js";
import "./InfoDialog.js";

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
  firstUpdated(){
    let root = this.shadowRoot;
  }
  // render website layout
  render(){
    return html`
      <app-topbar></app-topbar>
      <login-dialog></login-dialog>
      <photos-grid></photos-grid>

      <info-dialog open="true" description="This website is in development, may have issues. Report bug here: https://github.com/ljcucc/photo_gallery/issues"></info-dialog>
    `;
  }
}

// define app root
customElements.define("app-root", App);// 