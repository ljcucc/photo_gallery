import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class LoginDialog extends LitElement{
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

  firstUpdated(){
    let root = this.shadowRoot; // get shadow root in order to get DOM
    let dialog = root.querySelector("dialog");
    let loginBtn = root.querySelector("#login");

    loginBtn.addEventListener("click", this.onLogin.bind(this));

    // load auth status
    fetch("/api/auth")
    .then(e => { // handling respone 
      return e.json(); // handle feedback data to json
    }).then(data=>{ // handle json data
      if(!data.auth){
        // dialog.showModal();
      }
    });
  }

  onLogin(e){
    let root = this.shadowRoot; // get shadow root in order to get DOM
    let email = root.querySelector("#email").value;
    let password = root.querySelector("#password").value;

    console.log({
      email, password
    })

    fetch("/api/login")
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

        <form class="login-form" method="dialog">
          <h2>Login</h2>
          <input id="email" type="email" placeholder="Email" required/>
          <input id="password" type="password" placeholder="Password" required/>
          <button id="login">Login</button>
        </form>

        <p style="text-align: center;opacity: 0.35;">Required login to upload, not login will be fine.</p>
      </dialog>
    `;
  }
}

customElements.define("login-dialog", LoginDialog);