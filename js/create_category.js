const authToken = localStorage.getItem("authToken");

const headerAuth = document.querySelector(".header__auth");
if (authToken) {
    headerAuth.innerHTML = `<button class="button button--red margin-edit" onclick="logout()">Выйти</button>`
}

document.querySelector(".add1").addEventListener('click', async (event) => {
    event.preventDefault();

    const name = document.querySelector('.name-input').value.trim();

    if (!name){
        alert('Пожалуйста, заполните все поля');
        return;
    }
    try{
        const response = await fetch('https://webfinalapi.mobydev.kz/category', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                 'Accept': 'application/json'},
            body: JSON.stringify({name})
        });

        if (response.ok) {
            alert("Категория успешно добавлена")
            window.location.href='./categories.html';
        }else{
            alert("Ошибка при добавлении категории");
        }
    }catch (error){
        console.error('Ошибка', error);
    }
});