import React from 'react'
import Navbar from './Navbar'
import { Switch,Route,Redirect } from 'react-router-dom';
import ListRouterClient from '../../routes/ListRouterClient'
function ClientLayout(){
    return(
        <div >
            <Navbar />
            <div>
                    <main>
                        <Switch>
                            {ListRouterClient.map((listroute,idx)=>{
                                return (
                                    listroute.component && (
                                        <Route key={idx} path={listroute.path} exact={listroute.exact} name={listroute.name} render={(props)=>(
                                            <listroute.component {...props} />
                                        )} 
                                        />
                                    )
                                )
                            })}
                            <Redirect from="admin" to="/admin/dashboard" />
                        </Switch>
                    </main>
                    
                </div>
        </div>
    )
}
export default ClientLayout