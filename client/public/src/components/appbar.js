/*

  appbar.js

  This is a TopBar Component used to display actions and items that user can access.

*/
import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { classMap } from 'https://unpkg.com/lit-html/directives/class-map'; // origin: lit-html/directives/class-map 

import "./icons.js";
import "./SearchBar.js";
import "./drawer.js";
import "./DropMenu.js";

class Appbar extends LitElement{
  static properties = {
    gradiant:{ type: Boolean },
    search: { type: Boolean },
    noBlur: { type: Boolean },
    fixed: { type: Boolean },
    relative: { type: Boolean },
  };

  static styles = css`
    .topbar{
      --shadow-color: rgba(0, 0, 0, 0.35);
      --background: rgba(255,255,255, 1);
      min-height: 60px;
      top: 0;
      left: 0;
      right: 0;
      position: sticky;

      background:var(--background) ;

      padding: 0 1rem;

      display: flex;
      flex-direction: row;

      align-items:center;
      z-index: 1000;
    }

    .blur{
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      --background: rgba(255,255,255, 0.95);
    }

    .gradiant{
      --shadow-color:rgba(0,0,0,0);
      --background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);;
    }

    .noGradiant{
      border-bottom: 1px solid var(--shadow-color);
    }

    .fixed{
      position: fixed !important;
    }

    .relative{
      position: absolute !important;
    }

    /* .menu-button{
      width: 50px;
      height: 50px;

      display: flex;

      align-items:center;
      justify-content:center;

      margin-top: 2.5px;
      margin-right: 8px;

      border-radius: 50%;
      transition: background-color 0.35s;

      cursor: pointer;
      user-select: none;
      outline: none;
      border: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    .menu-button:hover{
      background-color: rgba(0,0,0,0.15);
    }

    .menu-button:active{
      background-color: rgba(0,0,0,0.35);
    } */

    .item__end{
      margin-left:auto;
    }
  `;

  constructor(){
    super();

    this.gradiant = false;
    this.search = false;
    this.noBlur = false;
    this.fixed = false;
  }

  render(){
    return html`
      <div class="topbar ${classMap({
        gradiant: this.gradiant,
        blur: !this.noBlur,
        noGradiant: !this.gradiant,
        fixed: this.fixed,
        relative: this.relative
      })}">
        <slot name="left"></slot>

        <span class="item__end"></span>
        ${this.search?html`<search-bar style="flex: 1;"></search-bar>`:""}

        <slot name="right"></slot> 
      </div>

    `;
  }
}

class TopbarItems extends LitElement{
  static styles = css` 
    .items{
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `;

  render(){
    return html`
      <div class="items">
        <slot></slot>
      </div>
    `;
  }
}

class TopbarTitle extends LitElement{
  static properties = {
    title: {
      type: String
    }
  }

  constructor(){
    super();

    this.title = "Title";
  }

  static styles = css`
    .topbar__title{
      font-size: 24px;
      grid-column: 2/8;
    }
  `;
  render(){
    return html`
        <span class="topbar__title">${this.title}</span>
    `
  }
}

customElements.define("app-topbar", Appbar);
customElements.define("appbar-title", TopbarTitle);
customElements.define("appbar-items", TopbarItems);