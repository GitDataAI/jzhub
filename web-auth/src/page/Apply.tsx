import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from '@pheralb/toast';
import { AuthApi, AuthCaptchaImage } from 'lib-apis/api/AuthApi';
import './apply.css';

const Apply = () => {
  const api = new AuthApi();
  const [state, setState] = useState({
    username: '',
    passwd: '',
    code: '',
    email: '',
    password: '',
    step: 0,
    fingerprint: '',
    captcha: '',
  });

  const [Captcha, setCaptcha] = useState<AuthCaptchaImage>({
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    fingerprint: '',
  });

  const GetCaptcha = () => {
    api.captchaImage().then((x) => {
      if (x.status !== 200) {
        toast.error({
          text: '验证码获取失败',
        });
        return;
      }
      if (x.data.code !== 200) {
        toast.error({
          text: '验证码获取失败',
        });
        return;
      }
      if (!x.data.data) {
        toast.error({
          text: '验证码获取失败',
        });
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
    const params = new URLSearchParams(window.location.search);
    setState((prevState) => ({
      ...prevState,
      email: params.get('email') || '',
    }));
    GetCaptcha();
  }, []);

  const checkUsername = async () => {
    const res = await api.check({ username: state.username });
    if (res.status !== 200 || res.data.code !== 200 || res.data.data) {
      toast.error({ text: '用户名已存在' });
      return false
    }else {
      return true
    }
  };

  const checkEmail = async () => {
    const res = await api.check({ email: state.email });
    if (res.status !== 200 || res.data.code !== 200 || res.data.data) {
      toast.error({ text: '邮箱已存在' });
      return false
    }else {
      return true
    }
  };

  const sendCode = async (email: string) => {
    checkUsername().then(res=>{
      if (res) {
        checkEmail().then(re=>{
          if (re) {
            api.captchaEmailSend({ email }).then((x) => {
              if (x.status !== 200 || x.data.code !== 200) {
                toast.error({ text: '验证码发送失败' });
              } else {
                toast.success({ text: '验证码发送成功' });
                setState({ ...state, step: 1 });
              }
            });
          }else {
            toast.error({ text: '邮箱已存在' });
          }
        });
      }else {
        toast.error({ text: '用户名已存在' });
      }
    })
  };

  const checkCode = async () => {
    api.captchaEmailCheck({
      email: state.email,
      code: state.code,
    }).then((x) => {
      if (x.status !== 200 || x.data.code !== 200) {
        toast.error({ text: '验证码错误' });
      } else {
        toast.success({ text: '验证码正确' });
        setState({ ...state, step: 2 });
      }
    });
  };

  const apply = async () => {
    api.apply({
      username: state.username,
      password: state.password,
      email: state.email,
      code: state.code,
      fingerprint: state.fingerprint,
    }).then((x) => {
      if (x.status !== 200 || x.data.code !== 200) {
        toast.error({ text: '注册失败' });
      } else {
        toast.success({ text: '注册成功' });
      }
    });
  };

  const next = () => {
    if (state.step === 0) {
      if (state.username === '' || state.email === '') {
        toast.error({ text: '用户名或邮箱不能为空' });
        return;
      }
      sendCode(state.email).then();
    } else if (state.step === 1) {
      checkCode().then();
    } else if (state.step === 2) {
      apply().then();
    }
  };

  return (
    <div>
      <br />
      <br />
      <h1 className="apply-title">注册以继续</h1>
      <form>
        <br />
        <br />
        {state.step === 0 ? (
          <>
            <div className="apply-field">
              <label className="apply-label">账号</label>
              <input
                className="apply-input"
                placeholder="请输入你的用户名"
                onChange={(x) => setState({ ...state, username: x.target.value })}
              />
            </div>
            <div className="apply-field">
              <label className="apply-label">邮箱</label>
              <input
                className="apply-input"
                type="email"
                placeholder="请输入您的邮箱"
                onChange={(x) => setState({ ...state, email: x.target.value })}
              />
            </div>
          </>
        ) : state.step === 1 ? (
          <div className="apply-field">
            <label className="apply-label">验证码</label>
            <input
              className="apply-input"
              type="text"
              placeholder="请输入邮箱验证码"
              value={state.code}
              onChange={(x) => setState({ ...state, code: x.target.value })}
            />
          </div>
        ) : (
          <>
            <div className="apply-field">
              <label className="apply-label">密码</label>
              <input
                className="apply-input"
                type="password"
                placeholder="请输入密码"
                value={state.passwd}
                onChange={(x) => setState({ ...state, passwd: x.target.value })}
              />
            </div>
            <div className="apply-field">
              <label className="apply-label">确认密码</label>
              <input
                className="apply-input"
                type="password"
                placeholder="请输入再次确认你的密码"
                value={state.password}
                onChange={(x) => setState({ ...state, password: x.target.value })}
              />
            </div>
            <div className="apply-field">
              <label className="apply-label">验证码</label>
              <div style={{ display: 'flex' }}>
                <input
                  className="apply-input-half"
                  id="captcha"
                  type="text"
                  placeholder="请输入验证码"
                  value={state.captcha}
                  onChange={(x) => setState({ ...state, captcha: x.target.value })}
                />
                <img
                  className="apply-captcha-half"
                  onClick={GetCaptcha}
                  src={Captcha.image}
                  alt="captcha"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </>
        )}
        <div className="apply-field">
          <button
            className="apply-apply-button"
            type="button"
            onClick={next}
          >
            {state.step !== 2 ? '下一步' : '登录'}
          </button>
        </div>
        <br />
        <div className="apply-field">
          <NavLink to="/auth/login" style={{ textDecoration: 'none' }}>
            <button className="apply-login-button" type="button">
              返回登录
            </button>
          </NavLink>
        </div>
      </form>
      <br />
      <br />
      <div className="apply-origin-readme">
        GitData.AI 是一个用于数据产品(例如AI模型)的开发、管理、交易的一站式协作平台，帮助您高效地开发和探索数据产品。
      </div>
      <div className="apply-origin-readme">
        © 2023 GitData.AI &nbsp;
        <b className="apply-this-link">隐私政策</b>&nbsp;
        <b className="apply-this-link">服务条款</b>&nbsp;
      </div>
      <br />
      <br />
    </div>
  );
};

export default Apply;
