import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllProducts } from "./Store/store";
import { deleteProductAction } from "./Store/store";
import { addProductAction } from "./Store/store";
import { updateProductAction } from "./Store/store";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(({ products }) => dispatch(getAllProducts(products)));
  }, []);

  const products = useSelector(state => state.products);

  const handleAdd = e => {
    e.preventDefault();
    const dataForm = new FormData(e.target);

    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: dataForm.get("title")
      })
    })
      .then(res => res.json())
      .then(data => dispatch(addProductAction(data)));
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input type="text" name="title" />
        <button type="submit">Ajouter</button>
      </form>
      <div>
        {products &&
          products.map(product => (
            <Product product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}

function Product({ product }) {
  const dispatch = useDispatch();

  const handleDelete = e => {
    e.preventDefault();

    fetch("https://dummyjson.com/products/" + product.id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => data.isDeleted && dispatch(deleteProductAction(product)));
  };

  const handleUpdate = e => {
    e.preventDefault();
    const dataForm = new FormData(e.target);

    fetch("https://dummyjson.com/products/1", {
      method: "PUT" /* or PATCH */,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: dataForm.get("title")
      })
    })
      .then(res => res.json())
      .then(data => dispatch(updateProductAction(product, data)));
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input type="text" defaultValue={product.title} name="title" />
        <button onClick={handleDelete}>Delete</button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

/*export function App() {
  const [products, setProducts] = useState(null);
  const [productTitle, setProductTitle] = useState("");

  useEffect(() => {
    if (!products) {
      fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(({ products }) => setProducts(products));
    }
  }, []);

  const handleAdd = function() {
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: productTitle
      })
    })
      .then(res => res.json())
      .then(data => setProducts(s => [data, ...s]));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Ajouter un produit"
          value={productTitle}
          onChange={e => setProductTitle(e.target.value)}
        />
        <button onClick={handleAdd}>Ajouter</button>
      </div>

      <ul>
        {products &&
          products.map(product => (
            <Product
              product={product}
              key={product.id}
              setProducts={setProducts}
            />
          ))}
      </ul>
    </div>
  );
}*/

/*function Product({ product, setProducts }) {
  const handleDelete = function(e) {
    e.preventDefault();

    fetch("https://dummyjson.com/products/" + product.id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data =>
        setProducts(products =>
          products.filter(product => product.id !== data.id)
        )
      );
  };

  const handleUpdate = function(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    fetch("https://dummyjson.com/products/" + product.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.get("title")
      })
    })
      .then(res => res.json())
      .then(data => setProducts(products => products.map(p => p.id === product.id ? data : p)));
  };

  return (
    <li>
      <form onSubmit={handleUpdate}>
        <input type="text" defaultValue={product.title} name="title" />
        <button onClick={handleDelete}>Delete</button>
        <button type="submit">Update</button>
      </form>
    </li>
  );
}*/
