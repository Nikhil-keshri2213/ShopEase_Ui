import React from 'react';
import { Admin, fetchUtils, Resource } from 'react-admin';
import simpleRestProvider from "ra-data-simple-rest";


import ProductList from './Product/ProductList';
import EditProduct from './Product/EditProduct';
import CreateProduct from './Product/CreateProduct';

import CategoryList from './Category/CategoryList';
import CategoryEdit from './Category/CategoryEdit';

const httpClient = (url, options = {}) => {
  const token = localStorage.getItem('authToken');
  if (!options.headers) options.headers = new Headers();
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider('http://localhost:8080/api', httpClient);

export default function AdminPanel() {
  return (
    <Admin dataProvider={dataProvider} basename="/admin">
      <Resource name="products" list={ProductList} edit={EditProduct} create={CreateProduct} />
      <Resource name="category" list={CategoryList} edit={CategoryEdit} />
    </Admin>
  );
}
