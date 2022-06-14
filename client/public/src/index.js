/*

  file: index.js

  This is the entry of everything, bootstrap everything together. check all source below ↓

  CREDIT

  urlpattern-polyfill: https://github.com/kenchris/urlpattern-polyfill/blob/main/LICENSE
*/

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { Router } from "https://unpkg.com/@vaadin/router@1.7.4/dist/vaadin-router.js";

// All component that related to app-root or at the root(top) will import from here
import "./components/appbar.js";
import "./components/IconButton.js";
import "./login.js";
import "./components/photos.js";
import "./components/InfoDialog.js";
import "./ProjectBanner.js";
import "./components/UnusableWarning.js";
import "./components/FloatButton.js";
import "./components/uploadDialog.js";

let isLocalhost = ()=>location.hostname == "localhost" || location.hostname == "127.0.0.1"

// redirect to https if using http
if (location.protocol == "http:" && !(isLocalhost())) location.protocol = "https:";

// const enableServiceWorker = !isLocalhost();

// if (enableServiceWorker) {
//   // working with service-worker in order to make PWA installation works
//   window.addEventListener('load', () => {
//     async function registerSW() {
//       if ('serviceWorker' in navigator) {
//         try {
//           await navigator.serviceWorker.register('./service-worker.js');
//         } catch (e) {
//           console.log('ServiceWorker registration failed. Sorry about that.', e);
//         }
//       } else {
//         console.log('Your browser does not support ServiceWorker.');
//       }
//     }
//     registerSW();
//   });
// }


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
  constructor(){
    super();
  }

  firstUpdated() {
    let root = this.shadowRoot;
  }

  openMenu(){
    let root = this.shadowRoot;
    let dropMenu = root.querySelector("drop-menu");

    dropMenu.toggleMenu();
  }

  openLoginDialog(){
    let root = this.shadowRoot;
    let loginDialog = root.querySelector("login-dialog");

    loginDialog.openDialog();
  }

  openAboutDialog(){

  }

  openDrawer(){
    let root = this.shadowRoot;
    let drawer = root.querySelector("app-drawer");

    drawer.openDrawer();
  }

  openUploader(){
    let root = this.shadowRoot;
    let upload = root.querySelector("upload-dialog"); 
    upload.openDialog();
  }

  // render website layout
  render() {
    return html`
      <!-- App bar -->
      <upload-dialog>
      <app-topbar>
        <appbar-items slot="left">
          <icon-button name="menu" @click="${this.openDrawer}"></icon-button>
          <appbar-title title="Public Photos"></appbar-title>
        </appbar-items>
        <appbar-items slot="right">
          <icon-button name="more_vert" @click="${this.openMenu}"></icon-button>

          <drop-menu>
            <dropmenu-list @item-click="${((e)=>{
              const id = e.detail?.id || "id not found";

              switch(id){
                case "About":
                  alert("PhotoBackup v0.1\nAuthor: https://www.ljcu.cc");
                  break;
                case "Login":
                  this.openLoginDialog();
                  break;
                case "Signup":
                  break;
                default:
                  alert("dropdown menu option not found.")
              }
            }).bind(this)}" list="Login,Signup;split,About"></dropmenu-list>
          </drop-menu>
        </appbar-items>
      </app-topbar>

      <!-- dialogs -->
      <login-dialog></login-dialog>
      <info-dialog id="about-dialog" title="Welcome!">
        This project is an open source project, you can find it here: <a href="https://github.com/ljcucc/photo_gallery" target="_blank" rel="noopener noreferrer">https://github.com/ljcucc/photo_gallery</a>
      </info-dialog>

      <!-- fixed components -->
      <unusable-warning></unusable-warning>
      <project-banner></project-banner>
      <float-icon-button name="upload" @click="${this.openUploader}"></float-icon-button>
      <app-drawer>
        <drawer-title>
          <span slot="title">
            iPhoto
          </span>
          <span slot="subtitle">
            Gallery for <del>everyone</del> myself.
          </span>
        </drawer-title>
        <drawer-item selected="false">
          Home
        </drawer-item>
        <drawer-item>
          Albums
        </drawer-item>
        <drawer-item>
          Settings
        </drawer-item>
      </app-drawer>

      <router-outlet></router-outlet>

      </upload-dialog>
    `;
  }
}

class RouterOutlet extends LitElement{
  constructor(){
    super();
  }

  firstUpdated(){
    const router = new Router(this);
    router.setRoutes([
      {path: "/", component: 'app-home'}
    ])
  }

  render(){
    return html`
      <slot></slot>
    `;
  }
}

class AppHome extends LitElement{
  render(){
    return html`
      <photos-grid route="home"></photos-grid>
    `;
  }
}

// define app root as custom element
customElements.define("app-root", App);
customElements.define("app-home", AppHome);
customElements.define("router-outlet", RouterOutlet);