import React from 'react'
import './index.less'
import {Form,Input,Button} from 'antd'
import BaseServise from '../../components/baseServise'
import urls from '../../contones/urls'
import history from '../../history'
const FormItem  = Form.Item

export default class Login extends React.Component{

    loginSubmit =(value)=>{
        BaseServise.ajax({
            url:urls.login,
            data:value,
            isMock:true,
        }).then((response)=>{
            // console.log(response)
            if(response.data.code==0){
                history.push('/home')
            }else {
                // alet()
                
            }
        })
    }
    render (){
        return (
            <div className='login-page'>
                <div className='login-content-wrap'>
                    <div className='login-content'>
                        <div className='word'>珠峰培训<br/>ERP管理系统</div>
                        <div className='login-box'>
                            <div className='title'>欢迎您</div>
                            <LoginForm loginSubmit = {this.loginSubmit}/>
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}

class LoginForm extends React.Component{
    checkUserName=(rule,value,callback)=>{
        let reg = /^1\d{10}$/;
        if(!value){
            callback('请输入用户名')
        }else if (!reg.test(value)){
            callback('用户名错误')
        }else {
            callback()
        }
    }
    submitLogin =()=>{
        let data  = this.props.form.getFieldsValue();
        this.props.loginSubmit(data)
    }
    render (){
        const {getFieldDecorator} =this.props.form
        return (
            <Form>
                <Form.Item>
                    {
                       getFieldDecorator('username',{
                            rules:[{validator:this.checkUserName}]
                       })(
                            <Input placeholder='用户名'/>
                       ) 
                    }
                </Form.Item>
                <FormItem>
                    {
                        getFieldDecorator('password',{
                            rules:[{required:true,message:'请输入密码'}]
                        })(
                            <Input placeholder='密码' type='password'/>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" className='login-form-button' onClick={this.submitLogin}>登录</Button>
                </FormItem>
            </Form>    
        )
    }
}
LoginForm = Form.create({})(LoginForm)