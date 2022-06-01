import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { classMap } from 'https://unpkg.com/lit-html/directives/class-map'; // origin: lit-html/directives/class-map 
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map'; // origin: lit-html/directives/style-map 

class AppDrawer extends LitElement{
  static properties = {
    open: {
      type: Boolean,
      reflect: true
    }
  }

  constructor(){
    super();

    this.open = false;
  }

  static styles = css`
    .drawer-container{
      position: fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background:rgba(0,0,0,.35);
    }

    .drawer{
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      left:0;
      top:0;
      bottom:0;
      width: 500px;
      height: 100vh;
    }
  `;

  openDrawer(){
    this.open = true;
    console.log("open")
  }

  closeDrawer(){
    this.open = false;
    console.log("close")
  }

  render(){
    return html`
    <div @click="${this.closeDrawer}" class="drawer-container" style="${styleMap({
      display: this.open? "": "none"
    })}">
      <div class="drawer"></div>
    </div>
    `;
  }
}

customElements.define("app-drawer", AppDrawer);