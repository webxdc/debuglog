# Todo

## Webxdc

- `manifest.toml`

## Search

- A spinner when search is initiated

- Scroll back to the top when we search.

- Automatically adding wildcards before each word in search? But not
  automatically for numbers, or maybe for numbers too. What about wildcards if
  wildcards already are included?

- See amount of search results

## Layout

- Better styling for `EventInfo`, including proper close button.

- Start & end time don't layout correctly on mobile.

- Proper layout of ConverterInput error messages.

- Tooltip support in UI for ellipses items, and also for help
  on search boxes.

## Branches

- There are various deltachat branches - core, desktop, android. What's
  required to merge them?

## Documentation

- Blog post about concrete debuglog tech

- Architecture explanation in docs

# UI experiment

- Search for a message by someone and discover the interactions around
  a message.

## Performance

- When a new event comes in, recalculating the fulltext index is very
  expensive, so need to do this incrementally in the future.
