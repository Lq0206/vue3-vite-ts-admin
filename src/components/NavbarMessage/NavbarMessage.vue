<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-07 11:11:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 11:54:09
-->
<template>
  <div class="nav-message">
    <el-popover
      placement="bottom"
      :width="300"
      trigger="hover"
      popper-class="nav-message-popper"
    >
      <template #reference>
        <el-badge :value="brigeValue" :max="10" type="danger">
          <a class="nav-message-btn navbar-icon">
            <el-icon><bell /></el-icon>
          </a>
        </el-badge>
      </template>
      <el-tabs
        v-model="state.activeName"
        tab-position="top"
        stretch
        @tab-click="handleClick"
      >
        <el-tab-pane :label="`通知 (${state.notice.length})`" name="first">
          <div class="tabs-msg-content">
            <ul class="message-list">
              <li v-for="(item, i) in state.notice" :key="i">
                <div class="tab-msg-item notice">
                  <div class="avatar">
                    <img :src="item.avatar" alt="" />
                  </div>
                  <div class="content">
                    <p class="msg">{{ item.msg }}</p>
                    <p class="aux">
                      <span class="date">{{ dayjs(item.date).fromNow() }}</span>
                      <span class="sender" :title="item.sender">{{
                        item.sender
                      }}</span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`消息 (${state.news.length})`" name="second">
          <div class="tabs-msg-content">
            <ul class="message-list">
              <li v-for="(item, i) in state.news" :key="i">
                <div class="tab-msg-item notice">
                  <div class="avatar">
                    <img :src="item.avatar" alt="" />
                  </div>
                  <div class="content">
                    <p v-if="item.type > 0" class="title">
                      {{
                        `用户 ${item.user} ${
                          item.type === 1 ? "评论" : "回复"
                        }了您：`
                      }}
                    </p>
                    <p class="msg">{{ item.msg }}</p>
                    <p class="aux">
                      <span class="date">{{
                        dayjs(item.date).fromNow(true)
                      }}</span>
                      <span class="sender" :title="item.user">{{
                        item.user
                      }}</span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`待办 (${state.needToBe.length})`" name="third">
          <div class="tabs-msg-content">
            <ul class="message-list">
              <li v-for="(item, i) in state.needToBe" :key="i">
                <div class="tab-msg-item need-to-be">
                  <div class="content">
                    <p class="title">{{ item.title }}</p>
                    <p class="msg">{{ item.msg }}</p>
                    <el-tag
                      class="status-tag"
                      :type="handleStatus(item.status).color"
                      >{{ handleStatus(item.status).label }}</el-tag
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="message-footer-btn">
        <a class="btn">清空 {{ state.tabNames[state.activeName] }}</a>
        <el-divider direction="vertical"></el-divider>
        <a class="btn" href="">查看更多</a>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Bell } from "@element-plus/icons-vue";
import avatar from "@/assets/logo.svg";

dayjs.extend(relativeTime);

const state = reactive({
  activeName: "first",
  tabNames: {
    first: "通知",
    second: "消息",
    third: "待办",
  },
  notice: [
    {
      msg: "您收到了新的消息，点击查看",
      avatar: avatar,
      sender: "对象1",
      date: 1627270840000,
    },
    {
      msg: "左边放着发送对象的头像",
      avatar: avatar,
      sender: "对象2",
      date: 1627270840000,
    },
    {
      msg: "这是一条特别长的内容用于测试长度，这是一条特别长的内容用于测试长度",
      avatar: avatar,
      sender: "对象3",
      date: 1627270840000,
    },
    {
      msg: "内容长度不会超过两条，请放心",
      avatar: avatar,
      sender: "对象4",
      date: 1627270840000,
    },
  ],
  news: [
    {
      type: 0,
      avatar: avatar,
      msg: "这一栏是用户之间互动的消息提醒",
      date: 1627270840000,
      user: "王赵孙",
    },
    {
      type: 1,
      avatar: avatar,
      msg: "你这篇博文写的不错，我会继续关注您的动态。",
      date: 1627270840000,
      user: "李里离",
    },
    {
      type: 2,
      avatar: avatar,
      msg: "是吗？我也觉得这是个不错的解决方案。",
      date: 1627270840000,
      user: "胡糊虎",
    },
  ],
  needToBe: [
    { title: "重启服务", msg: "请在 22:00:00 之前重新启动系统服务", status: 0 },
    {
      title: "上线新版本",
      msg: "开发代码已通过测试，请合并后发布上线。",
      status: 1,
    },
    {
      title: "备份数据",
      msg: "请在 18:00:00 之前手动备份服务器数据",
      status: 2,
    },
  ],
});

const brigeValue = computed(
  () => state.notice.length + state.news.length + state.needToBe.length
);

const handleClick = () => {};

const handleStatus = (status: any) => {
  const stArr = [
    { color: "info", label: "未开始" },
    { color: "", label: "进行中" },
    { color: "success", label: "已完成" },
  ];
  return stArr[status] as any;
};
</script>
<style lang="scss" scoped>
.nav-message {
  display: block;
  cursor: pointer;
  .nav-message-btn {
    padding: 0 12px;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
  &:deep(.el-badge__content.is-fixed) {
    top: 18px;
    right: 20px;
  }
}
.tabs-msg-content {
  .message-list {
    margin: 0;
    padding: 0;
    li {
      list-style-type: none;
      .tab-msg-item {
        display: flex;
        position: relative;
        padding: 10px 0;
        justify-items: center;
        justify-content: center;
        border-bottom: 1px solid #f5f5f5;
        &:hover {
          background: #ecf5ff;
        }
        &.notice {
        }
        &.need-to-be {
          > .msg {
            color: #909399;
          }
        }
        .avatar {
          display: flex;
          justify-items: center;
          justify-content: center;
          margin-right: 6px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
          }
        }
        .content {
          flex: 1;
          // padding-left: 12px;
          p {
            margin: 0;
          }
          .title {
            margin-bottom: 8px;
          }
          .title ~ .msg {
            color: #909399;
            margin-bottom: 6px;
          }
          .msg {
            color: #303133;
            margin-bottom: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .aux {
            color: #c0c4cc;
            font-size: 12px;
            .date {
              display: inline-block;
              margin-right: 12px;
              vertical-align: bottom;
            }
            .sender {
              display: inline-block;
              vertical-align: bottom;
              width: 100px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
            }
          }
        }
      }
    }
  }
}
.message-footer-btn {
  display: flex;
  padding: 12px 0 0 0;
  justify-content: center;
  justify-items: center;
  > .btn {
    flex: 1;
    height: 100%;
    text-align: center;
    transition: all 0.28s ease;
    &::after {
      content: "";
      display: block;
      border-right: 1px solid #f5f5f5;
    }
    &:hover {
      color: #1890ff;
    }
  }
}
</style>
