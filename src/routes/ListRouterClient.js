import React from 'react'
import About from '../components/frontend/About'
import Contact from '../components/frontend/Contact'
import Home from '../components/frontend/Home'
import ViewCategory from '../components/frontend/ViewCategory'
import ViewProducts from '../components/frontend/ViewProducts'

const ListRouterClient=[
    {
        path:'/',exact:true,name:'Home',component:Home
    },
    {
        path:'/about',exact:true,name:'About',component:About
    },
    {
        path:'/contact',exact:true,name:'Contact',component:Contact
    },
    {
        path:'/category',exact:true,name:'ViewCategory',component:ViewCategory
    },
    {
        path:'/category/:slug',exact:true,name:'ViewProducts',component:ViewProducts
    },
]
export default ListRouterClient