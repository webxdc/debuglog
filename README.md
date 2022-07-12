# debuglog tool for deltachat in webxdc

NOT IN A USABLE STATE YET!

This is a special webxdc application that shows a searchable debuglog for
deltachat events.

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

### Changelog

This package maintains a changelog in `CHANGELOG.md` following the [Keep a
Changelog](http://keepachangelog.com/en/1.0.0/) format. Please add entries in the [Unreleased] section when you make changes. The information in the changelog
is also automatically published to the github releases page when you
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
