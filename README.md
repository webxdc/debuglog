# debuglog tool for deltachat in webxdc

This is a special webxdc application that shows a searchable debuglog for
deltachat events.

## Usage

You can do a fulltext search on event, data1 and data2 together.

Fulltext search searches by wildcard always. You can enter multiple search
terms.

## Development

You can run `debuglog` in development mode like this:

```shell
npm run dev
```

It uses vite to run the server, so features hot-reloading.

You can also run `debuglog` with the [webxdc-dev](https://github.com/webxdc/webxdc-dev#readme) tool, which is installed:

```shell
npm run webxdc-dev
```

You can produce a `.xdc` file for testing purposes by using the `webxdc-build`
npm script. A new file `debuglog.xdc` is generated in the project directory.
Note that for official releases you should use the release procedure documented
below.

### Architecture

This package uses [SolidJS](https://www.solidjs.com/), which feels much like
React but with reactive state and better performance/bundle size. [SolidJS fits
my brain.](https://blog.startifact.com/posts/solidjs-fits-my-brain/)

The core of the state management system is in `src/store.ts`. This defines an
in-memory store of events, and implements search, including full-text search
using [lunr](https://lunrjs.com/). All known events are stored in here, though
you don't see them all at the same time in the UI.

`src/App.tsx` pulls the UI together. The styling is implemented using
[Tailwind](https://tailwindcss.com/), a popular CSS utility library, which
compiles only the CSS actually used in pages, so it's a dev dependency.
Tailwind is controlled by `class` attributes in JSX.

The most complex UI element is `Table`, which presents the UI table. This table
is virtualized using [TanStack Virtual](https://tanstack.com/virtual/v3). This
means it doesn't show all events, only the ones you've scrolled to.
`src/solid-virtual.ts` contains the integration with SolidJS. This is code that
will become part of a `@tanstack/solid-virtual` release in the future, and we
can depend on that then.

The webxdc integration is in `src/webxdc.ts`. It simply adds an id to each
update and then adds them to the store. Adding data to the store is debounced
for performance reasons - the SolidJS store responds much better when you add a
large amount of events at the same time instead of one by one.

### Changelog

This package maintains a changelog in `CHANGELOG.md` following the [Keep a
Changelog](http://keepachangelog.com/en/1.0.0/) format. Please add entries in
the `[Unreleased]` section when you make changes. The information in the
changelog is also automatically published to the github releases page when you
make a release, see below.

### Making a release

You can create a new release on the [github releases page for
debuglog](https://github.com/webxdc/debuglog/releases) automatically by doing
the following on the `main` branch:

```shell
npm version patch  # or minor, major, etc
git push --follow-tags
```

[`npm version`](https://docs.npmjs.com/cli/v8/commands/npm-version) updates the
version number automatically and also puts the latest date in `CHANGELOG.md`.
You then need to push using `--follow-tags` (**NOT** `--tags`).

The release process is done through a github action defined in
`.workflows/publish.yml` which publishes to the github releases page
automatically and includes the latest changes from `CHANGELOG.md`.
