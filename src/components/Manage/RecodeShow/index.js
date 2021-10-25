import React, { Component } from 'react'
import { Table, Tag, Space } from 'antd';
import {connect} from "react-redux"
import { Steps } from 'antd';

import "./index.css"


const { Step } = Steps;
const { Column, ColumnGroup } = Table;


class RecodeShow extends Component {
    
    render() {
        const trans = (data) =>{
            var date = new Date(data)
            var Y = date.getFullYear() + '-'
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
            return Y + M + D + h + m + s
        }
        
        // recodePro.forEach((item)=>{
        //     item.time1 = trans(item.time1)
        // })
        console.log(this.props.recodePro)
        const {recodePro = []} = this.props
        recodePro.forEach( item =>
            item.time1= trans(item.time1)
        )
        

        return (
            <div>
                <h2 className = "title">Remit / Check recode</h2>
                <Table  dataSource={this.props.recodePro} scroll={{y:450}}>
                
                    <Column title="Type" dataIndex="type" key="type" />

                    <Column title="Amount" dataIndex="amount" key="amount" />

                    <Column title="From" dataIndex="from" key="from" />

                    <Column title="To" dataIndex="to" key="to"/>

                    <Column title="Apply Time" dataIndex="time1" key="time1"/>

                    <Column title="State" key="state" width= "34%"
                    render={(item) => (
                            <Steps current={item.current} status={item.state? "" :"error"} size = "small" >
                                <Step  title="Finished" description="You have applied" />
                                <Step  title={item.current === 3 ?"Finished":"In Process"} description={item.current === 3 ? "Have been approved" :"Waiting for admin"} />
                            </Steps>
                    )}
                    />
                </Table>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        recodePro : state.recodePro.data
    }
}
const mapActionToProps = {

}
export default connect(mapStateToProps,null)(RecodeShow)
