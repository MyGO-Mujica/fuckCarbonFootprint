import request from '@/utils/request'
import qs from 'qs'

// 注册接口
export const userRegisterService = ({ username, password }) =>
  request.post('/user/register', qs.stringify({ username, password }), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })

// 登录接口
export const userLoginService = ({ username, password }) =>
  request.post('/user/login', qs.stringify({ username, password }), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })

//获取用户的基本信息
export const userGetInfoService = () => request.get('/user/userInfo')

// 更新用户头像（参数放到url query上）
export const userUpdateAvatarService = (avatarUrl) =>
  request.patch(`/user/updateAvatar?avatarUrl=${encodeURIComponent(avatarUrl)}`)

// 添加碳足迹记录
export const addCarbonFootprintLog = (data) => request.post('/log', data)

// 获取所有碳足迹记录
export const getCarbonFootprintLogs = () => request.get('/log')

// 删除指定 ID 的碳足迹记录
export const deleteCarbonFootprintLog = (id) => request.delete(`/log/${id}`)
