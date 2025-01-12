import { useState } from "react";
import sushiImage from "../../assets/images/menu/sushi.jpg";
import sezarImage from "../../assets/images/menu/salat_cezar.jpg";
import supImage from "../../assets/images/menu/sup_tomat.jpg";
import shashlukImage from "../../assets/images/menu/shashluk.jpg";
import PaymentMethod from "../PaymentMethod/PaymentMethod";


const menuObj = [
    { name: "суши", price: 500, image: sushiImage },
    { name: "Цезарь", price: 350, image: sezarImage },
    { name: "Суп Томатный", price: 200, image: supImage },
    { name: "Шашлык", price: 700, image: shashlukImage },
];

type Menus = {
    name: string;
    price: number;
    quantity: number;
}

type Users = {
    names: string;
    phones: string;
    addres: string
}

const Menu = ({ names, phones, addres }: Users) => {
    const [menu, setMenu] = useState<Menus[]>([])

    let allPrice: number = 0;
    menu.forEach((prices) => {
        allPrice += prices.price * prices.quantity;
    })

    const addToMenu = (name: string, price: number, quantity: number) => {
        const newMenu = [...menu];
        newMenu.push({ name, price, quantity });
        setMenu(newMenu)
        console.log(menu)
    }
    return (
        <>
            <section id="menu-items" className="menu-section">
                {menuObj.map((dish, index) => (
                    <div key={index} className="menu-item">
                        <img src={dish.image} alt={dish.name} />
                        <div className="menu-item-details">
                            <h3>{dish.name}</h3>
                            <p>Цена: {dish.price} сом</p>
                            <input type="number" id={`quantity${index}`} defaultValue="1" min="1" />
                            <button onClick={() => {
                                const quantity = document.getElementById(`quantity${index}`) as HTMLInputElement;
                                addToMenu(dish.name, dish.price, parseInt(quantity.value, 10))
                            }}>Добавить в заказ</button>
                        </div>
                    </div>
                ))}
            </section>
            <section id="order-summary" className="order-summary">
                <h2>Ваш заказ</h2>
                <ul id="order-list">
                    {menu.map((item, index) => (
                        <>
                            <li key={index}>
                                {item.name}: {item.quantity} - {item.price * item.quantity} сом
                            </li>
                            <hr />
                        </>
                    ))}
                </ul>
                <p>Итоговая сумма: <span id="total-price">{allPrice}</span>сом</p>
            </section>
            <PaymentMethod allPrices={allPrice} userName={names} userNumber={phones} userAddres={addres} wholeOrder={menu} />
        </>
    )
}

export default Menu;