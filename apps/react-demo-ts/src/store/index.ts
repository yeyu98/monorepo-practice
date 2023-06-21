import { create } from "zustand"
import { persist, devtools, createJSONStorage } from "zustand/middleware"
// 深层嵌套需要使用immer
// 异步状态更新
// 类型定义
// 内置中间件 persist devtools
interface CountState {
  count: number,
  addCount: () => void,
  removeAllCount: () => void,
  asyncAddCount: () => void
}

const p = () => new Promise<number>((resolve) => {
     setTimeout(() => {
        resolve(666)
      }, 5000);
})

const useStore = create<CountState>()(devtools(
  persist(set => ({
    count: 0,
    addCount: () => set((state: any) => ({count: state.count + 1})),
    removeAllCount: () => set({ count: 0 }),
    asyncAddCount: async() => {
      const result = await p()
      return set({count: result})
    }
  }), {
    name: 'countStorage',
    storage: createJSONStorage(() => sessionStorage)
  })
))

export default useStore