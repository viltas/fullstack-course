const initialState = ''

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_FILTER':
            return action.data
        case 'CLEAR_FILTER':
            return ''
        default:
            return state
    }
}


export const createFilter = (content) => {
    return {
        type: 'CREATE_FILTER',
        data:
            content

    }
}

/*

export const clearFilter = () => {
    return {
        type: 'CLEAR_FILTER',
        data: ''
    }
}
*/

export default reducer