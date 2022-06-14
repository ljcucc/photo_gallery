import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class UploadDialog extends LitElement{
  static properties = {
    opened: {
      type: Boolean
    }
  };

  constructor(){
    super();
    // this.name = ""; // default value
  }

  dropHandler(e){
    console.log("dropped");
    e.preventDefault();

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
      }
    }
  }

  dragOverHandler(e){
    e.preventDefault();
    console.log("dragged");

    if(this.opened) return;
    this.opened = true;

    console.log(e);

    let root = this.shadowRoot;
    let dialog = root.querySelector("dialog");
    dialog.showModal();

  }

  static styles = css`
    dialog::backdrop {
      background: rgba(0,0,0,.25);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    dialog{
      padding: 8px;
      border: none;
      border-radius: 15px;
      min-height: 300px;
      width: 500px;
      box-shadow: rgba(0,0,0,0.35) 0px 4px 8px;
    }

    .login-form{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 60px;
    }

    .title-bar{
      display: flex;
      flex-direction: row;
      /* justify-content: center; */
      align-items: center;
    }

    .title-bar>h2{
      margin:0;
      padding: 0;
      text-align: center;
      flex: 1;
      margin-left: -50px;
      z-index: -1;
    }

    .description{
      text-align: center;
      margin: auto;
      float: center;
      display: flex;
      align-items:center;
      justify-content: center;
      min-height: 200px;
      height: auto;
    }
  `;

  render(){
    return html`
    <div @drop="${this.dropHandler}" @dragover="${this.dragOverHandler}">
      <slot></slot>

      <dialog @dragenter="${this.dragOverHandler}" @drop="${this.dropHandler}">
      </dialog>
    </div>
    `;
  }
}

customElements.define("upload-dialog", UploadDialog);