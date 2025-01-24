# psrn - Packagefile Script RuNner

Psrn (`psrn`) is a command line utility to help with running packagefile scripts after you (or someone else) created them. In my experience this is the workflow for scripts in a node package after a while:

1. Try to remember what the scripts were you created
2. Go read the package file (or run `npm run-scripts` if you remember)
3. Copy/paste the script name you want
4. Repeat

_What if we could do it better?_

psrn.

## Setup

`npm install -g psrn`

That's it.

## Running psrn

Visit your favorite local node package repository and...

`> psrn`

You'll get a helpful interface and all the scripts will be at your fingertips.

## Additional arguments

- `--arguments` or `-a` : Have psrn prompt you for additional arguments to pass through
- `--help` or `-h` : Display help information
- `--long` or `-l` : By default psrn just shows the script names. This displays everything
- `--set-runner` : Set default script runner (npm or yarn)
- `--version` : Print current psrn version
- `--yarn` or `-y` : Use yarn as the script runner
- `-- ` : Type `--` followed by a space and then start typing arguments. They'll pass through directly

## Todo

- [ ] Clean up the sheer number of magic strings