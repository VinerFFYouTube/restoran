import { useState } from "react";

type Prices = {
    allPrices: number;
    userName: string;
    userNumber: string;
    userAddres: string;
    wholeOrder: Array<{ name: string; price: number; quantity: number }>;
}

const PaymentMethod = ({ allPrices, userName, userNumber, userAddres, wholeOrder }: Prices) => {
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [cashOrCart, setCashOrCart] = useState<boolean | undefined>(undefined);
    const [change, setChange] = useState<string>('');

    const togglePaymentForm = (typePay: string) => {
        if (typePay === 'cash') {
            setPaymentMethod('cash')
        } else {
            setPaymentMethod('card')
        }
    }

    const priceCounter = (inputCash: number) => {
        const parseInputCash = +inputCash;
        if (parseInputCash < allPrices) {
            setCashOrCart(false)
            setChange('ваша сумма не соотвествует сумме заказа');
        } else if (parseInputCash > allPrices) {
            setCashOrCart(true);
            setChange(`ваша сдача: ${inputCash - allPrices}`);
        }
    }

    const handleSetOrder = () => {
        if (userName && userNumber && userAddres) {
            let allMessages = `Заказ от ${userName}:\n`

            wholeOrder.forEach(item => {
                allMessages += `${item.name} x ${item.quantity} = ${item.price * item.quantity} сом\n`
            });

            allMessages += `\nИтоговая сумма: ${allPrices}\n`;

            allMessages += `Способ оплаты: ${paymentMethod === 'cash' ? 'наличные' : 'картой'} \n`;

            if (paymentMethod === 'cash' && cashOrCart && wholeOrder !== null) {
                allMessages += `${change} сом\n`
            }

            allMessages += `\nКонтактные данные\n`
            allMessages += `Имя: ${userName}\n`
            allMessages += `Номер телефона: ${userNumber}\n`
            allMessages += `Адрес доставки: ${userAddres}\n`

            const numberCafe = '996999577020';
            const whatsappUrl = `https://wa.me/${numberCafe}?text=${encodeURIComponent(allMessages)}`;
            window.open(whatsappUrl, "_blank");
        } else {
            alert('пожалуйста заполните все данные')
        }

    }
    return (
        <>
            <section id="payment-method" className="payment-method">
                <h2>Выберите способ оплаты</h2>
                <label>
                    <input id="cash" type="radio" name="payment" value="cash" onClick={() => togglePaymentForm('cash')} />
                    <label htmlFor="cash">наличные</label>
                </label>
                <label>
                    <input id="cart" type="radio" name="payment" value="card" onClick={() => togglePaymentForm('card')} />
                    <label htmlFor="cart">карта</label>
                </label>
            </section>

            {paymentMethod === 'cash' && (
                <section id="cash-payment">
                    <h2>Введите сумму, на которую нужно дать сдачи</h2>
                    <input
                        type="number"
                        id="cash-amount"
                        placeholder="Сумма сдачи"
                        onChange={(e) => priceCounter(parseFloat(e.target.value))}
                    />
                    <p id="change-info">{change}</p>
                </section>
            )}

            <section id="submit-order">
                <button id="send-whatsapp" onClick={handleSetOrder}>Отправить заказ</button>
            </section>
        </>
    )
}

export default PaymentMethod;