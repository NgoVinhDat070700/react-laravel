import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
function ViewCategory()
{
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState([])
    useEffect(()=>{
        let isMoutered = true
        axios.get('/api/getCategory').then(res=>{
            if(isMoutered)
            {
                if(res.data.status===200)
                {
                    setCategory(res.data.category)
                    setLoading(false)
                }
            }
        })
        return ()=>{
            isMoutered=false
        }
    },[])
    if(loading)
    {
        return <h4>Loading Data....</h4>
    }
    else
    {
        var showCategory = ''
        showCategory = category.map((item,idx)=>{
            return (
                <div className="col-md-4" key={idx}>
                    <div className="card">
                        <div className="card-body">
                            <Link to={`category/${item.slug}`} >
                                <h5>{item.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div>
            <div className="py-3">
                <div className="container">
                    <h3>Category Page</h3>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showCategory}
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export default ViewCategory