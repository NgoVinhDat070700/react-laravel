import axios from 'axios'
import React,{useEffect, useState} from 'react'
import swal from 'sweetalert'
function AddProduct(){
    const [productInput,setProductInput] = useState({
        category_id:'',
        slug:'',
        tensanpham:'',
        image:'',
        gia:'',
        description:'',
        soluong:'',
        featured:'',
        popular:'',
        status:''
    })
    const [pricture,setPriture]=useState([])
    const [categoryList,setCategoryList] = useState([])
    const [errorList,setError] = useState([])
    useEffect(()=>{
        axios.get('/api/all-category').then(res=>{
            if(res.data.status===200)
            {
                setCategoryList(res.data.category)
            }
        })
    },[])
    const handleInput = (e)=>{
        e.persist()
        setProductInput({...productInput,[e.target.name]:e.target.value})
    }
    const handleImage = (e)=>{
        setPriture({image:e.target.files[0]})
    }
    const submitProduct = (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('image',pricture.image)
        formData.append('category_id',productInput.category_id)
        formData.append('slug',productInput.slug)
        formData.append('tensanpham',productInput.tensanpham)
        formData.append('gia',productInput.gia)
        formData.append('description',productInput.description)
        formData.append('soluong',productInput.soluong)
        formData.append('featured',productInput.featured)
        formData.append('popular',productInput.popular)
        formData.append('status',productInput.status)
        axios.post('/api/add-product',formData).then(res=>{
            if(res.data.status===200)
            {
                swal('Success',res.data.message,'Success')
                setProductInput({...productInput,category_id:'',
                slug:'',
                tensanpham:'',
                image:'',
                gia:'',
                description:'',
                soluong:'',
                featured:'',
                popular:'',
                status:''})
                setError([])
            }
            else if(res.data.status===401)
            {
                swal("Errors","Error")
                setError(res.data.errors)
            }
        })
    }
    return(
        <div className="container-fluid px-4">
            <h1 className="mt-4">Add Category</h1>
            {/* {display_errors.map((item)=>{
                return(<p className="mb-1">{item}</p>)
            })} */}
        <form onSubmit={submitProduct} id="PRODUCT_FORM" encType="multipart/form-data">
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
                        <input type="checkbox"  name="featured" onChange={handleInput} value={productInput.featured} ></input>
                        <small className="text-danger" >{errorList.featured}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Popular(checked=show):</label>
                        <input type="checkbox"  name="popular"  onChange={handleInput} value={productInput.popular} ></input>
                        <small className="text-danger" >{errorList.popular}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Status:</label>
                        <input type="checkbox" name="status" onChange={handleInput} value={productInput.status}  />Status 0=shown/1=hidden
                        <small className="text-danger" >{errorList.status}</small>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                
            </div>
            </form>
        </div>
    )
}
export default AddProduct