// Criando o account slice usando o RTK:

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      //Por padrão os action creator só aceita um único argumento. Para aceitar mais, há necessidade de preparar os argumentos:
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //Ao retornar uma função o Redux imediatamente vai saber que a função é o Thunk e ela será executada antes de dispachar a ação para a store
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    // chamada da API:
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${currency}&symbols=USD`
    );

    const data = await res.json();
    const converted = data.rates.USD;

    //dispacho da ação:
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;
