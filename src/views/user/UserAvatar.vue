<script setup>
import { ref } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'

const userStore = useUserStore()
const avatarList = [
  'https://tse2-mm.cn.bing.net/th/id/OIP-C.IxpkUnSWSMBoFUGFqbonsAHaEO?w=325&h=184&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
  'https://tse3-mm.cn.bing.net/th/id/OIP-C._-MZz8K7YRac1Djf6MofVAHaE8?w=279&h=185&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
  'https://tse4-mm.cn.bing.net/th/id/OIP-C.S15KmMwdJWvGaEK-_U0wRgHaFy?w=242&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
  'https://tse1-mm.cn.bing.net/th/id/OIP-C.CTEdSsfPSjtVB-k27vkungHaE7?w=285&h=190&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
  'https://ts1.tc.mm.bing.net/th/id/OIP-C.TdWnfxlApWDQc78prXWpDQHaHa?w=199&h=211&c=8&rs=1&qlt=70&o=7&cb=iavawebp1&dpr=1.5&pid=3.1&rm=3',
  'https://tse1-mm.cn.bing.net/th/id/OIP-C.ZKacXHDbDyHu538FHQl10wHaGN?rs=1&pid=ImgDetMain',
  'https://tse2-mm.cn.bing.net/th/id/OIP-C.zigYOTB9O8_Yj0XWvjtAuwHaFt?w=197&h=152&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
  'https://tse2-mm.cn.bing.net/th/id/OIP-C.F5mDJl594dd5nIhOGHif2QHaHN?rs=1&pid=ImgDetMain',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201908%2F29%2F20190829102057_qoahb.thumb.400_0.gif&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1751098451&t=25b0798417d378a509438ab190728086',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExejY4cjkzeTk5c3BoMmQzdGlhYWF6MzhqazY0cm96azdjMTMxMms4MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TyiIUwlNKYmZhM2Whk/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExczR1aWp3M3o0Zjdwd2wydmR1dnltbGFqNmUzZWlyaXUyMmoxcGZ5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UYzNgRSTf9X1e/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGl2NTRhMDVseHQ2MmVvdWFzOTU3djJtNHkxN3N0bXI2NHQ5d2E1aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/862A6X2sooSsw/giphy.gif',
]
const imgUrl = ref(userStore.user.user_pic || avatarList[0])
const dialogVisible = ref(false)

const chooseAvatar = (url) => {
  imgUrl.value = url
  dialogVisible.value = false
}

const onUpdateAvatar = async () => {
  await userUpdateAvatarService(imgUrl.value)
  await userStore.getUser()
  userStore.user.user_pic = imgUrl.value
  ElMessage.success('头像更新成功')
}
</script>

<template>
  <page-container title="更换头像">
    <div style="text-align: center">
      <img :src="imgUrl" class="avatar" />
      <div style="margin: 16px 0 8px 0; color: #888">当前头像</div>
      <el-button @click="dialogVisible = true" type="primary" size="large">选择头像</el-button>
      <el-button
        @click="onUpdateAvatar"
        type="success"
        :icon="Upload"
        size="large"
        style="margin-left: 16px"
        >上传头像</el-button
      >
    </div>
    <el-dialog v-model="dialogVisible" title="选择头像" width="400px" align-center>
      <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center">
        <img
          v-for="item in avatarList"
          :key="item"
          :src="item"
          class="avatar-select"
          @click="chooseAvatar(item)"
        />
      </div>
      <template #footer>
        <span style="color: #888; font-size: 13px">点击头像即可选择</span>
      </template>
    </el-dialog>
  </page-container>
</template>

<style lang="scss" scoped>
body.el-popup-parent--hidden {
  padding-right: 0 !important;
  overflow: hidden !important;
}
body {
  overflow-y: scroll;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
  border: 2px solid #eee;
}
.avatar-select {
  width: 70px;
  height: 64px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s;
}
.avatar-select:hover {
  border: 2px solid #409eff;
}
</style>
