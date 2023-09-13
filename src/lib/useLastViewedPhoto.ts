import { createGlobalState } from 'react-hooks-global-state'
type PhotoId = number | null
const initialState = { photoToScrollTo: null } as { photoToScrollTo: PhotoId}
const { useGlobalState } = createGlobalState(initialState)

export const useLastViewedPhoto = () => {
  return useGlobalState('photoToScrollTo')
}
