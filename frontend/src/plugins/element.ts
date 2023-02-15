/*
 * @Author: [you name]
 * @Date: 2021-11-23 14:21:59
 * @LastEditors: [you name]
 * @LastEditTime: 2021-11-23 14:35:14
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \aaa\src\plugins\element.ts
 */
import { App } from 'vue'

import {
  ElButton,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElInput,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElRow,
  ElMenuItemGroup,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDialog,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElCheckbox,
  ElCheckboxGroup,
  ElCollapseTransition,
  // ElAffix,
  ElIcon,
  ElDropdown
} from 'element-plus'
import ElAffix from "element-plus"

export default (app:App) => {
  app.use(ElButton)
  app.use(ElMenu)
  app.use(ElMenuItem)
  app.use(ElSubMenu)
  app.use(ElInput)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElPagination)
  app.use(ElRow)
  app.use(ElMenuItemGroup)
  app.use(ElBreadcrumb)
  app.use(ElBreadcrumbItem)
  app.use(ElDialog)
  app.use(ElSelect)
  app.use(ElOption)
  app.use(ElDatePicker)
  app.use(ElCheckbox)
  app.use(ElCheckboxGroup)
  app.use(ElCollapseTransition)
  app.use(ElAffix)
  app.use(ElIcon)
  app.use(ElDropdown)
}
