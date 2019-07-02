# conventional-commits-pattern-filter

Filter commits by pattern, not just reverted ones

[![install size](https://packagephobia.now.sh/badge?p=conventional-commits-pattern-filter)](https://packagephobia.now.sh/result?p=conventional-commits-pattern-filter) ![npm](https://img.shields.io/npm/v/conventional-commits-pattern-filter.svg)

## Install

```
npm i conventional-commits-filter

// or

yarn add conventional-commits-filter
```

## Usage

```
const filter = require('conventional-commits-pattern-filter')

// given a commits array like
const commits = [
  {
    subject: 'feat: [excludeMe]: some feature',
    // other props
  },
  {
    subject: 'feat: thw best thing since sliced bread',
    // other props
  },
]

const filteredCommits = filter({ commits, field: 'subject', pattern: '[excludeMe]' })

// filteredCommits
[
    {
        subject: 'feat: thw best thing since sliced bread',
        // other props
    }
]
```

## API

### conventionalCommitsPatternFilter(options)

Returns a filtered array of commits based on the given field and pattern.

### options

Type: `object`

#### commits

Type: `array`

Array of parsed commits returned by [conventional-commits-parser](https://www.npmjs.com/package/conventional-commits-parser)

The `commit` object has the follwing structure:

```
{ type: 'feat',
  scope: 'scope',
  subject: 'what an amazing feature',
  merge: null,
  header: 'feat(scope): what an amazing feature',
  body: null,
  footer: 'Closes #1',
  notes: [],
  references:
   [ { action: 'Closes',
       owner: null,
       repository: null,
       issue: '1',
       raw: '#1',
       prefix: '#' } ],
  mentions: [],
  revert: null }
```

#### field

Type: `string`

Field to filter on. Can be the name of any valid property/key on the `commit` object from `commits` array.

Note: Currently only supports simple properties. Send me a PR if you need any deep filtering!

#### pattern

Type: `string` or `regex`

The pattern to filter commits. Any matching commit will be excluded.

## License

![NPM](https://img.shields.io/npm/l/conventional-commits-pattern-filter.svg)
Released 2019 by [Hrusikesh Panda](https://github.com/mrchief)
