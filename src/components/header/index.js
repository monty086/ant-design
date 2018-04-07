import React from 'react'
import {Row,Col,Icon} from 'antd'
import {Link} from 'react-router-dom'
import history from '../../history'

export default class Header extends React.Component{
    logout=()=>{
        history.push('/')
    }

    render() {
        return (
            <Row className='header'>
                <Col span='18'>
                    <Link to='/home'>珠峰ERP管理系统</Link>
                </Col>
                <Col span='6'>
                    <div style={{ float: 'right', fontSize: 14 }}>
                        <Icon type="smile-o" /> 欢迎，{this.props.username}
                        <a className='anticon' onClick={this.logout}>退出</a>
                    </div>
                </Col>
            </Row>
        )
    }
}