import React, { useState } from 'react';
import { useCustomContext } from 'react-global-light';

const Products = () => {
    const [{ products },] = useCustomContext("global");

    let productEles = [<span>Coming soon...</span>];

    if (products.length > 0) {
        productEles = products.map((val,idx) => <Product name={val.Brand.value}
                                                      desc={val.Desc.value}
                                                      img={val["Brand Image"].value !== "" ?
                                                               val["Brand Image"].value
                                                                        : null}
                                                      key={idx} />);
    }

    return (
        <div className={"center"}>
            {productEles}
        </div>
    );
}

const Product = ({name, desc, img}) => {
    return (
        <article tabIndex={0} aria-label={name}>
            {img ? <img src={img} alt={`Logo for ${name}`}/> : null}
            <summary>
                {name}
                <details>
                    {desc}
                </details>
            </summary>
        </article>
    )
}

export default Products;