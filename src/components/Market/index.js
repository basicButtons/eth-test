import React, { Component } from 'react'
import { Table, Input, Button, Space,Tag,Form,Select,Drawer,DatePicker} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {getBuyInfo,getSellInfo,addMarketInfo,getInfos,deleteDeal,transDeal} from "../../store/actions/Market"
import {connect} from "react-redux"
import { PlusOutlined } from '@ant-design/icons';
import Graph from "./graph"
import "./index.css"

const { Option } = Select;

const data = [
    {
        key: '1',
        name: '123',
        amount: 32,
        type: "sell",
        price: 100,
        action:"sell"
    },
    {
        key: '2',
        name: 'Joe Black',
        amount: 42,
        type:"sell",
        price: 100,
        action:"sell"
    },
    {
        key: '3',
        name: 'Jim Green',
        amount: 32,
        type:"buy",
        price:100,
        action:"buy"
    },
    {
        key: '4',
        name: 'Jim Red',
        amount: 32,
        type:"buy",
        price:100,
        action:"buy"
    },
  ];

class market extends Component {
    componentDidMount(){
        this.props.getInfos()
    }
    state = {
        type: "all",
        searchText: '',
        searchedColumn: '',
        price:null,
        amount:null,
        actionType:"sell",
        disable:false,
        visible: false
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  this.setState({
                    searchText: selectedKeys[0],
                    searchedColumn: dataIndex,
                  });
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    setBuy = ()=>{
      this.setState({type:"buy"})
      console.log(this.props.info.filter((item) => item.type === "buy"))
    }
    setSell=()=>{
      this.setState({type:"sell"})
      console.log(this.props.info.filter((item) => item.type === "sell"))
    }
    setAll=()=>{
      this.setState({type:"all"})
    }
    deleteDeal=(record)=>{
      return ()=>{
        this.props.deleteDeal(record)
      }
    }
    onSubmit = (record) =>{
      return ()=>{
        this.setState({
          visible: false,
        });
        this.props.transDeal(record).then(()=>{
          this.props.getInfos()
        })
      }
    }
    transDeal = (record)=>{
      return ()=>{
        this.setState({
          visible: true,
        });
      }
    }
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
  
    render() {
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              width: '20%',
              ...this.getColumnSearchProps('name'),
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              key: 'amount',
              width: '20%',
              ...this.getColumnSearchProps('amount'),
            },
            {
              title: 'Price',
              dataIndex: 'price',
              key: 'price',
              width: '20%',
              ...this.getColumnSearchProps('price'),
            },
            {
                title: 'Tran Type',
                dataIndex: 'type',
                key: 'type',
                width: '20%',
                ...this.getColumnSearchProps('type'),
            },
            {
                title: 'Buy/Sell',
                dataIndex: 'action',
                key: 'action',
                width: '20%',
                render: (text, record) => (
                    <Space size="middle">
                     {this.props.user.name === record.name ?<Button type="primary" shape="round" onClick={this.deleteDeal(record)} danger> delete</Button> : 
                     <div>
                      <Button type="primary" shape="round" onClick = {this.transDeal(record)} > 
                        {record.action === "sell"?"buy":"sell"}
                      </Button >
                      <Drawer
                          title = {record.action === "sell"?"buy":"sell"}
                          width={400}
                          onClose={this.onClose}
                          visible={this.state.visible}
                          bodyStyle={{ paddingBottom: 80 }}
                          footer={
                            <div
                              style={{
                                textAlign: 'right',
                              }}
                            >
                              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                              </Button>
                              <Button onClick={this.onSubmit(record)} type="primary">
                                Submit
                              </Button>
                            </div>
                          }
                        >
                      </Drawer>
                     </div>
                     }
                    </Space>
                  )
            },
        ];
        const onfinish = ()=>{
          this.setState({disable:true})
          this.props.addMarketInfo({
            amount:this.state.amount,
            price:this.state.price,
            actionType:this.state.actionType,
            time: (new Date()).valueOf()
          }).then(()=>{
            this.setState({disable:false,amount:null,price:null})
          })
        }
        const onChange = (e)=>{
          this.setState({[e.target.name]:e.target.value})
        }
        const handValue = (value)=>{
          console.log(value)
          this.setState({actionType:value})
        }
        return (
            <div>
                <div className = "graph">
                  <Graph/>
                </div>
                <div className = "markethead">
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary" onClick = {this.setBuy}>BUY</button>
                    <button type="button" className="btn btn-secondary" onClick ={this.setSell}>SELL</button>
                    <button type="button" className="btn btn-secondary" onClick ={this.setAll}>ALL</button>
                  </div>
                  <div className="right">
                  <Form  name="horizontal_login" layout="inline"  onFinish={onfinish}>
                      <Form.Item 
                        rules={[
                            {
                              required: true,
                              message: 'Please input your amount!',
                            },]}
                        >
                        <Input
                          value= {this.state.amount}
                          name="amount" 
                          placeholder="amount"
                          onChange = {onChange}
                          autoComplete="off"
                        />
                      </Form.Item>
                      <Form.Item 
                        rules={[
                            {
                              required: true,
                              message: 'Please input your price!',
                            },]}
                        >
                        <Input
                          name="price" 
                          value = {this.state.price}
                          placeholder="price"
                          onChange = {onChange}
                          autoComplete="off"
                        />
                      </Form.Item>
                      <Select
                          value={ this.state.actionType }
                          style={{ width: 100, margin: '0 8px' }}
                          name = "actionType"
                          onChange = {handValue}
                          placeholder = "type"
                        >
                          <Option value="sell">Sell</Option>
                          <Option value="buy">Buy</Option>
                        </Select>
                        <Form.Item>
                          <Button type="primary" htmlType="submit" disabled={this.state.disable}>
                            {this.state.actionType === "sell" ? "Sell" : "Buy"}
                          </Button>
                        </Form.Item>
                  </Form>
                </div>
                </div>
                <Table scroll={{y:200}} columns={columns} dataSource={this.state.type === "all" ? this.props.info : this.state.type==="buy" ? this.props.info.filter(item=> item.type ==="buy"): this.props.info.filter(item=> item.type ==="sell")} />
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
      info:state.market.sort((a,b)=>{return b.time - a.time}),
      user:state.auth.user
    }
}
const mapActionToProps={
    getInfos,
    getBuyInfo,
    getSellInfo,
    addMarketInfo,
    deleteDeal,
    transDeal
}

export default connect(mapStateToProps,mapActionToProps)(market)

