import { createStore } from "redux";

// O redux nada mais é que um gerenciador de estado global. Os estados são gerenciados através da store, um conjunto de reducers que executarão as atualizações.

// createStore é uma função

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);
// store.dispatch({ type: "account/deposit", payload: 50 });

// console.log("teste");

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 10000, purpose: "Buy a car" },
// });

// Action creators: funções que retornam ações. Não é algo do Redux, mas é utilizado por convenção

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(200));

store.dispatch(requestLoan(10000, "Buy a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
