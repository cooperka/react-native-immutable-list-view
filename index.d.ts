import * as React from 'react'
import * as Immutable from 'immutable'
import { ListViewProps, VirtualizedListProps } from 'react-native';

type ImmutableSource = Immutable.Iterable<any, any>

export type ImmutableListViewProps = ListViewProps & {
  dataSource: never,
  immutableData: ImmutableSource,
  sectionHeaderHasChanged?: (prevSectionData:any, nextSectionData:any) => boolean,
  rowsDuringInteraction?: number,
  renderEmpty?: string | React.FC<ImmutableListViewProps>,
  renderEmptyInList?: string | React.FC<ImmutableListViewProps>,
}

export declare class ImmutableListView extends React.Component<ImmutableListViewProps> {}

export declare class EmptyListView extends React.Component<ListViewProps & {
  dataSource: never,
  renderRow: React.FC<any>,
  emptyText?: string,
}> {}

export type ImmutableVirtualizedListProps<T> = VirtualizedListProps<T> & {
  dataSource: never,
  immutableData: ImmutableSource,
  renderEmpty?: string | React.FC<ImmutableVirtualizedListProps<T>>,
  renderEmptyInList?: string | React.FC<ImmutableVirtualizedListProps<T>>,
}

export declare class ImmutableVirtualizedList<T = any> extends React.Component<ImmutableVirtualizedListProps<T>> {}

export declare class EmptyVirtualizedList<T> extends React.Component<VirtualizedListProps<T> & {
  renderItem: React.FC<any>,
  emptyText: string
}> {}