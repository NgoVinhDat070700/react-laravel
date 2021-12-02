import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function ViewProducts(props)
{
    const history = useHistory()
    const [loading,setLoading] = useState(true)
    const [product,setProduct] = useState([])
    const [category,setCategory] = useState([])
    useEffect(()=>{
        let isMouted = true
        const product_slug = props.match.params.slug
        axios.get(`/api/fetchproducts/${product_slug}`).then(res=>{
            if(isMouted)
            {
                if(res.data.status===200)
                {
                    console.log(res.data.product_data)
                    setProduct(res.data.product_data.product)
                    setCategory(res.data.product_data.category)
                    setLoading(false)
                }
                else if(res.data.status===400)
                {
                    history.push('/category')
                    swal('Warning',res.data.message,'Ko có sản phẩm nào')
                }
                else if(res.data.status===404)
                {
                    history.push('/category')
                    swal('Warning',res.data.message,'error')
                }
            }
        })
        return ()=>{
            isMouted = false
        }
    },[props.match.params.slug])
    if(loading)
    {
        return <h3>Loading Product...</h3>
    }
    else{
        var showProducts = ''
        showProducts = product.map((item,idx)=>{
            return(
                <div className="col-md-3" key={idx}>
                    <div className="card">
                        <img src={`http://localhost:8000/${item.image}`} className="w-100" alt="" />
                        <div className="card-body">
                            <h5>{item.tensanpham}</h5>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h4>Category/product-name</h4>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showProducts}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewProducts