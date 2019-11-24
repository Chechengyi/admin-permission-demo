import { IGlobalModalState } from './global'
import { ILoginModalState } from './login'
import { IOrderModalState } from './order'
import { IGoodsModalState } from './goods'
import { PermissionModelState } from './permission'

export {
  IGlobalModalState,
  ILoginModalState,
  IOrderModalState,
  IGoodsModalState,
  PermissionModelState
}


export interface ConnectState {
  global: IGlobalModalState;
  login: ILoginModalState;
  order: IOrderModalState;
  goods: IGoodsModalState;
  permission: PermissionModelState;
}

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;
