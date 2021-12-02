import axios from 'axios'
import React ,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../../../layouts/frontend/Navbar'
import swal from 'sweetalert'
function Register(){
    const history = useHistory()
    const [registerInput, setRegister] = useState({
        name:'',
        email:'',
        password:'',
        error_list:[]
    })
    const handleInput = (e)=>{
        e.persist()
        setRegister({...registerInput,[e.target.name]:e.target.value})
    }
    const registerSubmit=(e)=>{
        e.preventDefault();
        const data={
            name:registerInput.name,
            email:registerInput.email,
            password:registerInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(res=>{
            axios.post('http://localhost:8000/api/register',data).then(res=>{
                if(res.data.status===200){
                    localStorage.setItem('auth_token',res.data.token)
                    localStorage.setItem('auth_name',res.data.name)
                    swal("Succesess",res.data.message,"Success")
                    history.push("/")
                }
                else{
                    setRegister(...registerInput,{error_list:res.data.validation_errors})
                }
            })

        })
    }
    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h1>Register</h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Full name</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" placeholder="Enter Name" onChange={handleInput} value={registerInput.name} />
                                        <span>{registerInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Email</label>
                                        <input type="email" className="form-control" name="email" id="exampleInputPassword1" placeholder="Email" onChange={handleInput} value={registerInput.email}/>
                                        <span>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Password" onChange={handleInput} value={registerInput.password}/>
                                        <span>{registerInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register