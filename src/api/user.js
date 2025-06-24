import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({username, password}) =>
  request.post('/user/register', {username, password})


//登录接口
export const userLoginService =({ username, password }) =>
  request.post('/user/login' , { username, password })

//获取用户的基本信息
export const userGetInfoService=()=> request.get('/user/userInfo')

// 更新用户头像
export const userUpdateAvatarService = (avatar) =>
  request.patch('/user/updateAvatar', { avatar })

// 获取所有碳足迹记录
export const getCarbonFootprintLogs = () => request.get('/log')

// 删除指定 ID 的碳足迹记录
export const deleteCarbonFootprintLog = (id) => request.delete(`/log/${id}`)
