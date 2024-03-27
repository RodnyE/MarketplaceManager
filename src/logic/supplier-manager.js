
import { Collection } from "utils/database"

// database setup
const supplierDB = new Collection("shops", {});
supplierDB.read();

// export full Collection
export supplierDB;

/**
 * Create a new supplier object
 * @class
 */
export const Supplier = (id, name, tags) => {
    this.id = id; 
    this.name = name;
    this.tags = tags || [];
}


/**
 * Add a supplier to db
 */
export const addSupplier = (supplier) => {
    supplierDB.addItem(supplier);
    supplierDB.write();
}

/**
 * Get a supplier
 */
export const getSupplier = (query) => {
    return supplierDB.getItem(query);
}

/**
 * Delete a supplier
 */
export const deleteSupplier = (query) => {
    supplierDB.deleteItem(query);
    supplierDB.write();
}

