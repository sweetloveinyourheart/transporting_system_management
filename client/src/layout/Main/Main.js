import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './main.css'
import Router from '../../routers'

export default function Main() {
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