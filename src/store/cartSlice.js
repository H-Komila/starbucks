import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],      // Savatdagi mahsulotlar
  favorites: [],  // Sevimli mahsulotlar ID-lari
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. Savatga qo'shish yoki miqdorni oshirish
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // 2. Miqdorni kamaytirish (Xatolikni tuzatuvchi qism)
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // 3. Savatdan butunlay o'chirish (Xatolikni tuzatuvchi qism)
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // 4. Sevimlilarga qo'shish/o'chirish
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
  },
});

// BU YER JUDA MUHIM: Har bir yangi funksiyani export qilish shart!
export const { 
  addToCart, 
  decrementQuantity, 
  removeFromCart, 
  toggleFavorite 
} = cartSlice.actions;

export default cartSlice.reducer;