<template>
  <el-aside
    class="nav"
    width="auto"
  >
    <!-- <div class="logo onlytu" @click="clickLogo"></div> -->
    <div
      class="logo tuwenfenkai"
      @click="clickLogo"
      :class="{collapse:isCollapse}"
    >
      <img src="~@/assets/logoC.png">
      <h1>LOGO图</h1>
    </div>
    <el-scrollbar>
      <el-menu
        class="myMenu"
        :unique-opened="true"
        :default-active="activeRouterPath"
        router
        :collapse="isCollapse"
      >
        <div
          v-for="item in pageTree"
          :key="item.path"
        >
          <el-sub-menu
            :index="item.path"
            v-if="item?.children?.length"
          >
            <template #title>
              <span
                class="iconfont"
                :class="item.meta.icon"
              ></span>
              {{ item.meta.title }}
            </template>
            <el-menu-item-group
              v-for="sonItem in item.children"
              :key="sonItem.path"
            >
              <el-menu-item
                :key="sonItem.path"
                :index="sonItem.path"
                @click="sonItemClickHandler(sonItem)"
              >
                <span
                  class="iconfont"
                  :class="sonItem.meta.icon"
                ></span>
                {{ sonItem.meta.title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item
            :index="item.path"
            v-else
            @click="itemClickHandler"
          >
            <span
              class="iconfont"
              :class="item.meta.icon"
            ></span>
            {{ item.meta.title }}
          </el-menu-item>
        </div>
      </el-menu>
    </el-scrollbar>
  </el-aside>

</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      // 路由树
      pageTree: store.state.system.routerTree,
      // 当前选中菜单
      activeRouterPath:
        store.state.system.subMenuRouter.path ||
        store.state.system.mainMenuRouter.path,
      // 菜单展开收缩
      isCollapse: store.state.system.isCollapse,
    });

    const clickLogo = () => {
      // 设置面包屑一级二级都为空
      store.commit("SET_MAIN_MENU_ROUTER", { path: "", title: "" });
      store.commit("SET_SUB_MENU_ROUTER", { path: "", title: "" });
      // 跳转到主页
      router.push("/");
    };

    const itemClickHandler = (item: any) => {
      // 找到当前菜单对应的路由
      const router = store.state.system.routerTree.find((it: any) => {
        return item.index === it.path;
      });
      // 设置面包屑当前一级为点击的主菜单
      store.commit("SET_MAIN_MENU_ROUTER", {
        title: router.meta.title,
        path: router.path,
      });
      // 设置面包屑二级菜单为空
      store.commit("SET_SUB_MENU_ROUTER", { path: "", title: "" });
    };

    const sonItemClickHandler = (item: any) => {
      // 获取父级菜单路由
      const router = store.state.system.routerTree.find((it1: any) => {
        return it1.children?.some((it2: any) => {
          return it2.path == item.path;
        });
      });
      // 设置面包屑当前一级为点击的菜单的父级菜单
      store.commit("SET_MAIN_MENU_ROUTER", {
        title: router.meta.title,
        path: router.path,
      });
      // 设置面包屑二级菜单为点击的二级菜单
      store.commit("SET_SUB_MENU_ROUTER", {
        title: item.meta.title,
        path: item.path,
      });
    };

    watch(
      () => store.state.system.routerTree,
      (val) => {
        state.pageTree = val;
      }
    );

    watch(
      () => store.state.system.isCollapse,
      (val) => {
        state.isCollapse = val;
      }
    );

    watch(
      () => store.state.system.mainMenuRouter,
      (val) => {
        // 如果二级菜单为空，当前选中为一级菜单
        if (store.state.system.subMenuRouter.path == "") {
          state.activeRouterPath = val.path;
        }
      },
      {
        deep: true,
      }
    );

    watch(
      () => store.state.system.subMenuRouter,
      (val) => {
        if (store.state.system.mainMenuRouter.path !== "" && val.path !== "") {
          state.activeRouterPath =
            val.path || store.state.system.mainMenuRouter.path;
        }
      },
      {
        deep: true,
      }
    );

    return {
      ...toRefs(state),
      clickLogo,
      itemClickHandler,
      sonItemClickHandler,
    };
  },
});
</script>

<style lang="scss">
.el-menu--vertical {
  width: auto;
  .el-menu {
    background-color: rgb(12, 15, 19);
    opacity: 0.8;
    .el-menu-item-group {
      .el-menu-item-group__title {
        padding: 0;
      }
      .el-menu-item {
        height: 40px;
        color: #bfbfbf;
        font-size: 14px;
        .iconfont {
          margin-right: 15px;
        }
        &:hover {
          color: #fff;
          background-color: transparent;
        }
        &.is-active {
          color: #fff;
          background-color: rgba($color: #0ae0a0, $alpha: 0.6);
        }
      }
    }
  }
}
</style>>

<style scoped lang='scss'>
.nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #28333e;
  box-shadow: 1px 0px 6px 0px rgba(0, 21, 41, 0.35);
  .logo {
    min-height: 64px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    &.tuwenfenkai {
      transition: width 0.2s ease;
      width: 200px;
      display: flex;
      align-items: center;
      img {
        width: 46px;
        height: 46px;
        margin-left: 9px;
        margin-right: 9px;
      }
      h1 {
        font-size: 20px;
        color: rgb(184, 185, 185);
      }
      &.collapse {
        width: 64px;
      }
    }
    &.onlytu {
      // 定位自己调
      background: url(~@/assets/logol.png) no-repeat 14px 50%;
    }
  }
  .el-scrollbar {
    height: 100%;
    user-select: none;
    :deep(.el-scrollbar__view) {
      height: 100%;
    }
    .el-menu {
      height: 100%;
      border-right: none;
      background-color: transparent;
      &:not(.el-menu--collapse) {
        width: 200px;
      }
      .el-sub-menu {
        &.is-opened .el-sub-menu__title {
          font-weight: 500;
        }
        :deep(.el-sub-menu__title) {
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          color: #bfbfbf;
          &:hover {
            color: #fff;
            background-color: transparent;
          }
          &.is-active {
            color: #fff;
            background-color: rgba($color: #0ae0a0, $alpha: 0.6);
          }
          .el-sub-menu__icon-arrow {
            font-size: 16px;
          }
          .iconfont {
            min-width: 24px;
            font-size: 16px;
            margin-right: 20px;
          }
        }
        :deep(.el-menu-item-group__title) {
          display: none;
        }
        :deep(.el-menu.el-menu--inline) {
          background-color: rgb(12, 15, 19);
        }
        .el-menu-item {
          color: #bfbfbf;
          height: 40px;
          line-height: 40px;
          font-size: 15px;
          &:hover {
            color: #fff;
            background-color: transparent;
          }
          &.is-active {
            color: #fff;
            background-color: rgba($color: #0ae0a0, $alpha: 0.6);
          }
        }
      }
      .el-menu-item {
        color: #bfbfbf;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        .iconfont {
          min-width: 24px;
          font-size: 16px;
          margin-right: 20px;
        }
        &:hover {
          color: #fff;
          background-color: transparent;
        }
        &.is-active {
          color: #fff;
          background-color: rgba($color: #0ae0a0, $alpha: 0.6);
        }
      }
      &.el-menu--collapse {
        // 让收缩时图标显示
        .el-sub-menu {
          :deep(.el-sub-menu__title) {
            .iconfont {
              height: 16px;
              // visibility: visible;
            }
            .el-icon {
              display: none;
            }
          }
          &.is-active {
            color: #fff;
            background-color: rgba($color: #0ae0a0, $alpha: 0.6);
          }
        }
      }
    }
  }
}
</style>