import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class PhotosGrid extends LitElement{
  static styles = css`
  .box{
    width: 300px;
    height:300px;
    background: #e0e0e0;
  }
  `;

  render(){
    // return html`
    // // ${(()=>{
    // //   let result;
    // //   for(let i = 0; i < 10; i++){
    // //     result += `
    // //     <div class="box"></div>
    // //     `
    // //   }
    // //   return result;
    // // })()}
    // `;
  }
}

customElements.define("photos-grid", PhotosGrid);
