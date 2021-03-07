const initialState = ''

var timeoutId

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_NOTIFICATION':
            return action.data
        case 'HIDE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const createNotification = (content, time) => {
    return dispatch => {
        dispatch({
          type: 'CREATE_NOTIFICATION',
          data: content
        })
        clearTimeout(timeoutId)
        timeoutId = setTimeout(function(){ dispatch(hideNotification()) }, time*1000);

      }
    }
    
/*
export const voteNotification = (content) => {
    return {
        type: 'VOTE_NOTIFICATION',
        data:
            content

    }
}
*/

export const hideNotification = () => {
    console.log('hide notification')
    return {
        type: 'HIDE_NOTIFICATION',
        data: ''
    }
}

export default reducer