import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class InfoDialog extends LitElement{
  static properties = {
    description: {type: String},
    open: {type: Boolean}
  }
  static styles = css`
    dialog::backdrop {
      background: rgba(0,0,0,.25);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    dialog{
      padding: 8px;
      border: none;
      border-radius: 15px;
      min-height: 300px;
      width: 500px;
      box-shadow: rgba(0,0,0,0.35) 0px 4px 8px;
    }

    .login-form{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 60px;
    }
  `;

  updated(){
    if(!this.open) return;
    let root = this.shadowRoot; // get shadow root in order to get DOM
    console.log("open me")
    let dialog = root.querySelector("dialog");
    dialog.showModal();
  }

  openDialog(){
    this.open = true;
  }

  render(){
    return html`
      <link rel="stylesheet" href="style.css" />
      <dialog>
        <form method="dialog">
          <button class="span" value="cancel">
            <icon-button name="close"></icon-button>
          </button>
        </form>
        <p style="text-align: center;">${this.description}</p>
      </dialog>
    `;
  }
}

customElements.define("info-dialog", InfoDialog);