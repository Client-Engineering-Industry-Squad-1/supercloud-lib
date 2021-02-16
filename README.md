# IasCable

Library and CLI used to generate Infrastructure as Code installable components composed from a catalog of 
modules.

### NPM scripts

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)

### Excluding peerDependencies

On library development, one might want to set some peer dependencies, and thus remove those from the final bundle. You can see in [Rollup docs](https://rollupjs.org/#peer-dependencies) how to do that.

Good news: the setup is here for you, you must only include the dependency name in `external` property within `rollup.config.js`. For example, if you want to exclude `lodash`, just write there `external: ['lodash']`.

### Automatic releases

_**Prerequisites**: you need to create/login accounts and add your project to:_
 - [npm](https://www.npmjs.com/)
 - [Travis CI](https://travis-ci.org)
 - [Coveralls](https://coveralls.io)

_**Prerequisite for Windows**: Semantic-release uses
**[node-gyp](https://github.com/nodejs/node-gyp)** so you will need to
install
[Microsoft's windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)
using this command:_

```bash
npm install --global --production windows-build-tools
```

#### Setup steps

Follow the console instructions to install semantic release and run it (answer NO to "Do you want a `.travis.yml` file with semantic-release setup?").

_Note: make sure you've setup `repository.url` in your `package.json` file_

```bash
npm install -g semantic-release-cli
semantic-release-cli setup
# IMPORTANT!! Answer NO to "Do you want a `.travis.yml` file with semantic-release setup?" question. It is already prepared for you :P
```

From now on, you'll need to use `npm run commit`, which is a convenient way to create conventional commits.

Automatic releases are possible thanks to [semantic release](https://github.com/semantic-release/semantic-release), which publishes your code automatically on [github](https://github.com/) and [npm](https://www.npmjs.com/), plus generates automatically a changelog. This setup is highly influenced by [Kent C. Dodds course on egghead.io](https://egghead.io/courses/how-to-write-an-open-source-javascript-library)

### Git Hooks

There is already set a `precommit` hook for formatting your code with Prettier :nail_care:

By default, there are two disabled git hooks. They're set up when you run the `npm run semantic-release-prepare` script. They make sure:
 - You follow a [conventional commit message](https://github.com/conventional-changelog/conventional-changelog)
 - Your build is not going to fail in [Travis](https://travis-ci.org) (or your CI server), since it's runned locally before `git push`

This makes more sense in combination with [automatic releases](#automatic-releases)

### FAQ

#### `Array.prototype.from`, `Promise`, `Map`... is undefined?

TypeScript or Babel only provides down-emits on syntactical features (`class`, `let`, `async/await`...), but not on functional features (`Array.prototype.find`, `Set`, `Promise`...), . For that, you need Polyfills, such as [`core-js`](https://github.com/zloirock/core-js) or [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/) (which extends `core-js`).

For a library, `core-js` plays very nicely, since you can import just the polyfills you need:

```javascript
import "core-js/fn/array/find"
import "core-js/fn/string/includes"
import "core-js/fn/promise"
...
```

#### What is `npm install` doing on first run?

It runs the script `tools/init` which sets up everything for you. In short, it:
 - Configures RollupJS for the build, which creates the bundles
 - Configures `package.json` (typings file, main file, etc)
 - Renames main src and test files

#### What if I don't want git-hooks, automatic releases or semantic-release?

Then you may want to:
 - Remove `commitmsg`, `postinstall` scripts from `package.json`. That will not use those git hooks to make sure you make a conventional commit
 - Remove `npm run semantic-release` from `.travis.yml`

#### What if I don't want to use coveralls or report my coverage?

Remove `npm run report-coverage` from `.travis.yml`

## Resources

- [Write a library using TypeScript library starter](https://dev.to/alexjoverm/write-a-library-using-typescript-library-starter) by [@alexjoverm](https://github.com/alexjoverm/)
- [📺 Create a TypeScript Library using typescript-library-starter](https://egghead.io/lessons/typescript-create-a-typescript-library-using-typescript-library-starter) by [@alexjoverm](https://github.com/alexjoverm/)
- [Introducing TypeScript Library Starter Lite](https://blog.tonysneed.com/2017/09/15/introducing-typescript-library-starter-lite/) by [@tonysneed](https://github.com/tonysneed)

## Projects using `typescript-library-starter`

Here are some projects that use `typescript-library-starter`:

- [NOEL - A universal, human-centric, replayable event emitter](https://github.com/lifenautjoe/noel)
- [droppable - A library to give file dropping super-powers to any HTML element.](https://github.com/lifenautjoe/droppable)
- [redis-messaging-manager - Pubsub messaging library, using redis and rxjs](https://github.com/tomyitav/redis-messaging-manager)

## Credits

Made with :heart: by [@alexjoverm](https://twitter.com/alexjoverm) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars.githubusercontent.com/u/6052309?v=3" width="100px;"/><br /><sub><b>Ciro</b></sub>](https://www.linkedin.com/in/ciro-ivan-agulló-guarinos-42109376)<br />[💻](https://github.com/alexjoverm/typescript-library-starter/commits?author=k1r0s "Code") [🔧](#tool-k1r0s "Tools") | [<img src="https://avatars.githubusercontent.com/u/947523?v=3" width="100px;"/><br /><sub><b>Marius Schulz</b></sub>](https://blog.mariusschulz.com)<br />[📖](https://github.com/alexjoverm/typescript-library-starter/commits?author=mariusschulz "Documentation") | [<img src="https://avatars.githubusercontent.com/u/4152819?v=3" width="100px;"/><br /><sub><b>Alexander Odell</b></sub>](https://github.com/alextrastero)<br />[📖](https://github.com/alexjoverm/typescript-library-starter/commits?author=alextrastero "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/8728882?v=3" width="100px;"/><br /><sub><b>Ryan Ham</b></sub>](https://github.com/superamadeus)<br />[💻](https://github.com/alexjoverm/typescript-library-starter/commits?author=superamadeus "Code") | [<img src="https://avatars1.githubusercontent.com/u/8458838?v=3" width="100px;"/><br /><sub><b>Chi</b></sub>](https://consiiii.me)<br />[💻](https://github.com/alexjoverm/typescript-library-starter/commits?author=ChinW "Code") [🔧](#tool-ChinW "Tools") [📖](https://github.com/alexjoverm/typescript-library-starter/commits?author=ChinW "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/2856501?v=3" width="100px;"/><br /><sub><b>Matt Mazzola</b></sub>](https://github.com/mattmazzola)<br />[💻](https://github.com/alexjoverm/typescript-library-starter/commits?author=mattmazzola "Code") [🔧](#tool-mattmazzola "Tools") | [<img src="https://avatars0.githubusercontent.com/u/2664047?v=3" width="100px;"/><br /><sub><b>Sergii Lischuk</b></sub>](http://leefrost.github.io)<br />[💻](https://github.com/alexjoverm/typescript-library-starter/commits?author=Leefrost "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/618922?v=3" width="100px;"/><br /><sub><b>Steve Lee</b></sub>](http;//opendirective.com)<br />[🔧](#tool-SteveALee "Tools") | [<img src="https://avatars0.githubusercontent.com/u/5127501?v=3" width="100px;"/><br /><sub><b>Flavio Corpa</b></sub>](http://flaviocorpa.com)<br />[💻](https://github.com/alexjoverm/typescript-library-starter/commits?author=kutyel "Code") | [<img src="https://avatars2.githubusercontent.com/u/22561997?v=3" width="100px;"/><br /><sub><b>Dom</b></sub>](https://github.com/foreggs)<br />[🔧](#tool-foreggs "Tools") | [<img src="https://avatars1.githubusercontent.com/u/755?v=4" width="100px;"/><br /><sub><b>Alex Coles</b></sub>](http://alexbcoles.com)<br />[📖](https://github.com/alexjoverm/typescript-library-starter/commits?author=myabc "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/1093738?v=4" width="100px;"/><br /><sub><b>David Khourshid</b></sub>](https://github.com/davidkpiano)<br />[🔧](#tool-davidkpiano "Tools") | [<img src="https://avatars0.githubusercontent.com/u/7225802?v=4" width="100px;"/><br /><sub><b>Aarón García Hervás</b></sub>](https://aarongarciah.com)<br />[📖](https://github.com/alexjoverm/typescript-library-starter/commits?author=aarongarciah "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/13683986?v=4" width="100px;"/><br /><sub><b>Jonathan Hart</b></sub>](https://www.stuajnht.co.uk)<br />[💻](https://github.com/alexjoverm/typescript-library-starter/commits?author=stuajnht "Code") |
| [<img src="https://avatars0.githubusercontent.com/u/13509204?v=4" width="100px;"/><br /><sub><b>Sanjiv Lobo</b></sub>](https://github.com/Xndr7)<br />[📖](https://github.com/alexjoverm/typescript-library-starter/commits?author=Xndr7 "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/7473800?v=4" width="100px;"/><br /><sub><b>Stefan Aleksovski</b></sub>](https://github.com/sAleksovski)<br />[💻](https://github.com/alexjoverm/typescript-library-starter/commits?author=sAleksovski "Code") | [<img src="https://avatars2.githubusercontent.com/u/8853426?v=4" width="100px;"/><br /><sub><b>dev.peerapong</b></sub>](https://github.com/devpeerapong)<br />[💻](https://github.com/alexjoverm/typescript-library-starter/commits?author=devpeerapong "Code") | [<img src="https://avatars0.githubusercontent.com/u/22260722?v=4" width="100px;"/><br /><sub><b>Aaron Groome</b></sub>](http://twitter.com/Racing5372)<br />[📖](https://github.com/alexjoverm/typescript-library-starter/commits?author=Racing5372 "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/180963?v=4" width="100px;"/><br /><sub><b>Aaron Reisman</b></sub>](https://github.com/lifeiscontent)<br />[💻](https://github.com/alexjoverm/typescript-library-starter/commits?author=lifeiscontent "Code") | [<img src="https://avatars1.githubusercontent.com/u/32557482?v=4" width="100px;"/><br /><sub><b>kid-sk</b></sub>](https://github.com/kid-sk)<br />[📖](https://github.com/alexjoverm/typescript-library-starter/commits?author=kid-sk "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/1503089?v=4" width="100px;"/><br /><sub><b>Andrea Gottardi</b></sub>](http://about.me/andreagot)<br />[📖](https://github.com/alexjoverm/typescript-library-starter/commits?author=AndreaGot "Documentation") |
| [<img src="https://avatars3.githubusercontent.com/u/1375860?v=4" width="100px;"/><br /><sub><b>Yogendra Sharma</b></sub>](http://TechiesEyes.com)<br />[📖](https://github.com/alexjoverm/typescript-library-starter/commits?author=Yogendra0Sharma "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/7407177?v=4" width="100px;"/><br /><sub><b>Rayan Salhab</b></sub>](http://linkedin.com/in/rayan-salhab/)<br />[💻](https://github.com/alexjoverm/typescript-library-starter/commits?author=cyphercodes "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!
