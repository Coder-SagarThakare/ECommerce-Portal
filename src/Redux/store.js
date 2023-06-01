import { createStore } from "redux";
import rootReducer from "./Reducers/mainReducer";

console.log('in store');
const store = createStore(rootReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// console.log(store);

export default store;


 