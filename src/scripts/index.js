const API_URL = 'https://api.studiodivo.ru/';

const eventTypes = {
    ORDER: 'order'
};

const StudioDivo = {
    init() {
        this.listenersButton();
    },

    listenersButton() {
        let sendOrderButton = document.querySelector('.order__button'),
            scrollOrderButtons = document.querySelectorAll('.order-form');

        sendOrderButton.addEventListener('click', () => this.checkForm());
        scrollOrderButtons.forEach(item => {
            item.addEventListener('click', () => window.scrollTo(0, document.body.scrollHeight));
        });
    },

    checkForm() {
        let name = document.querySelector('.order__input_name').value,
            phone = document.querySelector('.order__input_phone').value;

        if (name.length >= 1 && phone.length >= 1) {
            this.sendOrder(name, phone);
        }
    },

    sendOrder(name, phone) {
        fetch(`${API_URL}${eventTypes.ORDER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                phone
            })
        }).then((response) => response.json()).then(({id}) => {
            alert(`Ваша заявка #${id} успешно принята. Мы скоро с вами свяжемся!`);
        }).catch((error) => {
            console.warn('Кажется произошла ошибка', error);
        });
    }
};

StudioDivo.init();