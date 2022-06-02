import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

import { classMap } from 'https://unpkg.com/lit-html/directives/class-map'; // origin: lit-html/directives/class-map 
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map'; // origin: lit-html/directives/style-map 

class DropMenu extends LitElement{

  constructor(){
    super();

    this._state = false;
    this._show = false;
  }

  static properties = {
    _state: {
      type: Boolean
    },
    _show: {
      type: Boolean
    }
  }

  static styles = css`
  .menu{
    position: absolute;
    width: 200px;
    height: 300px;
    background: white;
    top: 0;
    right: 0;

    transition: all 0.25s;

    border-radius: 10px;
    box-shadow: rgba(0,0,0,.15) 0px 0px 20px;

  }

  .drop-menu.show{
    display: block;
  }

  .menu.open{
    transform: translateX(0%) translateY(0%) scale(1);
  }

  .menu.close{
    /* display: block; */
    transform: translateX(50%) translateY(-50%) scale(0);
  }

  .drop-menu{
    position: relative;
    display: none;
  }
  `;

  firstUpdated(){
    window.addEventListener("click", e=>{
      if(this._show && this._state) this.closeMenu()
    })
  }

  toggleMenu(){
    if(!this._state) this.openMenu()
    else this.closeMenu()
  }

  closeMenu(){
    this._state = false;
    this._show = false;
  }

  openMenu(){
    this._show = true;
    setTimeout(()=>{
      this._state = true;
    },10);
  }

  render(){
    return html`
    <div class="drop-menu ${
      classMap({
        show: this._show,
      })
    }">
      <div class="menu ${
      classMap({
        'open': this._state,
        'close':!this._state
      })
      }" @click="${this.closeMenu}">
        <slot></slot>
      </div>
    </div>
    `;
  }
}

customElements.define("drop-menu", DropMenu);