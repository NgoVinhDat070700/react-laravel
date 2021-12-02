import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import swal from 'sweetalert'
function EditProduct(props){
    const [productInput,setProductInput] = useState(
    [])
    const history = useHistory()
    const [loading,setLoading]=useState(true)
    const [pricture,setPriture]=useState([])
    const [categoryList,setCategoryList] = useState([])
    const [errorList,setError] = useState([])
    const [valueCheckbox,setValueCheckBox] = useState([])
    useEffect(()=>{
        axios.get('/api/all-category').then(res=>{
            if(res.data.status===200)
            {
                setCategoryList(res.data.category)
            }
            
        })
        const product_id = props.match.params.id
        axios.get(`/api/edit-product/${product_id}`).then(res=>{
            if(res.data.status===200)
            {
                setProductInput(res.data.product)
                setValueCheckBox(res.data.product)
            }
            else if(res.data.status===404)
            {
                swal('Error',res.data.message,"Error")
                history.push('/admin/view-product')
            }
            setLoading(false)
        })
    },[props.match.params.id,history])
    const handleInput = (e)=>{
        e.persist()
        setProductInput({...productInput,[e.target.name]:e.target.value})
    }
    const handleImage = (e)=>{
        setPriture({image:e.target.files[0]})
    }
    const handleCheckbox = (e)=>{
        e.persist()
        setValueCheckBox({...valueCheckbox,[e.target.name]:e.target.checked})
    }
    const updateProduct = (e)=>{
        e.preventDefault()
        const product_id = props.match.params.id
        const formData = {
            category_id:productInput.category_id,
            slug:productInput.slug,
            tensanpham:productInput.tensanpham,
            image:pricture.image,
            gia:productInput.gia,
            description:productInput.description,
            soluong:productInput.soluong,
            featured:valueCheckbox.featured ?'1':'0',
            popular:valueCheckbox.popular ?'1':'0',
            status:valueCheckbox.status ?'1':'0'
            
        }
        axios.put(`/api/update-product/${product_id}`,formData).then(res=>{
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
                history.push('admin/view-product')
            }
        })
    }
    if(loading)
    {
        return <h4>Loading Edit Product....</h4>
    }
    return(
        <div className="container-fluid px-4">
            <h1 className="mt-4">Edit Category</h1>
            <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">Back</Link>
        <form onSubmit={updateProduct} encType="multipart/form-data">
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
                        <input type="text" name="slug" className="form-control" onChange={handleInput} value={productInput.slug} />
                        <small className="text-danger" >{errorList.slug}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Category_id:</label>
                        <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                            <option>Select Category</option>
                            {categoryList.map((item)=>{
                                return (
                                <option value={item.id} key={item.id}>{item.name}</option>
                                )
                            })}
                            
                        </select>
                        <small className="text-danger" >{errorList.category_id}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Tên Sản Phẩm:</label>
                        <input type="text" name="tensanpham" className="form-control" onChange={handleInput} value={productInput.tensanpham} />
                        <small className="text-danger" >{errorList.tensanpham}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Image:</label>
                        <input type="file" name="image" className="form-control" onChange={handleImage} />
                        <small className="text-danger" >{errorList.image}</small>
                        <img src={`http://localhost:8000/${productInput.image}`} width="50px" height="50px" alt="image" />
                    </div>
                    <div className="form-group mb-3">
                        <label>Giá:</label>
                        <input type="text" name="gia" className="form-control" onChange={handleInput} value={productInput.gia} />
                        <small className="text-danger" >{errorList.gia}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Description:</label>
                        <textarea  name="description" className="form-control" onChange={handleInput} value={productInput.description} ></textarea>
                        <small className="text-danger" >{errorList.description}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Số lượng:</label>
                        <input type="text"  name="soluong" className="form-control" onChange={handleInput} value={productInput.soluong} ></input>
                        <small className="text-danger" >{errorList.soluong}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Featured(checked=show):</label>
                        <input type="checkbox"  name="featured" onChange={handleCheckbox} defaultChecked={valueCheckbox.featured ===1 ? true:false}  ></input>
                        <small className="text-danger" >{errorList.featured}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Popular(checked=show):</label>
                        <input type="checkbox"  name="popular"  onChange={handleCheckbox} defaultChecked={valueCheckbox.featured ===1 ? true:false}  ></input>
                        <small className="text-danger" >{errorList.popular}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Status:</label>
                        <input type="checkbox" name="status" onChange={handleCheckbox}  defaultChecked={valueCheckbox.featured ===1 ? true:false}  />Status 0=shown/1=hidden
                        <small className="text-danger" >{errorList.status}</small>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary px-4 float-end">Update</button>
                
            </div>
            </form>
        </div>
    )
}
export default EditProduct