import React from 'react';
import { Text, View } from 'react-native';

import style from './styles';

const utils = {

  renderRow(rowData) {
    return <Text style={style.listRowItem}>{rowData}</Text>;
  },

  // eslint-disable-next-line react/prop-types
  renderItem({ item }) {
    return <Text style={style.listRowItem}>{item}</Text>;
  },

  renderSectionHeader(sectionData, category) {
    return (
      <View>
        <Text style={style.listHeaderItem}>{category}</Text>
      </View>
    );
  },

  trivialKeyExtractor(item, index) {
    return String(index);
  },

};

export default utils;
