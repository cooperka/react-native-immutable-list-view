# React Native Immutable ListView

[![Build status](https://travis-ci.org/cooperka/react-native-immutable-list-view.svg?branch=master)](https://travis-ci.org/cooperka/react-native-immutable-list-view)
[![npm downloads](https://img.shields.io/npm/dm/react-native-immutable-list-view.svg)](https://www.npmjs.com/package/react-native-immutable-list-view)
[![npm version](https://img.shields.io/npm/v/react-native-immutable-list-view.svg)](https://www.npmjs.com/package/react-native-immutable-list-view)
[![Latest GitHub tag](https://img.shields.io/github/tag/cooperka/react-native-immutable-list-view.svg)](https://github.com/cooperka/react-native-immutable-list-view)

A drop-in replacement for React Native's [`ListView`](https://facebook.github.io/react-native/docs/listview.html).

![ImmutableListView screenshot](example/screenshots/listview-cropped.png "ImmutableListView screenshot")

It supports [Immutable](https://facebook.github.io/immutable-js/) data out-of-the-box to give you
faster performance and less headaches.

NEW! It also supports the experimental `VirtualizedList` component (the underlying component used by `FlatList`) as of `v0.3.0`;
see the [instructions at the bottom](#immutablevirtualizedlist) for more details.

## Code

```jsx
<ImmutableListView
  immutableData={this.state.listData}
  renderRow={this.renderRow}
/>
```

The screenshot above shows two different lists. The first simply uses this data:

```js
Immutable.fromJS({
  'Section A': [
    'foo',
    'bar',
  ],
  'Section B': [
    'fizz',
    'buzz',
  ],
})
```

The second list is even simpler:

```js
Immutable.Range(1, 100)
```

## Motivation

- Do you find yourself re-implementing `rowHasChanged` and saving `dataSource` to your state over and over?
- Do you use Immutable data, only to write wrappers for data access in order to use them with a ListView?
- Do you listen for lifecycle events simply so you can update `dataSource` -- and thus you can't easily use pure functional components with lists?
- Do you have nested objects in your state so a shallow diff won't cut it for pure rendering?
- Do you use a navigator and want better performance while animating?

If you answered yes to ANY of these questions, this project will surely help.
Check out the [examples](https://github.com/cooperka/react-native-immutable-list-view#how-to-format-your-data) below!

## Usage

1. Install:
    - Using [npm](https://www.npmjs.com/#getting-started): `npm install react-native-immutable-list-view --save`
    - Using [Yarn](https://yarnpkg.com/): `yarn add react-native-immutable-list-view`

2. Import it in your JS:

    ```js
    import ImmutableListView from 'react-native-immutable-list-view';
    ```

It supports all the props of React Native's [`ListView`](https://facebook.github.io/react-native/docs/listview.html#props),
but instead of passing in a `dataSource`, you should should pass in a prop called `immutableData`.

This prop is just the raw data you'd like to display -- `ImmutableListView` will handle creating an efficient `dataSource` for you.
Other than this small change, everything else will be exactly the same as `ListView`.

There's an example app [here](https://github.com/cooperka/react-native-immutable-list-view/tree/master/example)
if you'd like to see it in action.

## Example Usage

You can remove all that boilerplate in your constructor, as well as lifecycle methods like
`componentWillReceiveProps` if all they're doing is updating your `dataSource`.
`ImmutableListView` will handle all of this for you.

Check out this example diff:

> Note: This looks much better on [GitHub](https://github.com/cooperka/react-native-immutable-list-view#example-usage) than on npm's site.
> Red means delete, green means add.

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

All the props supported by React Native's `ListView` are simply passed through, and should work exactly the same.
You can read about them [here](https://facebook.github.io/react-native/docs/listview.html#props).

You can fully customize the look of your list by implementing [`renderRow`](https://facebook.github.io/react-native/docs/listview.html#renderrow)
and, optionally, [`renderSectionHeader`](https://facebook.github.io/react-native/docs/listview.html#rendersectionheader).

Here are the additional props that `ImmutableListView` accepts:

| Prop name | Data type | Default value? | Description |
|-----------|-----------|----------------|-------------|
| `immutableData` | Any [`Immutable.Iterable`](https://facebook.github.io/immutable-js/docs/#/Iterable/isIterable) | Required. | The data to render. See below for some examples. |
| `rowsDuringInteraction` | `number` | `undefined` | How many rows of data to initially display while waiting for interactions to finish (e.g. Navigation animations). |
| `sectionHeaderHasChanged` | `func` | `(prevSectionData, nextSectionData) => false` | Return true if your section header is dependent on your row data (uncommon; see [`ListViewDataSource`'s constructor](https://facebook.github.io/react-native/docs/listviewdatasource.html#constructor) for more info). |

## How to format your data

`ImmutableListView` accepts several [standard formats](https://facebook.github.io/react-native/releases/0.37/docs/listviewdatasource.html#constructor)
for list data. Here are some examples:

#### List

```js
[rowData1, rowData2, ...]
```

#### Map of Lists

```js
{
    section1: [
        rowData1,
        rowData2,
        ...
    ],
    ...
}
```

#### Map of Maps

```js
{
    section1: {
        rowId1: rowData1,
        rowId2: rowData2,
        ...
    },
    ...
}
```

To try it out yourself, you can use the [example app](https://github.com/cooperka/react-native-immutable-list-view/tree/master/example)!

## Differences from ListView

When using section headers, `ImmutableListView` treats certain types of `Immutable.Map` slightly differently
than `ListView` treats an equivalent plain JS `Map`. See the snapshot test output
[here](https://github.com/cooperka/react-native-immutable-list-view/blob/master/src/__tests__/__snapshots__/ImmutableListView.test.js.snap)
for an example of how `ImmutableListView` behaves, or try it for yourself.

It seems based on the [current documentation](https://facebook.github.io/react-native/releases/0.37/docs/listviewdatasource.html#constructor)
that **`ImmutableListView` is behaving as expected**, and in fact regular `ListView` is the one being weird.
In any case, you should make sure to test this behavior yourself if you're using a `Map` with section headers.

Other than this, the two should behave identically. You can verify this with the unit tests
[here](https://github.com/cooperka/react-native-immutable-list-view/blob/master/src/__tests__/comparison.test.js).

## ImmutableVirtualizedList

Just as the `ImmutableListView` component helps render a `ListView` using Immutable data,
`ImmutableVirtualizedList` helps render the new and improved `VirtualizedList` component.
This is the underlying component that `FlatList` uses.

There's a [Medium article about it](https://medium.com/@cooperka/react-native-new-flatlist-component-30db558c7a5b) if you'd like more context.
The short version of the setup instructions is below.

`VirtualizedList` is considered "experimental" by React Native, and isn't intended for production use.
That said, here's how you can test it out for yourself:

1. Download the required files into your app's `node_modules` (since these components aren't published yet):

    ```bash
    for file in 'FlatList' 'MetroListView' 'VirtualizedList' 'VirtualizeUtils'; \
      do curl https://raw.githubusercontent.com/facebook/react-native/master/Libraries/Experimental/${file}.js > node_modules/react-native/Libraries/Experimental/${file}.js; \
      done
    ```

    or

    ```bash
    npm run download-flatlist
    ```

2. Import the new component:

    ```js
    import ImmutableVirtualizedList from 'react-native-immutable-list-view/lib/Experimental/ImmutableVirtualizedList';
    ```

3. Render it:

    ```jsx
    <ImmutableVirtualizedList
      immutableData={this.state.listData}
      ItemComponent={this.renderItemComponent}
    />
    ```

See the [example app](https://github.com/cooperka/react-native-immutable-list-view/tree/master/example) for a working demo,
or [React Native's `FlatListExample`](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/js/FlatListExample.js) for an idea of what features are possible.
