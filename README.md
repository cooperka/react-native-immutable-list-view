# React Native Immutable ListView

An efficient ListView for React Native that's compatible with [Immutable](https://facebook.github.io/immutable-js/) data.

[![Build status](https://travis-ci.org/cooperka/react-native-immutable-list-view.svg?branch=master)](https://travis-ci.org/cooperka/react-native-immutable-list-view)
[![npm downloads](https://img.shields.io/npm/dm/react-native-immutable-list-view.svg)](https://www.npmjs.com/package/react-native-immutable-list-view)
[![npm version](https://img.shields.io/npm/v/react-native-immutable-list-view.svg)](https://www.npmjs.com/package/react-native-immutable-list-view)
[![Latest GitHub tag](https://img.shields.io/github/tag/cooperka/react-native-immutable-list-view.svg)](https://github.com/cooperka/react-native-immutable-list-view)

## Motivation

- Do you find yourself re-implementing `rowHasChanged` and saving `dataSource` to your state over and over?
- Do you listen for lifecycle events simply so you can update `dataSource`, and thus can't easily use pure functional components with lists?
- Do you have nested objects in your state so a shallow diff won't cut it for pure rendering?
- Do you use Immutable data, only to write wrappers for data access in order to use them with a ListView?

If you answered yes to ANY of these questions, this project will surely be of help. Check out the examples below!

## Setup

```console
npm install --save react-native-immutable-list-view
```

## Usage

```js
import ImmutableListView from 'react-native-immutable-list-view';
```

`ImmutableListView` supports all the props of React Native's [ListView](https://facebook.github.io/react-native/docs/listview.html),
but instead of passing in a `dataSource`, you should should pass in a prop called `immutableData`
consisting of the data you'd like to display. `ImmutableListView` will handle creating an efficient `dataSource` for you.
Other than this small change, everything else will be exactly the same as `ListView`.

There's an example app [here](https://github.com/cooperka/react-native-immutable-list-view/tree/master/example)
if you'd like to see it in action; have a look at the example diff below if you want to implement it yourself.

## Example Usage

You can remove all that boilerplate in your constructor, as well as methods like
`componentWillReceiveProps` if all they're doing is updating your `dataSource`.
`ImmutableListView` will handle this for you. Check out this example diff:

> Note: it looks much better on [GitHub](https://github.com/cooperka/react-native-immutable-list-view#example-usage) than on npm's site.

```diff
-import { Text, View, ListView } from 'react-native';
+import { Text, View } from 'react-native';
+import ImmutableListView from 'react-native-immutable-list-view';

 import style from './styles';
 import listData from './listData';

 class App extends Component {

-  constructor(props) {
-    super(props);
-
-    const dataSource = new ListView.DataSource({
-      rowHasChanged: (r1, r2) => r1 !== r2,
-      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
-    });
-
-    const mutableData = listData.toJS();
-
-    this.state = {
-      dataSource: dataSource.cloneWithRowsAndSections(mutableData),
-    };
-  }
-
-  componentWillReceiveProps(newProps) {
-    this.setState({
-      dataSource: this.state.dataSource.cloneWithRows(newProps.listData),
-    });
-  }
-
   renderRow(rowData) {
     return <Text style={style.row}>{rowData}</Text>;
   }

  renderSectionHeader(sectionData, category) {
    return <Text style={style.header}>{category}</Text>;
  }

  render() {
    return (
      <View style={style.container}>
         <Text style={style.welcome}>
           Welcome to React Native!
         </Text>
-        <ListView
-          dataSource={this.state.dataSource}
+        <ImmutableListView
+          immutableData={listData}
           renderRow={this.renderRow}
           renderSectionHeader={this.renderSectionHeader}
         />
      </View>
    );
  }

}
```

## Props

All the props that React Native's [`ListView`](https://facebook.github.io/react-native/docs/listview.html)
supports are passed through, and should work exactly the same.

| Prop name | Data type | Default value? | Description |
|-----------|-----------|----------------|-------------|
| `immutableData` | [`Immutable.Iterable`](https://facebook.github.io/immutable-js/docs/#/Iterable/isIterable) | Required. | The data to render |
| `rowsDuringInteraction` | `number` | `undefined` | How many rows of data to initially display while waiting for interactions to finish (e.g. Navigation animations) |

Simple, right?

> Note: Currently, `ImmutableListView` treats certain types of `Immutable.Map` slightly differently than `ListView` treats an equivalent plain JS `Map`.
> See the snapshot test output [here](https://github.com/cooperka/react-native-immutable-list-view/blob/master/src/__tests__/__snapshots__/ImmutableListView.test.js.snap)
> for an example of how `ImmutableListView` behaves.
>
> It seems based on the [current documentation](https://facebook.github.io/react-native/releases/0.36/docs/listviewdatasource.html#constructor)
> that `ImmutableListView` is behaving as expected, and in fact `ListView` is the one being weird.
> I have yet to confirm this, so this behavior may change slightly in a future update.
>
> Feel free to [weigh in](https://github.com/cooperka/react-native-immutable-list-view/issues/5).

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
