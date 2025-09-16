import { useNavigate } from "react-router-dom";
import classes from "./TableSelection.module.css";

export default function TableSelection({ setSelectedTable }) {
  const navigate = useNavigate();
  const tables = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const handleSelect = (table) => {
    setSelectedTable(table);
    navigate("/menu");
  };

  return (
    <div className={classes.main}>
      <div className={classes.choiseWrapper}>
        <h1 className={classes.choise}>Оберіть столик</h1>
      </div>
      <div className={classes.tableContainer}>
        {tables.map((table) => (
          <button
            key={table}
            onClick={() => handleSelect(table)}
            className={classes.tableButton}
          >
            Столик {table}
          </button>
        ))}
      </div>
    </div>
  );
}
