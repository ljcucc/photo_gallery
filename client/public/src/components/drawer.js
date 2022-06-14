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
      --background:rgba(255,255,255,1) ;
      background:var(--background) ;
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

    .drawer-content{
      background: var(--background);
      display: flex;
      flex-direction: column;
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
        <div class="drawer-content">
          <slot></slot>
        </div>
      </div>
    </div>
    `;
  }
}

class DrawerTitle extends LitElement{
  static styles = css`
    .title{
      font-size:40px;
      font-weight: normal;
      /* padding-left: 16px; */
      margin-bottom: 8px;
    }

    .container{
      padding: 32px;
    }

    .subtitle{
      font-size: 16px;
    }
  `;

  render(){
    return html`  
      <div class="container">
        <h2 class="title">
          <slot name="title"></slot>
        </h2>
        <div class="subtitle">
          <slot name="subtitle"></slot>
        </div>
      </div>
    `;
  }
}

class DrawerItem extends LitElement{

  static properties = {
    selected: {
      type: Boolean
    }
  }

  constructor(){
    super();
    this.selected = false;
  }

  static styles = css`
    .item-container{
      padding: 18px;
      padding-left: 32px;
      /* width: 80%; */
      margin: 4px 32px;

      border-radius: 30px;

      background: transparent;

      font-size: 18px;

      transition: background 0.35s;

      cursor: pointer;
    }

    .item-container:hover{
      background: #eeeeee;
    }

    .selected{
      background: #e7f0f6;
    }

    .selected:hover{
      background: #c4e7ff;
    }
  `;

  render(){
    return html`
    <div class="item-container${classMap({
      selected: this.selected
    })}">
      <slot></slot>
    </div>
    `;
  }
}

customElements.define("app-drawer", AppDrawer);
customElements.define("drawer-title", DrawerTitle);
customElements.define("drawer-item", DrawerItem);