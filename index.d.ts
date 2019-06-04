import * as React from 'react'
import * as Immutable from 'immutable'
import { ListViewProps, VirtualizedListProps } from 'react-native';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// Heuristic check if data is Immutable
type ImmutableData = {
  slice: (begin?: number, end?: number) => any;
  keySeq: () => any
}

export type ImmutableListViewProps = Omit<ListViewProps, 'dataSource'> & {
  immutableData: ImmutableData,
  dataSource?: never,
  sectionHeaderHasChanged?: (prevSectionData:any, nextSectionData:any) => boolean,
  rowsDuringInteraction?: number,
  renderEmpty?: string | React.FC<ImmutableListViewProps>,
  renderEmptyInList?: string | React.FC<ImmutableListViewProps>,
}

export declare class ImmutableListView extends React.Component<ImmutableListViewProps> {}

export declare class EmptyListView extends React.Component<Omit<ListViewProps, 'dataSource'> & {
  dataSource?: never,
  renderRow?: React.FC<any>,
  emptyText?: string,
}> {}

export type ImmutableVirtualizedListProps<T> = VirtualizedListProps<T> & {
  immutableData: ImmutableData,
  renderEmpty?: string | React.FC<ImmutableVirtualizedListProps<T>>,
  renderEmptyInList?: string | React.FC<ImmutableVirtualizedListProps<T>>,
}

export declare class ImmutableVirtualizedList<T = any> extends React.Component<ImmutableVirtualizedListProps<T>> {}

export declare class EmptyVirtualizedList<T> extends React.Component<VirtualizedListProps<T> & {
  renderItem: React.FC<any>,
  emptyText: string
}> {}
