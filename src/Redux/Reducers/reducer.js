// store needs only one root reducer
// we can use lots of reducer . ekch main  reducer pahije jyachya aat sagle reducer aastil. that main reducer we pass to store
// we need only one root reducer

import getToken, { setToken } from "../../HttpService/LocalStorageService";



var initialState = 1; 
const emptyCart = [];
const cartArr = JSON.parse(getToken("cart")) || [];
const buyProductsPayload = {
  items: [],
  deliveryFee: 0,
  total: 0
};
// const [cartArr, setCartArr] = useState([])

// export const changeNumber = (state = initialState, action) => {
//   console.log("in reducer");
//   // console.log(action);

//   switch (action.type) {
//     case "INCREMENT":
//       return state + 1;
//     case "DECREMENT":
//       return state - 1;
//     default:
//       return state;
//   }
// };

export const operationOnCart = (state = cartArr, action) => {

  switch (action.type) {
    case "addToCart": {
      if (state.indexOf(action.payload) !== -1)
        return state;
      else {

        setToken("cart", JSON.stringify([...state, action.payload]));
        return [...state, action.payload];
      }

    }
    case "INCREMENT":
      const plus = state.map((item) => {
        if (item._id === action.payload._id) {
          action.payload.quantity += 1;
          item = action.payload;
          item.totalPrice = item.quantity * item.price;

          // setToken('cart',JSON.stringify([]))
        }
        return item;
      });
      return plus;

    case "DECREMENT": {
      const updatedArray = state.map((product) => {
        if (product._id === action.payload) {

          if (product.quantity !== 1) {
            product.quantity = product.quantity - 1;
            product.totalPrice -= product.price;
            console.log('in decrement reducer');
          }
        }
        // product.quantity = 1;
        return product;
      });
      return updatedArray;
    }
    case 'deleteFromCart': {

      const updatedArray = state.filter((product, index) => {
        if (product._id !== action.payload)
          return product;
      })

      setToken('cart', JSON.stringify(updatedArray))
      return updatedArray;
    }
    case 'makeCartEmpty' : {
      state = emptyCart;
      return state;
    }

    default:        // every time we need to write default state otherwise code will not run.
      return cartArr;
  }
};

export const buyProducts = (state = buyProductsPayload, action) => {

  switch (action.type) {
    case 'buyProducts': {
      state = action.payload;
      return state;
    }

    default: return state;
  }
}

export const makeCartEmpty = (state=emptyCart, action )=> {
  switch(action.type){
    
    default : return state;
  }
}


