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

# Reusable Components

## Appbar

file: `appbar.js`

* `app-topbar`: appbar main component
* `appbar-title`: title for appbar
* `appbar-items`: container to place icon buttons or appbar items

Basic appbar with title:

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
<app-topbar>
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