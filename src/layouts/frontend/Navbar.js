import axios from 'axios';
import React from 'react'
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import swal from 'sweetalert';
function Navbar(){
    const history = useHistory()
    const logoutSubmit=(e)=>{
        e.preventDefault();

        axios.post('/api/logout').then(res =>{
            if(res.data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success",res.data.message,"Success")
                history.push('/')
            }
        })
    }
    var authButtons="";
    if(!localStorage.getItem('auth_token'))
    {
        authButtons =(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link " to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/register">Register</Link>
                </li>
            </ul>
        )
    }
    else{
        authButtons =(
            <li className="nav-item">
                    <button type="submit" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white" >Logout</button>
            </li>
        )
    }
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top">
        <div className="container">
        <Link className="navbar-brand" to="#">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item active">
                <Link className="nav-link" to="#">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="#">Collection</Link>
                </li>
                <li className="nav-item dropdown">
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/login">Login</Link>
                <Link className="dropdown-item" to="/register">Register</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="#">Something else here</Link>
                </div>
                </li>
                {authButtons}
            </ul>
        </div>
        </div>
    </nav>
    )
}
export default Navbar