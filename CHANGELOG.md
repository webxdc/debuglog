# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

The `unreleased` heading is updated automatically to the right version and
release date when you use `npm version` (see `README.md`).

## [Unreleased]

## Added

- The application now receives events through the webxdc API. Implemented a
  fake webxdc that can be used to add fake events. The Fake buttons now add
  events instead of replacing them. Added events are batched to avoid repeated
  store manipulation which makes adding events about as fast as before, even
  though updates come in one by one through this protocol.

## Changed

- Clicking/tapping once now results in a selected delta chat event in the
  table.

- Doubleclick results in opening details for this delta chat event in a modal.
  Long tap on mobile should result in the same behavior, but that has to be
  tested.

- When you initiate a search, the scroll position is set to 0

- When you click the 'context' button in the event modal, you go back to the
  event table, unfiltered, scrolled to the event.

- Show a count of the searched items in the UI.

## Fixed

- Lunr wouldn't properly search if the term was passed in with uppercase
  letters. Now lowercase terms before we search with Lunr.

## [0.4.0][] - 2022-07-15

## Added

- A "More" button that lets you see more search options plus the fake data
  buttons.

- The table height now properly fills the rest of the screen.

- Removed now unused CSS reset dependency; this is now done by tailwind.

- Close button in details popup.

- Context button in details popup. This creates a 10 second timestamp range
  around this event so you can see its context.

## Changed

- Lots of layout tweaks

## [0.3.0][] - 2022-07-14

## Added

- `manifest.toml` for webxdc

- `icon.jpg` for webxdc

## Changed

- Changed styling from eclectic mix of CSS and inline styles to Tailwind.

- More unified use of color in styling.

## [0.2.0][] - 2022-07-13

## Added

- You can now copy & paste a DeltaChat desktop log file (View menu -> Developer
  -> Open Current Logfile) into the UI and it will automatically add this. This
  allows you to experiment with more realistic data.

- There are buttons to create varying amounts of fake data.

- Search is by wildcard by default.

- You can click on a row to open information in a modal in case the text
  doesn't fit on your screen.

- Tweaked column layout; data2 gets more space now as it can contain text.

## Removed

- Event type filter

## [0.1.0][] - 2022-07-12

### Added

- Filter for date ranges

- Fulltext search

## [0.0.4][] - 2022-07-12

### Added

- We have fake data, and we can filter it by event type.

## [0.0.3][] - 2022-07-12

## [0.0.2][] - 2022-07-12

Initial public release.

[unreleased]: https://github.com/webxdc/debuglog/compare/v0.0.3...HEAD
[0.0.3]: https://github.com/webxdc/debuglog/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/webxdc/debuglog/tree/v0.0.2
[unreleased]: https://github.com/webxdc/debuglog/compare/v0.0.4...HEAD
[0.0.4]: https://github.com/webxdc/debuglog/tree/v0.0.4
[unreleased]: https://github.com/webxdc/debuglog/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/webxdc/debuglog/tree/v0.1.0
[unreleased]: https://github.com/webxdc/debuglog/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/webxdc/debuglog/tree/v0.2.0
[unreleased]: https://github.com/webxdc/debuglog/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/webxdc/debuglog/tree/v0.3.0
[unreleased]: https://github.com/webxdc/debuglog/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/webxdc/debuglog/tree/v0.4.0
