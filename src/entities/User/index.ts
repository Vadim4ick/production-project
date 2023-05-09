export { initAuthData } from './model/services/initAuthData';

export { saveJsonSettings } from './model/services/saveJsonSettings';
export { useJsonSettings } from './model/selectors/jsonSettings';
export { UserRole } from './model/consts/consts';
export {
  isUserAdmin,
  isUserManager,
  getUserRoles,
} from './model/selectors/roleSelectors';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export { getAuthUserData } from './model/selectors/getAuthUserData/getAuthUserData';
export { userReducer, userActions } from './model/slice/userSlice';
export type { UserSchema, User } from './model/types/user';
