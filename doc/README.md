# Notes about migrating from Angular to React

This is the initial [flight plan](doc/flight-plan.md).

## [Add JSX loader to Angular project](add-jsx.md)

## Mounting React components
A React component can be attached to almost anything in the DOM and we can do it
without *jsx*:

```js
const el = document.getElementById('react-app');

ReactDOM.render(React.createElement(Component, props), el);
```

If we want to update de component when the *props* change then we need to mount it
again. Angular has a lifecyle hook called *ngDoCheck* that allows us to have a regular re-render.

## Child to parent communication
Unlike Angular, React doesn't communicate upstream with *emitters*, but just a
*callback function*.

### Example:

From:

`app.component.html`
```html
<div class="col-4">
  <app-search-bar (searchChange)='onSearchChange($event)'></app-search-bar>
</div>
```

`app.component.ts`
```js
onSearchChange(search) {
  // ...
}
```

`search-bar.ts`
```js
@Output()
searchChange = new EventEmitter<any>();

// ..

private onSearchKeyup(search: string) {
  // ...
  this.searchChange.emit({search, change});
}
```

To:

`App.jsx`
```js
onSearchChange(search) {
  // ...
}

// ...

<div className="row">
  ...
  <SearchBar searchChange={this.onSearchChange} />
</div>
```

`SearchBar.jsx`
```js
const { searchChange } = props;

// ...

const onSearchKeyup = e => {
  // ...
  searchChange(search);
};

```
