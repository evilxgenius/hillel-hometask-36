1. Створюємо в html select#jokesCategories і ul#jokesList.
2. Робимо запит на https://api.chucknorris.io/jokes/categories. З отриманого масиву виводимо кожну категорію у вигляді option в select#jokesCategories.
3. При виборі нової категорії у select#jokesCategories:
   - Робимо запит на https://api.chucknorris.io/jokes/random?category={category} , де {category} – назва вибраної категорії в select#jokesCategories.
   - Отримавши об'єкт з жартом – рендеримо його в ul#jokesList у вигляді:
   - Після успішного отримання жарту і рендеру його на сторінці, в select#jokesCategories для option з назвою обраної категорії змінюємо значення атрибуту disabled=true. Тобто, робимо неактивною категорію, яку вже обрали.
   - При натисканні на кнопку Remove joke:
     - Видаляємо li з жартом з ul#jokesList
     - Змінюємо значення атрибуту disabled на false для option з назвою категорії жарту. Тобто, робимо активною категорію, жарт якої видалили.

```html
<li>
    <p>Category: <b>НАЗВА КАТЕГОРІЇ</b></p>
    <p>VALUE ЖАРТУ</p>
    <button>Remove joke</button>
</li>
```

4. Зберігати в localStorage нічого не потрібно.
5. Зовнішній вигляд завдання – неважливий.