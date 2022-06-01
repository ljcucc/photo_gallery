import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

import "./icons.js";
import "./SearchBar.js";
import "./drawer.js";

class Appbar extends LitElement{
  static styles = css`
    .topbar{
      min-height: 60px;
      top: 0;
      left: 0;
      right: 0;
      position: fixed;

      border-bottom: 1px solid rgba(0, 0, 0, 0.35);
      background: rgba(255,255,255, 0.75);

      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);

      padding: 0 1rem;

      display: flex;
      flex-direction: row;

      align-items:center;
    }

    .topbar__title{
      font-size: 24px;
      grid-column: 2/8;
    }

    .menu-button{
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
    }

    .item__end{
      margin-left:auto;
    }
  `;

  openDrawer(){
    let root = this.shadowRoot;
    let drawer = root.querySelector("app-drawer");

    drawer.openDrawer();
  }

  render(){
    return html`
      <div class="topbar">
        <div class="menu-button">
          <material-icons name="menu" @click="${this.openDrawer}"></material-icons>
        </div>

        <span class="topbar__title">Photos</span>

        <span class="item__end"></span>

        <search-bar></search-bar>

        <div class="menu-button">
          <material-icons name="more_vert"></material-icons>
        </div>
      </div>

      <app-drawer></app-drawer>
    `;
  }
}

customElements.define("app-topbar", Appbar);