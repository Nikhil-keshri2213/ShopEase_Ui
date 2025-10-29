import React from 'react';
import { Edit, SimpleForm, TextInput, SelectInput, DateField } from 'react-admin';

const OrderEdit = () => (
  <Edit title="Edit Order Status">
    <SimpleForm>
      <TextInput source="id" label="Order ID" disabled />
      <DateField source="orderDate" label="Order Date" />
      <SelectInput
        source="orderStatus"
        label="Order Status"
        choices={[
          { id: 'PENDING', name: 'Pending' },
          { id: 'IN_PROGRESS', name: 'In Progress' },
          { id: 'SHIPPED', name: 'Shipped' },
          { id: 'DELIVERED', name: 'Delivered' },
          { id: 'CANCELLED', name: 'Cancelled' },
        ]}
      />
      <TextInput source="paymentMethod" label="Payment Method" disabled />
      <TextInput source="totalAmount" label="Total Amount" disabled />
    </SimpleForm>
  </Edit>
);

export default OrderEdit;
