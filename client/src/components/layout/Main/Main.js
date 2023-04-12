import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './main.css'
import Router from '../../Routers'
// import { Layout, theme } from 'antd';
// import { Content } from 'antd/es/layout/layout';

export default function Main() {
    return (
        // <Layout>
        //     <Header></Header>
        //     <Layout>
        //         {/* Add page content here */}
        //     </Layout>
        //     <Layout>
        //         <Footer></Footer>
        //     </Layout>
        // </Layout>
        <body>
            <div className='page-container'>
                <Header></Header>
                <div className='content-wrap'>
                    <div>
                        <Router/>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </body>
    )
}