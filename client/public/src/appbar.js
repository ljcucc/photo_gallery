/*

  appbar.js

  This is a TopBar Component used to display actions and items that user can access.

*/
import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

import "./icons.js";
import "./SearchBar.js";
import "./drawer.js";
import "./DropMenu.js";

class Appbar extends LitElement{

  static styles = css`
    .topbar{
      min-height: 60px;
      top: 0;
      left: 0;
      right: 0;
      position: sticky;

      border-bottom: 1px solid rgba(0, 0, 0, 0.35);
      background: rgba(255,255,255, 0.75);

      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);

      padding: 0 1rem;

      display: flex;
      flex-direction: row;

      align-items:center;
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
  }

  render(){
    return html`
      <div class="topbar">
        <slot name="left"></slot>

        <span class="item__end"></span>
        <search-bar style="flex: 1;"></search-bar>

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