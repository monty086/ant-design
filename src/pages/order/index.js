import React from 'react'
import { Button,Table ,Form,Select,DatePicker,Input,Checkbox} from 'antd';
const FormItem = Form.Item;
const Option  = Select.Option
export default class Order extends React.Component{


    render (){
        return (
            <div>
                <div className='card-wrap topFilterWrap '>
                    <FilterWrap/>
                </div>
                <div>
                    <Button type='primary' className='operation-buttons'>订单详情</Button>
                </div>
                <Table
                    className='card-wrap'
                />
            </div>
        )
    }
}

class FilterWrap extends React.Component{
    render (){
        const {getFieldDecorator} = this.props.form
        return (
            <Form layout="inline">
                <FormItem label='城市：'>
                    {getFieldDecorator('city',{initialValue:''})(
                        <Select style={{width:'120px'}}>
                            <Option value=''>全部</Option>
                            <Option value='0'>北京</Option>
                            <Option value='1'>南京</Option>
                            <Option value='2'>上海</Option>
                        </Select>    
                    )}
                </FormItem>
                <FormItem label='时间查询：'>
                    {getFieldDecorator('begin_time')(
                        <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime/>    
                    )}
                </FormItem>
                <FormItem label='~' colon={false}>
                    {getFieldDecorator('end_time')(
                        <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime/> 
                    )}
                </FormItem>
                <FormItem label='信息查询'>
                    {getFieldDecorator('info')(
                        <Input placeholder='请输入你要的信息'/>   
                    )}
                </FormItem>
                <FormItem label='短时订单'>
                    {getFieldDecorator('shot_order')(
                        <Checkbox/>
                    )}
                </FormItem>
                <Button type='primary' onClick={this.submitForm}>提交</Button>
                <Button onClick={this.resetForm}>重置</Button>
            </Form>    
        )
    }
}
FilterWrap = Form.create({})(FilterWrap)