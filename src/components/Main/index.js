import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import {Link} from "react-router-dom"
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {connect} from  "react-redux"
import "./index.css"
import {logOut} from "../../store/actions/LogInAction"
import hit from "./pic/HIT.jpg"


const { Header, Sider, Content } = Layout;


class SiderDemo extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logoutUser= ()=>{
    localStorage.removeItem("jwtToken")
    this.props.logOut()
  }
  render() {
    const menu = this.props.type ===  "user" ? (<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      <Link to="/manage">Accounts</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
      <Link to="/market">Market</Link>
    </Menu.Item>
    <Menu.Item key="3" icon={<UploadOutlined />}>
      <Link to="/tending">Trade</Link>
    </Menu.Item>
  </Menu>):(<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      <Link to="/admin">Admin</Link>
    </Menu.Item>
  </Menu>)
    return (
      <Layout className="main-body">
        <Sider  >
          <div className="logo" >
            <img src={hit} className="hit"/>
          </div>
          {menu}
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })} */}
          <div>
              <Link className="nav-link" to="/login" onClick={this.logoutUser}>Log out<span className="sr-only">(current)</span></Link>
          </div>
          </Header>
         
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateFromProps = (state)=>{
  return {
      auth : state.auth.isAuthenticated,
      user :state.auth.user
  }
}

export default connect(mapStateFromProps,{logOut})(SiderDemo)