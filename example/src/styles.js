import { StyleSheet } from 'react-native';

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
    margin: 20,
  },
  button: {
    padding: 20,
    paddingTop: 0,
  },
  listRow: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listHeader: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  sideBySideLists: {
    flex: 1,
    flexDirection: 'row',
  },
  list: {
    flex: 1,
  },
});

export default style;
