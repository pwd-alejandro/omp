The One Million Pieces logotype — a 4×4 mosaic mark (pieces assembling into a whole, two tiles in vermillion) beside the Newsreader wordmark. Use `stacked` in mastheads, `horizontal` in wide headers/footers, `mark` as a favicon/avatar, `short` (OMP) where space is tight.

```jsx
<Logo variant="stacked" size={44} />
<Logo variant="horizontal" size={28} />
<Logo variant="mark" size={32} />
<Logo variant="short" size={30} />
```

On dark surfaces pass `color="var(--text-inverted)"`. Never recolour the accent tiles to anything but vermillion in product UI.
