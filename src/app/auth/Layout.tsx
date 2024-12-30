import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return(
        <div className="auth">
            <div className="auth-window">
                <div className="auth-window-header">
                    <img src="/gitdata-ai.png" alt="logo"/>
                </div>
                <Outlet/>
                <div className="auth-window-footer">
                    <a>GitData.AI 是一个用于数据产品（例如AI模型）的开发、管理、交易的一站式协作平台，帮助您高效地开发和探索数据产品。</a>
                    <br/>
                    <div className="auth-window-footer-about">
                        <a>© 2023 GitData.AI</a>
                        <a>隐私政策</a>
                        <a>服务条款</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout