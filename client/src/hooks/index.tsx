import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export { default as useAccount } from './useAccount';
export { default as useAPI } from './useAPI';
export { default as useAppContext } from './useAppContext';
export { default as useAuth } from './useAuth';
export { default as useBlockedUsersFetcher } from './useBlockedUsersFetcher';
export { default as useChatsFetcher } from './useChatsFetcher';
export { default as useContactsFetcher } from './useContactsFetcher';
export { default as useDebounce } from './useDebounce';
export { default as useDownload } from './useDownload';
export { default as useFileSelector } from './useFileSelector';
export { default as useFullScreenPhoto } from './useFullScreenPhoto';
export { default as useImageFileLoader } from './useImageFileLoader';
export { default as useImageLoader } from './useImageLoader';
export { default as useMessagesFetcher } from './useMessagesFetcher';
export { default as usePhotoNavigation } from './usePhotoNavigation';
export { default as useProfilePhoto } from './useProfilePhoto';
export { default as useResponsive } from './useResponsive';
export { default as useRouteTracker } from './useRouteTracker';
export { default as useTimer } from './useTimer';
export { default as useUser } from './useUser';
export { default as useUserFetcher } from './useUserFetcher';
export { default as useAnimation } from './useAnimation';
export { default as useSuggestionsFetcher } from './useSuggestionsFetcher';
