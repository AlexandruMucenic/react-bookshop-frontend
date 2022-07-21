import React, { useEffect, useMemo, useState } from "react";
import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";
import Cart from "../../components/Cart/Cart";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [showCart, setShowCart] = useState(false);

  const sortOption = ["LOWER PRICE", "HIGHER PRICE"];

  //GET products method
  useEffect(() => {
    fetch(`http://localhost:5000/products`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(products => {
        setProducts(products);
      })
      .catch(error => console.log(error));
  }, []);

  //Add to cart function
  const handleAddToCart = async (id, author, title, price, imageURL, quantity) => {
    await fetch(`http://localhost:5000/cart/${id}/add`, {
      method: "PUT", body: JSON.stringify({
        id: id, author: author, title: title, price: price, imageURL: imageURL, quantity: quantity
      }), headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    setShowCart(true);
  };

  //Search/Sort functions
  const searchBooks = e => setInputValue(e.target.value);

  const filteredProducts = useMemo(() => {
    const filteredBySearchValue = products?.filter((product) =>
      product.title.toLowerCase().includes(inputValue.toLowerCase()) ||
      product.author.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (selectedSortOption === "LOWER PRICE") {
      return filteredBySearchValue.sort((a, b) => a.price - b.price);
    } else if (selectedSortOption === "HIGHER PRICE") {
      return filteredBySearchValue.sort((a, b) => b.price - a.price);
    } else {
      return filteredBySearchValue;
    }
  }, [inputValue, products, selectedSortOption]);

  return <div className="productsPageContainer">
    {/*Page header*/}
    <div className="productPageHeader">
      <div className="productHeaderTitle"><h2>Our Book Collection </h2></div>
      <div className="productHeaderQuote">
        <p>"I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a
          book! When I have a house of my own, I shall be miserable if I have not an excellent library.”</p>
        <h4>Jane Austen, Pride and Prejudice</h4>
      </div>
    </div>

    {/* Search/Sort section*/}
    <div className="searchSortContainer">
      <div className="searchContainer">
        <SearchBar searchBooks={searchBooks} inputValue={inputValue} />
      </div>
      <div className="sortContainer">
        {filteredProducts.length === 0 ? <p>0 products</p> : <p>{filteredProducts.length} products</p>}
        <DropDownMenu
          options={sortOption}
          onSelected={setSelectedSortOption}
          selected={selectedSortOption}
          placeholder={"Sort by"}
        />
      </div>
    </div>

    {/*Products section*/}
    <div className="productPageBody">
      {filteredProducts?.length === 0 ? (<h2>No books found...</h2>) : (filteredProducts?.map(product => (<ProductCard
        key={product.id}
        id={product.id}
        title={product.title}
        author={product.author}
        imageURL={require(`../../images/books/${product.imageURL}`)}
        price={product.price}
        addToCart={() => handleAddToCart(product.id, product.author, product.title, product.price, product.imageURL, 1)}
      />)))}
    </div>

    {/*Cart*/}
    <Cart addedToCart={handleAddToCart} showCart={showCart} handleClose={() => setShowCart(false)} />

  </div>;
};

export default Products;
