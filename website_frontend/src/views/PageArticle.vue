<template>
  <div class="cont">
    <div class="leave-message">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="list-block"
        @click="toArticle(item.id)"
      >
        <span>{{ item.title }}</span>
        <span>{{ item.time }}</span>
      </div>
    </div>
    <div class="paginationStyle">
      <el-pagination
        background
        :current-page="page"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getArticle } from '@/api/article';
import { useRoute,useRouter } from 'vue-router';
export default {
  name: 'PageArticle',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const newsId = ref(null);

    const list = ref([]);
    const page = ref(1);
    const pageSize = ref(10);
    const total = ref(0);

    // 切换当前页事件
    const handleCurrentChange = (val) => {
      page.value = val;
      getArticlePage();
    };

    const toArticle = (id) => {
      router.push({path: '/article', query: {id: id}});
    }

    // 获取文章
    const getArticlePage = async () => {
      const data = await getArticle({newsId: newsId.value, page: page.value, pageSize: pageSize.value });
      if (data.code == '0') {
        list.value = data.data.list;
        total.value = data.total;
      } else {
        list.value = [];
      }
    }

    onMounted(() => {
      newsId.value = route.query.newsId;
      getArticlePage();
    })

    return {
      list,
      page,
      pageSize,
      total,
      handleCurrentChange,
      toArticle,
    }
  },
}
</script>

<style lang="scss" scoped>
.cont {
  --el-color-primary: red;
  .leave-message {
    width: 800px;
    height: 400px;
    padding: 20px;
    text-align: center;
    margin: 10px auto;
    border: 1px solid #c9c7c7;
    border-radius: 5px;
    box-sizing: border-box;
    .list-block {
      width: 100%;
      height: 35px;
      display: flex;
      border-bottom: 1px solid #c9c7c7;
      padding: 5px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: rgba($color: #b9b1b1, $alpha: 0.1);
      }
      span:nth-child(1) {
        font-size: 15px;
        color: #111111;
        font-weight: 500;
      }
      span:nth-child(2) {
        font-size: 14px;
        color: #9ea3bb;
      }
    }
  }

  .paginationStyle {
    display: flex;
    justify-content: center;
  }
}
</style>