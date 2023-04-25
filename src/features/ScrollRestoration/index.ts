export { LangSwitcher } from '../LangSwitcher/ui/LangSwitcher';

export {
  scrollRestorationActions,
  scrollRestorationReducer,
} from './model/slices/ScrollRestorationSlice';

export {
  getScrollRestorationByPath,
  getScrollIndex,
} from './model/selectors/scrollRestoration';
export type { ScrollRestorationSchema } from './model/types/ScrollRestorationSchema';
