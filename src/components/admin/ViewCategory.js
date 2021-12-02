import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

function ViewCategory(){
    const [loading,setLoading]=useState(true)
    const [categoryList,setCategoryList] = useState([])

    useEffect(() => {
        axios.get('/api/view-category').then(res=>{
            console.log(res.data.category)
            if(res.status === 200)
            {
                setCategoryList(res.data.category)
            }
            setLoading(false)
        })
    }, [])
    const deleteCategory =(e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        axios.delete(`/api/delete-category/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"Success")
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Success",res.data.message,"Success")
                thisClicked.innerText = "Deleting";
            }
        })
    }
    var viewCategory_HTML_TABLE=""
    if(loading)
    {
        return <h4>Loading Category....</h4>
    }
    else{
        viewCategory_HTML_TABLE=categoryList.map(item=>{
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`edit-category/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={e=>deleteCategory(e,item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        })
    }
     
    return(
        <div className="container px-4">
            <div className="card">
            <div className="card-header">
                <h1>Category List
                <Link to="/admin/add-category" className='btn btn-primary btn-sm float-end'>Add Category</Link></h1>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {viewCategory_HTML_TABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )
}
export default ViewCategory