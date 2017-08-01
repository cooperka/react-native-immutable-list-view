import Immutable from 'immutable';
import React from 'react';

// ESLint can't resolve the module location when running on Travis, so ignore these lints.
// eslint-disable-next-line import/no-unresolved, import/extensions
import { ImmutableVirtualizedList } from 'react-native-immutable-list-view';

import GenericListExample from './GenericListExample';

import utils from './utils';

function ImmutableVirtualizedListExample() {
  return (
    <GenericListExample
      ListComponent={ImmutableVirtualizedList}
      listComponentProps={{
        renderItem: utils.renderItem,
        keyExtractor: utils.trivialKeyExtractor,
      }}

      initialDataA={Immutable.List(['Simple', 'List', 'of', 'Items'])}
      initialDataB={Immutable.Range(1, 100)}

      dataMutatorA={(data) => data.set(3, 'This value was changed!')}
      dataMutatorB={(data) => data.toSeq().map((n) => n * 2)}
    />
  );
}

export default ImmutableVirtualizedListExample;
