import React from 'react';
import { Select, Divider, Button, } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './Mybooking.css';


const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

function Mybooking() {
    return (
        <div className='container'>
            <div className='title'>
                <div className='Mybooking'>
                    <h2>My Bookings</h2>
                </div>
                <div className='Allbooking'>
                    <Select
                        defaultValue="All Booking"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                </div>
            </div>
            <div className='item'>
                <div className='Top'>
                    <div className='itemTLeft'>
                        <h2>Banglore</h2>
                    </div>
                    <div className='itemTCenter'>
                        <ArrowRightOutlined style={{ width: 100, color: 'blue', margin: 30 }} />
                    </div>
                    <div className='itemTRight'>
                        <h2>Chennai</h2>
                    </div>

                </div>
                <Divider />
                <div className='Bottom'>
                    <div className='itemBLeft'>
                        <h2>28 Dec 2021</h2>
                    </div>
                    <div className='itemBCenter'>
                        <Button type="primary" style={{ background: 'green', margin: 20 }}>Up Coming</Button>
                    </div>
                    <div className='itemBRight'>
                        <h2>AC Sleeper(2+1)</h2>
                    </div>

                </div>
            </div>


        </div>
    );
}

export default Mybooking;