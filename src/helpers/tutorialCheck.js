export const checkTutorial = () => {
    if(sessionStorage.getItem('new')){
        sessionStorage.removeItem('new')
        return true
    } else return false
}