import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
function EditCategory(props){
    const [loading,setLoading]=useState(true)
    const history = useHistory()
    const [error,setError] = useState([])
    const [categoryInput,setCategoryInput] = useState([])
    useEffect(()=>{
        const category_id = props.match.params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res=>{
            if(res.data.status===200)
            {
                setCategoryInput(res.data.category)
            }
            else if(res.data.status===404)
            {
                swal('Error',res.data.message,"Error")
                history.push('/admin/view-category')
            }
            setLoading(false)
        })
    },[props.match.params.id,history])
    const handleInput = (e)=>{
        e.persist()
        setCategoryInput({...categoryInput,[e.target.name]:e.target.value})
    }
    const updateCategory=(e)=>{
        e.preventDefault()
        const category_id = props.match.params.id;
        const data=categoryInput
        axios.put(`/api/update-category/${category_id}`,data).then(res=>{
            if(res.data.status===200)
            {
                swal("Success",res.data.message,"Success")
                setError([])
            }
            else if(res.data.status===402)
            {
                swal("All fields are mandetory","","Error")
                setError(res.data.errors)
            }
            else if(res.data.status===404){
                swal("Error",res.data.message,"Error")
                history.push('admin/view-category')
            }
        })
    }
    if(loading)
    {
        return <h4>Loading Edit Category....</h4>
    }
    return(
        <div className="container-fluid px-4">
            <h1 className="mt-4">Edit Category</h1>
            <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">Back</Link>
        <form onSubmit={updateCategory}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group mb-3">
                        <label>Slug:</label>
                        <input type="text" name="slug" className="form-control" onChange={handleInput} value={categoryInput.slug} />
                        <small className="text-danger" >{error.slug}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Name:</label>
                        <input type="text" name="name" className="form-control" onChange={handleInput} value={categoryInput.name} />
                        <small className="text-danger" >{error.name}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Description:</label>
                        <textarea  name="description" className="form-control" onChange={handleInput} value={categoryInput.description} ></textarea>
                    </div>
                    <div className="form-group mb-3">
                        <label>Status:</label>
                        <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status}  />Status 0=shown/1=hidden
                    </div>
                </div>
                <div className="tab-pane fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                <div className="form-group mb-3">
                        <label>Meta Title:</label>
                        <input type="text"  name="meta_title" className="form-control" onChange={handleInput} value={categoryInput.meta_title} />
                        <small className="text-danger" >{error.meta_title}</small>
                    </div>
                
                <div className="form-group mb-3">
                        <label>Meta Keywords:</label>
                        <textarea  name="meta_keyword" className="form-control" onChange={handleInput} value={categoryInput.meta_keyword} ></textarea>
                    </div>
                <div className="form-group mb-3">
                        <label>Meta Description:</label>
                        <textarea  name="meta_descrip" className="form-control" onChange={handleInput} value={categoryInput.meta_discrip} ></textarea>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary px-4 float-end">Update</button>
                
            </div>
            </form>
        </div>
    )
}
export default EditCategory