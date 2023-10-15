import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {

    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setProducts(result);
    }




    const deleteproduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }


        });
        result = result.json();
        if (result) {
            getProducts();
        }
    }

    const serchHandle = async (event) => {
        let key = event.target.value;
        if (key) {

            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result)
            }

        } else {
            getProducts();

        }


    }

    return (
        <div className="pl" >
            <h1>
                Product List
            </h1>
            <input type="" className="searchproductbox" placeholder="Search Product" onChange={serchHandle} />





            <div className="pl2">


                <ul className="pl1 ">
                    <li>Sr.no</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li>Operation</li>

                </ul>
                {
                    products.length > 0 ? products.map((item, index) =>
                        <ul key={item._id}>
                            <li >{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li className="btnli"><button className="btndelete" type="button" onClick={() => deleteproduct(item._id)}>Delete</button>
                                <Link className="btnupdate" to={"/update/" + item._id}>Update</Link></li>


                        </ul>

                    )
                        : <h3>No Result Found</h3>
                }




            </div>


        </div>




    )
}
export default ProductList