import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createBrand, createType } from '../../http/deviceAPI'


const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const onAddBrand = () => {
        createBrand({ name: value }).then(data => {
            setValue('')
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите название бренда"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={onAddBrand}>Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBrand