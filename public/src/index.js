import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

import "./appbar.js";
import "./IocnButton.js";
import "./login.js"

// app-root compoment
class App extends LitElement{
  // render website layout
  render(){
    return html`
      <app-topbar></app-topbar>
      <login-dialog></login-dialog>
    `;
  }
}

// define app root
customElements.define("app-root", App);