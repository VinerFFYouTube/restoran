import { useState } from "react";
import Menu from "../Menu/Menu";


const OrderDetails = () => {
    const [inputName, setName] = useState('')
    const [inputPhone, setPhone] = useState('')
    const [inputAddress, setAddress] = useState('')
    return (
        <>
            <header>
                <h1>Заказ из кафе "Вкусный уголок"</h1>
            </header>

            <section id="contact-info" className="form-section">
                <h2>Ваши контактные данные</h2>
                <input type="text" id="first-name" placeholder="Ваше имя" required onChange={(e) => setName(e.target.value)} />
                <input type="tel" id="phone" placeholder="Ваш номер телефона" required onChange={(e) => setPhone(e.target.value)} />
                <input type="text" id="address" placeholder="Ваш адрес для доставки" required onChange={(e) => setAddress(e.target.value)} />
            </section>
            <Menu names={inputName} phones={inputPhone} addres={inputAddress} />
        </>
    )
}

export default OrderDetails;