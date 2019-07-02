# conventional-commits-pattern-filter

Filter commits by pattern, not just reverted ones.

[![npm bundle size][bsbadgeimgurl]][bsurl] [![npm][npmbadgeimgurl]][npmurl]

[bsurl]: https://bundlephobia.com/result?p=conventional-commits-pattern-filter
[bsbadgeimgurl]: https://img.shields.io/bundlephobia/minzip/conventional-commits-pattern-filter.svg
[npmurl]: https://www.npmjs.com/package/conventional-commits-pattern-filter
[npmbadgeimgurl]: https://img.shields.io/npm/v/conventional-commits-pattern-filter.svg

## Why

[conventional-commits-filter](https://www.npmjs.com/package/conventional-commits-filter) filters reverted commits. **conventional-commits-pattern-filter** extends that ability to filter out arbitrary commits based on user defined patterns.

### Use case - filtering out another app's commits

Let's say you have one codebase that is shared by many frontend apps. These apps have different deployments but commit changes to the same, git repo. E.g., consider this history:

```
<-- app1 wants to release a new version -- >

|
o feat: [app1]: Awesome new feature
|
o fix: [app1]: Fixed that annoying bug
|
o fix: [app2]: Squashed that bug
|
o docs: [app2]: Added awesome documentation
|
o chore: [app1]: Bump version for abc dependency
|

<-- app1 released v1.5.9 -- >
```

In order to create a new release, `app1` wants to include all changes tagged with `[app1]` since `v1.5.9` release. With **conventional-commits-pattern-filter**, it can do so:

```
const allCommits = conventionalCommitsParser(...)  // get commits parsed via conventional-commits-parser

const appCommits = filter({commits: allCommits, field: 'subject', pattern: '[app2]' })

// appCommits

o feat: [app1]: Awesome new feature
|
o fix: [app1]: Fixed that annoying bug
|
o chore: [app1]: Bump version for abc dependency
```

### Use case - filtering out BREAKING CHANGES

Say you want to extract breaking changes only so that you can share it with stakeholders or do something else with them.

```
const breakingChanges = filter({ commits, field: 'body', pattern: /^((?!BREAKING CHANGE).)*/igm })
```

## Install

```
npm i conventional-commits-filter
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
