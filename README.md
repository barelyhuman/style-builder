# style-builder

I built it while trying to focus on building one of my web apps, safe to say, I
couldn't focus.

Anyway, the library is simpler builder chain for styles.

## Highlights

- Simple and Tiny
- Just plain css, no magic
- [Easy to extend](#extending)

### Usage

- Start by installing the library itself, the library could be both a
  `devDependency` or a `dependency` based on how you use it.
- If you generate the CSS on build time (Meta-frameworks), add it as a
  `devDependency`, if you are using it with a frontend library and appending the
  styles to the `head` element on client render, add it as a `dependency`.

```sh
npm i @barelyhuman/style-builder
# or
npm i @barelyhuman/style-builder -D
```

- Next, lets set it up to use a element constructor, example `preact.h`, and
  define some styles.

```js
import { h } from "preact";
import { extractStyles, setup, styled } from "@barelyhuman/styled-builder";

setup(h);

const StyledLink = styled("a")
  .base`
    padding: 8px 16px;
    text-decoration: none;
    color: ${(props) => props.color || "dodgerblue"}
  `
  .hover`
    text-decoration: underline;
  `
  .variant(".mini")`
    padding: 2px 4px;
  `
  .component;

const styles = extractStyles();

console.log(styles);
// you might want to append the styles to the <head> element or extract and create a .css file out of it. I leave that to you.
```

### Extending

Extending capabilities is pretty easy, you just use the `variant` function to
define new classes, pseudo states (Hover, focus). The value of variant is
appended directly to the css class, so you can pretty much write generic CSS
with it.

```js
const LastChildStyle = styled("a")
  .base`
    background-color: black;
  `
  .variant(":not:last-child")`
    background-color: red;
  `;
```

### Missing Features

Because it was created just to test an idea, there's quite a few things missing,
here's the list. If it's checked, it means the support was added in a specific
version (version specified beside it)

- [ ] Forwarding Refs (UI Libraries support)
- [ ] Internal wrapper for `document.createElement`
- [ ] Inheriting from existing styled element
- [ ] Better way to share memory data when working with CJS (Unchunkable
      situations)
- Raise an issue if there's other things you wished it did

## License

[MIT](/LICENSE)
