import { applyMiddleware, combineReducers, createStore } from "redux";

// Redux thunk: Permite a utilização de ações assíncronas atualizando o estado antes do dispatch chegar na store.
import { thunk } from "redux-thunk";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// As ações assíncronas ocorrem no Middleware:
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
