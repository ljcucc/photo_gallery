/*

  file: index.js

  This is the entry of everything. check all source below ↓

  CREDIT

  urlpattern-polyfill: https://github.com/kenchris/urlpattern-polyfill/blob/main/LICENSE
*/

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

// All component that related to app-root or at the root(top) will import from here
import "./appbar.js";
import "./IconButton.js";
import "./login.js";
import "./photos.js";
import "./InfoDialog.js";
import "./ProjectBanner.js";
import "./UnusableWarning.js";

// redirect to https if using http
if (location.protocol == "http:" && !(location.hostname == "localhost" || location.hostname == "127.0.0.1")) location.protocol = "https:";

// working with service-worker in order to make PWA installation works
window.addEventListener('load', () => {
  async function registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./service-worker.js');
      } catch (e) {
        console.log('ServiceWorker registration failed. Sorry about that.', e);
      }
    } else {
      console.log('Your browser does not support ServiceWorker.');
    }
  }
  registerSW();
});



// >>> Polyfills START
if (!window.URLPattern) {
  const { URLPattern } = await import("https://cdn.jsdelivr.net/npm/urlpattern-polyfill@5.0.3/dist/urlpattern.js");
  window.URLPattern = URLPattern;
} else {
  console.log("Polyfill: URLPattern exists!")
}
// <<< Polyfills END

// app-root compoment
class App extends LitElement {
  firstUpdated() {
    let root = this.shadowRoot;
  }

  // render website layout
  render() {
    return html`
      <app-topbar></app-topbar>

      <login-dialog></login-dialog>
      <unusable-warning></unusable-warning>

      <project-banner></project-banner>

      <photos-grid></photos-grid>

      <info-dialog open title="Welcome!" description="This project is an open source project, you can find it here: https://github.com/ljcucc/photo_gallery"></info-dialog>
    `;
  }
}

// define app root as custom element
customElements.define("app-root", App);