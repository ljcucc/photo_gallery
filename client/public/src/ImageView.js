import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {router} from './index.js';

class ImageView extends LitElement{
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
    width: 100%;
    height: calc(100vh - 60px);
    background: black;
  }
  `;

  render(){
    if(router){
      var item = router.location.params.id;
    }
    return html`
    <div class="body">
      
      <img src="https://picsum.photos/seed/${item}/1080/720?grayscale" alt="" />
    </div>
    `;
  }
}

customElements.define("image-view", ImageView);