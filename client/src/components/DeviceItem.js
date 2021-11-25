import React from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import star from '../assets/star.svg'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({ deviceItem, deviceBrand }) => {
    const navigate = useNavigate()

    // console.log('deviceBrand', deviceBrand)
    return (
        <Col
            md={3} className="mt-3"
            onClick={() => {navigate(DEVICE_ROUTE + '/' + deviceItem.id)}}
        >
            <Card style={{ width: 150, cursor: 'pointer' }} border="light">
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + deviceItem.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{deviceBrand && deviceBrand.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{deviceItem.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{deviceItem.name}</div>
            </Card>
        </Col>
    )
}

export default DeviceItem