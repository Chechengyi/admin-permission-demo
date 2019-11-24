import React from 'react'
import { connect } from 'dva'
import { PermissionModelState, ConnectState } from '../../models/connect'
import NoAuto from '../../routes/Exception/403'

interface IPermissionPageProps {
  permission: string;
  menuMap: PermissionModelState['menuMarkMap'];
  reNull?: boolean  // 当权限不足时是否返回null
}

const PermissionPage: React.FC<IPermissionPageProps> = props=> {
  return (
    <React.Fragment>
      {props.menuMap[props.permission]? props.children : props.reNull? null: <NoAuto />}
    </React.Fragment>
  )
};

PermissionPage.defaultProps = {
  reNull: false
};

export default connect( (state: ConnectState)=> ({
  menuMap: state.permission.menuMarkMap
}))(PermissionPage)
