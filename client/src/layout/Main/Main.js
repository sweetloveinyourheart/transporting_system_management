import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './main.css'
import Router from '../../routers'

import { useAuth } from '../../contexts/auth'


export default function Main() {

    const { user } = useAuth();
    return (
        <div className='page-container'>
            <Header></Header>
            <div className='content-wrap'>
                <div>
                    <Router />
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}