import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';

import { fetchProduct, addReview } from '../../actions/product';
import { ADD_REVIEW_RESET } from '../../constants/product';

const ViewProduct = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productAddReview = useSelector((state) => state.productAddReview);
  const {
    loading: addReviewLoading,
    success: addReviewSuccess,
    error: addReviewError,
  } = productAddReview;

  const user = useSelector((state) => state.user);
  const { profile } = user;

  useEffect(() => {
    if (addReviewSuccess) {
      setRating(0);
      setComment('');
      dispatch({ type: ADD_REVIEW_RESET });
    }

    dispatch(fetchProduct(match.params.id));
  }, [dispatch, match, addReviewSuccess]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };

  const addReviewHandler = (e) => {
    e.preventDefault();
    dispatch(addReview({ rating, comment }, match.params.id));
  };

  return (
    <div className='mb-8'>
      <Link to='/'>
        <button className='bg-transparent font-semibold p-8 uppercase hover:opacity-75  outline-none'>
          <div className='flex flex-row justify-evenly items-center'>
            <i className='ri-arrow-left-line'></i>
            <p className='pl-2'>Back</p>
          </div>
        </button>
      </Link>
      {loading || addReviewLoading ? (
        <Loader />
      ) : error ? (
        <div className='flex justify-center'>
          <Alert variant='error' message={error} className='w-1/2'></Alert>
        </div>
      ) : (
        product && (
          <>
            <div className='flex flex-col lg:flex-row mb-4 lg:items-start'>
              <div className='product-image w-6/12 md:w-4/12 lg:w-3/12 lg:ml-8 overflow-hidden shadow-lg border border-gray-800 self-center lg:self-start'>
                <img
                  className='object-cover object-center w-full h-full'
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className='product-details flex flex-col flex-grow px-4 items-center lg:items-start lg:ml-8 lg:w-6/12'>
                <h3 className='text-3xl font-semibold mt-4 lg:mt-0'>
                  {product.name}
                </h3>
                {product.rating > 0.0 && (
                  <div className='flex flex-col lg:flex-row items-center lg:py-2'>
                    <Rating
                      className='pt-2 lg:pt-0 text-2xl'
                      value={product.rating}
                    />
                    <span className='lg:pl-4 font-semibold'>
                      ({product.numReviews} reviews)
                    </span>
                  </div>
                )}
                <div className='text-2xl mt-4 lg:mt-0'>{product.brand}</div>
                <div className='text-4xl mt-4 lg:mt-0'>
                  ${parseFloat(product.price).toFixed(2)}
                </div>
                <div className='mt-4 text-xl whitespace-pre-wrap lg:text-left text-center'>
                  {product.description}
                </div>
              </div>
              <div className='product-actions border border-gray-800 text-xl font-semibold my-16 lg:mt-0 w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12 lg:mr-16 mx-auto'>
                <div className='flex items-center justify-between px-4 border-b-2 border-gray-400 h-12'>
                  <p>Price:</p>
                  <p className='font-normal'>
                    ${parseFloat(product.price).toFixed(2)}
                  </p>
                </div>
                <div className='flex items-center justify-between px-4 border-b-2 border-gray-400 h-12'>
                  <p>Status:</p>
                  <p className='font-normal'>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </p>
                </div>

                {product.countInStock > 0 && (
                  <div className='w-full flex items-center justify-between px-4 border-b-2 border-gray-400 h-16'>
                    <p>Quantity:</p>
                    <div>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className='w-full block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      >
                        {[...Array(product.countInStock).keys()].map((val) => (
                          <option key={val + 1} value={val + 1}>
                            {val + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className='flex justify-center'>
                  <button
                    onClick={() => addToCartHandler()}
                    className={
                      `${
                        product.countInStock === 0 ||
                        (profile && profile.isAdmin)
                          ? 'cursor-not-allowed'
                          : ''
                      }` +
                      ' text-base uppercase border w-1/2 my-4 h-12 text-white bg-gray-800 hover:opacity-75'
                    }
                    disabled={
                      product.countInStock === 0 || (profile && profile.isAdmin)
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
            <div className='mt-8 px-8 flex flex-row'>
              <div className='flex flex-col w-full md:w-6/12'>
                <h2 className='text-3xl border-b-2 border-gray-400'>Reviews</h2>
                {product.reviews && product.reviews.length === 0 && (
                  <Alert
                    variant='info'
                    message='No reviews yet'
                    showVariant={false}
                  ></Alert>
                )}
                <div>
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <div key={review._id} className='my-4'>
                        <strong>{review.name}</strong>
                        <div className='flex flex-row'>
                          <Rating value={review.rating} />
                          <p className='pl-2'>
                            {review.createdAt.substring(0, 10)}
                          </p>
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  {profile && !profile.isAdmin && (
                    <div className='mt-8'>
                      <h2 className='text-3xl border-b-2 border-gray-400'>
                        Add a review?
                      </h2>
                      {addReviewError && (
                        <Alert
                          variant='error'
                          message={addReviewError}
                          showVariant={false}
                        ></Alert>
                      )}
                      {profile ? (
                        <form onSubmit={addReviewHandler} className='my-4'>
                          <div className='my-2'>
                            <p>Rating</p>
                            <select
                              onChange={(e) => setRating(e.target.value)}
                              className='px-4 py-2 my-2 shadow border'
                            >
                              <option value=''>Select</option>
                              <option value='1'>1 - Poor</option>
                              <option value='2'>2 - Fair</option>
                              <option value='3'>3 - Good</option>
                              <option value='4'>4 - Very Good</option>
                              <option value='5'>5 - Excellent</option>
                            </select>
                          </div>
                          <div>
                            <p>Comment</p>
                            <textarea
                              className='w-full p-4 appearance-none shadow border leading-tight text-gray-800 focus:outline-none'
                              cols='30'
                              rows='3'
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                          </div>
                          <button
                            type='submit'
                            className='lg:w-1/2 mx-auto text-base uppercase border h-12 px-4 my-8 text-white bg-gray-800 hover:opacity-75'
                          >
                            Submit Review
                          </button>
                        </form>
                      ) : (
                        <Alert
                          variant='info'
                          message={
                            <p>
                              Please{' '}
                              <Link to='/login'>
                                <strong>Login</strong>
                              </Link>{' '}
                              to add a review.
                            </p>
                          }
                          showVariant={false}
                        ></Alert>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default ViewProduct;
