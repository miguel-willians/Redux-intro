import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store) => store.customer.fullName); //O useSelector possibilita o consumo do estado da store

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
