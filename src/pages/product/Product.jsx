import { Link, useLocation } from 'react-router-dom';
import './product.css';
import Chart from '../../components/chart/Chart';
import { productData } from '../../dummyData';
import { Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateProduct } from '../../redux/apiCalls';
import styled from 'styled-components';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';

const Error = styled.span`
  color: red;
`;

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [inputs, setInputs] = useState([]);
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.product);

  const product = useSelector((state) =>
    state.product.products.find((product) => product.id === productId)
  );

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategories = (e) => {
    setCategories(
      e.target.value.split(',').map(function (value) {
        return value.trim();
      })
    );
  };

  const handleSize = (e) => {
    setSize(
      e.target.value.split(',').map(function (value) {
        return value.trim();
      })
    );
  };

  const handleColor = (e) => {
    setColor(
      e.target.value.split(',').map(function (value) {
        return value.trim();
      })
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
            const productToUpdate = {
              ...inputs,
              image: getDownloadURL,
              categories: categories,
              size: size,
              color: color,
            };
            updateProduct(product.id, productToUpdate, dispatch);
          });
        }
      );
    } else {
      const productToUpdate = {
        ...inputs,
        image: product.image,
        categories: categories,
        size: size,
        color: color,
      };
      updateProduct(product.id, productToUpdate, dispatch);
    }
  };

  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Product</h1>
        <Link to='/newproduct'>
          <button className='productAddButton'>Create</button>
        </Link>
      </div>
      <div className='productTop'>
        <div className='productTopLeft'>
          <Chart data={productData} dataKey='Sales' title='Sales Performance' />
        </div>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={product.image} alt='' className='productInfoImg' />
            <span className='productName'>{product.title}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Id: </span>
              <span className='productInfoValue'> {product.id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Sales:</span>
              <span className='productInfoValue'>5123</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>In stock:</span>
              <span className='productInfoValue'>
                {product.inStock ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Product Name</label>
            <input
              name='title'
              type='text'
              placeholder={product.title}
              onChange={handleChange}
            />

            <label>Description</label>
            <input
              name='description'
              type='text'
              placeholder={product.description}
              onChange={handleChange}
            />

            <label>Price</label>
            <input
              name='price'
              type='number'
              placeholder={product.price}
              onChange={handleChange}
            />

            <label>Categories</label>
            <input
              name='categories'
              type='text'
              placeholder={product.categories}
              onChange={handleCategories}
            />
            <label>Size</label>
            <input
              name='size'
              type='text'
              placeholder={product.size}
              onChange={handleSize}
            />
            <label>Color</label>
            <input
              name='color'
              type='text'
              placeholder={product.color}
              onChange={handleColor}
            />

            <label>In Stock</label>
            <select name='inStock' id='idStock' onChange={handleChange}>
              <option></option>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>
          <div className='productFormRight'>
            <div className='productUpload'>
              <img src={product.image} alt='' className='productUploadImg' />
              <label for='file'>
                <Publish />
              </label>
              <input
                type='file'
                id='file'
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button
              onClick={handleClick}
              className='productButton'
              disabled={isFetching}
            >
              Update
            </button>
            {error && <Error>Something went wrong</Error>}
          </div>
        </form>
      </div>
    </div>
  );
}
