let recipes = [
  { name: "Sup Tomat", ingredients: ["tomat", "bawang putih", "bawang merah", "kaldu ayam"], category: "makan siang" },
  { name: "Salad Ayam", ingredients: ["ayam", "selada", "tomat", "mentimun"], category: "sarapan" },
  { name: "Nasi Goreng", ingredients: ["nasi", "bawang merah", "bawang putih", "kecap", "telur"], category: "makan malam" },
  { name: "Smoothie Buah", ingredients: ["pisang", "stroberi", "yogurt", "madu"], category: "sarapan" },
  { name: "Tumis Sayuran", ingredients: ["wortel", "brokoli", "bawang putih", "saus tiram"], category: "makan siang" }
];

document.getElementById("recipe-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const ingredients = document.getElementById("ingredients").value.split(",");
  const category = document.getElementById("category").value;
  
  const newRecipe = { name, ingredients, category };
  recipes.push(newRecipe);
  
  displayRecipes();
  alert(`Resep "${name}" berhasil ditambahkan!`);
  console.log("Resep Ditambahkan:", newRecipe);
});

function displayRecipes() {
  const recipeContainer = document.getElementById("recipe-list");
  recipeContainer.innerHTML = "";
  
  recipes.forEach(recipe => {
    const recipeItem = document.createElement("div");
    recipeItem.innerHTML = `
      <h3>${recipe.name}</h3>
      <p>Bahan: ${recipe.ingredients.join(", ")}</p>
      <p>Kategori: ${recipe.category}</p>
      <button class="wishlist-button" data-recipe='${JSON.stringify(recipe)}'>Add to Wishlist</button>
    `;
    recipeContainer.appendChild(recipeItem);
  });

  // Add event listener for each wishlist button
  document.querySelectorAll('.wishlist-button').forEach(button => {
    button.addEventListener('click', function() {
      var recipe = JSON.parse(this.getAttribute('data-recipe'));
      addToWishlist(recipe);
    });
  });
}

document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const searchIngredients = document.getElementById("search-ingredients").value.split(",");
  
  const searchResults = recipes.filter(recipe => 
    searchIngredients.every(ingredient => recipe.ingredients.includes(ingredient.trim()))
  );
  
  displaySearchResults(searchResults);
});

function displaySearchResults(results) {
  const resultContainer = document.getElementById("search-results");
  resultContainer.innerHTML = "";
  
  results.forEach(recipe => {
    const recipeItem = document.createElement("div");
    recipeItem.innerHTML = `
      <h3>${recipe.name}</h3>
      <p>Bahan: ${recipe.ingredients.join(", ")}</p>
      <p>Kategori: ${recipe.category}</p>
      <button class="wishlist-button" data-recipe='${JSON.stringify(recipe)}'>Add to Wishlist</button>
    `;
    resultContainer.appendChild(recipeItem);
  });

  // Add event listener for each wishlist button
  document.querySelectorAll('.wishlist-button').forEach(button => {
    button.addEventListener('click', function() {
      var recipe = JSON.parse(this.getAttribute('data-recipe'));
      addToWishlist(recipe);
    });
  });
}

// Panggil displayRecipes() saat pertama kali halaman dimuat
displayRecipes();

// Wishlist form event listener
document.getElementById("wishlist-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const item = document.getElementById("wishlist-item").value;
  
  if (item) {
    addToWishlist({ name: item, ingredients: [], category: '' });
    document.getElementById("wishlist-item").value = ''; // Clear input field
  }
});

function addToWishlist(recipe) {
  const wishlistContainer = document.getElementById("wishlist-result");
  const wishlistItem = document.createElement("div");
  wishlistItem.innerHTML = `
    <h3>${recipe.name}</h3>
    <p>Bahan: ${recipe.ingredients.join(", ")}</p>
    <p>Kategori: ${recipe.category}</p>
  `;
  wishlistContainer.appendChild(wishlistItem);
}
