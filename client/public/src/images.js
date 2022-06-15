import "./ImageView.js";

export class ImageListModel{
  page = 1;
  images = [];

  constructor(){
  }

  loadMore(){
    this.page ++;
    return(new Promise((resolve, reject)=>{
      fetch(`https://picsum.photos/v2/list?page=${this.page}&limit=100`)
        .then(response => response.json())
        .then(data=>{
          this.images = this.images.concat(Array.from(data));
          resolve(this.images);
        })
        .catch(reject);
    }));
  }

  getThumbnailURL(data){
    let temp = (item)=>`https://picsum.photos/id/${item}/300/350?grayscale`
    return temp(data.id);
  }

  getImageURL(data){
    let temp = (item)=>`https://picsum.photos/id/${item}/1080/720?grayscale`
    return temp(data.id);
  }

  getImageData(id){
    return {
      id
    };
  }
}