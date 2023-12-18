const mainRoute = 'https://api.chucknorris.io/jokes';
const selectBlock = document.querySelector('#jokesCategories');
const ulBlock = document.querySelector('#jokesList');

function requestForkPromise(r) {
    return r.ok ? r.json() : Promise.reject(Error(`Status ${r.status}: ${r.statusText || 'Empty'}`));
}

function changeDisabledOption(optionValue, disabledValue) {
    selectBlock.querySelector(`option[value='${optionValue}']`)
        .disabled = disabledValue;
}

function removeJokeHandler(e) {
    const joke = e.target.parentNode;
    const category = joke.querySelector('.category').dataset.category;

    changeDisabledOption(category, false);
    joke.remove();
}

function categoryChangeHandler(e) {
    const categoryName = e.target.value;

    if (!categoryName) return;

    fetch(`${mainRoute}/random?category=${encodeURIComponent(categoryName)}`)
        .then(requestForkPromise)
        .then(joke => {
            const li = document.createElement('li');
            const categoryP = document.createElement('p');
            const bodyP = document.createElement('p');
            const removeButton = document.createElement('button');

            li.id = `joke_${joke.id}`;
            categoryP.textContent = `Category: ${categoryName}`;
            categoryP.className = 'category';
            categoryP.dataset.category = categoryName;
            bodyP.textContent = joke.value;
            removeButton.textContent = 'Remove Joke';
            removeButton.addEventListener('click', removeJokeHandler);

            li.append(categoryP, bodyP, removeButton);
            ulBlock.appendChild(li);
        })
        .then(() => changeDisabledOption(categoryName, true))
        .catch(err => console.error(err));
}

function getCategories() {
    fetch(`${mainRoute}/categories`)
        .then(requestForkPromise)
        .then(categories => {
            categories.forEach(category => {
                const option = document.createElement('option');

                option.value = category;
                option.textContent = category;

                selectBlock.appendChild(option);
            });
        })
        .then(() => selectBlock.addEventListener('change', categoryChangeHandler))
        .catch(err => console.error(err));
}

getCategories();