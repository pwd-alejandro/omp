Front-page story card. `lead` is the hero (big serif headline, 16:9 image), `standard` fills columns, `brief` is a compact list item. Headline underlines in vermillion on hover.

```jsx
<ArticleCard
  size="lead"
  kicker="Investigation · Housing"
  headline="The 4.2 million records behind an eviction crisis"
  dek="We collected every filing in the county since 2016."
  meta="12 MIN · DATA"
  image="/assets/img/housing.jpg"
/>
```

Composes `Tag` for the kicker. Keep imagery de-saturated (`saturate(0.92)`) for the house look.
