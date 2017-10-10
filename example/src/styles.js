import { StyleSheet, Platform } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    padding: 24,
  },
  controlPanelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  controlPanelLabel: {
    fontSize: 18,
    padding: 8,
  },
  controlPanelSpacer: {
    width: Platform.OS === 'android' ? 4 : 0,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  list: {
    flex: 1,
  },
  listButton: {
    margin: 4,
  },
  listRowItem: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listHeaderItem: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default style;
