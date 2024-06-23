import { computed, ref } from 'vue'

export default function useFilterSearch(form: any) {
  const showFilter = ref<boolean>(true)

  //有值的数量
  const selectNum = computed(() => {
    return countNonNullValues(form)
  })

  // 切换状态
  const toggle = () => {
    showFilter.value = !showFilter.value
  }

  // 删除单个标签
  const closeTag = (key: string, fn: Function) => {
    form[key] = undefined
    fn && fn()
    if (!selectNum.value) {
      showFilter.value = true
    }
  }

  // 清空筛选
  const clearAll = (fn: Function) => {
    const keys = Object.keys(form)
    keys.forEach((key) => {
      form[key] = undefined
    })
    fn && fn()
    showFilter.value = true
  }

  /**
   * 筛选条件有值的个数
   * @param obj
   * @returns
   */
  function countNonNullValues(obj: any) {
    const values = Object.values(obj)
    const nonNullNonEmptyCount = values.reduce((count: any, value: any) => {
      if (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        return count + 1
      } else {
        return count
      }
    }, 0)
    return nonNullNonEmptyCount
  }

  return {
    showFilter,
    selectNum,
    toggle,
    closeTag,
    clearAll,
  }
}
