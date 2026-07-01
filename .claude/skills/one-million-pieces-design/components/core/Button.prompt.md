Action button. Only one vermillion `primary` per view — everything else is `secondary`, `ghost`, or `link`. Labels are verb-first, sentence-case ("Read the analysis", "Subscribe", "See the data"), never "Click here" or "Submit".

```jsx
<Button variant="primary">Read the analysis</Button>
<Button variant="secondary">Share</Button>
<Button variant="ghost" size="sm">Save</Button>
<Button variant="link">See methodology</Button>
```

Press scales to 0.98 at 60ms. Sizes: `sm` (dense toolbars), `md` (default), `lg` (hero CTAs).
