import { onMounted, onUnmounted } from "vue"

export function useResize(fn: { (): void; (this: Window, ev: UIEvent): any; (this: Window, ev: UIEvent): any }) {

  onMounted(() => {
    window.addEventListener('resize', fn)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', fn)
  })
}