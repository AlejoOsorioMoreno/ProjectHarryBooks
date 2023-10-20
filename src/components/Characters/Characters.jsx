import React from 'react'

export const Characters = () => {
    const fetchData = async () => {
        try {
          const apiUrl = selectedCategory
            ? `https://hp-api.onrender.com/api/characters`
            : 'https://hp-api.onrender.com/api';
    
          const response = await fetch(apiUrl);
          const json = await response.json();
    
          setProducts(json);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  return (
    <div>Characters</div>
  )
}
