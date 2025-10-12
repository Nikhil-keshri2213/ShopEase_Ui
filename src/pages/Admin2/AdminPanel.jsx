import React, { useState } from 'react';
import ProductPanel from './Products/ProductPanel';
import CategoryPanel from './Category/CategoryPanel';
import OrderPanel from './Orders/OrderPanel';
import PaymentPanel from './Payments/PaymentPanel';

const AdminPanel = () => {
  const [activePanel, setActivePanel] = useState('Products');

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="text-white bg-white w-64 p-6 space-y-4 border-black/50 border rounded-lg">
        <div className="text-3xl font-semibold mb-6 bg-white text-black w-full text-center">
          <h2>Shop<span className="text-white bg-black">E</span>ase</h2>
          <p className='text-sm'>Management Portal</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setActivePanel('Products')}
            className="w-full p-2 text-center bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-200">
            Products
          </button>
          
          <button
            onClick={() => setActivePanel('Category')}
            className="w-full p-2 text-center bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-200">
            Categories
          </button>
          
          <button
            onClick={() => setActivePanel('Orders')}
            className="w-full p-2 text-center bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-200">
            Orders
          </button>

          <button
            onClick={() => setActivePanel('Payments')}
            className="w-full p-2 text-center bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-200">
            Payments
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-2">
        <div className="bg-black rounded-lg p-4 shadow-lg mb-4">
          <h2 className="text-2xl font-semibold text-center text-white font-sans">Administration Portal</h2>
        </div>
        {/* Conditional Rendering for Active Panels */}
        <div className="space-y-6 border border-black/50 rounded-lg">
          {activePanel === 'Products' && <ProductPanel />}
          {activePanel === 'Category' && <CategoryPanel />}
          {activePanel === 'Orders' && <OrderPanel />}
          {activePanel === 'Payments' && <PaymentPanel />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
