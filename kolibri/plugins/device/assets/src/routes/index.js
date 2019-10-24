import store from 'kolibri.coreVue.vuex.store';
import { showDeviceInfoPage } from '../modules/deviceInfo/handlers';
import { showManagePermissionsPage } from '../modules/managePermissions/handlers';
import { showManageContentPage } from '../modules/manageContent/handlers';
import { showUserPermissionsPage } from '../modules/userPermissions/handlers';
import { PageNames } from '../constants';
import DeviceInfoPage from '../views/DeviceInfoPage';
import DeviceSettingsPage from '../views/DeviceSettingsPage';
import ManageContentPage from '../views/ManageContentPage';
import ManagePermissionsPage from '../views/ManagePermissionsPage';
import UserPermissionsPage from '../views/UserPermissionsPage';
import withAuthMessage from '../views/withAuthMessage';
import wizardTransitionRoutes from './wizardTransitionRoutes';

function hideLoadingScreen() {
  store.commit('CORE_SET_PAGE_LOADING', false);
}

const routes = [
  {
    path: '/',
    redirect: '/content',
  },
  {
    path: '/welcome',
    redirect: () => {
      store.commit('SET_WELCOME_MODAL_VISIBLE', true);
      return '/content';
    },
  },
  {
    name: PageNames.MANAGE_CONTENT_PAGE,
    component: withAuthMessage(ManageContentPage, 'contentManager'),
    path: '/content',
    handler: ({ name }) => {
      store.dispatch('preparePage', { name });
      showManageContentPage(store).then(hideLoadingScreen);
    },
  },
  {
    name: PageNames.MANAGE_PERMISSIONS_PAGE,
    component: withAuthMessage(ManagePermissionsPage, 'superuser'),
    path: '/permissions',
    handler: ({ name }) => {
      store.dispatch('preparePage', { name });
      showManagePermissionsPage(store).then(hideLoadingScreen);
    },
  },
  {
    name: PageNames.USER_PERMISSIONS_PAGE,
    component: withAuthMessage(UserPermissionsPage, 'superuser'),
    path: '/permissions/:userId',
    handler: ({ params, name }) => {
      store.dispatch('preparePage', { name });
      showUserPermissionsPage(store, params.userId);
    },
  },
  {
    name: PageNames.DEVICE_INFO_PAGE,
    component: withAuthMessage(DeviceInfoPage, 'contentManager'),
    path: '/info',
    handler: ({ name }) => {
      store.dispatch('preparePage', { name });
      showDeviceInfoPage(store).then(hideLoadingScreen);
    },
  },
  {
    name: PageNames.DEVICE_SETTINGS_PAGE,
    component: withAuthMessage(DeviceSettingsPage, 'admin'),
    path: '/settings',
    handler: ({ name }) => {
      store.dispatch('preparePage', { name });
      hideLoadingScreen();
    },
  },
  ...wizardTransitionRoutes,
  {
    path: '/content/*',
    redirect: '/content',
  },
];

export default routes;
