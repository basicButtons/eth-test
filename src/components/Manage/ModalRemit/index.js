import React, { useState } from 'react';
import { Modal, Button,Input } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';


const App = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [amount,setAmount] = useState(null);
    const [to,setTo] = useState(null);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        props.deal({amount,to}).then(()=>{
            console.log("会掉！！！")
            props.getRecode()
            props.refresh()
        })
        setAmount(null)
        setTo(null)
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        
    };
    const onchangeAmount = (e) =>{
        setAmount(e.target.value)
    }
    const onchangeTo = (e)=>{
        setTo(e.target.value)
    }
    return (
        <>
        <Button type="primary" onClick={showModal}>
            {props.info}
        </Button>
        <Modal title={props.info} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />}  placeholder={"Input "+ props.info + " acount" }   value = {to} onChange= {
                (e)=>{onchangeTo(e)}
            }/>
            <br/><br/>
            <Input  placeholder={"Input "+ props.info + " amount" } prefix="C" suffix="yuan" value = {amount} onChange= {
                (e)=>{onchangeAmount(e)}
            }/>
        </Modal>
        
        </>
    );
};
export default App