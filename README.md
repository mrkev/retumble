<p align="center"><img width=200 src="https://raw.githubusercontent.com/mrkev/retumble/master/retumble-logo.png" /></p>

# Retumble

Build Tumblr themes with React. Test them on localhost.

_NOTE: this is very much an experiment. It works, but run any mission-critical blogs at your own risk_

## Getting started

### Install

`npm -g i retumble`

Or clone this repo, and `npm link` it.

### Create a new theme

```
retumble init tumblr-react-new
cd tumblr-react-new
npm install
```

This creates a new project called `project`. Ez.

### Test a theme locally

`retumble run`

When ran from the root of the project, this will load data from a default sample blog. To use custom test data, use

`retumble run --source http://<some retumble blog>.tumblr.com/`

Where `<some retumble blog>` is a Tumblr blog that is using a retumble theme. No, if you point it at just some random blog this wont work; the blog needs to be running a retumble theme.

### Use a theme on [tumblr.com/customize](https://www.tumblr.com/customize/)

`retumble ready | pbcopy`

_(`pbcopy` works on macOS. Use linux/window's own clipboard commands if that's what you're on)_

The `ready` command will dump the bundled theme HTML. Paste this as "custom html" in [tumblr.com/customize](https://www.tumblr.com/customize/) as you would with any other theme file.

## Writing a theme

Coming soon!

## Extras

There's a few cool extras I implement so you don't have to.

- Infinite Scrolling
- A drawer for notes
- Resizable music player

Documentation coming I guess? You can also check the auto-generated project built with `retumble init` to check out usage.

## Limitations

Of course, being the first release adding react on top of what's already a kind of hacky themeing situation, there are certain limitations. At the moment:

#### Actions are unsupported

Reblog, Like, etc.

#### Not all tumblr "theme tags" are incorporated

More will be coming, open an issue if you have any requests

#### Bugs

Open an issue!
