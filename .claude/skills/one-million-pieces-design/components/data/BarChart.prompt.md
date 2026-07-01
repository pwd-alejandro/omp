A restrained bar chart. One base colour from the categorical data palette; mark the story's bar with `highlight` so it reads vermillion.

```jsx
<BarChart
  data={[
    { label: "2019", value: 41 },
    { label: "2020", value: 60 },
    { label: "2021", value: 88, highlight: true },
  ]}
  color="var(--data-teal)"
/>
```

Keep to one series. For distributions/rankings use `orientation="horizontal"`.
