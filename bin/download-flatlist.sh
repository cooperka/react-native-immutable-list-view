#!/bin/sh

# Based on https://gist.github.com/cooperka/c5dd3ab11f588044d4d6ba22d52c4ab0
# Downloads FlatList and its related dependencies directly into your node_modules.

mkdir -p node_modules/react-native/Libraries/CustomComponents/Lists/ && \
for file in 'FlatList' 'MetroListView' 'SectionList' 'VirtualizedList' 'ViewabilityHelper' 'VirtualizeUtils' 'VirtualizedSectionList'; \
  do curl https://raw.githubusercontent.com/facebook/react-native/master/Libraries/CustomComponents/Lists/${file}.js > node_modules/react-native/Libraries/CustomComponents/Lists/${file}.js; \
  done
