import { create } from "zustand"

const useStore = create((set) => ({
  tempOrder: [],
  addToTempOrder: (items) => set((state) => ({ tempOrder: [...state.tempOrder, items] })),
  setInitialTempOrder: (order) => set(() => ({ tempOrder: order })),
  deleteFromTempOrder:(id) => set((state) => ({ tempOrder: state.tempOrder.filter((el)=> el.id !== id) })),
  updateTempOrder:(id, count) => set((state) => ({ tempOrder: state.tempOrder.map((el)=> {
    if(el.id === id){
      el.quantity =+ count;
    } 
    return el
  }) })),
  wishList: [],
  addToWishList: (items) => set((state) => ({ wishList: [...state.wishList, items] })),
  setInitialWishList: (list) => set(() => ({ wishList: list })),
  deleteFromWishList:(id) => set((state) => ({ wishList: state.wishList.filter((el)=> el.product_id !== id)  })),
}))

export default useStore
