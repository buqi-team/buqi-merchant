import type { AppRouteModule } from '/@/router/types';
import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');
const dashboard: AppRouteModule = {
  path: '/app',
  name: 'App',
  component: LAYOUT,
  redirect: '/app/room',

  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.demo.appAdmin.app'),
    ignoreKeepAlive: false,
  },
  children: [
    {
      path: 'gameShop',
      name: 'gameShopsPage',
      component: () => import('/@/views/game_shop/basicInfo.vue'),
      meta: {
        title: t('routes.demo.appAdmin.gameShop'),
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'shopEdit',
          name: 'gameShopsEditPage',
          component: () => import('/@/views/game_shop/shopEdit.vue'),
          meta: {
            currentActiveMenu: '/app/gameShop',
            title: t('routes.demo.appAdmin.shopEdit'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/app/gameShop/shopEdit',
          },
        },
      ],
    },
    {
      path: 'event',
      name: 'eventListPage',
      component: () => import('/@/views/event/eventList.vue'),
      meta: {
        title: t('routes.demo.appAdmin.event'),
      },
    },
    {
      path: 'order',
      name: 'orderPage',
      component: () => import('/@/views/order/orderList.vue'),
      meta: {
        title: t('routes.demo.appAdmin.order'),
      },
    },
    {
      path: 'script',
      name: 'scriptListPage',
      component: () => import('/@/views/script/scriptList.vue'),
      meta: {
        title: t('routes.demo.appAdmin.script'),
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'findScript',
          name: 'findScriptPage',
          component: () => import('/@/views/script/findScript.vue'),
          meta: {
            currentActiveMenu: '/app/script',
            title: t('routes.demo.appAdmin.findScript'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/app/script/findScript',
          },
        },
      ],
    },
    {
      path: 'pictures',
      name: 'picturesListPage',
      component: () => import('/@/views/pictures/picturesList.vue'),
      meta: {
        title: t('routes.demo.appAdmin.pictures'),
      },
    },
    {
      path: 'room',
      name: 'roomListPage',
      component: () => import('/@/views/room/roomList.vue'),
      meta: {
        title: t('routes.demo.appAdmin.room'),
      },
    },
    {
      path: 'comment',
      name: 'commentListPage',
      component: () => import('/@/views/comments/commentList.vue'),
      meta: {
        title: t('routes.demo.appAdmin.comment'),
      },
    },
    {
      path: 'password',
      name: 'passwordPage',
      component: () => import('/@/views/password/index.vue'),
      meta: {
        title: t('routes.demo.appAdmin.password'),
      },
    },
  ],
};

export default dashboard;
