import React from 'react'
import { Route } from 'react-router-dom'
import ClientLayout from './layouts/frontend/ClientLayout'
function ClientRouter({...rest}){
    return(
        <Route {...rest} render={props => <ClientLayout {...props} />} />
    )
}
export default ClientRouter