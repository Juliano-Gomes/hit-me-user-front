import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import { Home } from './pages/home'
import { NotFound } from './pages/Not-found'
import { Login } from './pages/Login'
import { SignUp } from './pages/Sign'
import { ForgetPass } from './pages/Forget'
import { Chat } from './pages/ui/chat'

function App() {
  const routes = createBrowserRouter([
    {path:'/',element:<Home/>,errorElement:<NotFound/>},
    {path:'/Login',element:<Login/>},
    {path:'/sign',element:<SignUp/>},
    {path:'/forget',element:<ForgetPass/>},
    {path:'/private',element:<Chat/>},
  ])
  return (
      <RouterProvider router={routes}/>
  )
}

export default App
