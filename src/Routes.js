import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import App from './App'
import RegisterComponents from './Components/RegisterComponents'
import LiffComponent from './Components/LiffComponent'
import DoorComponent from './Components/DoorComponent'
const MyRoute=()=> {
        let search = useLocation().search;
        const queryParams = new URLSearchParams(search).get('page')
    return(
        <Router>
            <Routes>
                <Route path='/' element={<App params={queryParams}/>}/>
                <Route path="/register" element={<RegisterComponents/>}/>
                <Route path="/liff-home" element={<LiffComponent/>}/>
                <Route path="/home2" element={<DoorComponent/>}/>
            </Routes>
        </Router>
    )
}

export default MyRoute;