import http from "@utils/http";
import axios from "@utils/axios";
import Cookies from "js-cookie";
// 获取用户的姓名
export const ADDNAME = (val)=>http.get(`${window.apiUrl}/review/loginByUserName`,{
    'token':val
})

// Home页面 废掉按钮
export const ADANDONVALUE = (val)=>http.get(`${window.apiUrl}/review/rules/AbolishRules`,{
    'id':val
})

// 验证用户的时间以及默认检核规则
export const RULESEQTIME = ()=>http.get(`${window.apiUrl}/review/defalut/list`)

// 登录
export const LOGINHOME = (val)=>http.post(`${window.apiUrl}/review/login`,{
    "username":val.username,
    "password":val.password
})

// 侧边栏
export const sidebarApi = ()=>http.get(`${window.apiUrl}/review/permission/findMenu`)