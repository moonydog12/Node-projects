const fileFormDOM = document.querySelector('.file-form');
const nameInputDOM = document.querySelector('#name');
const priceInputDOM = document.querySelector('#price');
const imageInputDOM = document.querySelector('#image');
const containerDOM = document.querySelector('.container');

const url = '/api/v1/products';
let imageValue = null || 'uploads/dog1.jpg';

const fetchProducts = async () => {
  try {
    const response = await fetch(url);
    const { products } = await response.json();

    const productsDOM = products
      .map(
        (product) => `
        <article class="product">
          <img src="${product.image}" alt="${product.name}" class="img"/>
            <footer>
            <p>${product.name}</p>
            <span>$${product.price}</span>
          </footer>
        </article>
        `,
      )
      .join('');
    containerDOM.innerHTML = productsDOM;
  } catch (err) {
    console.warn(err);
  }
};

fetchProducts();

imageInputDOM.addEventListener('change', async (e) => {
  const imageFile = e.target.files[0];
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch(`${url}/uploads`, {
      body: formData,
      method: 'post',
    });
    const data = await response.json();
    imageValue = data.image.src;
  } catch (err) {
    imageValue = null;
    console.warn(err);
  }
});

fileFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameValue = nameInputDOM.value;
  const priceValue = priceInputDOM.value;
  const product = {
    name: nameValue,
    price: priceValue,
    image: imageValue,
  };

  try {
    // await axios.post(url, product);

    await fetch(url, {
      body: JSON.stringify(product),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    fetchProducts();
  } catch (error) {
    console.warn(error);
  }
});
