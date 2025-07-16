// MealMenu.js (for Student)
import React, { useState } from "react";

const MealMenu = () => {
  const [menu, setMenu] = useState({
    Monday: "Chole Bhature, Rice, Salad",
    Tuesday: "Aloo Paratha, Dal, Curd",
    Wednesday: "Rajma, Rice, Papad",
    Thursday: "Poori Sabzi, Halwa",
    Friday: "Paneer, Roti, Salad",
    Saturday: "Veg Biryani, Raita",
    Sunday: "Pav Bhaji, Ice Cream"
  });

  return (
    <div className="container">
      <h3>🍽️ Weekly Meal Menu</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Day</th>
            <th>Menu</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(menu).map(([day, item]) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealMenu;
