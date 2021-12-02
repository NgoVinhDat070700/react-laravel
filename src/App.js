import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './assetss/frontend/auth/Login';
import Register from './assetss/frontend/auth/Register';
import Home from './components/frontend/Home';
import axios from 'axios'
import AdminPrivateRoute from './AdminPrivateRoute'
import MasterLayout from './layouts/admin/MasterLayout'
import Page403 from './components/errors/Page403'
import Page404 from './components/errors/Page404'
import ClientRouter from './ClientRouter';
axios.defaults.baseURL = "http://localhost:8000/"
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization=token ? `Bearer ${token}`:'';
  return config
})
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AdminPrivateRoute path="/admin" name="admin" />  
          <Route exact path="/403" component={Page403} />
          <Route exact path="/404" component={Page404} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ClientRouter path="/" name="Home" />
          {/* <Route path="/Admin" name="Admin" render={(props)=> <MasterLayout {...props} />} component={MasterLayout} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
