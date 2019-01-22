<template>
	<div class="nodata" >
		<img src="../assets/images/nodata.png">
		<span>抱歉，暂无数据</span>
	</div>
</template>

<script>
export default {
  replace: true
};
</script>
<style  lang="less" scoped>
.nodata {
  font-size: 0.32rem;
  text-align: center;
  padding-top: 2rem;
  img {
    width: 2.4rem;
    margin: 0 auto;
    display: block;
  }
  span {
    display: block;
    margin-top: 0.4rem;
    color: #999;
    font-size: 0.3rem;
  }
}
</style>