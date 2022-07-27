import { createStore } from "vuex";

const store = createStore({
  state: {
    cart: {
      produk: [],
      qty: [],
    },
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
  },
  actions: {
    addToCart(item) {
      console.log(item);
      // commit("addItemToCart", item);
    },
    removeItemFromCart({ commit }, id) {
      commit("removeFromCart", id);
    },
    addQty({ commit }, id) {
      commit("addQty", id);
    },
    reduceQty({ commit }, id) {
      commit("reduceQty", id);
    },
    emptyCart({ commit }) {
      commit("emptyCart");
    },
  },
  mutations: {
    addItemToCart(state, item) {
      // const produkInCart = state.cart.find(
      //   (prod) => prod.id_produk === item.id_produk
      // );
      // if (!produkInCart) {
      //   state.cart.push({ ...item, qty: 1 });
      // } else {
      //   produkInCart.qty++;
      // }
      state.cart.produk = item.produk;
      state.cart.qty = item.qty;
    },
    addQty(state, id) {
      const produkInCart = state.cart.find((prod) => prod.id_produk === id);
      // if (produkInCart.qty < produkInCart.jumlah) {
      produkInCart.qty++;
      // }
    },
    reduceQty(state, id) {
      const produkInCart = state.cart.find((prod) => prod.id_produk === id);
      if (produkInCart.qty > 1) {
        produkInCart.qty--;
      } else {
        state.cart.splice(state.cart.indexOf(produkInCart, 1));
      }
    },
    removeFromCart(state, id) {
      state.cart = state.cart.filter((item) => item.id_produk !== id);
    },
    emptyCart(state) {
      state.cart = [];
    },
  },
});

// export const playlist = {
//   state: () => ({
//     cart: {
//       produk: [],
//       qty: "",
//     },
//   }),
//
//   actions: {
//     addItemToCart({ commit }, data) {
//       commit("addItem", data);
//     },
//   },
//
//   mutations: {
//     addData(state, datas) {
//       state.cart.produk = datas.produk;
//       state.cart.qty = datas.qty;
//     },
//   },
//
//   getters: {
//     getCart(state) {
//       return state.cart;
//     },
//   },
// };

export default store;
