import React from 'react'
import Header from '../../components/header'
import {Row,Col} from 'antd'
import NavLeft from '../../components/navleft'

export default class Home extends React.Component{
    render (){
        return (
            <div>
                <div className='welcome-page'>
                    <Header username={'珠峰培训'}/>
                    <Row>
                        <Col span={3} className='nav-left'>
                            <NavLeft/>
                        </Col>
                        <Col span={21} className='right-container'>
                            {this.props.children}
                        </Col>
                    </Row>
                </div>
                
                
            </div>
        )
    }
}