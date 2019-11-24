/* 权限 */

import { Effect } from 'dva'
import { Reducer } from 'redux'
import { getPermission } from '../services/api'

type MenuId = number;   // 菜单的主键ID；

export interface PermissionModelState {
  loading: boolean;
  // 菜单权限 键-值：菜单权限标识-主键ID
  menuMarkMap: {
    [propName: string]: MenuId;
  };
  // 按钮权限 键-值：按钮权限标识-主键ID
  buttonMap: {
    [propName: string]: MenuId
  }
}

interface PerMissionModelType {
  namespace: 'permission';
  state: PermissionModelState;
  effects: {
    getData: Effect;
  };
  reducers: {
    saveData: Reducer<PermissionModelState>;
    changeLoading: Reducer<PermissionModelState>;
  };
}

const permissionModel: PerMissionModelType = {
  namespace: 'permission',
  state: {
    loading: true,
    menuMarkMap: {},
    buttonMap: {}
  },
  effects: {
    *getData({payload}, {call, put}){
      console.log('....')
      const res = yield call(getPermission)
      console.log(res)
      let menuMarkMap = {};
      let buttonMap = {};
      res.forEach( item=> {
        if (item.type===1){
          menuMarkMap[item.permission] = item.id;
        } else {
          buttonMap[item.permission] = item.id;
        }
      });
      yield put({
        type: 'saveData',
        payload: {
          menuMarkMap,
          buttonMap
        }
      });
      yield put({
        type: 'changeLoading',
        payload: false
      })
    }
  },
  reducers: {
    saveData(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    changeLoading(state, {payload}) {
      return {
        ...state,
        loading: payload
      }
    }
  }
}

export default permissionModel;


