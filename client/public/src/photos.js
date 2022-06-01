import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class PhotosGrid extends LitElement{
  static styles = css`
  .box{
    width: 15vmax;
    height:15vmax;
    background: #e0e0e0;
    transition: all 0.35s;
  }

  .boxes{
    display: flex;
    box-sizing: content-box;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 100px;
    margin: auto;
    justify-content: center;
  }
  `;

  render(){
    return html`
    <div class="boxes">
      ${Array.from(Array(100).keys()).map(()=>html`<div class="box"></div>`)}
    </div>
    `;
  }
}

customElements.define("photos-grid", PhotosGrid);
