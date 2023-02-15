/*
 * @Author: [you name]
 * @Date: 2021-11-23 14:21:59
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-23 10:31:46
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \frontend\src\permission\getUserRouter.ts
 */
import {systemRouterList} from '@/router/modules/system'

export const routerLists = [systemRouterList];

// 获取用户路由
export const getUserRouteObj = (store)=> {
  const sourceRouter = routerLists;
  // 把当前原生路由树和用户权限列表做对比，开启页面路由权限是否显示标志（isOnRouter）
  sourceRouter.forEach(item=>{
    sureOnRouter(item, store.state.user.roleList, store)
  })
  let userRoter = [];
  // 进行树摇,把isOnRouter的路由去掉，生成用户所有权限的路由树
  sourceRouter.forEach(item=>{
    if(treeShakeRouter(item)) {
      userRoter.push(treeShakeRouter(item));
    } 
  })
  store.dispatch('SET_ROUTER_TREE',userRoter);
  return userRoter;
}


// 获取全部的路由，再转为权限树，用于权限部分的渲染
export const getAllRouter = function () {
  const source = routerLists
  const result = []
  source.forEach(item => {
    result.push(copyTree(item))
  })
  return result
}


// 确定当前路由是否有权限（isOnRouter是否开启，下一步路由树摇即通过此属性判断）
const sureOnRouter = (item: any, roleList: Array<any>, store: any) => {
  // 开发时的超级管理员默认放开权限,上线注释掉,或者禁止超级管理员权限修改(直接禁止不严谨，除非所有权限开发完成)
  // const id = store.state.user.roleId
  // if (id === 3001) {
  //   item.meta.isOnRouter = true
  // }
  if (item.children && item.children.length > 0) {
    item.children.forEach((child:any) => {
      sureOnRouter(child, roleList, store);
      // 子路由有权限，父亲路由默认开启
      if (child.meta.isOnRouter) {
        item.meta.isOnRouter = true
      }
    });
  }
  // 判断当前路由的roles里面是否有用户权限里面的权限，只要有一个即开启isOnRouter(当然更严格的规则也可以自己设计)
  if (item.meta.roles && item.meta.roles.length > 0) {
    item.meta.isOnRouter = item.meta.roles.some((role:any) =>{ return roleList.some(it => {return it === role.authorityUrl}) });
  }
  return item
}


// 树摇改变好isOnRouter属性的路由树，筛选出isOnRouter为true的路由
const treeShakeRouter = (item:any) => {
  let result;
  if (item.meta.isOnRouter) {
    const children = []
    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        if (child.meta.isOnRouter) {
          children.push(treeShakeRouter(child))
        }
      })
    }
    result = {
      component: item.component,
      meta: item.meta,
      name: item.name,
      path: item.path,
      redirect: item.redirect,
      children
    }
  }
  return result
}


// 将所有路由树转换成权限页面的权限树，默认所有的
const copyTree = (obj: any) => {
  if (obj.meta.isShow) {
    const children = []
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach(item => {
        if (item.meta.isShow && item.meta.isShow === true) {
          children.push(copyTree(item))
        }
      });
    }
    let roles = []
    if (obj.meta.roles && obj.meta.roles.length > 0) {
      obj.meta.roles.forEach((role:any) => {
        roles.push({
          authorityId: role.authorityId,
          authorityUrl: role.authorityUrl,
          pauthorityUrl: role.pauthorityUrl,
          authorityName: role.authorityName,
          isChecked: false
        })
      });
    }
    const result = {
      authorityName: obj.meta.title,
      authorityUrl: obj.path || null,
      roles: roles.length > 0 ? roles : null,
      children: children.length > 0 ? children : null,
      isChecked: false,
      indeterminate: false,
      isShow: true
    }
    return result
  }
}