import { useNavigate } from "react-router-dom";
import classes from "./Order.module.css";

export default function Order({ order, clearOrder, table }) {
  const navigate = useNavigate();
  const totalPrice = order.reduce((sum, dish) => sum + dish.price * dish.count, 0);

  return (
    <div className={classes.orderContainer}>
      <h1 className={classes.orderTitle}>Замовлення для столу {table || "не вибрано"}</h1>

      {order.length === 0 ? (
        <p className={classes.orderEmpty}>Замовлення пусте</p>
      ) : (
        <div className={classes.orderList}>
          {order.map((dish) => (
            <div key={dish.id} className={classes.orderItem}>
              <div className={classes.orderItemInfo}>
                <h3>{dish.name}</h3>
                <p>{dish.count} × {dish.price} грн</p>
              </div>
              <p className={classes.orderItemPrice}>{dish.price * dish.count} грн</p>
            </div>
          ))}
        </div>
      )}

      <div className={classes.orderTotal}>
        Всього: {totalPrice} грн
      </div>

      <div className={classes.orderButtons}>
        <button onClick={() => navigate("/menu")} className={`${classes.btn} ${classes.btnBlue}`}>
          Повернутися до меню
        </button>
        <button onClick={clearOrder} className={`${classes.btn} ${classes.btnRed}`}>
          Очистити замовлення
        </button>
      </div>
    </div>
  );
}
