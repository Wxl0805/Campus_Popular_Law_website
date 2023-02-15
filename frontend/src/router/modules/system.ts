import RouterObj from '@/permission/RouterObj'
export const systemRouterList: RouterObj = {
  path: '/system',
  name: 'System',
  redirect:'/userManage',
  component: () => import('@/views/System/index.vue'),
  meta: {
    role: [['admin']],
    title: '系统管理',
    icon: 'fa-home',
    isShow: true, // 用来坐权限页面展示开收起
    isOnRouter: false, //用于页面路由权限是否显示标志
  },
  children: [
    {
      path: '/userManage',
      name: 'UserManage',
      component: () => import('@/views/System/UserManage.vue'),
      meta: {
        role: [['admin']],
        title: '用户管理',
        icon: 'fa-table',
        isShow: true,
        isOnRouter: false,
        roles: [
          {
            authorityId: 2001,
            authorityUrl: 'GET:/api/user/query',
            pauthorityUrl: '/userManage',
            authorityName: 'id查询用户'
          },
          {
            authorityId: 2002,
            authorityUrl: 'GET:/api/user/queryAll',
            pauthorityUrl: '/userManage',
            authorityName: '查询所有用户'
          },
          {
            authorityId: 2003,
            authorityUrl: 'POST:/api/user/page',
            pauthorityUrl: '/userManage',
            authorityName: '分页查询用户'
          },
          {
            authorityId: 2004,
            authorityUrl: 'POST:/api/user/create',
            pauthorityUrl: '/userManage',
            authorityName: '新增用户'
          },
          {
            authorityId: 2005,
            authorityUrl: 'POST:/api/user/modify',
            pauthorityUrl: '/userManage',
            authorityName: '修改用户'
          },
          {
            authorityId: 2006,
            authorityUrl: 'DELETE:/api/user/delete',
            pauthorityUrl: '/userManage',
            authorityName: '删除用户'
          },
          {
            authorityId: 2007,
            authorityUrl: 'POST:/api/user/password/modify',
            pauthorityUrl: '/userManage',
            authorityName: '修改用户密码'
          },
          {
            authorityId: 2008,
            authorityUrl: 'GET:/api/user/status/modify',
            pauthorityUrl: '/userManage',
            authorityName: '修改用户状态'
          },
          {
            authorityId: 2009,
            authorityUrl: 'POST:/api/user/upload',
            pauthorityUrl: '/userManage',
            authorityName: '上传用户头像'
          },
        ]
      }
    },
    {
      path: '/roleManage',
      name: 'RoleManage',
      component: () => import('@/views/System/RoleManage.vue'),
      meta: {
        role: [['admin']],
        title: '角色管理',
        icon: 'fa-table',
        isShow: true,
        isOnRouter: false,
        roles: [
          {
            authorityId: 2010,
            authorityUrl: 'GET:/api/role/queryAll',
            pauthorityUrl: '/roleManage',
            authorityName: '查询所有角色'
          },
          {
            authorityId: 2011,
            authorityUrl: 'POST:/api/role/create',
            pauthorityUrl: '/roleManage',
            authorityName: '新增角色'
          },
          {
            authorityId: 2012,
            authorityUrl: 'POST:/api/role/modify',
            pauthorityUrl: '/roleManage',
            authorityName: '修改角色'
          },
          {
            authorityId: 2013,
            authorityUrl: 'DELETE:/api/role/delete',
            pauthorityUrl: '/roleManage',
            authorityName: '删除角色'
          },
          {
            authorityId: 2014,
            authorityUrl: 'GET:/api/role/authority/query',
            pauthorityUrl: '/roleManage',
            authorityName: '查询角色权限'
          },
          {
            authorityId: 2015,
            authorityUrl: 'POST:/api/role/authority/modify',
            pauthorityUrl: '/roleManage',
            authorityName: '修改角色权限'
          }
        ]
      },
    },
    {
      path: '/departmentManage',
      name: 'DepartmentManage',
      component: () => import('@/views/System/DepartmentManage.vue'),
      meta: {
        role: [['admin']],
        title: '部门管理',
        icon: 'fa-table',
        isShow: true,
        isOnRouter: false,
        roles: [
          {
            authorityId: 2016,
            authorityUrl: 'GET:/api/department/queryAll',
            pauthorityUrl: '/departmentManage',
            authorityName: '查询所有部门'
          },
          {
            authorityId: 2017,
            authorityUrl: 'POST:/api/department/page',
            pauthorityUrl: '/departmentManage',
            authorityName: '分页查询部门'
          },
          {
            authorityId: 2018,
            authorityUrl: 'POST:/api/department/create',
            pauthorityUrl: '/departmentManage',
            authorityName: '新增部门'
          },
          {
            authorityId: 2019,
            authorityUrl: 'POST:/api/department/modify',
            pauthorityUrl: '/departmentManage',
            authorityName: '修改部门'
          },
          {
            authorityId: 2020,
            authorityUrl: 'DELETE:/api/department/delete',
            pauthorityUrl: '/departmentManage',
            authorityName: '删除部门',
          },
        ]
      },
    },
    {
      path: '/noticeSetting',
      name: 'NoticeSetting',
      component: () => import('@/views/System/NoticeSetting.vue'),
      meta: {
        role: [['admin']],
        title: '通知设置',
        icon: 'fa-envelope',
        isShow: true,
        isOnRouter: false,
        roles: []
      },
    }
  ]
}