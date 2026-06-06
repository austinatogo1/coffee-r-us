// ProductCard.jsx
// Displays a single coffee product with its image, name, origin, and price.

function ProductCard({ coffee }) {
  const { name, description, origin, price, image } = coffee;

  return (
    <div className="product-card" data-testid="product-card">
      <img
        src={image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80"}
        alt={name}
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80";
        }}
      />
      <div className="product-card-body">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>
          <strong>Origin:</strong> {origin}
        </p>
        <p className="price">${Number(price).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductCard;