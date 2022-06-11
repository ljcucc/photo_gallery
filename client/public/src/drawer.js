import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { classMap } from 'https://unpkg.com/lit-html/directives/class-map'; // origin: lit-html/directives/class-map 
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map'; // origin: lit-html/directives/style-map 

class AppDrawer extends LitElement{
  static properties = {
    open: {
      type: Boolean,
      reflect: true
    },
    show: {
      type: Boolean,
    }
  }

  constructor(){
    super();

    this.open = false;
  }

  static styles = css`

    :host{
      --drawer-width: 80vmin;
    }

    .drawer-container{
      position: fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      transition: all 0.35s;
      background: rgba(0,0,0,0);
      backdrop-filter: blur(0px);
      display: none;

      z-index: 2000;
    }

    .drawer-container.open{
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      background:rgba(0,0,0,.35);
    }

    .drawer{
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      left:0px;
      margin-left: calc( var(--drawer-width) * -1 );
      top:0;
      bottom:0;
      max-width: 500px;
      width: var(--drawer-width);
      height: 100vh;
      /* display: none; */

      transition: all 0.35s;
    }

    .show{
      display: block;
    }

    .drawer.open{
      margin-left: 0;
    }
  `;

  openDrawer(){
    this.show = true;
    setTimeout(()=>{
      this.open = true;
    }, 10);
  }

  closeDrawer(){
    this.open = false;
    setTimeout(()=>{
      this.show = false;
    }, 360);
  }

  render(){
    return html`
    <div @click="${this.closeDrawer}" class="${classMap({'drawer-container':true, 'open': this.open, 'show': this.show})}">
      <div class="${classMap({'drawer': true, 'open': this.open, 'show': this.show})}">
        <div class="drawer-container">
          <slot></slot>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define("app-drawer", AppDrawer);