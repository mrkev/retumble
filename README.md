
# Spur

Build Tumblr themes with React. Test them on localhost.

*NOTE: this is very much an experiment. It works, but run any mission-critical blogs at your own risk*

## Install

`npm -g i spur`

Or clone this repo, and `npm link` it.

## Create a new theme

`spur init`

Ez.

## Test a theme locally

`spur run`

This will load data from a default sample blog. To use custom test data, use

`spur run --source http://<somespurblog>.tumblr.com/`

Where `<somespurblog>` is a Tumblr blog that is using a spur theme. No, if you point it at just some random blog this wont work; the blog needs to be running a spur theme.

## Use a theme on tumblr.com

`spur ready | pbcopy` (On macOS, use linux/windows own clipboard commands if that's what you're on)

The `ready` command will dump the theme nicely packaged in some HTML. Paste this on your "custom html" customization option as you would with any other theme file.