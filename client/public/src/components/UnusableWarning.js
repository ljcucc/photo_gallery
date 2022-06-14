/*

  ProjectBanner.js

  This is a Component that displsay custom message about this project

*/

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class UnusableWarning extends LitElement{
  static styles = css`
    .container{
      position: fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background: white;

      height: 100%;
      width: 100%;

      border: none;

      display: none;
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

    @media only screen and (max-width: 350px),(max-height: 400px){
      .container{
        display: flex;
      }
    }
  `;
  
  render(){
    return html`
      <dialog class="container" open>
        <div class="info">This device is unusable, try to find another device having bigger screen.</a>.</div>
      </dialog>
    `;
  }
}

customElements.define("unusable-warning", UnusableWarning);