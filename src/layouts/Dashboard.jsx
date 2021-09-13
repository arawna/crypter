import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Col, Container, Row } from 'reactstrap'
import WriteMessage from '../Pages/WriteMessage'
import { Route } from 'react-router-dom';
import ReadMessage from '../Pages/ReadMessage'

export default function Dashboard() {
    return (
        <div>
            <ToastContainer position="bottom-right"/>
            <Container className="mt-5 pt-4 pb-4" style={{backgroundColor:"#334756",color:"#FF4C29",borderRadius:"10px"}}>
                <div className="mb-2">
                    <Row>
                        <Col xs="6">
                            <Link className="btn btn-danger" to={"/write"} style={{width:"100%"}}>Mesaj Yaz</Link>
                        </Col>
                        <Col xs="6">
                            <Link className="btn btn-danger" to={"/read"} style={{width:"100%"}}>Mesaj Oku</Link>
                        </Col>
                    </Row>
                </div>
                <Route exact path="/write" component={WriteMessage}/>
                <Route exact path="/read" component={ReadMessage}/>
            </Container>
        </div>
    )
}
