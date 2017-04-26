#!/bin/bash

# Based on https://gist.github.com/cooperka/c5dd3ab11f588044d4d6ba22d52c4ab0
# Downloads FlatList and its related dependencies directly into your node_modules.

FILES=('FlatList' 'MetroListView' 'SectionList' 'VirtualizedList' 'VirtualizedSectionList' 'ViewabilityHelper' 'VirtualizeUtils' 'FillRateHelper')
OLD_DIR_1='node_modules/react-native/Libraries/Experimental'
OLD_DIR_2='node_modules/react-native/Libraries/CustomComponents/Lists'
NEW_DIR='node_modules/react-native/Libraries/Lists'

mkdir -p ${NEW_DIR} && \
for file in ${FILES[@]}; \
  do \
    echo $file; \
    rm -f ${OLD_DIR_1}/${file}.js; \
    rm -f ${OLD_DIR_2}/${file}.js; \
    curl https://raw.githubusercontent.com/facebook/react-native/master/Libraries/Lists/${file}.js > ${NEW_DIR}/${file}.js; \
  done
