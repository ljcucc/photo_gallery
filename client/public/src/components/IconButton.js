import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class IconButton extends LitElement{
  static properties = {
    name: {type: String}
  };

  static styles = css`
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
  `;

  constructor(){
    super();
    this.name = ""; // default value
  }

  onClick(){
    // console.log("on click");
    // this.dispatchEvent(new Event('click'));
  }

  render(){
    return html`
      <div class="menu-button" @click="${this.onClick}">
        <material-icons name="${this.name}">${this.name}</material-icons>
      </div>
    `;
  }
}

customElements.define("icon-button", IconButton);