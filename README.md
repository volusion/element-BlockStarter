# Element Block Starter Project

Scaffolding code used by the [Volusion Element CLI](https://github.com/volusion/element-cli) to create new blocks

## Why

We use this repo to provide a common starting point for all blocks. Good news -- you shouldn't have to deal with this directly!

## How

From the Element CLI, run `element new BLOCKNAME` and that tool will take care of the rest!

## Development

### Setup

To ensure we're all using the same version of Node.js while developing, please use either [n](https://github.com/tj/n) or [nvm](https://github.com/creationix/nvm) to install the project's [Node.js version](/.node-version), and then install [AVN](https://github.com/wbyoung/avn):

```bash
# If you're managing Node versions with NVM:
npm install -g avn avn-nvm

# If you're managing Node versions with n:
npm install -g avn avn-n
```

Then, set up AVN with

```bash
avn setup
```

After you have AVN setup, run the following commands to get started:

```bash
npm install
npm start
```

As a developer, if you've made changes to your already-published block, you may need to update the unit test snapshot by running the following command:

```bash
npm test -- -u
```

## Code of Conduct

Though we are not accepting contributions for this repo at the moment, we still have a [Code of Conduct](./CODE_OF_CONDUCT.md) in place.

## License

&copy; 2018 onwards by Volusion
[MIT License](./LICENSE)
