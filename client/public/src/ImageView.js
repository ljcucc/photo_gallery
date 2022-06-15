import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {router} from './index.js';
import { Router } from "https://unpkg.com/@vaadin/router@1.7.4/dist/vaadin-router.js";
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map'; // origin: lit-html/directives/style-map 

class ImageView extends LitElement{
  static properties = {
    name: {type: String},
    scale: {type: Number},
    scrollingBack: {type: Boolean}
  };

  constructor(){
    super();
    this.name = ""; // default value
    this.scale = 0.7;
    this.scrollingBack = false;
  }

  static styles = css`
  img{
    top:0;
    left:0;
    right: 0;
    bottom: 0;

    object-fit: cover;
    max-width: 100vw;
    width: 100%;
    height: 100vh;
  }

  .body{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: black;
    transition: margin-left 0.35s;
  }

  .image-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    overflow: scroll;
  }

  .image-container>img{
    --scale: 1;
    transform: scale(var(--scale));
    transition: all 0.25s;
    /* width:calc( var(--scale) * 100% ); */
    width: 100%;
    height: auto;
    box-sizing: border-box;
    position: relative;
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
    <div class="body" style="${styleMap({
      marginLeft: this.scrollingBack ? "100%": 0
    })}">
      <app-topbar gradiant noBlur fixed>
        <appbar-items slot="left">
          <icon-button dark name="arrow_back" @click="${()=>{
            // Router.go("/");
            this.scrollingBack = true;
            setTimeout(() => {
              window.history.back();
            }, 350);
          }}"></icon-button>
        </appbar-items>

        <appbar-items slot="right">
          <icon-button dark name="zoom_in" @click="${()=>{
            this.scale /= 0.5;
          }}"></icon-button>
          <icon-button dark name="zoom_out" @click="${()=>{
            this.scale *= 0.5;
          }}"></icon-button>
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
      <div class="image-container">
        <img style="${styleMap({
          "--scale":this.scale
        })}" src="https://picsum.photos/seed/${item}/1080/720?grayscale" alt="" />
      </div>
    </div>
    `;
  }
}

customElements.define("image-view", ImageView);