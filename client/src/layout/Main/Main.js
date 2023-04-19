import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './main.css'
import Router from '../../Routers'
import { useAuth } from '../../contexts/auth'
// import { Layout, theme } from 'antd';
// import { Content } from 'antd/es/layout/layout';

export default function Main() {
    const { user } = useAuth();
    return (
        <body>
            <div className='page-container'>
                <Header></Header>
                <div className='content-wrap'>
                    <div>
                        <Router />
                    </div>
                </div>
                {user?.role.roleId !== "DRIVER" ?
                    <Footer></Footer>
                    : null
                }
            </div>
        </body>
    )
}