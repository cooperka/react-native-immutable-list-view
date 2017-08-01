import Immutable from 'immutable';
import React from 'react';

// ESLint can't resolve the module location when running on Travis, so ignore these lints.
// eslint-disable-next-line import/no-unresolved, import/extensions
import { ImmutableListView } from 'react-native-immutable-list-view';

import GenericListExample from './GenericListExample';

import utils from './utils';
import mockData from './mockData';

function ImmutableListViewExample() {
  return (
    <GenericListExample
      ListComponent={ImmutableListView}
      listComponentProps={{
        renderRow: utils.renderRow,
      }}
      extraPropsA={{
        renderSectionHeader: utils.renderSectionHeader,
      }}

      initialDataA={mockData}
      initialDataB={Immutable.Range(1, 100)}

      dataMutatorA={(data) => data.setIn(['Section A', 1], 'This value was changed!')}
      dataMutatorB={(data) => data.toSeq().map((n) => n * 2)}
    />
  );
}

export default ImmutableListViewExample;
