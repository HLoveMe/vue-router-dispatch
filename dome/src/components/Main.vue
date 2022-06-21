<template>
  <div class="container">
    {{ count }}
    <br />
    <div class="button" @click="addCount">Dispatch</div>
    <br />
    <div class="button" @click="addGlobalCount">Dispatch Global</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AsyncEvent, useRoutePin,dispatchEvent } from 'vue-router-dispatch';
const count = ref(0);
const { on, dispatch } = useRoutePin();
on('add', (arg: AsyncEvent) => {
  const { data } = arg;
  count.value = data.count;
});
const addCount = () => {
  dispatch('add', { count: count.value + 1 });
};

const addGlobalCount = ()=>{
  debugger
  dispatchEvent('add', { count: count.value + 1 });
}
</script>

<style scoped>
.container{
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
