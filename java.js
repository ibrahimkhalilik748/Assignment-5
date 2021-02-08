const searchBtn = document.getElementById('search-btn');
const menuList = document.getElementById('menu');
const menuDetails = document.querySelector('.menu-details');
const recipeClose = document.getElementById('recipe-close');

searchBtn.addEventListener('click', getMealList);
menuList.addEventListener('click', getMealRecipe);
recipeClose.addEventListener('click', () => {
    menuDetails.parentElement.classList.remove('showRecipe')
})

function getMealList() {
    let searchInputText = document.getElementById('search-input').value

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
        .then(response => response.json())
        .then(data => {
            let htmlCode = " ";
            if (data.meals) {
                data.meals.forEach(meal => {
                    htmlCode += `
                            <div class="meal-item" data-id ="${meal.idMeal}">
                            <div class="meal-img ">
                            <img src="${meal.strMealThumb}" alt=" meal
                            "> 
                            </div>
                            <div class="meal-name">
                            <h3> ${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn"> Details </a>
                            </div>
                            </div>
                    `;
                    menuList.classList.remove('itemNotFound');
                })
            }
            else {
                htmlCode = "We are sorry😢. This item is not available at this moment! <br> Please Try Another Item";
                menuList.classList.add('itemNotFound');
            }
            menuList.innerHTML = htmlCode;
        })
}


function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }

}


function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
                    <h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                <div class="recipe-instruct">
                    <h3>Instructions</h3>
                    <p> ${meal.strInstructions} </p>
                </div>
                <div class="recipe-meal-img">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="recipe-link">
                <button class="see-more">
                    <a href="${meal.strYoutube}" target="_blank">see more</a>
                    </button>
                </div>
    `;
    menuDetails.innerHTML = html;
    menuDetails.parentElement.classList.add('showRecipe');
}




