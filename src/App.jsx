import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import TableSelection from "./pages/TableSelection";

export default function App() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [orders, setOrders] = useState({});

  const currentOrder = orders[selectedTable] || [];

  const addDish = (dish) => {
    setOrders((prev) => {
      const tableOrder = prev[selectedTable] || [];
      const existing = tableOrder.find((item) => item.id === dish.id);
      let updatedOrder;

      if (existing) {
        updatedOrder = tableOrder.map((item) =>
          item.id === dish.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        updatedOrder = [...tableOrder, { ...dish, count: 1 }];
      }

      return { ...prev, [selectedTable]: updatedOrder };
    });
  };

  const removeDish = (id) => {
    setOrders((prev) => {
      const tableOrder = prev[selectedTable] || [];
      const updatedOrder = tableOrder
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0);

      return { ...prev, [selectedTable]: updatedOrder };
    });
  };


  const clearOrder = () => {
    setOrders((prev) => ({ ...prev, [selectedTable]: [] }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/TableSelection" />} />
        
        <Route
          path="/TableSelection"
          element={<TableSelection setSelectedTable={setSelectedTable} />}
        />
        <Route
          path="/menu"
          element={
            <Menu addDish={addDish} removeDish={removeDish} order={currentOrder} />
          }
        />
        <Route
          path="/order"
          element={
            <Order order={currentOrder} clearOrder={clearOrder} table={selectedTable} />
          }
        />
      </Routes>
    </Router>
  );
}
