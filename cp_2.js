function fetchProductsThen() {
    fetch('https://www.course-api.com/javascript-store-products')
        .then(response => response.json())  //Parses the raw response data into JSON
        .then(data => console.log(data))    //Logs the data to the console
        .catch(err => handleError(err)); //Logs any errors
}

async function fetchProductsAsync() {
    try {
        const response = await fetch('https://www.course-api.com/javascript-store-products');
        // Check for network errors first
        if (!response.ok) {     
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        handleError(err);
        return [];  //Returns an empty array to prevent undefined argument errors
    }
}

function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';    //Clears the product container

    products.forEach(product => {
        const fields = product.fields || {};
        const name = fields.name.toUpperCase();
        const price = fields.price !== undefined ? (fields.price / 100).toFixed(2) : "0.00";
        const imageURL = fields.image?.[0]?.url;

        const productDiv = document.createElement('div');
        productDiv.className = 'product-div';
        productDiv.innerHTML = `
            <img class="product-image" src="${imageURL}" alt="${name}">
            <div class="product-name">${name}</div>
            <div class="product-price">$${price}</div>
        `;
        productContainer.appendChild(productDiv);
    })
}

function handleError(err) {
    console.error("Error fetching products: ", err.message);
}

// Test function output
fetchProductsThen();
fetchProductsAsync();

// Display products on the page
fetchProductsAsync().then(products => displayProducts(products));