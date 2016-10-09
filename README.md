# React Native Immutable ListView

An efficient ListView for React Native that's compatible with [Immutable](https://facebook.github.io/immutable-js/) data.

## Setup

`npm install --save react-native-immutable-list-view`

## Usage

```js
import ImmutableListView from 'react-native-immutable-list-view';
```

`ImmutableListView` supports all the props of [ListView](https://facebook.github.io/react-native/docs/listview.html),
but instead of passing in a `dataSource`, you should should pass in a prop called `immutableData`
containing the data you'd like to display. `ImmutableListView` will handle creating an efficient `dataSource` for you.

Other than this small change, everything else will be exactly the same as `ListView`.
An example is coming shortly.

Note: Currently only `Map`s and `List`s are supported, but that will be fixed shortly. Feel free to submit a PR!

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
