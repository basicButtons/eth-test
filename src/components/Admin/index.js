import React, { Component } from 'react'
import { Table,  Space ,Spin} from 'antd';
import {connect} from "react-redux"
import {getAdminInfo,agreeItem,disagreeItem} from "../../store/actions/AdminAction"
const { Column } = Table;

class Admin extends Component {
    state = {
      isLoading:false
    }
    componentDidMount(){
      this.props.getAdminInfo()
      console.log(this.props.agreeItem)
    }
    agree = (item)=>{
      return ()=>{
        this.setState({
          isLoading:true
        })
        this.props.agreeItem(item).then(()=>{
          this.setState({isLoading:false})
        })
        
      }
    }
    disagree = (key)=>{
      return ()=>{
        this.props.disagreeItem(key)
      }
    }
    trans = (data) =>{
      var date = new Date(data)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    }
    render() {
        const info =  this.props.adminInfo.map(item=>{
            return{
              ...item,
              time1:this.trans(item.time1)
            }
          }
        )
        return (
            <div>
            <h2 >admin</h2>
              <Spin spinning={this.state.isLoading}>
                <Table dataSource={info} >
                    <Column title="Type" dataIndex="type" key="type" />

                    <Column title="Amount" dataIndex="amount" key="amount" />

                    <Column title="From" dataIndex="from" key="from" />

                    <Column title="To" dataIndex="to" key="to"/>

                    <Column title="Apply Time" dataIndex="time1" key="time1"/>

                    <Column title="Action" key="action"
                    render={(item) => (
                        <Space size="middle" key = {item.key}>
                        <button type="button" className="btn-link btn" onClick = {this.agree(item)}>Approve</button>
                        <button type="button" className="btn-link btn" onClick = {this.disagree(item.key)}>Disapprove</button>
                        </Space>
                    )}
                    />
                </Table>
              </Spin>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
      adminInfo : state.admin.adminInfo
    }
}

const mapActionToProps = {
  getAdminInfo,
  agreeItem,
  disagreeItem
}

export default connect(mapStateToProps,mapActionToProps)(Admin)
