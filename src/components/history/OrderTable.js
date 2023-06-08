import styled from "@emotion/styled";
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { toDate } from "../../utils/helpers";

const Wrapper = styled.div`
  border-bottom: 1.5px solid black;
  padding: 15px 35px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .chevronUp div {
    transform: rotate(90deg);
  }

  .chevronDown div {
    transform: rotate(-90deg);
  }
`;

const OrderTable = ({ orders }) => {
  const { isAdmin, shops } = useContext(GlobalContext);
  const [expandedId, setExpandedId] = useState([]);

  if (!orders) {
    return null;
  }

  if (!orders.length) {
    return <h2>Not found</h2>;
  }

  const tableRowClickHandler = (id) => {
    if (expandedId.findIndex((item) => item === id) === -1) {
      setExpandedId((prev) => [...prev, id]);
    } else {
      setExpandedId((prev) => prev.filter((item) => item !== id));
    }
  };

  const findShopName = (shopId) => {
    const shop = shops.find(({ id }) => id === shopId);
    if (shop) {
      return shop.name;
    }
    return "Not found";
  };

  const parseItems = (items) => JSON.parse(items || []);

  return (
    <Wrapper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Shop</TableCell>
            <TableCell>Date</TableCell>
            {isAdmin && (
              <>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
              </>
            )}
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order, index) => (
            <React.Fragment key={order.id}>
              <TableRow
                hover
                style={{ cursor: "pointer" }}
                onClick={() => tableRowClickHandler(order.id)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{findShopName(order.shopId)}</TableCell>
                <TableCell>{toDate(order.createdAt)}</TableCell>
                {isAdmin && (
                  <>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell>{order.userEmail}</TableCell>
                    <TableCell>{order.address}</TableCell>
                  </>
                )}
                <TableCell>{order.price}</TableCell>
              </TableRow>
              <TableCell
                style={{
                  paddingBottom: 0,
                  paddingTop: 0,
                  borderWidth: expandedId.includes(order.id) ? 0.3 : 0,
                }}
                colSpan={5}
              >
                <Collapse
                  in={expandedId.includes(order.id)}
                  timeout="auto"
                  unmountOnExit
                >
                  <Table>
                    <TableHead>
                      <TableRow style={{ background: "#fcfcfc" }}>
                        <TableCell>Number</TableCell>
                        <TableCell>Food</TableCell>
                        <TableCell>Count</TableCell>
                        <TableCell>Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {parseItems(order.items)?.map((item, i) => (
                        <TableRow
                          key={item.id}
                          style={{ background: "#fcfcfc" }}
                        >
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.count}</TableCell>
                          <TableCell>{item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Collapse>
              </TableCell>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
};

export default OrderTable;
