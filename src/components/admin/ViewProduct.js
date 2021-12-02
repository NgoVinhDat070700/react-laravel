import axios from 'axios'
import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import swal from 'sweetalert'
function ViewProduct(){

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        document.title="View Product"
        axios.get('/api/view-product').then(res=>{
            if(res.data.status===200)
            {
                setProduct(res.data.product)
                setLoading(false)
            }
        })
    },[])
    const deleteProduct =(e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        axios.delete(`/api/delete-product/${id}`).then(res=>{
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
    var LIST_PRODUCT="";
    if(loading)
    {
        return <h1>Loading Product List...</h1>
    }
    else{
        LIST_PRODUCT=product.map(item=>{
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.slug}</td>
                    <td>{item.tensanpham}</td>
                    <td>{item.category.name}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="50px" height="50px" alt="image" /></td>
                    <td>{item.gia}</td>
                    <td>{item.soluong}</td>
                    <td>{item.featured}</td>
                    <td>{item.popular}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={e=>deleteProduct(e,item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        })
    }
    return(
        <div className="container px-4">
            <div className="card">
            <div className="card-header">
                <h1>Product List
                <Link to="/admin/add-product" className='btn btn-primary btn-sm float-end'>Add Product</Link></h1>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Slug</th>
                                <th>Tên sản phẩm</th>
                                <th>Loại</th>
                                <th>Image</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Featured</th>
                                <th>Popular</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {LIST_PRODUCT}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )
}
export default ViewProduct