import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Context } from '../../index'
import { Dropdown } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createBrand, createDevice, createType, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'
import { values } from 'mobx'

const CreateDevice = observer(({ show, onHide }) => {
    const { device } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [type, setType] = useState(null)
    const [brand, setBrand] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices().then(data => device.setDevices(data.rows))
    }, [])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const delInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const onAddDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('typeId', device.selectedType.id)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => {
            onHide()
        })    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новое устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='my-3'>
                        <Dropdown.Toggle>
                            {device.selectedType.name || 'Выберите тип'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => device.setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='my-3'>
                        <Dropdown.Toggle>
                            {device.selectedBrand.name || 'Выберите бренд'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => device.setSelectedBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите название устройства'
                        value={name} onChange={e => {setName(e.target.value)}}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите стоимость устройства'
                        type='number'
                        value={price} onChange={e => {setPrice(Number(e.target.value))}}
                    />
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={e => {setFile(e.target.files[0])}}
                    />
                    <hr/>
                    <Button
                        variant='outline-dark'
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row
                            key={i.number}
                            className='my-3'
                        >
                            <Col md={4}>
                                <Form.Control
                                    placeholder='Введите название свойства'
                                    value={i.title}
                                    onChange={e => changeInfo('title', e.target.value, i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    placeholder='Введите значение свойства'
                                    value={i.description}
                                    onChange={e => changeInfo('description', e.target.value, i.number)}

                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant='outline-danger'
                                    onClick={() => delInfo(i.number)}
                                >
                                    Удалить
                                </Button>

                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={onAddDevice}>Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateDevice