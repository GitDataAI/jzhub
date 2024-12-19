import {Outlet} from "react-router-dom";
// import {useUser} from "@/store/useUser.tsx";
// import {useEffect, useState} from "react";

export const AuthLayout = () => {
    // const user = useUser();
    // const nav = useNavigate();
    // const [show, setShow] = useState(false);
    // useEffect(()=>{
    //     if (user.isLogin){
    //         user.initial().then(res=>{
    //             if (res){
    //                 nav("/")
    //             }else {
    //                 setShow(true)
    //             }
    //         })
    //     }
    // },[nav, user])
    return (
        <>
            {/*{show ?*/}
            {/*    <div className="auth">*/}
            {/*        <div className="authw">*/}
            {/*            <Outlet/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    : null*/}
            {/*}*/}
            <div className="auth">
                <div className="authw">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}