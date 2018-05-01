import React from 'react'
import Header from '../../components/header'
import {Row,Col,Table,Button,Input, Divider,Modal,Form,} from 'antd'
import NavLeft from '../../components/navleft'
import menuList from '../../contones/menuConfig'
import BaseService from '../../components/baseServise'
import urls from '../../contones/urls'

const FormItem = Form.Item;

export default class Home extends React.Component{
    state={
        items: [],
        selectedItem: {},
        selectedRowKeys: [],
    }
    params={
        pageNum:1
    }
    componentWillMount(){
        this.setState({
            menuList
        })
        this.requestList()
    }

    requestList =()=>{
        var _this = this
        BaseService.ajax({
            url:urls.articleList+'?pageNum='+this.params.pageNum,
            type:'get',
            isMock:true
        }).then((response)=>{
            if(response.code==0){     
                let data = response.data;
                var i = 0
                _this.setState({
                    items:data.articles.map((item)=>{
                        item.key = i++;
                        return item
                    }),
                    pagination:{
                        onChange(current){
                            _this.params.pageNum = current
                            _this.requestList()
                        },
                        total:data.total,
                        pageSize:data.pageSize,
                        current:data.pageNum,
                        showTotal: () => {
                            return '共' + data.total + '条'
                        },
                        showQuickJumper: true,
                    },
                    selectedItem: null
                })
            }
        })
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedItem: selectedRows[0]
        });
    };
    onRowClick = (record, index) => {
        const selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: (this.state.items[index] || {})
        });
    };
    deleteBlog =()=>{
        if(!this.state.selectedItem){
            alert('请选择一条博客')
            return
        }
        BaseService.ajax({
            url:urls.deleteBlog+'?id='+this.state.selectedItem._id,
            type:'get',
            isMock:true
        }).then((res)=>{
            if(res.code==0){
                this.requestList()
            }
        })
    }
    onCancel=()=>{
        this.setState({
            visibleModal:false
        })
    }

    editBlog=()=>{
        if(!this.state.selectedItem){
            alert('请选择一条博客')
            return
        }
        this.setState({
            title:'编辑文章',
            visibleModal:true,
            isEdit:true,
            isCreate:false
        })
    }
    createBlog =()=>{
        this.setState({
            title:'发表文章',
            visibleModal:true,
            isCreate:true,
            isEdit:false,
        })
    }
    searchBlog=()=>{
        BaseService.ajax({
            url:urls.articleList,
            data:{'keyword':this.state.searchValue},
        }).then((res)=>{
            if(res.code==0){
                this.data =''
                this.requestList()
            }
        }) 
    }
    searchChange =(e)=>{
        this.setState({
            searchValue:e.target.value
        })
    }
    onSubmit=()=>{
        var data = this.refs.set_mode.getFieldsValue();
        var params = {
            title:data.title,
            content:data.content,
        }
        if(this.state.isEdit){
            BaseService.ajax({
                url:urls.discuss,
                data:{review:data.review},
            }).then((res)=>{
                if(res.code==0){
                    this.setState()
                    this.onCancel()
                }
            })      
        }
        BaseService.ajax({
            url:urls.editBlog,
            data:params,
        }).then((res)=>{
            if(res.code==0){
                this.requestList()
                this.onCancel()
            }
        }) 
        
    }
    render (){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const columns =[
            {
                title:'博客标题',
                dataIndex:'title',
            },
            {
                title:'浏览量',
                dataIndex:'pv',
                width:150
            },
            {
                title:'评论量',
                dataIndex:'text',
                render:(text,current)=>{
                    return current.comments.length
                },
                width:150
            },
        ]
        return (
            <div>
                <Header username={'珠峰培训'} />
                <Row className='blog-list'>
                    <Row >
                        <Col span='18'>
                            <Button type='primary' style={{ margin: 10 }} onClick={this.createBlog}>创建文章</Button>
                            <Button type='primary' style={{ margin: 10 }} onClick={this.editBlog}>编辑文章</Button>
                            <Button type='primary' style={{ margin: 10 }} onClick={this.deleteBlog}>删除博客</Button>
                        </Col>
                        <Col span='6'>
                            <Input placeholder='请输入要搜索的内容' style={{ width: 200 }} onChange={this.searchChange}  />
                            <Button type='primary' style={{ margin: 10 }} onClick={this.searchBlog}>搜索</Button>
                        </Col>
                    </Row>

                    <Table
                        columns={columns}
                        dataSource={this.state.items}
                        pagination={this.state.pagination}
                        onRowClick={this.onRowClick}
                        rowSelection={rowSelection}
                    />
                </Row>
                <Modal
                    title={this.state.title}
                    visible={this.state.visibleModal}
                    onOk={this.onSubmit}
                    onCancel={this.onCancel}
                    width={800}
                >
                <BlogContext
                    ref='set_mode'
                    isEdit={this.state.isEdit}
                    isCreate={this.state.isCreate}
                    selectedItem={this.state.selectedItem}
                />
                </Modal>
            </div>
        )
    }
}


 class BlogContext extends React.Component{

    componentWillReceiveProps(newProps) {
        this.setState(newProps.selectedItem);
    }

    componentWillMount() {
        if (this.props.selectedItem) {
            this.setState(this.props.selectedItem);
        }
    }
     render() {
         const formItemLayout = {
             labelCol: { span: 3 },
             wrapperCol: { span: 21 }
         };
         let {getFieldProps } = this.props.form;
         const {selectedItem} = this.props;
         let commentList = []
         selectedItem&&selectedItem.comments.length>0&& selectedItem.comments.forEach((item)=>{
            commentList.push(
            <FormItem label={item.user} {...formItemLayout}>
                <div style={{ height: 100 }}>{item.content}</div>
                <span style={{ float: 'right' }}>{item.createAt}</span>
                <line></line>
            </FormItem>
            )
         })
         
         return (
             <div>
                 {this.props.isCreate?<div>
                    <FormItem label="标题" {...formItemLayout} >
                     <Input 
                         maxLength={50}
                         placeholder="最多输入50个字"
                         {...getFieldProps('title')}
                     />
                 </FormItem>
                 <FormItem label="正文" {...formItemLayout}  >
                     <Input.TextArea 
                         maxLength={500}
                         placeholder='博客正文'
                         {...getFieldProps('content')}
                         style={{height:200}}
                     />
                 </FormItem>
                 </div>:'' }
                 {
                     this.props.isEdit ? <div>
                         <FormItem label="标题" {...formItemLayout} >
                             <Input
                                 maxLength={50}
                                 placeholder="最多输入50个字"
                                 {...getFieldProps('title',{initialValue: this.state.content})}
                             />
                         </FormItem>
                         <FormItem label="正文" {...formItemLayout}  >
                             <Input.TextArea
                                 maxLength={500}
                                 placeholder='博客正文'
                                 {...getFieldProps('content',{initialValue: this.state.content})}
                                 style={{ height: 200 }}
                             />
                         </FormItem>
                         <div style={{ padding: 10 }}>
                             <big>评论列表</big>
                             <span style={{ float: 'right' }}> 评论数:  {selectedItem.pv}</span>
                         </div>
                         {selectedItem.comments.length<=0?<FormItem  {...formItemLayout}>
                             <div style={{ height: 100 }}>还没有评论~~</div>
                         </FormItem>:commentList}
                         <FormItem label="添加评论" {...formItemLayout}  >
                             <Input.TextArea
                                 maxLength={500}
                                 placeholder='输入你要评论的内容'
                                 style={{ height: 200 }}
                                 {...getFieldProps('review')}
                             />
                         </FormItem>
                     </div> : ''
                 }
                 
             </div>
         )
     }

 }

 BlogContext = Form.create({})(BlogContext)