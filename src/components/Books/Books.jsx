
const fetchData = async () => {
    try {
      const apiUrl = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : 'https://fakestoreapi.com/products';

      const response = await fetch(apiUrl);
      const json = await response.json();

      setProducts(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };