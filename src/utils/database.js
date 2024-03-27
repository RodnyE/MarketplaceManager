
import { LowSync } from 'lowdb'
import { LocalStorage } from 'lowdb/browser'

/**
 * lowdb wrapper
 */
export class Database extends LowSync {
    constructor(name, defaultData) {
        super(new LocalStorage(name), defaultData);
    }
}

/**
 * List of items in object map
 */
export class Collection extends Database {
    constructor (name, defaultData) {
        super(name, defaultData);
    }
    
    getDatalist (arg1, arg2) {
        let data = this.data;
        let keys = Object.keys(data);
        let values = [];
        
        let fromIndex = 0;
        let toIndex = 0;
        
        // handle arguments
        if (typeof(arg2) === "undefined") {
            if (typeof(arg1) === "undefined") {
                // ()
                fromIndex = 0;
                toIndex = keys.length - 1;
            }
            else {
                // (toIndex)
                fromIndex = 0;
                toIndex = arg1;
            }
        }
        else {
            // (fromIndex, toIndex)
            fromIndex = arg1;
            toIndex = arg2;
        }
        
        
        for (let i = fromIndex; i <= toIndex; i++) {
            let key = keys[i];
            let value = data[key];
            values.push(value);
        }
        return values;
    }
    
    addItem (item) {
        this.data[item.id] = item;
    }
    
    getItem (query) {
        
        // search by id
        let queryId = typeof(query) !== "object" ? query : query.id;
        if (queryId) {
            return this.data[queryId];
        }
        
    }
    
    updateItem (query, updatedItem) {
        let item = this.getItem(query);
        this.data[item.id] = updatedItem;
    }
    
    deleteItem (query) {
        let item = this.getItem(query);
        delete this.data[item.id];
    }
}