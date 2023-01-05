<template>
  <div class="home-container">
    <h2 :class="[{ orange: flag }, 'rest-class']">ABOUNT VUE API</h2>
    <h3 class="rest-class">计数器：{{ count }}</h3>
    <button @click="addOne">click to add 1</button>
    <div ref="dragBoxDom" class="draggable-card" :style="dragStyle">
      drag me!
    </div>
    <button class="theme-btn" @click="toggleDark()">☀ 🆚 🌙</button>
    <button class="theme-btn" @click="changeShallowRef">
      change shallowRef
    </button>
    <button class="theme-btn" @click="changeFavicon">
      toggle favicon 👆👆👆
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, shallowRef, triggerRef } from "vue";
import {
  useThrottleFn,
  useDraggable,
  useWindowScroll,
  useDark,
  useToggle,
  useFavicon,
} from "@vueuse/core";

const count = ref(0);
const flag = computed(() => count.value % 2 == 0);
const dragBoxDom = ref(null);
const filterGrayscale = ref(0);

/**
 *  // shallowRef: only the .value access is reactive
 * // use triggerRef to trigger the shallowRef reactive forcely
 *
 * // shallowReactive: only the root properties are reactive
 * // const aaa = shallowReactive({ count: 0, obj: { num: 0 } })
 * // aaa.count++ ✔     aaa.obj.num++ ❌
 *
 *
 * // toRaw(): 返回响应式处理前proxy代理的原生对象
 * //【 return the original object from proxies created by [reactive. readonly. shallowReactive. shallowReadonly]】
 *
 * // markRaw(): make the object noable to reactive
 * // such as:   const abc = markRaw({});  isReactive(reactive(abc))---false;
 */
const shallowRefObj = shallowRef({ num: 0 });

const changeShallowRef = () => {
  shallowRefObj.value.num += 1;
  triggerRef(shallowRefObj);
};
watchEffect(() => {
  console.log("vue-reactivity_shallowRef...", shallowRefObj.value.num);
});

const addOne = useThrottleFn(() => {
  count.value++;
}, 200);

// drag
const {
  x,
  y,
  style: dragStyle,
} = useDraggable(dragBoxDom, {
  initialValue: {
    x: parseInt(Math.random() * 300),
    y: parseInt(Math.random() * 300),
  },
});

const aaa = useWindowScroll();
console.dir(aaa); // x, y

const isDark = useDark({
  onChanged(dark) {
    filterGrayscale.value = dark ? 0.6 : 0;
  },
});
const toggleDark = useToggle(isDark);

watchEffect(() => {
  console.log("vue-reactivity_watchEffect...", count.value);
});

const type = ref("vite");
const favicon = computed(() => (type.value === "vue" ? "vue.ico" : "vite.svg"));
useFavicon(favicon, {
  baseUrl: "/",
  rel: "icon",
});
const changeFavicon = () => {
  type.value = type.value === "vite" ? "vue" : "vite";
};
</script>

<style scoped>
.home-container {
  filter: grayscale(v-bind(filterGrayscale));
}
.orange {
  color: orange;
  transition: color 0.1s ease-in;
}
.rest-class {
  margin: 0;
  margin-right: 20px;
  padding: 0;
  display: inline-block;
}
.draggable-card {
  position: fixed;
  display: inline-block;
  text-align: center;
  padding: 20px;
  background-image: linear-gradient(
    to right bottom,
    rgb(64, 4, 96),
    rgb(234, 13, 182)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 20px;
  font-weight: 600;
  border-radius: 10px;
  border: 2px solid rgb(0, 255, 119);
  border-right-color: rgb(155, 63, 241);
  border-bottom-color: rgb(155, 63, 241);
  /* filter: brightness(10px); */
  user-select: none;
  cursor: pointer;
}
.theme-btn {
  margin-left: 20px;
}
</style>