import { useState } from "react";
import styled from "@emotion/styled";

import HistoryForm from "../../components/history/HistoryForm";
import { getOrdersAPI } from "../../api/api";
import OrderTable from "../../components/history/OrderTable";

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  .tables {
    width: 100%;
    height: 100%;
    overflow: auto;
    border: 1.5px solid black;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 20px 0;
  }
`;

const History = () => {
  const [valueForm, setValueForm] = useState({ email: "", phone: "" });
  const [orders, setOrders] = useState(null);

  const getOrders = async () => {
    try {
      const { data } = await getOrdersAPI({ ...valueForm });
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <HistoryWrapper>
      <HistoryForm
        value={valueForm}
        setValue={setValueForm}
        onSubmitHandler={getOrders}
      />
      <OrderTable orders={orders} />
    </HistoryWrapper>
  );
};

export default History;
