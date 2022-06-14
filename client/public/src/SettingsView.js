import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {router} from './index.js';
import { Router } from "https://unpkg.com/@vaadin/router@1.7.4/dist/vaadin-router.js";

class SettingsView extends LitElement{
  static properties = {
    name: {type: String}
  };

  constructor(){
    super();
    this.name = ""; // default value
  }

  static styles = css`
  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .body{
    width: 100vw;
    height: 100vh;
    background: black;
  }
  `;

  openMenu(){
    let root = this.shadowRoot;
    let dropMenu = root.querySelector("drop-menu");

    dropMenu.toggleMenu();
  }

  render(){
    if(router){
      var item = router.location.params.id;
    }
    return html`
    <div class="body">
      <app-topbar gradiant noBlur fixed>
        <appbar-items slot="left">
          <icon-button dark name="arrow_back" @click="${()=>{
            Router.go("/");
          }}"></icon-button>
        </appbar-items>

        <appbar-items slot="right">
          <icon-button dark name="zoom_in"></icon-button>
          <icon-button dark name="zoom_out"></icon-button>
          <icon-button dark name="more_vert" @click="${this.openMenu}"></icon-button>
          <drop-menu>
            <dropmenu-list @item-click="${((e)=>{
              const id = e.detail?.id || "id not found";

              switch(id){
                default:
                  alert("dropdown menu option not found.")
              }
            }).bind(this)}" list="Edit,Infomation,Delete"></dropmenu-list>
          </drop-menu>
        </appbar-items>
      </app-topbar>
      <img src="https://picsum.photos/seed/${item}/1080/720?grayscale" alt="" />
    </div>
    `;
  }
}

customElements.define("image-view", ImageView);