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
        title: '后台用户管理',
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
          // {
          //   authorityId: 2006,
          //   authorityUrl: 'DELETE:/api/user/delete',
          //   pauthorityUrl: '/userManage',
          //   authorityName: '删除用户'
          // },
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
          // {
          //   authorityId: 2013,
          //   authorityUrl: 'DELETE:/api/role/delete',
          //   pauthorityUrl: '/roleManage',
          //   authorityName: '删除角色'
          // },
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
      path: '/classManage',
      name: 'ClassManage',
      component: () => import('@/views/System/ClassManage.vue'),
      meta: {
        role: [['admin']],
        title: '班级管理',
        icon: 'fa-table',
        isShow: true,
        isOnRouter: false,
        roles: [
          {
            authorityId: 2016,
            authorityUrl: 'GET:/api/class/queryAll',
            pauthorityUrl: '/classManage',
            authorityName: '查询所有班级'
          },
          {
            authorityId: 2017,
            authorityUrl: 'POST:/api/class/page',
            pauthorityUrl: '/classManage',
            authorityName: '分页查询班级'
          },
          {
            authorityId: 2018,
            authorityUrl: 'POST:/api/class/create',
            pauthorityUrl: '/classManage',
            authorityName: '新增班级'
          },
          {
            authorityId: 2019,
            authorityUrl: 'POST:/api/class/modify',
            pauthorityUrl: '/classManage',
            authorityName: '修改班级'
          },
          {
            authorityId: 2021,
            authorityUrl: 'GET:/api/class/queryNull',
            pauthorityUrl: '/classManage',
            authorityName: '查询空闲班级'
          },
          // {
          //   authorityId: 2020,
          //   authorityUrl: 'DELETE:/api/class/delete',
          //   pauthorityUrl: '/classManage',
          //   authorityName: '删除班级',
          // },
        ]
      },
    },
    {
      path: '/stuteaManage',
      name: 'StuteaManage',
      component: () => import('@/views/System/StuteaManage.vue'),
      meta: {
        role: [['admin']],
        title: '教师学生管理',
        icon: 'fa-table',
        isShow: true,
        isOnRouter: false,
        roles: [
          {
            authorityId: 2022,
            authorityUrl: 'GET:/api/stuteacher/queryAll',
            pauthorityUrl: '/stuteaManage',
            authorityName: '查询所有班级'
          },
          {
            authorityId: 2023,
            authorityUrl: 'POST:/api/stuteacher/page',
            pauthorityUrl: '/stuteaManage',
            authorityName: '分页条件查询用户'
          },
          {
            authorityId: 2024,
            authorityUrl: 'POST:/api/stuteacher/create',
            pauthorityUrl: '/stuteaManage',
            authorityName: '新建用户'
          },
          {
            authorityId: 2025,
            authorityUrl: 'POST:/api/stuteacher/modify',
            pauthorityUrl: '/stuteaManage',
            authorityName: '修改用户'
          },
          {
            authorityId: 2026,
            authorityUrl: 'POST:/api/stuteacher/password/modify',
            pauthorityUrl: '/stuteaManage',
            authorityName: '修改用户密码'
          },
          {
            authorityId: 2027,
            authorityUrl: 'GET:/api/stuteacher/status/modify',
            pauthorityUrl: '/stuteaManage',
            authorityName: '修改用户状态'
          },
          {
            authorityId: 2028,
            authorityUrl: 'GET:/api/stuteacher/queryClass',
            pauthorityUrl: '/stuteaManage',
            authorityName: '查找对应班级'
          },
        ],
      },
    },
    {
      path: '/contentManage',
      name: 'ContentManage',
      component: () => import('@/views/System/ContentManage.vue'),
      meta: {
        role: [['admin']],
        title: '内容管理',
        icon: 'fa-table',
        isShow: true,
        isOnRouter: true,
        roles: [
          
        ]
      },
    },
    {
      path: '/videoManage',
      name: 'VideoManage',
      component: () => import('@/views/System/VideoManage.vue'),
      meta: {
        role: [['admin']],
        title: '视频管理',
        icon: 'fa-table',
        isShow: true,
        isOnRouter: true,
        roles: [
          
        ]
      },
    },
    {
      path: '/messagemenage',
      name: 'MessageManage',
      component: () => import('@/views/System/MessageManage.vue'),
      meta: {
        role: [['admin']],
        title: '留言管理',
        icon: 'fa-table',
        isShow: true,
        isOnRouter: true,
        roles: [
          
        ]
      },
    },
  ]
}