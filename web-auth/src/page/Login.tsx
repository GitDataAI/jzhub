import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from '@pheralb/toast';
import { AuthApi, AuthCaptchaImage } from 'lib-apis/api/AuthApi';
import './login.css';

const Login = () => {
  const api = new AuthApi();
  const [state, setState] = useState({
    username: '',
    password: '',
    code: '',
    fingerprint: '',
    captcha: ''
  });

  const [Captcha, setCaptcha] = useState<AuthCaptchaImage>({
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    fingerprint: '',
  });

  const GetCaptcha = () => {
    api.captchaImage().then((x) => {
      if (x.status !== 200) {
        toast.error({ text: '验证码获取失败' });
        return;
      }
      if (x.data.code !== 200) {
        toast.error({ text: '验证码获取失败' });
        return;
      }
      if (!x.data.data) {
        toast.error({ text: '验证码获取失败' });
        return;
      }
      setCaptcha(x.data.data);
      setState({
        ...state,
        fingerprint: x.data.data.fingerprint,
      });
    });
  };

  useEffect(() => {
    GetCaptcha();
  }, []);

  return (
    <div>
      <br />
      <br />
      <h1 className="login-title">登录以继续</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <br />
        <br />
        <div className="login-field">
          <label className="login-label">账号</label>
          <input
            className="login-input"
            type="text"
            placeholder="用户名或者邮箱"
            value={state.username}
            onChange={(e) => setState({ ...state, username: e.target.value })}
          />
        </div>

        <div className="login-field">
          <label className="login-label">密码</label>
          <input
            id="password"
            className="login-input"
            type="password"
            placeholder="请输入您的密码"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
        </div>
        <div className="login-field">
          <label className="login-label">验证码</label>
          <div style={{ display: 'flex' }}>
            <input
              className="login-input-half"
              id="captcha"
              type="text"
              placeholder="请输入验证码"
              value={state.code}
              onChange={(e) => setState({ ...state, code: e.target.value })}
            />
            <img
              className="login-captcha-half"
              onClick={GetCaptcha}
              src={Captcha.image}
              alt="captcha"
            />
          </div>
        </div>
        <div className="login-field">
          <NavLink
            to="/auth/reset"
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <label
              className="login-label"
              style={{ cursor: 'pointer' }}
            >
              忘记密码?
            </label>
          </NavLink>
        </div>
        <div className="login-field">
          <button
            className="login-login-button"
            type="button"
            onClick={() => {
              // 登录逻辑
            }}
          >
            登录
          </button>
        </div>
        <br />
        <div className="login-field">
          <NavLink
            to="/auth/apply"
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <button className="login-apply-button" type="button">
              注册
            </button>
          </NavLink>
        </div>
      </form>
      <br />
      <br />
      <div className="login-origin-readme">
        GitData.AI 是一个用于数据产品(例如AI模型)的开发、管理、交易的一站式协作平台，帮助您高效地开发和探索数据产品。
      </div>
      <div className="login-origin-readme">
        © 2023 GitData.AI &nbsp;
        <b className="login-this-link">隐私政策</b>&nbsp;
        <b className="login-this-link">服务条款</b>&nbsp;
      </div>
      <br />
      <br />
    </div>
  );
};

export default Login;
