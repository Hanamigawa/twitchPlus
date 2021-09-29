import React, {Component} from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {login} from '../utils';

class Login extends Component {
    state = {
        displayModal: false
    }

    render() {
        const {displayModal} = this.state; // set a var
        return (
            <div>
                <Button shape='round'
                        onClick={this.signinOnClick}
                        style={{marginRight: 20}}
                        type="primary"  // what does type mean?
                        >
                    Login
                </Button>
                <Modal title="Log in"
                       visible={displayModal}
                       onCancel={this.handleCancel}
                        footer={null}
                        destroyOnClose={true}
                >
                    <Form
                        name="normal_login"
                        onFinish={this.onFinish}
                        preserve={false}
                    >
                        <Form.Item
                            name="user_id"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Login</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }

    signinOnClick = () => {
        console.log('sign in clicked')
        this.setState({
            displayModal: true
        })
    }

    handleCancel = () => {
        console.log('cancel clicked')
        this.setState({displayModal: false})
    }

    onFinish = (data) => {
        login(data)
            .then((data) => {
                this.setState({
                    displayModal: false,
                })
                message.success(`Welcome back, ${data.name}`);
                this.props.onSuccess();  // onSuccess function?
            }).catch((err) => {
            message.error(err.message);
            })
    }
}

export default Login;