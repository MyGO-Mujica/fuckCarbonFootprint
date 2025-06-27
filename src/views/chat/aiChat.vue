<script setup>
import { ref, nextTick } from 'vue'
import { useUserStore } from '@/stores'
import './chatRoom.css'
import axios from 'axios'
import avatar from '@/assets/default.png'
import aiAvatar from '@/assets/deepseekLogo.png'
import { marked } from 'marked'
const userStore = useUserStore()

const message = ref('')
const messages = ref([])
const messagesContainer = ref(null)

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })
}

// 获取当前时间格式化
const formatTime = () => {
  const now = new Date()
  return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const sendMessage = async () => {
  if (!message.value.trim()) return

  const userMsg = {
    type: 'sent',
    username: userStore.user.username || '我',
    content: message.value,
    time: formatTime(),
  }
  messages.value.push(userMsg)

  const prompt = message.value
  message.value = ''
  scrollToBottom()

  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer sk-8304f07190544c7682b42db3c894a3d6 ', //
        },
      },
    )

    const botMsg = {
      type: 'received',
      username: 'deepseek',
      content: marked.parse(response.data.choices[0].message.content),
      time: formatTime(),
    }
    messages.value.push(botMsg)
    scrollToBottom()
  } catch (err) {
    console.error('AI接口调用失败:', err)
  }
}
</script>

<template>
  <div class="chat-container">
    <!-- 聊天头部 -->
    <div class="chat-header">
      <div class="user-info">
        <div>
          <h3 class="user-name">deepseek</h3>
        </div>
      </div>
    </div>

    <!-- 聊天内容区域 -->
    <div class="chat-messages" ref="messagesContainer">
      <!-- 消息列表 -->
      <div class="message-list">
        <!-- 动态渲染消息 -->
        <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.type]">
          <img v-if="msg.type === 'received'" :src="aiAvatar" alt="对方头像" class="avatar-left" />
          <div class="message-content">
            <div class="message-header">
              <span class="message-username">{{ msg.username }}</span>
              <span class="message-time">{{ msg.time }}</span>
            </div>

            <div class="message-bubble">
              <!-- 用户消息（纯文本） -->
              <p v-if="msg.type === 'sent'">{{ msg.content }}</p>
              <!-- AI消息（markdown转HTML） -->
              <div v-else v-html="msg.content" class="markdown-content"></div>
            </div>
          </div>
          <img
            v-if="msg.type === 'sent'"
            :src="userStore.user.userPic || avatar"
            class="avatar-right"
          />
        </div>
      </div>
    </div>

    <!-- 聊天输入区域 -->
    <div class="chat-input">
      <div class="input-wrapper">
        <input type="text" placeholder="输入消息..." v-model="message" @keyup.enter="sendMessage" />
      </div>

      <button class="send-btn" @click="sendMessage">
        <span class="send-content">
          <span class="send.text">发送</span>
        </span>
      </button>
    </div>
  </div>
</template>
