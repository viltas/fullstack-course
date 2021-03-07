import React from 'react'
import { connect } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'

const Filter = (props) => {


    const handleChange = (event) => {
        props.createFilter(event.target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}


const mapDispatchToProps = { createFilter }

const connectedFilter = connect(null,
    mapDispatchToProps)(Filter)

export default connectedFilter