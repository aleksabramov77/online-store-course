import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { Context } from '../index'
import Row from 'react-bootstrap/Row'
import DeviceItem from './DeviceItem'

const DeviceList = observer(() => {
    const { device } = useContext(Context)

    return (
        <Row className="d-flex">
            {device.devices.map(deviceItem =>
                <DeviceItem
                    key={deviceItem.id}
                    deviceItem={deviceItem}
                    deviceBrand={toJS(device.brands).find(i => i.id === deviceItem.id)}
                />
            )}
        </Row>
    )
})

export default DeviceList