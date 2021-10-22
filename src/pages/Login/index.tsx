import React, { memo, FC } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import classNames from "classnames";
import { home } from "services";
import Store from 'stores';
import style from './index.module.less';
import Captcha from "components/Captcha";
import { doUserLogin } from 'reducer/user'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

interface ILogin {
  history: any
}

const Login: FC<ILogin> = ({history}: ILogin) => {
  const appStore = Store.getInstance();
  const [form] = Form.useForm();

  const onFinish = async (values: {
    username: string,
    password: string,
    remember: boolean,
    checkKey: string
  }) => {
    const data = await home.login(values)
    const { token } = data.data
    const { username, avatar, userId } = data.data.userInfo
    appStore.storer.dispatch(doUserLogin({
      userId,
      username,
      avatar,
      token
    }));
    await history.push('/dashboard');
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const setCheckKey = (value: string)=> {
    form.setFieldsValue({checkKey: value})
  };

  return (
    <div className={classNames(style['login'], 'flex-all-center')}>
      <div className={classNames(style['login__form'], 'flex-all-center')}>
        <span className={style['login__form__title']}>欢迎登录</span>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          className={style['login__form__form']}
        >
          <Form.Item style={{display: 'none'}} name="checkKey" />

          <Form.Item
            label="用户名"
            name="username"
            labelAlign="left"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input placeholder="admin"/>
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            labelAlign="left"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password placeholder="admin"/>
          </Form.Item>

          <Form.Item
            label="验证码"
            name="captcha"
            labelAlign="left"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <div style={{display: 'flex'}}>
              <Input />
              <Captcha captchaReady={setCheckKey}/>
            </div>
          </Form.Item>

          <Form.Item {...tailLayout} name="remember"
            valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit"
            className={style["login__form__form__submit"]}>
            提交
          </Button>
        </Form>
        </div>
    </div>
  );
}

export default memo(Login);