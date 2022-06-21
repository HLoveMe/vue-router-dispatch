<template>
  <div>
    page: Home
    <div class="container">
      {{info}}:{{ count }}
      <br />
      <div class="button" @click="addCount">Dispatch</div>
      <br />
      <div class="button" @click="goSetting">goSetting</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AsyncEvent, useRoutePin, dispatchEvent } from 'vue-router-dispatch';
const { push } = useRouter();
const count = ref(0);
const info = ref('局部派发');
const { on, dispatch } = useRoutePin();
on('add', (arg: AsyncEvent) => {
  const { data } = arg;
  count.value = data.count;
  info.value = data.info || "11111";
});
const addCount = () => {
  dispatch('add', { count: count.value + 1 ,info:"局部派发" });
};
const goSetting = () => push('setting');
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
