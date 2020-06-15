import React from "react";
import { useHistory } from "react-router-dom";

import useStyles from "../styles/components/OrderListItemStyles";
import ButtonAnimated from "./buttons/ButtonAnimated";

const OrderListItem = ({ orderId, amount, receiptUrl }) => {
  // JSS Style hook
  const classes = useStyles();

  // History hook
  const history = useHistory();

  return (
    <div className={classes.OrderListStyle}>
      <p className={classes.OrderNumber}>{orderId.replace("ch_", "")}</p>
      <p className={classes.Price}>{`$ ${amount}`}</p>
      <div className={classes.BtnGroup}>
        <ButtonAnimated
          isSmall={true}
          primaryColor={"var(--color-danger)"}
          styles={{ borderRadius: "2px", padding: "0.5rem 1rem" }}
          onClick={() => window.open(receiptUrl, "_blank")}
        >
          View Receipt
        </ButtonAnimated>
        <ButtonAnimated
          isSmall={true}
          styles={{ borderRadius: "2px", padding: "0.5rem 1rem" }}
          onClick={() => history.push(`/order/${orderId}`)}
        >
          View Order
        </ButtonAnimated>
      </div>
    </div>
  );
};


export default OrderListItem;
