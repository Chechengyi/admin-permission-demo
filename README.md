# admin-permission-demo
前端实现权限控制 demo。

项目基于我之前搭的管理系统模板 [antd-admin](https://github.com/Chechengyi/antd-admin) 搭的 。
使用的是 react + antd + dva + typescript。



## 运行示例
```bash
git clone https://github.com/Chechengyi/admin-permission-demo.git

npm install

npm start

```


## 数据模拟
首先，我模拟了向后端请求的用户的权限信息。在 `mock` 文件夹下的 `permissionData.js` 文件
中可以修改数据，但是这里我并没有监听文件变化做更新，所以修改数据后需要重启项目。

数据请求到后使用 `redux` 管理，但是 `dva` 对 `redux` 在做了一层封装，提出了 `model` 
这样一个概念。具体数据管理在 `models` 文件夹下的 `permission.ts` 文件中。

```typescript
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
```

## 菜单目录
菜单目录在 `src` 文件下 `common` 文件夹下的 `menu.ts` 中。给菜单项加上 `permission` 代表
这项菜单是受权限控制的，不加的话则都会渲染。后续可以通过对菜单项 `permission` 的修改来
查看权限控制的变化。如果 "后台" 返回的权限数据中没有该菜单项对应的 `permission`，则该菜单
就不会渲染到侧边栏中。

具体是在 `BasicLayout` （layouts文件夹下）中请求了权限数据，然后传入 `SideMenu` 组件中，改组件代码在 `components`
文件夹下。查看该文件我写的有注释。

## 路由控制
控制侧边菜单不刷新页面导航还不够，还需要到路由层面去做控制，如果我访问的页面不具备权限应该
提示我没有权限。

内容页面的路由渲染是在 `BasicLayout` 中实现的。
```javascript
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
```

这是代码控制部分，具体还需在 `BasicLayout.tsx` 文件中去查看。

## 总结
我做的方案中，总的来说就是控制侧边栏菜单和路由渲染。
其实该方案也可以精细到页面按钮方面。

还记得我们对于按钮权限也做了记录吗，`permission` 中有一个 `buttonMap`，只不过该示例
中并没有去模拟 **按钮权限**，在实际的使用中肯定是有的。 

比如说一个添加账号的按钮。如果用户具有添加账号的权限，这个按钮就该显示，如果不具备就不显示。
可以依照 `PermissionPage` 组件，实现一个组件去做判断，将原本按钮作为children传给
该组件，然后定义一个props，可以是一个数组，规定要展示一个按钮需要具备哪些权限。在这个组件
中，如果具备权限了就展示按钮，如果不具备权限，就返回一个 `null` 就可以了。

