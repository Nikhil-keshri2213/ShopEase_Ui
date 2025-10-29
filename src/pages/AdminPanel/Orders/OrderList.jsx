import React from 'react';
import { Datagrid, List, TextField, DateField, NumberField, EditButton } from 'react-admin';

const OrderList = () => (
  <List>
    <Datagrid>
      <TextField source="id" label="Order ID" />
      <DateField source="orderDate" label="Order Date" />
      <TextField source="orderStatus" label="Status" />
      <TextField source="paymentMethod" label="Payment Method" />
      <NumberField source="totalAmount" label="Total Amount" />
      <EditButton />
    </Datagrid>
  </List>
);

export default OrderList;
