# Static site resources

> All files are not bundled or compress, file will directly deliver from server to client.

Folder structure:

* `index.html`: Homepage
* `src/`: JavaScript source file
  * `components/`: Components
    * `appbar.js`: Customizable AppBar
    * `drawer.js`: Customizable Drawer
    * `DropMenu.js`: DropMenu and DropMenuList
    * `FloatButton.js`: FloatButton 
    * `IconButton.js`: IconButton (without shadow)
    * `InfoDialog.js`: Show HTML in dialog (with blur backdrop)
    * `SearchBar.js`: Searchbar on AppBar
    * `photos.js`: Photos grid view
    * `uploadDialog.js`: a upload area and dialog, handler
  * `ImageView.js`: Image page
  * `SettingsView.js`: Settings page
  * `login.js`: login dialog
  * `ProjectBanner.js`: Project infomation banner
  * `images.js`: ImageController( using ImageView, ImagesList )

# Reusable Components

Web Components are reusable since the web components are treated like native elements to browser. So with the dependencies (in this repo dependencies are resolved by using CDNs, no worries to handle it with yourself by using resolving tools), you can directly using these web component on your website.

* [Appbar](#Appbar)
* [PhotosGrid](#PhotosGrid)

## PhotosGrid

import:

```js
import "./components/photos.js";
```

usage: 

```html
  <photos-grid route="home" @item-click="..." @load-more="..."></photos-grid>
```

> `@event` means `addEventListener("event", ...)` in [Lit](lit.dev)

when a item clicked, `item-click` event will dispatch, and given a id of that image.

photosGrid will request more image if needed. if does, `load-more` event will dispatched.

To set images of `photos-grid`, try use `setImages(data)`, which data is a array with datas.

data format:

```json
[
  {
    "imageURL": "image's URL",
    "id": "id when item click will callbacked"
  },
  ...
]
```

here's a example by using native APIs:

```html
<photos-grid></photos-grid>
<script type="module">
import "./components/photos.js";
import "./your-data.js"; // a data model that can fetch images.

let photosGrid = document.querySelector("photos-grid"); // select view
let loadMore = ()=>getDatas().then(photosGrid.setImages);

photosGrid.addEventListener("item-click", e=>{
  let id = e.detail.id;
  alert(`items ${id} was clicked!`);
});

photosGrid.addEventListener("load-more", loadMore);
window.addEventListener("load", loadMore);
</script>
```

here's a example with Lit:

```js
class AppHome extends LitElement{
  model = new DataMode(); // data model

  firstUpdated(){
    this.onLoadMore(); // first load
  }

  onLoadMore(){
    let root = this.shadowRoot;
    let photosGrid = root.querySelector("photos-grid"); // select view

    this.model.loadMore() // fetch data by using model
      .then(photosGrid.setImages); // when data is finished, given to photosGrid which will auto update
    });
  }

  render(){
    return html`
      <photos-grid @item-click="${e=>{
        Router.go("/view/" + encodeURI(e.detail.id)); // goto /view/:id when clicked a image
      }}"
      @load-more="${this.onLoadMore}"></photos-grid>
    `;
  }
}
```


## Appbar

file: `appbar.js`

* `app-topbar`: appbar main component
* `appbar-title`: title for appbar
* `appbar-items`: container to place icon buttons or appbar items

import & installation:

```js
import "./components/appbar.js";
```

Basic appbar with title (the basic appbar comes with sticky position):

```html
<app-topbar>
  <appbar-items slot="left">
    <appbar-title title="Appbar example"></appbar-title>
  </appbar-items>
  <appbar-items slot="right">
    <!-- things at the right -->
  </appbar-items>
</app-topbar>
```

A appbar with search button at the left:
```html
<app-topbar search>
  <appbar-items slot="left">
    <appbar-title title="Appbar example"></appbar-title>
  </appbar-items>
  <appbar-items slot="right">
    <!-- things at the right -->
  </appbar-items>
</app-topbar>
```

A appbar that using on a transparant background (search is not avaliable):

```html
<app-topbar gradiant>
  <appbar-items slot="left">
    <appbar-title title="Appbar example"></appbar-title>
  </appbar-items>
  <appbar-items slot="right">
    <!-- things at the right -->
  </appbar-items>
</app-topbar>
```

A fixed appbar:

```html
<app-topbar fixed>
  <appbar-items slot="left">
    <appbar-title title="Appbar example"></appbar-title>
  </appbar-items>
  <appbar-items slot="right">
    <!-- things at the right -->
  </appbar-items>
</app-topbar>
```

A appbar with drawer and dropdown menu:

```js
class App extends LitElement{

  openDrawer(){
    let root = this.shadowRoot;
    let drawer = root.querySelector("app-drawer");

    drawer.openDrawer();
  }

  openMenu(){
    let root = this.shadowRoot;
    let dropMenu = root.querySelector("drop-menu");

    dropMenu.toggleMenu();
  }

  handleMenuClick(e){
    const id = e.detail?.id || "id not found";
    alert(id);
  }

  render(){
    return html`
      <app-drawer>
      </app-drawer>

      <app-topbar>
        <appbar-items slot="left">
          <icon-button name="menu" @click="${this.openDrawer}"></icon-button>
          <appbar-title title="Appbar example"></appbar-title>
        </appbar-items>
        <appbar-items slot="right">
          <icon-button name="more_vert" @click="${this.openMenu}"></icon-button>

          <drop-menu>
            <dropmenu-list @item-click="${this.handleMenuClick}" list="Login,Signup;split,Source Code,Home site;split,Settings,About" >
            </dropmenu-list>
          </drop-menu>
        </appbar-items>
      </app-topbar>

      something...
    `;
  }
}
```