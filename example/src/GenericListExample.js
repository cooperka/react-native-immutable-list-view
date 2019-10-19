import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View, Button, RefreshControl } from 'react-native';

import style from './styles';

const EMPTY_LIST = Immutable.List();
const MOCK_DELAY = 800;

class GenericListExample extends Component {
  static propTypes = {
    ListComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    listComponentProps: PropTypes.object.isRequired,

    initialDataA: PropTypes.object.isRequired,
    dataMutatorA: PropTypes.func.isRequired,
    extraPropsA: PropTypes.object,

    initialDataB: PropTypes.object.isRequired,
    dataMutatorB: PropTypes.func.isRequired,
    extraPropsB: PropTypes.object,
  };

  componentWillMount() {
    const { initialDataA, initialDataB } = this.props;

    this.defaultStateA.data = initialDataA;
    this.defaultStateB.data = initialDataB;

    this.setState({
      listA: {
        ...this.defaultStateA,
      },
      listB: {
        ...this.defaultStateB,
      },
    });
  }

  defaultStateA = {
    data: undefined, // Will be manually set on mount.
    isLoading: false,
    errorMsg: undefined,
  };

  defaultStateB = {
    data: undefined, // Will be manually set on mount.
    isLoading: false,
    errorMsg: undefined,
  };

  changeDataA(delay = 0) {
    const { listA } = this.state;
    const { dataMutatorA } = this.props;

    if (delay) {
      this.setState({
        listA: {
          ...listA,
          isLoading: true,
        },
      });
    }

    setTimeout(() => {
      this.setState({
        listA: {
          ...listA,
          data: dataMutatorA(listA.data),
          isLoading: false,
          errorMsg: undefined,
        },
      });
    }, delay);
  }

  changeDataB(delay = 0) {
    const { listB } = this.state;
    const { dataMutatorB } = this.props;

    if (delay) {
      this.setState({
        listB: {
          ...listB,
          isLoading: true,
        },
      });
    }

    setTimeout(() => {
      this.setState({
        listB: {
          ...listB,
          data: dataMutatorB(listB.data),
          isLoading: false,
          errorMsg: undefined,
        },
      });
    }, delay);
  }

  toggleDefaultState() {
    this.setState({
      listA: {
        ...this.defaultStateA,
      },
      listB: {
        ...this.defaultStateB,
      },
    });
  }

  toggleLoadingState() {
    this.setState({
      listA: {
        ...this.defaultStateA,
        data: EMPTY_LIST,
        isLoading: true,
      },
      listB: {
        ...this.defaultStateB,
        data: EMPTY_LIST,
        isLoading: true,
      },
    });
  }

  toggleErrorState() {
    this.setState({
      listA: {
        ...this.defaultStateA,
        data: EMPTY_LIST,
        errorMsg: 'Error! Fake data A has gone rogue!',
      },
      listB: {
        ...this.defaultStateB,
        data: EMPTY_LIST,
        errorMsg: 'Error! Fake data B has gone rogue!',
      },
    });
  }

  render() {
    const { listA, listB } = this.state;
    const {
      ListComponent, extraPropsA, extraPropsB, listComponentProps,
    } = this.props;

    const emptyTextA = listA.isLoading ? 'Loading...' : listA.errorMsg;
    const emptyTextB = listB.isLoading ? 'Loading...' : listB.errorMsg;

    return (
      <View style={style.container}>
        <Text style={style.title}>
          {ListComponent.displayName || ListComponent.name}
        </Text>
        <View style={style.controlPanelContainer}>
          <Text style={style.controlPanelLabel}>
            State:
          </Text>
          <Button
            onPress={() => this.toggleDefaultState()}
            title="Default"
          />
          <View style={style.controlPanelSpacer} />
          <Button
            onPress={() => this.toggleLoadingState()}
            title="Loading"
          />
          <View style={style.controlPanelSpacer} />
          <Button
            onPress={() => this.toggleErrorState()}
            title="Error"
          />
          <View style={style.controlPanelSpacer} />
        </View>
        <View style={style.listContainer}>
          <View style={style.list}>
            <View style={style.listButton}>
              <Button
                onPress={() => this.changeDataA()}
                title="Update data (or pull-refresh)"
              />
            </View>
            <ListComponent
              refreshControl={
                <RefreshControl
                  refreshing={listA.isLoading}
                  onRefresh={() => this.changeDataA(MOCK_DELAY)}
                />
              }
              {...listComponentProps}
              {...extraPropsA}
              immutableData={listA.data}
              renderEmptyInList={emptyTextA}
            />
          </View>
          <View style={style.list}>
            <View style={style.listButton}>
              <Button
                onPress={() => this.changeDataB()}
                title="Update data (or pull-refresh)"
              />
            </View>
            <ListComponent
              refreshControl={
                <RefreshControl
                  refreshing={listB.isLoading}
                  onRefresh={() => this.changeDataB(MOCK_DELAY)}
                />
              }
              {...listComponentProps}
              {...extraPropsB}
              immutableData={listB.data}
              renderEmptyInList={emptyTextB}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default GenericListExample;
