# Todo

## Search

- A spinner when search is initiated

## Data

- `id` is now equivalent to index for scrolling purposes. So perhaps we should
  call it `index`, or maintain a separate `index`?

## Layout

- Proper layout of ConverterInput error messages.

- Tooltip support in UI for ellipses items, and also for help
  on search boxes. But how does this work on mobile?

## Branches

- There are various deltachat branches - core, desktop, android. What's
  required to merge them?

## Documentation

- Blog post about concrete debuglog tech

# UI experiment

- Search for a message by someone and discover the interactions around a
  message. This is hindered by the subset of events we get in the official
  logs.

# Performance

- Pressing '100k' several times in mobile seems to crash things.

- When a new event comes in, recalculating the fulltext index is very expensive
  but is unavoidable with lunr. The debounce strategy seems to have made it
  tolerable for floods of updates.
