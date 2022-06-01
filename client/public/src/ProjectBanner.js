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
      padding: 24px;
      /* padding: 16px; */
      /* background: rgb(0 0 0 / 15%); */
      border: 1px solid rgba(0 0 0 / 35%);
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
        <div class="info">
          Hello! this project trying to demo web component, which is under development. for the better experience to view source code, please checkout the repository of this project: <a href="https://github.com/ljcucc/photo_gallery">https://github.com/ljcucc/photo_gallery</a> or <a href="https://github.com/ljcucc/photo_gallery/tree/main/client/public"> The front-end code can be found here</a>.
          <br><br>
          By far, All components you see are reusable for and to other framework and projects.
        </div>
      </div>
    `;
  }
}

customElements.define("project-banner", ProjectBanner);