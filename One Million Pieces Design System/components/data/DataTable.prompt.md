Editorial table for data stories. Mark numeric columns `numeric` so they render mono + tabular + right-aligned; highlight the key row.

```jsx
<DataTable
  caption="Filings by year"
  columns={[
    { key: "year", label: "Year" },
    { key: "filings", label: "Filings", numeric: true },
    { key: "change", label: "YoY", numeric: true },
  ]}
  rows={[
    { year: "2020", filings: "60,204", change: "+9%" },
    { year: "2021", filings: "88,110", change: "+46%", highlight: true },
  ]}
  source="County records"
/>
```
