import React, { useEffect, useState } from "react";
import { useCustomContext } from "react-global-light";
import { CircularProgress, makeStyles, Paper } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { sendToSrvr } from "../Lib/connections";
import { StaticCollectionList } from "../Lib/CardList/CardList.component";
import Page from "../Lib/Page/Page.component";

const useStyles = makeStyles((theme) => ({
    center: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    fullContainer: {
        width: "100%",
        height: "100%",
    },
}));

const Products = () => {
    const classes = useStyles();
    const [productEles, setProductEles] = useState(null);

    // Should be using suspense but it is not production ready :/
    useEffect(() => {
        sendToSrvr("api/v1/inv/products").then((results) => {
            setProductEles(results.data.map((val) => val.data));
        });
    }, []);
    // if (products.length > 0) {
    //     productEles = products.map((val,idx) => <Product name={val.Brand.value}
    //                                                   desc={val.Desc.value}
    //                                                   img={val["Brand Image"].value !== "" ?
    //                                                            val["Brand Image"].value
    //                                                                     : null}
    //                                                   key={idx} />);
    // }

    return (
        <main className={`${classes.center} ${classes.fullContainer}`}>
            <div></div>
            <Page
                components={[
                    <Paper className={classes.center}>
                        {productEles === null ? (
                            <CircularProgress />
                        ) : (
                            <StaticCollectionList tiles={productEles} />
                        )}
                    </Paper>,
                ]}
                animate={false}
            />
        </main>
    );
};

// const Product = ({id, featured, img, title}) => {
//     return (
//         <GridListTile key={id} cols={featured ? 2 : 1} rows={featured ? 2 : 1}>
//             <img src={img} alt={title} />
//             <GridListTileBar
//                 title={title}
//                 titlePosition="top"
//                 actionIcon={
//                     <IconButton aria-label={`start ${title}`} className={}>
//                         <StarBorderIcon />
//                     </IconButton>
//                 }
//                 actionPosition="left"
//                 className={}
//             />
//         </GridListTile>
//     )
// }

export default Products;
