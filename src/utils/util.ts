
/**
 * 获取持久化数据
 * @param {*} key 
 * @returns 
 */
export function loadDataFromStorage(key: string) {
  const target = localStorage.getItem(key)
  return target ? JSON.parse(target) : null
}

/**
 * 保存持久化数据
 * @param {*} info 
 */
export function saveDataToStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))
}