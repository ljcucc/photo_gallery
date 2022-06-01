import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { classMap } from 'https://unpkg.com/lit-html/directives/class-map'; // origin: lit-html/directives/class-map 
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map'; // origin: lit-html/directives/style-map 

class AppDrawer extends LitElement{
  static properties = {
    open: {
      type: Boolean,
      reflect: true
    },
    _close: {
      type: Boolean,
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
      backdrop-filter: blur(10px);
      display: none;
    }

    .drawer-container.open{
      display:block;
      animation-name: open_bg;
      animation-duration: 0.35s;
      animation-iteration-count: 1;
      animation-direction: normal;

      -webkit-animation-name: open_bg;
      -webkit-animation-duration: 0.35s;
      -webkit-animation-iteration-count: 1;
      -webkit-animation-direction: normal;
    }

    .drawer-container.close{
      transition: all 0.35s;
      background: rgba(0,0,0,0);
      backdrop-filter: blur(0px);
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
      display: none;
    }

    .drawer.open{
      display:block;
      animation-name: open_drawer;
      animation-duration: 0.35s;
      animation-iteration-count: 1;
      animation-direction: normal;

      -webkit-animation-name: open_drawer;
      -webkit-animation-duration: 0.35s;
      -webkit-animation-iteration-count: 1;
      -webkit-animation-direction: normal;
    }

    .drawer.close{
      transition: all 0.35s;
      margin-left: -500px;
    }

    @keyframes open_drawer{
      from {
        margin-left: -500px;
      }

      to {
        margin-left:0;
      }
    }

    @keyframes open_bg{
      from {
        background: rgba(0,0,0,0);
        backdrop-filter: blur(0px);
      }

      to {
        background: rgba(0,0,0,0.35);
        backdrop-filter: blur(10px);
      }
    }
  `;

  openDrawer(){
    this.open = true;
    console.log("open")
  }

  closeDrawer(){
    // this.open = false;
    this._close = true;
    console.log("close")

    setTimeout(()=>{
      this._close = false;
      this.open = false;
    }, 360);
  }

  render(){
    return html`
    <div @click="${this.closeDrawer}" class="${classMap({'drawer-container':true, 'open': this.open, 'close': this._close})}">
      <div class="${classMap({'drawer': true, 'open': this.open, 'close': this._close})}"></div>
    </div>
    `;
  }
}

customElements.define("app-drawer", AppDrawer);