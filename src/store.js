//Essa é a maneira mais atualizada de se criar uma store

// O configureStore altomaticamente configura o devtools e o middleware, além de combinar os reducers
import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
