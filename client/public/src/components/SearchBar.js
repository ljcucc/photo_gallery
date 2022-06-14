/*

  SearchBar.js

  This is a Searhing UI Component

*/

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map'; // origin: lit-html/directives/style-map 
import { classMap } from 'https://unpkg.com/lit-html/directives/class-map'; // origin: lit-html/directives/class-map 

class SearchBar extends LitElement{
  static properties = {
    input: {type: String},
    toggled: {type: Boolean},
    inputWidth: {type: Number}
  };

  static styles = css`
    input{
      max-width: 100%;
      width: 50vw;
      height: 32px;
      border: none;
      outline: none;
      font-size: 18px;
      border-bottom: rgba(0,0,0,.35) solid 1.5px;
      overflow: hidden;
      margin-right: -10px;
      transition: width 0.35s;

      background: transparent;
      border-radius: 0px;
    }

    input:focus{
      border-bottom: rgba(0,0,0,.75) solid 1.5px;
    }

    .search-bar{
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      justify-content: right;
    }

    .close-icon.toggled{
      padding-left: 10vmin;
    }

    @media only screen and (max-width: 800px){
      .search-bar.toggled{
        position: fixed;
        height: 60px;
        top:0;
        left:0;
        right:0;
        width: 100vw !important;
        background-color: white;
      }

      .close-icon.toggled{
        padding-left: 0vmin;
      }
    }
  `;

  firstUpdated(){
    this.updateInput();
  }

  updateInput(){
    let root = this.shadowRoot;
    // root.querySelectorAll(".toggled").forEach((item=>item.style.display=this.toggled?"":"none").bind(this));
  }

  constructor(){
    super();
    this.input = ""; // default value
    this.toggled = false;
    this.inputWidth = "0px";
  }

  openSearch(){
    this.toggled = true;
    setTimeout(() => {
      this.inputWidth = "100%";
    }, 10);
  }

  closeSearch(){
    this.inputWidth = "0%";
    setTimeout(() => {
      this.toggled = false;
    }, 350);
  }

  render(){
    return html`
      <div class="search-bar ${classMap({
          toggled: this.toggled
        })}">
        <icon-button class="close-icon ${
          classMap({
            toggled: this.toggled
          })}" style="${styleMap({
          display: this.toggled? "": "none"
        })}" name="close" @click="${this.closeSearch}"></icon-button>
        <input type="text" placeholder="Places, People, Things... " style="${styleMap({
          width: this.inputWidth,
          display: this.toggled? "": "none"
        })}" required/>
        <icon-button name="search" @click="${this.openSearch}" class="search-icon ${
          classMap({
            toggled: this.toggled
          })
        }"></icon-button>
      </div>
    `;
  }
}

customElements.define("search-bar", SearchBar);