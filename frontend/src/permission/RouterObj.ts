interface Meta {
  role: [ Array<string> ],
  title: string,
  icon?: string,
  roles?: Array<any>,
  // 用于是否在权限树上展示
  isShow: boolean,
  // 是否用于在路由树上展示（默认为假，用于根据权限渲染为真，一些直接展示不过逻辑可以直接设置为真）
  isOnRouter: boolean
}

interface IRouterObj {
  path: string,
  name: string,
  component: any,
  children?: Array<IRouterObj>,
  meta?: Meta
}

export default class RouterObj implements IRouterObj {
  children?: Array<RouterObj>
  redirect?: string;
  constructor(public path: string, public name: string, public component: any, public meta: Meta) { }
}
