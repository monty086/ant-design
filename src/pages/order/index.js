import React from 'react'
import { Button,Table ,Form,Select,DatePicker,Input,Checkbox,Modal} from 'antd';
import BaseService from '../../components/baseServise'
import urls from '../../contones/urls'
import Utils from '../../contones/utils'
const FormItem = Form.Item;
const Option  = Select.Option
export default class Order extends React.Component{
    state={}
    params={}

    componentWillMount(){
        this.requestList()
    }

    requestList=()=>{
        var _this =this 
        BaseService.ajax({
            url:urls.order_list,
            data:_this.params,
            isMock:true
        }).then((response)=>{
            if(response.result){
                let data = response.result;
                var i = 0
                _this.setState({
                    items:data.item_list.map((item)=>{
                        item.key = i++;
                        return item
                    }),
                    pagination:{
                        onChange(current){
                            _this.params.page = current
                            _this.requestList()
                        },
                        total:data.total_count,
                        pageSize:data.page_size,
                        current:data.page,
                        showTotal: () => {
                            return '共' + data.total_count + '条'
                        },
                        showQuickJumper: true,
                    },
                })
            }
        })
    }


    submitFilter=(value)=>{
        this.params = value
        this.requestList()
    }
    orderDetail=()=>{
        this.setState({
            visibleModal:true
        })
    }
    onCancel=()=>{
        this.setState({
            visibleModal:false
        }) 
    }
    render (){
        const columns =[
            {
                title:'订单编号',
                dataIndex:'id',
            },
            {
                title:'车辆编号',
                dataIndex:'bike_id',
            },
            {
                title:'用户名',
                dataIndex:'name',
            },
            {
                title:'开始时间',
                dataIndex:'begin_time',
                render: Utils.timeFormait
            },
            {
                title:'处理状态',
                dataIndex:'status',
                render(text){
                    if(text==1){
                        return '订单结束'
                    }else if (text==2){
                        return '未开始'
                    }
                }
            },
            {
                title:'跟进状态',
                dataIndex:'follow_status',
                render(text){
                    if(text==1){
                        return '未跟进'
                    }else if (text==2){
                        return '已跟进'
                    }
                }
            },

        ]
        return (
            <div>
                <div className='card-wrap topFilterWrap '>
                    <FilterWrap submitFilter={this.submitFilter}/>
                </div>
                <div>
                    <Button type='primary' className='operation-buttons' onClick={this.orderDetail}>订单详情</Button>
                </div>
                <Table
                    columns ={columns}
                    className='card-wrap'
                    dataSource={this.state.items}
                    pagination= {this.state.pagination}
                />
                <Modal
                    title="订单详情"
                    visible={this.state.visibleModal}
                    okText="确定"
                    cancelText="取消"
                    onCancel={this.onCancel}
                >   
                    <div>123</div>
                </Modal>
            </div>
        )
    }
}

class FilterWrap extends React.Component{
    submitForm=()=>{
        let data = this.props.form.getFieldsValue();
        this.props.submitFilter(data)
    }
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