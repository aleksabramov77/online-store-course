import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import Pages from '../components/Pages'

const Shop = observer(() => {
    // debugger
    const { device } = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.selectedType, device.selectedBrand, device.page, device.limit])
    console.log('SHOP')
    return (
        <Container>
            <Row>
                <Col md={3} className="mt-2">
                    <TypeBar/>
                </Col>
                <Col md={9} className="mt-2">
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    )
})

export default Shop