import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class FloatButton extends LitElement{
  static properties = {
    name: {type: String}
  };

  static styles = css`
    .menu-button{
      width: 60px;
      height: 60px;

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
      background: white;
      box-shadow: rgba(0,0,0,0.35) 0px 0px 8px;

      position: fixed;
      right:0;
      bottom:0;
      margin: 32px;

      z-index: 1000;
    }

    .menu-button:hover{
      background-color: #eeeeee;
    }

    .menu-button:active{
      background-color: #dddddd;
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

customElements.define("float-icon-button", FloatButton);