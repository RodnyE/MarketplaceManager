
import { useState, useEffect } from "react"
import { GlobalContext } from "./views/__context"
import cloneDeep from "lodash/cloneDeep"
import { updateSalesDay } from "./logic/sales-manager"



import LoadingView from "./views/Loading"
import HomeView from "./views/Home"
import AddSalesTableView from "./views/AddSalesTable"
import SalesTableView from "./views/SalesTable"
import AddSaleView from "./views/AddSale"
import Button from "ui/Button"

// Application 
export default function App () { 
    const [currentView, setCurrentView] = useState("");
    const [viewsHistory, setViewsHistory] = useState([]);
    const [salesTableViewData, setSalesTableViewData] = useState(null);
    /**
     * Show view from a views history list
     * 
     * @param {string[]} history - views list
     */
    const openView = (history) => {
        setViewsHistory([...history]);
        setCurrentView(history[history.length - 1]);
    } 
    
    /**
     * Back to last view opened
     */
    const backView = () => {
        if (viewsHistory.length === 1) return false;
        
        viewsHistory.pop();
        setCurrentView(viewsHistory[viewsHistory.length - 1]);
        setViewsHistory([...viewsHistory]);
    };
    
    // App global context
    const context = {
        openView,
        backView,
        currentView,
        
        // shared data of SalesTableView
        salesTableViewData,
        setSalesTableViewData,  
        updateSalesDayFromSalesTable: () => {
            // update db
            updateSalesDay(
                salesTableViewData.id,
                salesTableViewData,
            );
            
            // render updated state 
            setSalesTableViewData(
                cloneDeep(salesTableViewData)
            );
        }
    };
    
    //
    // start app component 
    //
    useEffect(() => {
        openView(["home", "loading"]);
        
        setTimeout(() => {
            openView(["home"]);
        }, 500);
    }, []);
    
    return (<GlobalContext.Provider value={context}>
      <div> 
        <LoadingView show={currentView === "loading"}/>
       
        <HomeView show={currentView === "home"}/>
        <AddSalesTableView show={currentView === "add-sales-table"}/>
        
        <SalesTableView show={currentView === "sales-table"}/>
        <AddSaleView show={currentView === "add-sale"}/>
      </div>
    </GlobalContext.Provider> )
}