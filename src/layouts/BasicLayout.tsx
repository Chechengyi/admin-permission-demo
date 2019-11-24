import * as React from 'react'
import {
  Layout
} from 'antd';
import GlobalHeader from '../components/GlobalHeader'
import { connect } from 'dva'
import { getRoutes } from '../utils/utils'
import { getMenuData } from '../common/menu'
import { Route, Redirect, Switch } from 'dva/router'
import SideMenu from '../components/SideMenu'
import NotFound from '../routes/Exception/404'
import DocumentTitle from 'react-document-title'
import { ConnectState, IGlobalModalState, Dispatch, PermissionModelState } from '../models/connect'
import { RouteComponentProps  } from 'react-router-dom'
import PermissionPage from '../components/PermissionPage'

const {
  Content, Footer
} = Layout;

/* 获取菜单重定向地址 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

interface IBasicLayoutProps extends RouteComponentProps, IGlobalModalState {
  dispatch: Dispatch;
  routerData: [];
  permission: PermissionModelState
}

function getPathAuto(data){
  let obj:any = {};
  function format(data){
    data.forEach( item=> {
      obj[`/${item.path}`] = item.permission;
      if (item.children) {
        format(item.children)
      }
    })
  }
  format(data);
  return obj;
}

@connect( (state: ConnectState)=>({
  collapsed: state.global.collapsed,
  permission: state.permission
}))

class BasicLayout extends React.Component<IBasicLayoutProps> {
  state = {
    collapsed: false,
  };

  // 根据menu.js生成每个路由path所需要的权限标识。
  pathAuto: Object = getPathAuto(getMenuData());

  componentDidMount(): void {
    // 获取用户权限
    this.props.dispatch({
      type: 'permission/getData'
    })
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'antd';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - antd`;
    }
    return title;
  }

  render() {
    const { collapsed, routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu
            collapsed={collapsed}
            menuData={getMenuData()}
            history={this.props.history}
            location={this.props.location}
            permission={this.props.permission}
          />
          <Layout>
            <GlobalHeader collapsed={this.props.collapsed} location={this.props.location} />
            <Content>
              <div style={{ minHeight: 'calc(100vh - 260px)', minWidth: '900px' }}>
                {
                  !this.props.permission.loading &&
                  <Switch>
                    {/* <Redirect exact form='/cont' to='/cont/dashborad' /> */}
                    {
                      redirectData.map(item =>
                        <Redirect key={item.from} exact from={item.from} to={item.to} />
                      )
                    }
                    <Route exact path='/cont' render={() => (
                      <Redirect to='/cont/dashborad' />
                    )} />
                    {
                      getRoutes(match.path, routerData).map(item => (
                        <Route
                          key={item.key}
                          path={item.path}
                          // component={item.component}
                          exact={true}
                          render={props=>{
                            if ( !this.pathAuto[item.path] ) {
                              return <item.component {...props} />
                            }
                            return (
                              <PermissionPage permission={this.pathAuto[item.path]}>
                                <item.component {...props} />
                              </PermissionPage>
                            )
                          }}
                        />
                      ))
                    }
                    <Route render={NotFound} />
                  </Switch>

                }
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design 中后台管理系统 ©2019 Created by Chechengyi
            </Footer>
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default BasicLayout
