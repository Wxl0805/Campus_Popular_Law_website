import RouterObj from '@/permission/RouterObj'
export default {
  state: {
    // 路由树
    routerTree: {},
    // nav上的第一层当前选中的路由对象
    mainMenuRouter: {
      path: '',
      title: '',
    },
    // nav上的第二层当前选中的路由对象
    subMenuRouter: {
      path: '',
      title: '',
    },
    // 是否展开侧边栏
    isCollapse: false

  },
  mutations: {
    SET_ROUTER_TREE (state:any, routerTree:Array<RouterObj>) {
      state.routerTree = routerTree
    },
    SET_MAIN_MENU_ROUTER (state:any, routerobj:any) {
      state.mainMenuRouter.path = routerobj.path;
      state.mainMenuRouter.title = routerobj.title;
    },
    SET_SUB_MENU_ROUTER (state:any, routerobj:any) {
      state.subMenuRouter.path = routerobj.path;
      state.subMenuRouter.title = routerobj.title;
    },
  },
  actions: {
    SET_ROUTER_TREE (context:any, routerTree:Array<RouterObj>) {
      context.commit('SET_ROUTER_TREE', routerTree);
      // context.commit('SET_ACTIVE_ROUTER', routerTree[0].children[0]);
    },
    CLEAR_HEADER_ROUTER (context:any,) {
      context.commit('SET_MAIN_MENU_ROUTER', {title: '',path: ''})
      context.commit('SET_SUB_MENU_ROUTER', {title: '',path: ''})
      context.commit('SET_ROUTER_TREE', null)
    },
  }
}