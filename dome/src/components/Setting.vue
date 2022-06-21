<template>
  <div class="container">
    <div>page: Setting</div>
    <br />
    <div class="button" @click="addGlobalCount">setting count === 1000</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { dispatchEvent } from 'vue-router-dispatch';
const { back } = useRouter();
const addGlobalCount = () => {
  dispatchEvent('add', { count: 1000 ,info:'全局派发' });
  back();
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button {
  border: 1px solid blue;
  padding: 10px;
}
</style>
