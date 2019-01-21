# detox-take-screenshot
[![npm version](https://badge.fury.io/js/detox-take-screenshot.svg?t=1495378566925)](https://badge.fury.io/js/detox-take-screenshot)
[![Dependency Status](https://david-dm.org/iyegoroff/detox-take-screenshot.svg?t=1495378566925)](https://david-dm.org/iyegoroff/detox-take-screenshot)
[![devDependencies Status](https://david-dm.org/iyegoroff/detox-take-screenshot/dev-status.svg)](https://david-dm.org/iyegoroff/detox-take-screenshot?type=dev)
[![npm](https://img.shields.io/npm/l/express.svg?t=1495378566925)](https://www.npmjs.com/package/detox-take-screenshot)

Takes screenshot and returns a temporary file. It is meant to be used with screenshot comparison tools like [jest-screenshot](https://github.com/Prior99/jest-screenshot) or [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot).

## Getting started

`$ npm i detox-take-screenshot -D`

## Example

```js
import jestExpect from 'expect'
import screenshot from 'detox-take-screenshot'

describe('Test', () => {
  // ...

  it('test case', async () => {
    await jestExpect(await screenshot()).toMatchImageSnapshot()
  })
})
```
