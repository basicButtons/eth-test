import React, { Component } from 'react'
import {connect} from "react-redux"
import { Statistic, Row, Col, Button } from 'antd';
import {getAcount,withdraw,remit,check,recharge,getRecodeAndProcession} from "../../store/actions/Account"
import Modal from './Modal';
import RemitModal from "./ModalRemit"
import RecodeShow from "./RecodeShow"
class Manage extends Component {
    
    componentDidMount(){
        this.props.getRecodeAndProcession()
        this.props.getAcount()
    }
    render() {
        const {recharge,withdraw,remit,check,getAcount,getRecodeAndProcession} = this.props,
            {publicAccount,peasonalAccount} = this.props.account
        return (
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                    <Statistic title="Public Account(yuan)" value={publicAccount} precision={2}/>
                    <RemitModal info = "remit" deal = {remit} refresh = {getAcount} getRecode= {getRecodeAndProcession}></RemitModal>
                    <span> </span>
                    <Modal info = "check" deal = {check} refresh = {getAcount} getRecode= {getRecodeAndProcession}></Modal>
                    </Col>
                    <Col span={12}>
                    <Statistic title="Peasonal Account(yuan)" value={peasonalAccount} precision={2} />
                    <Modal info = "recharge" deal = {recharge} refresh = {getAcount} getRecode= {getRecodeAndProcession}></Modal>
                    <span> </span>
                    <Modal info = "withdraw" deal = {withdraw} refresh = {getAcount} getRecode= {getRecodeAndProcession}></Modal>
                    </Col>
                </Row>
                <RecodeShow ></RecodeShow>
            </div>
        )
    }
}
let mapStateToProps=(state)=> {
    return {
        account:state.account
    }
},
    mapActionToProps={
        getAcount,
        withdraw,
        remit,
        check,
        recharge,
        getRecodeAndProcession
    };
export default connect(mapStateToProps,mapActionToProps)(Manage)
