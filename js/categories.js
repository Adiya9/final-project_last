const API_URL = "https://webfinalapi.mobydev.kz/categories"; // твой сервер
const API_URL1 = "https://webfinalapi.mobydev.kz"; // твой сервер

// Загрузка категорий
async function loadCategories() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка при получении категорий");
            }
            return response.json();
        })
        .then(categories => {
            const list = document.getElementById("categoryList");
            list.innerHTML = "";

            categories.forEach(category => {
                const li = document.createElement("li");
                li.className = "category_line_block";

                li.innerHTML = `
                    <p>${category.name}</p>
                    <div class="category_line">
                        <a href="./edit_category.html?id=${category.id}" class="button button--blue button--small">
                            Редактировать
                        </a>
                        <button type="button" class="button button--red button--small" onclick="deleteCategory(${category.id})">
                            Удалить
                        </button>
                    </div>
                `;

                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Ошибка загрузки категорий:", error);
            alert("Не удалось загрузить категории с сервера.");
        });
}

// Удаление категории
function deleteCategory(id) {
        const authToken = localStorage.getItem("authToken");

    if (!confirm("Вы уверены, что хотите удалить категорию?")) return;

    fetch(`${API_URL1}/category/${id}`, { method: "DELETE" ,headers: {
                'Authorization': `Bearer ${authToken}`
            }})
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка при удалении категории");
            }
            loadCategories(); // обновляем список после удаления
        })
        .catch(error => {
            console.error("Ошибка удаления:", error);
            alert("Не удалось удалить категорию.");
        });
}

// Загружаем категории при открытии страницы
document.addEventListener("DOMContentLoaded", loadCategories);

//by id
const BASE_URL = "https://webfinalapi.mobydev.kz";

function getCategoryIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function fetchAndRenderCategoriesById(id) {
     if (!id) {
        console.error('ID категории не найден в URL');
        return;
    }
    
    try{
        const response = await fetch(`${BASE_URL}/categories/${id}`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const category = await response.json();
        const ul = document.getElementById('categoryList');
        ul.innerHTML = '';

        const li = document.createElement('li');
        li.textContent = category?.name || "Название не найдено";
        li.classList.add('category-item');


        ul.appendChild(li);

        
    } catch (error) {
        console.error('Ошибка при получении категории:', error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const id = getCategoryIdFromUrl();
    if (id) fetchAndRenderCategoriesById(id);
});
function displayCreatedButton(){
    if(localStorage.getItem("authToken")){
        const createButton = document.createElement("button");
        createButton.className="button button--green";
        createButton.textContent="+";
        createButton.onclick = () => (window.location.href = "./create_category.html");
        document.querySelector('.category-grid').before(createButton);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    displayCreatedButton();
});
