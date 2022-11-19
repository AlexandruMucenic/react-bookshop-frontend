import './ProductCard.css'

const ProductCard = ({ author, title, imageURL, price, id, addToCart }) => {
  return (
    <div className="productCardContainer">
      <div className="titleContainer">
        <h4>{title}</h4>
      </div>
      <div className="authorNameContainer">
        <p>{author}</p>
      </div>
      <div className="bookImageContainer">
        <img className="bookImage" src={imageURL} alt="image" />
      </div>
      <div className="priceContainer">
        <p>${price}</p>
      </div>
      <button onClick={addToCart} className="addToCartContainer">
        ADD TO CART
      </button>
    </div>
  )
}

export default ProductCard
