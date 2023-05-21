import { create } from 'zustand'

interface NumberListState {
  numbers: number[];
  secret: string;
  history: string[];
  tryCount: number;
  createNumberList: (count: number) => void;
  updateNumber: (index: number, value: number) => void;
  addHistory: (line: string) => void;
  reset: () => void;
}

const useNumberListStore = create<NumberListState>((set) => ({
  numbers: [],
  secret: '',
  history: [],
  tryCount: 1,
  createNumberList: (count) => {
    let secret = '';
    for(let i = 0; i < count; i++) {
      const randomN = Number(Math.random().toFixed(1).toString().split('.')[1])
      if(i === 0 && randomN === 0) {
        secret+=randomN + 1
      } else {
        secret+=randomN
      }
    }
    return set({ secret, numbers: new Array(count).fill(0) })
  },
  updateNumber: (index, value) => set((state) => {
    const newNumbers = [...state.numbers]
    newNumbers[index] = value

    return { numbers: newNumbers }
  }),
  addHistory: (line) => set((state) => {
    return { history: [...state.history, line], tryCount: state.tryCount + 1 }
  }),
  reset: () => set({
    numbers: [],
    secret: '',
    history: [],
    tryCount: 1,
  })
}))

export default useNumberListStore;
