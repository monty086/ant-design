import React from 'react'
import Header from '../../components/header'
import {Row,Col} from 'antd'
import NavLeft from '../../components/navleft'
import menuList from '../../contones/menuConfig'

export default class Home extends React.Component{
    state={}
    componentWillMount(){
        this.setState({
            menuList
        })
    }
    render (){
        return (
            <div>
                <div>
                    <Header username={'珠峰培训'}/>
                    <Row className='welcome-page'>
                        <Col span='3' className='nav-left'>
                            <NavLeft menuList={this.state.menuList}/>
                        </Col>
                        <Col span='21' className="right-container">
                            {this.props.children}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}