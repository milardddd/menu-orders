import { useRef, useState, useEffect } from "react";
import { dishes } from "../data/dishes";
import { useNavigate } from "react-router-dom";
import classes from "./Menu.module.css";

export default function Menu({ addDish, removeDish, order }) {
  const navigate = useNavigate();
  const sectionRefs = useRef({});
  const [activeCategory, setActiveCategory] = useState(dishes[0].category);
  const [searchQuery, setSearchQuery] = useState("");

  const getDishCount = (id) => {
    const dish = order.find((item) => item.id === id);
    return dish ? dish.count : 0;
  };

  // Скрол до потрібної категорії
  const scrollToCategory = (category) => {
    sectionRefs.current[category]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveCategory(category);
  };

  // Відстежуємо активну категорію при скролі
  useEffect(() => {
    const handleScroll = () => {
      let current = activeCategory;
      for (let category of dishes) {
        const section = sectionRefs.current[category.category];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 60 && rect.bottom >= 60) {
            current = category.category;
            break;
          }
        }
      }
      setActiveCategory(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCategory]);

  // Фільтруємо категорії та страви
  const filteredDishes = dishes.map((category) => {
    const filteredItems = category.items.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, items: filteredItems };
  }).filter((category) => category.items.length > 0 || searchQuery === "");

  return (
    <>
      {/* Пошук страв */}
      <div className={classes.searchBar}>
        <input
          type="text"
          placeholder="Пошук страви..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Горизонтальне меню з категоріями */}
      {searchQuery === "" && (
        <div className={classes.categoryBar}>
          {dishes.map((category) => (
            <button
              key={category.category}
              className={`${classes.categoryBtn} ${activeCategory === category.category ? classes.active : ""}`}
              onClick={() => scrollToCategory(category.category)}
            >
              {category.category}
            </button>
          ))}
        </div>
      )}

      {/* Лендінг зі стравами */}
      <div className={classes.menuWrapper}>
        <div className={classes.dishList}>
          {filteredDishes.map((category) => (
            <div
              key={category.category}
              ref={(el) => (sectionRefs.current[category.category] = el)}
              className={classes.categorySection}
            >
              <h1 className={classes.title}>{category.category}</h1>
              {category.items.map((dish) => (
                <div key={dish.id} className={classes.dishCard}>
                  <div>
                    <h3 className={classes.dishName}>{dish.name}</h3>
                    <p className={classes.dishPrice}>{dish.price} ₴</p>
                    {dish.description && <p className={classes.dishDesc}>{dish.description}</p>}
                    {dish.weight && <p className={classes.dishWeight}>Вага: {dish.weight}</p>}
                  </div>
                  {getDishCount(dish.id) > 0 ? (
                    <div className={classes.controls}>
                      <button onClick={() => removeDish(dish.id)}>-</button>
                      <span>{getDishCount(dish.id)}</span>
                      <button onClick={() => addDish(dish)}>+</button>
                    </div>
                  ) : (
                    <button onClick={() => addDish(dish)} className={classes.addBtn}>
                      Додати
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Кнопки знизу */}
          <div className={classes.bottomBtns}>
            <button onClick={() => navigate("/TableSelection")} className={classes.backBtn}>
              Назад до столиків
            </button>
            <button onClick={() => navigate("/order")} className={classes.orderBtn}>
              Перейти до замовлення
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
