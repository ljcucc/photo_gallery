import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map'; // origin: lit-html/directives/style-map 

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
      font-size: 16px;
      border-bottom: rgba(0,0,0,.35) solid 1.5px;
      overflow: hidden;
      margin-right: -10px;
      transition: width 0.35s;
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
    this.inputWidth = "100px";
    // this.updateInput();
  }

  closeSearch(){
    this.toggled = false;
    // this.updateInput();
  }

  render(){
    return html`
      <div class="search-bar">
        <icon-button name="search" @click="${this.openSearch}"></icon-button>
        <input type="text" style="${styleMap({
          width: this.toggled? "100%": "0"
        })}"/>
        <icon-button style="${styleMap({
          display: this.toggled? "": "none"
        })}" name="close" @click="${this.closeSearch}"></icon-button>
      </div>
    `;
  }
}

customElements.define("search-bar", SearchBar);