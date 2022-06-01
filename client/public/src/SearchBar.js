import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class SearchBar extends LitElement{
  static properties = {
    input: {type: String},
    toggled: {type: Boolean}
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
    }

    input:focus{
      border-bottom: rgba(0,0,0,.75) solid 1.5px;
    }

    .search-bar{
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
    }
  `;

  firstUpdated(){
    this.updateInput();
  }

  updateInput(){
    let root = this.shadowRoot;
    root.querySelectorAll(".toggled").forEach((item=>item.style.display=this.toggled?"":"none").bind(this));
  }

  constructor(){
    super();
    this.input = ""; // default value
    this.toggled = false;
  }

  toggle(){
    console.log("toggled")
    this.toggled = !this.toggled;
    this.updateInput();
  }

  render(){
    return html`
      <div class="search-bar">
        <icon-button class="toggled" name="close"></icon-button>
        <input class="toggled" type="text"/>
        <icon-button name="search" @click="${this.toggle}"></icon-button>
      </div>
    `;
  }
}

customElements.define("search-bar", SearchBar);