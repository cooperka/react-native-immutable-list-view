#!/bin/bash

# Based on https://gist.github.com/cooperka/c5dd3ab11f588044d4d6ba22d52c4ab0
# Downloads FlatList and its related dependencies directly into your node_modules.

FILES=('FlatList' 'MetroListView' 'SectionList' 'VirtualizedList' 'ViewabilityHelper' 'VirtualizeUtils' 'VirtualizedSectionList')
OLD_DIR='node_modules/react-native/Libraries/Experimental'
NEW_DIR='node_modules/react-native/Libraries/CustomComponents/Lists'

mkdir -p ${NEW_DIR} && \
for file in ${FILES[@]}; \
  do \
    echo $file; \
    rm -f ${OLD_DIR}/${file}.js; \
    curl https://raw.githubusercontent.com/facebook/react-native/master/Libraries/CustomComponents/Lists/${file}.js > ${NEW_DIR}/${file}.js; \
  done
