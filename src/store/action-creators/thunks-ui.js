import { uiActions } from ".."
import { fieldMusicToggle, titleMusicToggle } from "../../helpers/musicDJ"
import { userMetaActions } from ".."

export const bootAppDependencies = (authRes) => {
    return dispatch => {
        const checkWidth = () => {
            window.innerWidth < 1200 ? 
            dispatch(uiActions.toggleWidth(true)) :
            dispatch(uiActions.toggleWidth(false))
        }
        titleMusicToggle(false)
        fieldMusicToggle(true)
        window.addEventListener('resize', checkWidth)
        checkWidth()
        dispatch(userMetaActions.setUserDataOnload({user: authRes}))
        return false
    }
}