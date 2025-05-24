import { useDispatch } from 'react-redux';
import { addToCart } from '../Utils/cartSlice';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div className="border rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        className="h-48 object-contain mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
      <p className="text-green-600 font-bold mb-2">{formattedPrice}</p>

      <div className="flex justify-between items-center mt-auto">
        <Link
          to={`/product/${product.id}`}
          className="text-blue-600 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        >
          View Details
        </Link>
        <button
          aria-label={`Add ${product.title} to cart`}
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
