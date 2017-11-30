const mockComponent = require.requireActual('react-native/jest/mockComponent');

// Jest's default mock doesn't work well with setion headers. Use the old mock until it's improved.
// https://github.com/facebook/react-native/commit/5537055bf87c8b19e9fa8413486eef6a7ac5017f#diff-606adbd6a8c97d177b17baee5a69cdd9
// https://github.com/facebook/react-native/blob/master/Libraries/CustomComponents/ListView/__mocks__/ListViewMock.js
jest.mock('ListView', () => {
  const RealListView = require.requireActual('ListView');
  const ListView = mockComponent('ListView');
  ListView.prototype.render = RealListView.prototype.render;
  return ListView;
});
