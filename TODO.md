# Todo

## Search

- A spinner when search is initiated

- See amount of search results

- Selected item is at the bottom after 'context', can it be in the middle or on
  the top?

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

- Architecture explanation in docs

# UI experiment

- Search for a message by someone and discover the interactions around a
  message. This is hindered by the subset of events we get in the official
  logs.

## webxdc-dev plugin

- To send realistic data

- Alternatively, build in a fake webxdc implementation in this instead.

## Performance

- When a new event comes in, recalculating the fulltext index is very
  expensive, so need to do this incrementally in the future.
