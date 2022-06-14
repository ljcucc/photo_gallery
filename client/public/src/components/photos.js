import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { Router } from "https://unpkg.com/@vaadin/router@1.7.4/dist/vaadin-router.js";

// I REALLY NEED GIRD CONTINAER IN CSS, THIS FLEX GRID IS SHIT

class PhotosGrid extends LitElement{
  static styles = css`
  :host{
    --each-line: 5;
    --side: calc( 100vw / var(--each-line) - 20px );
  }

  .box{
    /* width: var(--side);
    height:var(--side); */
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    background: #e0e0e0;
    transition: box-shadow 0.35s;
    object-fit: cover;
  }

  .boxes{
    display: grid;
    /* grid-auto-rows: var(--side); */
    /* grid-template-columns: repeat(var(--each-line), 1fr); */
    --grid: repeat(auto-fit, minmax(170px, 2fr));
    grid-template-columns: var(--grid);
    grid-template-rows: var(--grid);
    box-sizing: content-box;
    gap: 10px;
    padding: 6px;
    margin: auto;
    justify-content: center;
    box-sizing: content-box;
  }

  .more{
    width: 100%;
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;
  }

  .more>button{
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    outline: none;
    background: transparent;
    border-radius: 8px;
    padding: 16px 24px;

    transition: all 0.35s;
  }

  .more>button:hover{
    background:rgba(0,0,0,.15);
  }

  .box:hover{
    box-shadow: rgba(0,0,0,.35) 0px 0px 4px;
  }

  @media only screen and (min-width: 1000px){
    :host{
      --each-line: 6 !important;
    }
  }

  @media only screen and (max-width: 800px) and (min-width: 500px){
    :host{
      --each-line: 4;
    }
  }

  @media only screen and (max-width: 500px){
    :host{
      --each-line: 3;
    }
  }
  `;

  constructor(){
    super();

    this.page = 1;
  }

  static properties = {
    page: { type: Number }
  }

  hasChanged(){
    console.log(this.page);
  }

  loadPage(){
    console.log("loading");
    this.page ++;
  }

  openImage(id){
    return (()=>{
      Router.go("/view/"+encodeURI(id));
    });
  }

  render(){
    return html`
    <div class="boxes">
      ${Array.from(Array(this.page*50).keys()).map(item=>
        // html`<img class="box" src="/api/images/thumbnail/demo.jpg"/>`
        html`<img class="box" @click="${this.openImage(item)}" src="https://picsum.photos/seed/${item+200}/300/350?grayscale"/>`
      )}
    </div>
    <div class="more">
      <button @click="${this.loadPage}">load more</button>
    </div>
    `;
  }

}

customElements.define("photos-grid", PhotosGrid);
