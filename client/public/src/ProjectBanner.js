/*

  ProjectBanner.js

  This is a Component that displsay custom message about this project

*/

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class ProjectBanner extends LitElement{
  static styles = css`
    .container{
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: content-box;
    }
    .info{
      color: black;
      padding: 16px;
      background: rgb(0 0 0 / 15%);
      margin: 32px;
      border-radius: 10px;
      max-width: 800px;
      width: 100%;
    }

    .info>a{
      color: black;
    }
  `;
  
  render(){
    return html`
      <div class="container">
        <div class="info">Hello! this project is under development. for the better experience to view source code, please checkout the repository of this project: <a href="https://github.com/ljcucc/photo_gallery">https://github.com/ljcucc/photo_gallery</a> or <a href="https://github.com/ljcucc/photo_gallery/tree/main/client/public"> The front-end code can be found here</a>.</div>
      </div>
    `;
  }
}

customElements.define("project-banner", ProjectBanner);