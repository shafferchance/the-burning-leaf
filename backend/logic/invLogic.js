const dbCrub = require("./database-crud");

function deleteProduct(id, cb) {
    dbCrub
        .mongoDELETE(
            "inventory",
            id instanceof Array
                ? { _id: { $in: id.map((val) => new ObjectID(val)) } }
                : { _id: new ObjectID(id) }
        )
        .then((results) => cb(null, results))
        .catch((err) => cb(err, null));
}

function getProduct(id, cb) {
    dbCrub
        .mongoGET("inventory", { _id: id })
        .then((results) => cb(null, results))
        .catch((err) => cb(err, null));
}

function getProducts(cb) {
    dbCrub
        .mongoGET("inventory", {})
        .then((results) => cb(null, results))
        .catch((err) => cb(err, null));
}

function insertProduct(data, cb) {
    dbCrub
        .mongoInsert("inventory", data)
        .then((results) => cb(null, results))
        .catch((err) => cb(err, null));
}

function updateProduct(id, data, cb) {
    dbCrub
        .mongoUPDATE("inventory", { _id: id }, data)
        .then((results) => cb(null, results))
        .catch((err) => cb(err, null));
}

function getPopular(cb) {
    dbCrub
        .mongoGET("inventory", {
            tags: { $in: ["popular"] },
        })
        .then((results) => cb(null, results))
        .catch((err) => cb(err, null));
}

module.exports = {
    deleteProduct,
    getProduct,
    getProducts,
    insertProduct,
    updateProduct,
    getPopular,
};
