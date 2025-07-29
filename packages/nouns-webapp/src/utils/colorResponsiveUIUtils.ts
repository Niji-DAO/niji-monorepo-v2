import { useAppSelector } from '../hooks';

export const shouldUseStateBg = (location: any) => {
  return (
    location.pathname === '/' ||
    location.pathname.includes('/noun') ||
    location.pathname.includes('/auction')
  );
};

/**
 * Utility function that takes three items and returns whichever one corresponds to the current
 * page state (white, cool, warm)
 * @param whiteState  What to return if the state is white
 * @param coolState  What to return if the state is cool
 * @param warmState  What to return is the state is warm
 * @param location  Location object from useLocation
 * @returns item corresponding to current state
 */
export const usePickByState = (whiteState: any, coolState: any, warmState: any, location: any) => {
  const useStateBg = shouldUseStateBg(location);
  const isCoolState = useAppSelector(state => state.application.isCoolBackground);

  if (!useStateBg) {
    return whiteState;
  }
  if (isCoolState) {
    return coolState;
  }
  return warmState;
};
