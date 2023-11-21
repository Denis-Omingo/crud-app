import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';

export function Products() {
    const [content, setContent] =useState(<ProductList showForm={showForm}/>);

    function showList(){
        setContent(<ProductList showForm={showForm} />)
    }

    function showForm(product){
        setContent(<ProductForm  product={product} showList={showList}/>)
    }
  return (
    <div className='container my-5'>
       {content}
    </div>
  )
}


function ProductList(props){

    const [products, setProducts]=useState([]);

    function fetchProducts(){
        fetch("https://product-json-server-udvd.onrender.com/products/")
        .then((response)=>{
            if(!response.ok){
                throw new Error("Unexpected Server Response");
            }
            return response.json()
        })
        .then((data)=>{
            console.log(data);
            setProducts(data);
        })
        .catch((error)=>console.log("Error: ", error));
    }

    useEffect(()=>fetchProducts(),[]);

    function deleteProduct(id){
        fetch('https://product-json-server-udvd.onrender.com/products/'+ id,{
            method:'DELETE'
        })
        .then((response)=>response.json())
        .then((data)=>fetchProducts());
    }

    return(
        <Fragment className='container'>
            <h2 className="text-center mb-3">List of Products</h2>
            <button onClick={()=>props.showForm({})} type='button' className='btn btn-primary me-2 '>Create</button>
            <button onClick={()=>fetchProducts()} type='button' className='btn btn-outline-primary me-2 my-2'>Refresh</button>
            <div className=' sm-container-fluid'>
            <table className='table bg-warning sm-container-fluid'>
                <thead>
                    <tr>
                        <th className='fs pe-0'>ID</th>
                        <th className='pe-0'>Name</th>
                        <th className='pe-0'>Brand</th>
                        <th className='pe-0'>Category</th>
                        <th className='d-none d-md-inline-flex pe-0'>Price/Unit</th>
                        <th className='pe-0'>Available</th>
                        <th className='d-none d-md-inline-flex pe-0'>Date</th>
                        <th className='pe-0'>Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product,index)=>{
                            return(
                                <tr key={index}>
                                    <td className='pe-0'>{product.id}</td>
                                    <td className='pe-0'>{product.name}</td>
                                    <td className='pe-0'>{product.brand}</td>
                                    <td className='pe-0'>{product.category}</td>
                                    <td className='d-none d-md-inline-flex pe-0'>Ksh. {product.price}</td>
                                    <td className='pe-0'>{product.instock} units</td>
                                    <td className='d-none d-md-inline-flex pe-0'>{product.createdAt}</td>
                                    <td style={{width:"10px", whiteSpace:"nowrap"}}>
                                            <button onClick={()=>props.showForm(product)} type='button' className='btn btn-primary btn-sm me-2'>Edit</button>
                                            <button  onClick={()=>deleteProduct(product.id)} type='button' className='btn btn-danger btn-sm me-2'>Delete</button>
                                    </td> 
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            </div>
        </Fragment>
    );
}

function ProductForm(props){
    const [errorMessage, setErrorMessage]=useState("");


    function handleSubmit(event){
        event.preventDefault();

        //Read Data from the form
        const formData=new FormData(event.target);

        //convert formData to Object
        const product=Object.fromEntries(formData.entries());

        //form validation
        if(!product.name|| !product.brand || !product.category ||!product.price ||!product.instock){
            console.log("Please provide all required fields!");
            setErrorMessage(
                <div className='alert alert-warning' role='alert'>
                    Please provide all required fields!
                </div>
            )
            return;
        }
        if(props.product.id){
            //update the product
            product.createdAt=new Date().toISOString().slice(0,10);
    fetch("https://product-json-server-udvd.onrender.com/products/"+props.product.id,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(product)
    })
    .then((response)=>{
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return response.json()
    })
    .then((product)=>props.showList())
    .catch((error)=>{
        console.error("Error: ", error);
    })
        }else{

         //create a new product
    product.createdAt=new Date().toISOString().slice(0,10);
    fetch("https://product-json-server-udvd.onrender.com/products/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(product)
    })
    .then((response)=>{
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return response.json()
    })
    .then((product)=>props.showList())
    .catch((error)=>{
        console.error("Error: ", error);
    })
    }
}

   

    return(
        <>
            <h2 className="text-center mb-3">{props.product.id? "Edit Product":"Create New Product"}</h2>
            <div className='row'>
                <div className='col-lg-6 mx-auto'>

                    {errorMessage}
                    <form onSubmit={(event)=>handleSubmit(event)}>

                    {props.product.id && <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>ID</label>
                            <div className='col-sm-8'>
                                <input readOnly className='form-control-plaintext'
                                name='id'
                                defaultValue={props.product.id}/>
                            </div>
                        </div>}

                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Product</label>
                            <div className='col-sm-8'>
                                <input className='form-control'
                                name='name'
                                defaultValue={props.product.name}/>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Brand</label>
                            <div className='col-sm-8'>
                                <input className='form-control'
                                name='brand'
                                defaultValue={props.product.brand}/>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Category</label>
                            <div className='col-sm-8'>
                                <select className='form-select'
                                    name='category'
                                    defaultValue={props.product.category}>
                                    
                                    <option value='Other'>Other</option>
                                    <option value='Phones'>Phones</option>
                                    <option value='Computers'>Computers</option>
                                    <option value='Accessories'>Accessories</option>
                                    <option value='GPS'>GPS</option>
                                    <option value='Cameras'>Cameras</option>
                                </select>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Price</label>
                            <div className='col-sm-8'>
                                <input className='form-control'
                                name='price'
                                defaultValue={props.product.price}/>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>No. of Units</label>
                            <div className='col-sm-8'>
                                <input className='form-control'
                                name='instock'
                                defaultValue={props.product.instock}/>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Description</label>
                            <div className='col-sm-8'>
                                <textarea className='form-control'
                                name='description'
                                defaultValue={props.product.description}/>
                            </div>
                        </div>

                        <div className='row md-d-flex'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type='submit' className='btn btn-primary btn-sm me-3'>Update</button>
                            </div>

                            <div className='offset-sm-4 col-sm-4 d-grid'>
                            <button onClick={()=>props.showList()} type='button' className='btn btn-secondary btn-sm me-3 my-2'>Cancel</button>
                            </div> 
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}