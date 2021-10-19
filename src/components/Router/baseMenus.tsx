export const baseMenus = [
  {
    component: "系统首页",
    path: "/dashboard",
    key: "homeRoot",
    icon: "dashboard",
    sub: []
  },
  {
      component: "用户权限管理",
      path: "/table",
      key: "userRoleDir",
      icon: "table",
      sub: [
          {
              component: "用户列表",
              path: "/table/editableTable",
              key: "usersList"
          },
          {
              component: "角色列表",
              path: "/table/dragSortingTable",
              key: "roleList"
          },
          {
              component: "菜单列表",
              path: "/table/dragSortingTable",
              key: "menuList"
          }
      ]
  },
  {
      component: "表格",
      path: "/table",
      key: "table",
      icon: "table",
      sub: [
          {
              component: "可编辑行表格",
              path: "/table/editableTable",
              key: "table/editableTable"
          },
          {
              component: "拖拽排序表格",
              path: "/table/dragSortingTable",
              key: "table/dragSortingTable"
          }
      ]
  },
  {
      component: "图表",
      path: "/chart",
      key: "chart",
      icon: "chart",
      sub: [
          {
              component: "折线图",
              path: "/chart/lineChart",
              key: "chart/lineChart"
          },
          {
              component: "饼图",
              path: "/chart/pieChart",
              key: "chart/pieChart"
          }
      ]
  },
  {
      component: "组件",
      path: "/components",
      key: "components",
      icon: "components",
      sub: [
          {
              component: "富文本编辑器",
              path: "/components/richText",
              key: "components/richText"
          },
          {
              component: "Markdown",
              path: "/components/markdown",
              key: "components/markdown"
          },
          {
              component: "JSON编辑器",
              path: "/components/jsonEditor",
              key: "components/jsonEditor"
          }
      ]
  },
  {
      component: "Excel",
      path: "/excel",
      key: "excel",
      icon: "excel",
      sub: [
          {
              component: "导出excel",
              path: "/excel/export",
              key: "excel/export"
          }
      ]
  },
  {
    component: "404页",
    path: "/404",
    key: "404",
    icon: "404",
    sub: []
  }
]