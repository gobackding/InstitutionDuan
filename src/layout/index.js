import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon, Row, Col } from 'antd';
import renderTabBar from "@utils/renderTabBar"
import { layoutRoute } from "@router"
import { withRouter } from "react-router-dom"
import Cookies from "js-cookie";
import {LayoutStyled} from "./styled"
import {ADDNAME,sidebarApi} from '@api/Home'

const { Header, Content, Footer, Sider } = Layout;

@withRouter
class LayoutComponent extends Component {
    constructor(){
        super()
        this.state={
            username:'',
            sidebar:[]
        }
    }
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="1">
                    <Icon type="user" />
                    个人信息
              </Menu.Item>
                <Menu.Item key="2" >
                    <Icon type="user" />
                    修改密码
              </Menu.Item>
                <Menu.Item key="signout">
                    <Icon type="user" />
                    退出登录
              </Menu.Item>
            </Menu>
        );
        return (
            <Layout style={{ height: "100%" }}>
                {/* 左边边的内容区 */}
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: '64px'
                    }}
                >

                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["/home"]}
                        onClick={this.handleTo.bind(this)}
                    >
                        {renderTabBar(layoutRoute,this.state.sidebar)}
                    </Menu>
                </Sider>
                {/* 右边的内容区 */}
                <Layout style={{ marginLeft: 200,minWidth:'1000px' ,overflow:'auto'}}>
                    <Header style={{ background: '#111B39', padding: 0, position: 'absolute', left: '0', right: '0', top: '0', height: '64px', zIndex: 5 }} >
                        <LayoutStyled onClick={this.GoPages.bind(this)} />
                        <Row>
                            <Col span={2} offset={22}>
                                <Dropdown overlay={menu}>
                                    <span className="ant-dropdown-link" style={{color:'#fff'}}>
                                        {this.state.username} <Icon type="down" />
                                    </span>
                                </Dropdown>,
                            </Col>
                        </Row>

                    </Header>
                    <div style={{ height: '70px' }}></div>
                    <Content style={{ overflow: 'auto', height: "100%" }}>
                        <div style={{  background: '#f4f4f4',width:'100%',height:'100%' ,position:'relative'}}>
                            {this.props.children}
                        </div>
                    </Content>

                </Layout>
            </Layout>
        )
    }
    async componentDidMount(){
        this.sidebarDafault()
        let token = Cookies.get("67ae207794a5fa18fff94e9b62668e5c")
        let tokenName = await ADDNAME(token)
        console.log(tokenName,'tokenName')
        this.setState({
            username:tokenName.data.username
        })
    }
    async sidebarDafault(){
        let data = await sidebarApi()
        this.setState({
            sidebar:data.data
        })
    }
    handleTo({ key }) {
        this.props.history.push(key);
    }
    handleMenuClick({ key }) {
        if (key === 'signout') {
            Cookies.remove("67ae207794a5fa18fff94e9b62668e5c");
            this.props.history.push("/Login")
        }
    }
    GoPages(){
        this.props.history.push('/DataChecking/UserInterface')
    }
}
export default LayoutComponent;