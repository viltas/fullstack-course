const initialState = ''

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return `new anecdote "${action.data}" saved`
        case 'VOTE_NOTIFICATION':
            return `you voted for "${action.data}"`
        case 'HIDE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const newNotification = (content) => {
    return {
        type: 'NEW_NOTIFICATION',
        data:
            content

    }
}

export const voteNotification = (content) => {
    return {
        type: 'VOTE_NOTIFICATION',
        data:
            content

    }
}

export const hideNotification = () => {
    console.log('hide notification')
    return {
        type: 'HIDE_NOTIFICATION',
        data: ''
    }
}

export default reducer