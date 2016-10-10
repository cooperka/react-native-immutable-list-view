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

There's an example project [here](https://github.com/cooperka/react-native-immutable-list-view/tree/master/example)
if you'd like to see it in action, or look at the example diff below if you want to implement it yourself.

Note: Currently only Immutable's `Map` and `List` are supported, but that will be fixed shortly.
Feel free to submit a PR!

## Example Usage

You can remove all that boilerplate in your constructor, as well as methods like
`componentWillReceiveProps` if all they're doing is updating your `dataSource`.
ImmutableListView will handle this for you. Check out this example diff:

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

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
