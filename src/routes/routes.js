import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import ViewCategory from '../components/admin/ViewCategory'
import Category from '../components/admin/Category'
import EditCategory from '../components/admin/EditCategory'
import ViewProduct from '../components/admin/ViewProduct'
import AddProduct from '../components/admin/AddProduct'
import EditProduct from '../components/admin/EditProduct'
const routes = [
    {
        path:'/admin',exact:true,name:'Admin'
    },
    {
        path:'/admin/view-category',exact:true,name:'ViewCategory',component:ViewCategory
    },
    {
        path:'/admin/add-category',exact:true,name:'Category',component:Category
    },
    {
        path:'/admin/edit-category/:id',exact:true,name:'EditCategory',component:EditCategory
    },
    {
        path:'/admin/view-product',exact:true,name:'ViewProduct',component:ViewProduct
    },
    {
        path:'/admin/add-product',exact:true,name:'AddCategory',component:AddProduct
    },
    {
        path:'/admin/edit-product/:id',exact:true,name:'EditProduct',component:EditProduct
    },
    {
        path:'/admin/profile',exact:true,name:'Profile',component:Profile
    },
]
export default routes