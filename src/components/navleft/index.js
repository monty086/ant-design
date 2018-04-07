import React from 'react'
import {Menu} from 'antd'
import {Link} from 'react-router-dom'
const SubMenu = Menu.SubMenu;
export default class NavLeft extends React.Component{

    handleClick=(e)=>{
        this.setState({
            selectedKeys:e.key
        })
    }

    componentWillMount(){
        let menuList = this.props.menuList;
        let menus = this.listMenu(menuList)
        var key = window.location.hash
        this.setState({
            menus,
            selectedKeys:key
        })
    }

    listMenu=(data,key='')=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu key={key+item.key} title={item.title}>
                        {this.listMenu(item.children,key+item.key)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={key+item.key} name={item.title}>
                    <Link to={key+item.key}>{item.title}</Link>
                </Menu.Item>
            )
        })
    }

    render(){
        return (
            <div>
                <Menu
                onClick = {this.handleClick}
                className='nav-left'
                mode='inline'
                // theme='dark'
                selectedKeys={[this.state.selectedKeys]}
                >
                {this.state.menus}
                </Menu>
            </div>
        )
    }
}