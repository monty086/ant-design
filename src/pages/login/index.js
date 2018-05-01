import React from 'react'
import './index.less'
import {Form,Input,Button} from 'antd'
import BaseServise from '../../components/baseServise'
import urls from '../../contones/urls'
import history from '../../history'
const FormItem  = Form.Item

export default class Login extends React.Component{

    loginSubmit =(value)=>{
        if(value.email){
            BaseServise.ajax({
                url:urls.singup,
                data:value,
                // isMock:true,
            }).then((response)=>{
                // console.log(response)
                if(response.data.code==0){
                    history.push('/home')
                }else {
                    // alet()
                }
            })
        }else{
            BaseServise.ajax({
                url:urls.login,
                data:value,
                // isMock:true,
            }).then((response)=>{
                // console.log(response)
                if(response.data.code==0){
                    history.push('/home')
                }else {
                    // alet()
                }
            })
        }
       
    }
    render (){
        return (
            <div className='login-page'>
                <div className='login-content-wrap'>
                    <div className='login-content'>
                        <div className='login-box'>
                            <div className='title'>珠峰博客</div>
                            <LoginForm 
                                loginSubmit = {this.loginSubmit}
                            />
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}

class LoginForm extends React.Component{
    state={
        isSignUp:false
    }
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
    signUpForm=()=>{
        if(this.state.isSignUp){
            this.setState({
                isSignUp:false
            })
        }else{
            this.setState({
                isSignUp:true
            })
        }
        
    }
    render (){
        const {getFieldDecorator} =this.props.form
        const {isSignUp} = this.state
        return (
            <Form style={{height:isSignUp?'330px':'270px'}}>
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
                {isSignUp?<FormItem>
                    {
                        getFieldDecorator('email',{
                            rules:[{required:true,message:'请输入邮箱'}]
                        })(
                            <Input placeholder='邮箱' type='email'/>
                        )
                    }
                </FormItem>:''
                }

                <FormItem>
                    <Button type="primary" className='login-form-button' onClick={this.submitLogin}>{isSignUp?'注册':'登录'}</Button>
                </FormItem>

                <a  onClick={this.signUpForm}>{isSignUp?'已有账号！登录':'没有账号？注册'}</a>
            </Form>    
        )
    }
}
LoginForm = Form.create({})(LoginForm)