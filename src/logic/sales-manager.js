
import { Database, Collection } from "utils/database"

// database setup
const salesDaysDB = new Collection("sales-days", {});
const salesCountDB = new Database("sales-count", {count: 0});
salesDaysDB.read();
salesCountDB.read();

// export full Collection
export {
    salesDaysDB
}

// export Sale class
export function Sale (products, providerId, providerAmount, sellerId, sellerAmount) {
    salesCountDB.data.count ++;
    salesCountDB.write();
    
    this.id = salesCountDB.data.count;
    this.products = products;
    
    this.providerId = providerId;
    this.providerAmount = providerAmount;
    this.providerPaid = false;
    
    this.sellerId = sellerId;
    this.sellerAmount = sellerAmount;
    this.sellerPaid = false;
    
}

// export SalesDay class
export function SalesDay (dateString, info) {
    this.id = dateString; 
    this.info = info || null;
    this.sales = []; /** @type {Sale[]} */
}

// export functions
export const addSalesDay = (salesDay) => {
    salesDaysDB.addItem(salesDay);
    salesDaysDB.write();
} 

export const getSalesDay = (query) => {
    return salesDaysDB.getItem(query);
}

export const updateSalesDay = (query, updatedSalesDay) => {
    salesDaysDB.updateItem(query, updatedSalesDay);
    salesDaysDB.write();
}

export const deleteSalesDay = (query) => {
    salesDaysDB.deleteItem(query);
    salesDaysDB.write();
}
