/* 权限数据 */

/*
* 这里模拟向后台查询用户的权限数据。
* {
*   id  主键ID
*   parentId  父级ID
*   permission  权限标识
*   type        权限类型  1 菜单  2 按钮  这里只模拟菜单权限
* }
*
*
* */

const data1 = [
  {
    id: 1000,
    parentId: '',
    permission: 'dashborad',
    type: 1
  },
  {
    id: 2000,
    parentId: '',
    permission: 'list1',
    type: 1
  },
  {
    id: 3000,
    parentId: '',
    permission: 'list2',
    type: 1
  }
];

const data2 = [
  // {
  //   id: 1000,
  //   parentId: '',
  //   permission: 'dashborad',
  //   type: 1
  // },
  {
    id: 2000,
    parentId: '',
    permission: 'list1',
    type: 1
  },
  // {
  //   id: 3000,
  //   parentId: '',
  //   permission: 'list2',
  //   type: 1
  // }
];

const data3 = [];

// 通过改变module.exports 改变权限， 在观察页面。
module.exports  = data1;
// module.exports  = data2;
// module.exports  = data3;