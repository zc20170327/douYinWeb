import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*', 
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/index/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  {
    path: '/basicData',
    component: Layout,
    redirect: '/basicData/index',
    alwaysShow: true,
    name: '基础信息管理',
    meta: { title: '基础信息管理', icon: 'list' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/basicData/index'),
        name: '基础数据',
        meta: { title: '基础数据' }
      },
      {
        path: 'riverDomainData',
        component: () => import('@/views/basicData/riverDomainData'),
        name: '河域信息',
        meta: { title: '河域信息' }
      },
      {
        path: 'MpointManagement',
        component: () => import('@/views/basicData/MpointManagement'),
        name: '监测点管理',
        meta: { title: '监测点管理' }
      },
      {
        path: 'ceshi',
        component: () => import('@/views/basicData/ceshi'),
        name: '测试',
        meta: { title: '测试' }
      }

    ]
  },
  {
    path: '/systemManagement',
    component: Layout,
    redirect: '/systemManagement/organization',
    alwaysShow: true,
    name: '系统管理',
    meta: { title: '系统管理', icon: 'tree' },
    children: [
      {
        path: 'organization',
        component: () => import('@/views/systemManagement/organization'),
        name: '组织机构管理',
        meta: { title: '组织机构管理' }
      },
      {
        path: 'personnel',
        component: () => import('@/views/systemManagement/personnel'),
        name: '人员信息系管理',
        meta: { title: '人员信息系管理' }
      }
    ]
  },

  {
    path: '/statisticalAnalysis',
    component: Layout,
    redirect: '/statisticalAnalysis/monitoringData',
    alwaysShow: true,
    name: '统计分析',
    meta: { title: '统计分析', icon: 'component' },
    children: [
      {
        path: 'monitoringData',
        component: () => import('@/views/statisticalAnalysis/monitoringData'),
        name: '水情监测数据',
        meta: { title: '水情监测数据' }
      },
      {
        path: 'dataAnalysis',
        component: () => import('@/views/statisticalAnalysis/dataAnalysis'),
        name: '数据分析',
        meta: { title: '数据分析' }
      }
    ]
  },

  // 案卷管理界面
  {
    path: '/filesManagement',
    component: Layout,
    redirect: '/filesManagement',
    alwaysShow: true,
    name: '业务管理',
    meta: { title: '业务管理', icon: 'list' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/filesManagement/filesRecord/index'),
        name: '案卷登记',
        meta: { title: '案卷登记' }
      },
      {
        path: 'index',
        component: () => import('@/views/filesManagement/filesListTable/index'),
        name: '案卷列表',
        meta: { title: '案卷列表' }
      },
      {
        path: 'index',
        component: () => import('@/views/filesManagement/allFiles/index'),
        name: '所有案卷',
        meta: { title: '所有案卷' }
      },
      {
        path: 'index',
        component: () => import('@/views/filesManagement/filesForWaitingHandle/index'),
        name: '待办案卷',
        meta: { title: '待办案卷' }
      },
      {
        path: 'index',
        component: () => import('@/views/filesManagement/filesForSending/index'),
        name: '已派案卷',
        meta: { title: '已派案卷' }
      },
      {
        path: 'index',
        component: () => import('@/views/filesManagement/filesForFinished/index'),
        name: '已办案卷',
        meta: { title: '已办案卷' }
      }

    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
