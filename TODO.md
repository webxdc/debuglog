# Todo

## Search

- Remove the filter for event as fulltext is enough.

- A spinner when search is initiated

- Automatically adding wildcards before each word in search? But not
  automatically for numbers, or maybe for numbers too. What about wildcards if
  wildcards already are included?

## UI

- A way to copy/paste log data into the UI. For now, the desktop log.

- Desktop file: filter core/event and map DC_EVENT_INFO to Info (though not
  strictly necessary). It uses tabs to separate files.

## Layout

- Proper layout of ConverterInput error messages.

- Tooltip support in UI for ellipses items, and also for help
  on search boxes.

## Performance

- When a new event comes in, recalculating the fulltext index is very
  important, so need to do this incrementally in the future.
