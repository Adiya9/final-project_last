const BASE_URL = "https://webfinalapi.mobydev.kz";

// Получаем элементы формы
const nameInput = document.querySelector('.name-register');
const emailInput = document.querySelector('.email-register');
const passwordInput = document.querySelector('.password-register');// пароль должен содержать не менее 6 символов
const registerButton = document.querySelector('.button-register');

// Функция регистрации на сервере
async function registerUser(name, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
    const errorData = await response.json();
    console.log("Ответ сервера:", errorData); 
    throw new Error(errorData.message || 'Ошибка регистрации');
}


        const data = await response.json();
        console.log('Пользователь зарегистрирован:', data);
        alert('Регистрация прошла успешно!');
        window.location.href = './login.html'; // переход на страницу логина

    } catch (error) {
        alert(`Ошибка: ${error.message}`);
        console.error(error);
    }
}

// Обработчик клика по кнопке
registerButton.addEventListener('click', (e) => {
    e.preventDefault(); // предотвращаем отправку формы

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name || !email || !password) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    registerUser(name, email, password);
});
