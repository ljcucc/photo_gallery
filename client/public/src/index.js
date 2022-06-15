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
import "./ImageView.js";

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

  // render website layout
  render() {
    return html` 
      <router-outlet></router-outlet>
      <unusable-warning></unusable-warning>
      <!-- App bar -->
    `;
  }
}

class AppHomeOutlet extends LitElement{
  openMenu(){
    let root = this.shadowRoot;
    let dropMenu = root.querySelector("drop-menu");

    dropMenu.toggleMenu();
  }

  openLoginDialog(){
    let root = this.shadowRoot;
    let loginDialog = root.querySelector("login-dialog");

    console.log("open dialog");

    loginDialog.openDialog();
  }

  openAboutDialog(){
    let root = this.shadowRoot;
    let aboutDialog = root.querySelector("#about-dialog");
    aboutDialog.openDialog();
    console.log("open dialog");
  }

  openDrawer(){
    let root = this.shadowRoot;
    let drawer = root.querySelector("app-drawer");

    drawer.openDrawer();
  }

  openUploader(){
    console.log("upload")
    let root = this.shadowRoot;
    let upload = root.querySelector("upload-dialog"); 
    upload.openDialog();
  }

  render(){
    return html`
      <upload-dialog>
      <app-topbar search>
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
                  this.openAboutDialog()
                  break;
                case "Login":
                  this.openLoginDialog();
                  break;
                case "Signup":
                  break;
                case "Source Code":
                  window.open("https://github.com/ljcucc/photo_gallery");
                  break;
                case "Home site":
                  window.open("https://ljcu.cc");
                  break;
                default:
                  alert("dropdown menu option not found.")
              }
            }).bind(this)}" list="Login,Signup;split,Source Code,Home site;split,Settings,About"></dropmenu-list>
          </drop-menu>
        </appbar-items>
      </app-topbar>

      <!-- dialogs -->
      <info-dialog id="about-dialog" title="Welcome!">
        This project is an open source project, you can find it here: <a href="https://github.com/ljcucc/photo_gallery" target="_blank" rel="noopener noreferrer">https://github.com/ljcucc/photo_gallery</a>
      </info-dialog>
      <login-dialog></login-dialog>

      <!-- fixed components -->
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
        <drawer-item selected="false" @click="${()=>{
          Router.go('/');
        }}">
          Home
        </drawer-item>
        <drawer-item @click="${()=>alert("feature unfinish")}">
          Albums
        </drawer-item>
        <drawer-item @click="${()=>alert("feature unfinish")}">
          Settings
        </drawer-item>
      </app-drawer>
      <slot></slot>
      </upload-dialog>
    `;
  }
}

export var router;

class RouterOutlet extends LitElement{
  constructor(){
    super();
  }

  firstUpdated(){
    router = new Router(this);
    router.setRoutes([
      {path: "/", component: 'app-home'},
      {path: "/view/:id", component: 'image-view'}
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
    <app-home-outlet>
      <project-banner></project-banner>
      <photos-grid route="home"></photos-grid>
    </app-home-outlet>
    `;
  }
}

// define app root as custom element
customElements.define("app-root", App);
customElements.define("app-home", AppHome);
customElements.define("router-outlet", RouterOutlet);
customElements.define("app-home-outlet", AppHomeOutlet);