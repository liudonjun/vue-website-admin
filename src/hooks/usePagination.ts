import { ref } from 'vue'

export default function usePagination(page: number, size: number) {
  const _total = ref(0)
  const _currentPage = ref(page)
  const _pageSize = ref(size)

  const handlePageSize = (e: number, fn: Function) => {
    _currentPage.value = 1
    _pageSize.value = e
    fn()
  }
  const handleCurrentPage = (e: number, fn: Function) => {
    _currentPage.value = e
    fn()
  }

  const setTotal = (total: number) => {
    _total.value = total
  }

  return {
    total: _total,
    currentPage: _currentPage,
    pageSize: _pageSize,
    setTotal,
    handlePageSize,
    handleCurrentPage,
  }
}
