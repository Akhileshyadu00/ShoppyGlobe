import { useDispatch } from 'react-redux';
import { addToCart } from '../Utils/cartSlice';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 object-contain mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
      <p className="text-green-600 font-bold mb-2">${product.price}</p>
      
      <div className="flex justify-between items-center mt-auto">
        <Link
          to={`/product/${product.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View Details
        </Link>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
