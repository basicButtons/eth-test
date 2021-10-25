import React, { useState } from 'react';
import { Modal, Button,Input } from 'antd';


const App = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [amount,setAmount] = useState(null);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log(amount)
        props.deal(amount).then(()=>{
            console.log("会掉！！！")
        })
        props.getRecode()
        props.refresh()
        
        setAmount(null)
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        
    };
    const onchange = (e) =>{
        setAmount(e.target.value)
    }
    return (
        <>
        <Button type="primary" onClick={showModal}>
            {props.info}
        </Button>
        <Modal title={props.info} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Input  placeholder={"Input "+ props.info + " amount" }  suffix="yuan" value = {amount} onChange= {
                (e)=>{onchange(e)}
            }/>
        </Modal>
        </>
    );
};
export default App