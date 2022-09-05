import type { AppRouteModule } from '/@/router/types';
import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');
const dashboard: AppRouteModule = {
  path: '/app',
  name: 'App',
  component: LAYOUT,
  // redirect: '/app/gameShop',

  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.demo.appAdmin.app'),
    ignoreKeepAlive: false,
  },
  children: [
    // {
    //   path: 'gameShop',
    //   name: 'gameShopsPage',
    //   component: () => import('/@/views/game_shop/GameShopList.vue'),
    //   meta: {
    //     title: t('routes.demo.appAdmin.gameShop'),
    //   },
    // },
    // {
    //   path: 'event',
    //   name: 'EventListPage',
    //   component: () => import('/@/views/event/EventList.vue'),
    //   meta: {
    //     title: t('routes.demo.appAdmin.event'),
    //   },
    // },
    // {
    //   path: 'order',
    //   name: 'orderPage',
    //   component: () => import('/@/views/order/OrderList.vue'),
    //   meta: {
    //     title: t('routes.demo.appAdmin.order'),
    //   },
    // },
    // {
    //   path: 'script',
    //   name: 'ScriptListPage',
    //   component: () => import('/@/views/script/ScriptList.vue'),
    //   meta: {
    //     title: t('routes.demo.appAdmin.script'),
    //   },
    // },
    // {
    //   path: 'image',
    //   name: 'imageListPage',
    //   component: () => import('/@/views/game_shop/imageList.vue'),
    //   meta: {
    //     title: t('routes.demo.appAdmin.image'),
    //   },
    // },
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
  ],
};

export default dashboard;
