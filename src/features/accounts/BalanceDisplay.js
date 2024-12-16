import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// export default BalanceDisplay;

// A forma antiga de conectar componentes com o Redux era através do uso da connect API:

function mapToStateProps(state) {
  return {
    balance: state.account.balance,
  };
}

export default connect(mapToStateProps)(BalanceDisplay);
