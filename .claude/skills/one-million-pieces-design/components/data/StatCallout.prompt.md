The brand's signature data unit: a large mono figure with label, optional delta, and a source line. Figures are always pre-formatted and mono (tabular numerals).

```jsx
<StatCallout value="4.2M" label="Eviction filings analysed since 2016" source="County records" />
<StatCallout value="+1.4°" delta="+0.3° / decade" label="Warming since 1985" align="center" />
```

Deltas colour automatically from their leading sign; override with `deltaTone`. Always attach a `source` for anything derived from data.
