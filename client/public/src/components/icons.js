import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class Icons extends LitElement{
  static properties = {
    name: {type: String}
  };

  constructor(){
    super();
    this.name = ""; // default value
  }

  render(){
    return html`
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <i class="material-icons">${this.name}</i>
    `;
  }
}

customElements.define("material-icons", Icons);