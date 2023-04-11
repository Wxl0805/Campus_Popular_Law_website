<template>
  <div class="cont">
    <div class="paper-texture">
      <div class="title-header">
        <span class="title">第七届全国学生“学宪法 讲宪法”活动全国总决赛知识竞赛获奖名单</span>
        <div class="title-block">
          <span>作者：伍禧龙</span>
          <span>发布时间：2022-05-01 17:00:01</span>
        </div>
      </div>
      <div class="article-cont">
        <text>11月30日，来自全国31个省（自治区、直辖市）、新疆生产建设兵团以及澳门特别行政区的33支代表队参加了第七届全国学生“学宪法 讲宪法”活动全国总决赛知识竞赛（以下简称“知识竞赛”）。来自宪法与行政法学、教育学等领域的专家在北京主赛场参加了知识竞赛主观题部分的评审。
          本届知识竞赛采用全部线上答题的比赛方式，题目分为客观题和主观题两种类型。主要考察党的二十大精神、习近平法治思想、宪法、民法典、教育法律、中华民族共同体意识、国家安全、未成年人保护、劳动教育、诚实守信、规则意识等内容。
          各代表队由小学生、初中生、高中生、大学生各一人组成。选手们在分赛场中沉着冷静地回答客观题，条理清晰地分析主观题，从容不迫地完成了答卷。他们优异的表现体现了当代青少年对宪法知识的熟练掌握和对法治精神的深刻理解。
          本次知识竞赛决出了团体冠军、团体亚军、团体季军，以及团体一等奖、团体二等奖和团体三等奖。部分获奖代表队名单如下：
          至此，为期四天的第七届全国学生“学宪法 讲宪法”活动全国总决赛圆满落幕。
        </text>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  setup() {
    

    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.cont{
  width: 100%;
  padding: 20px 0;
  // background: rgba($color: #dcdbdb, $alpha: 0.5);
  display: flex;
  justify-content: center;
  font-size: 16px;
  .paper-texture {
    position: relative;
    overflow: hidden;
    width: 800px;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title-header{
      width: 100%;
      min-height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid #b4b4b8;
      .title{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
      }
      .title-block{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        font-size: 15px;
        color: #737376;
        margin-bottom: 20px;
      }
    }
    .article-cont {
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
      font-size: 15px;
    }
  }

  .paper-texture::before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
  }

}
</style>