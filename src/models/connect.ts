import { IGlobalModalState } from './global'
import { LoginModalState } from './login'
import { IOrderModalState } from './order'
import { IGoodsModalState } from './goods'
import { PermissionModelState } from './permission'

export {
  IGlobalModalState,
  LoginModalState,
  IOrderModalState,
  IGoodsModalState,
  PermissionModelState
}


export interface ConnectState {
  global: IGlobalModalState;
  login: LoginModalState;
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
