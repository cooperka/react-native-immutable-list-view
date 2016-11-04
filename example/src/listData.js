import Immutable from 'immutable';

const data = Immutable.fromJS({
  'Section A': [
    'foo',
    'bar',
  ],
  'Section B': [
    'fizz',
    'buzz',
  ],
});

const sameData = Immutable.fromJS({
  'Section A': [
    'foo',
    'bar',
  ],
  'Section B': [
    'fizz',
    'buzz',
  ],
});

const differentSections = Immutable.fromJS({
  'Section C': [
    'foo',
    'bar',
  ],
  'Section D': [
    'fizz',
    'buzz',
  ],
});

const differentRows = Immutable.fromJS({
  'Section A': [
    'baz',
    'qux',
  ],
  'Section B': [
    'fizz',
    'buzz',
  ],
});

export {
  sameData,
  differentSections,
  differentRows,
};

export default data;
