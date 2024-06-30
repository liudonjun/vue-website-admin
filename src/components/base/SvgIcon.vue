<template>
  <svg :class="svgClass" aria-hidden="true" @click="handleClick">
    <use :href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { defineProps, computed, type PropType, defineEmits } from 'vue';

// 定义props
const props = defineProps({
  icon: {
    type: String as PropType<string>,
    required: true,
  },
  svgClass: {
    type: String as PropType<string>,
    default: '',
  },
});

// 定义emits
const emits = defineEmits<{
  (event: 'click'): void
}>();

// 计算属性
const iconName = computed(() => `#icon-${props.icon}`);

// 方法
const handleClick = (_: MouseEvent) => {
  emits('click');
};
</script>