import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

// I REALLY NEED GIRD CONTINAER IN CSS, THIS FLEX GRID IS SHIT

class PhotosGrid extends LitElement{
  static styles = css`
  .box{
    --each-line: 5;
    --side: calc( 100vw / var(--each-line) - 20px );
    width: var(--side);
    height:var(--side);
    background: #e0e0e0;
    transition: box-shadow 0.35s, width 0.15s, height 0.15s;
    object-fit: cover;
  }

  .boxes{
    display: flex;
    box-sizing: content-box;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 100px;
    margin: auto;
    justify-content: center;
    transition: width 0.35s, height 0.35s;
  }

  .box:hover{
    box-shadow: rgba(0,0,0,.35) 0px 0px 4px;
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

  render(){
    return html`
    <div class="boxes">
      ${Array.from(Array(this.page*10).keys()).map(item=>
        html`<img class="box" src="/api/images/thumbnail/demo.jpg"/>`
      )}
    </div>
    <button @click="${this.loadPage}">load more</button>
    `;
  }
}

customElements.define("photos-grid", PhotosGrid);
