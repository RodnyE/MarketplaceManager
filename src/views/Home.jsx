
import { useState, useContext } from "react"

import { GlobalContext } from "./__context"
import { salesDaysDB } from "../logic/sales-manager"
import { getDayRelativityFormat, getUsualDateFormat } from "../utils/date"

import View from "ui/View"
import Navbar from "ui/Navbar"
import Button from "ui/Button"
import ListGroup from "ui/ListGroup"
import FloatingButton from "ui/FloatingButton"
import ClockIcon from "../icons/ClockIcon"
import CheckIcon from "../icons/CheckIcon"
import EmptyBlankIcon from "../icons/EmptyBlankIcon"

/**
 * Principal app view
 */
export default function HomeView ({show}) {
    const { 
        openView,
        setSalesTableViewData, 
    } = useContext(GlobalContext);
    
    /**
     * Toggle theme
     */
    const toggleTheme = () => {
      let tag = document.querySelector("html");
      let currentTheme = tag.getAttribute("data-bs-theme");
      let newTheme = currentTheme === "dark" ? "ligth" : "dark";
      
      tag.setAttribute("data-bs-theme", newTheme);
    };
    
    let itemsList = salesDaysDB.getDatalist().reverse();
    
    return (
      <View show={show}>
        <Navbar>
          SAX 
          <Button onClick={toggleTheme}> Tema </Button>
        </Navbar> 
        
        
        <div className="align-self-center py-1 px-3 text-center border-bottom border-primary">
          Tablas
        </div>
        
        <div className="overflow-y-auto h-100">
        <ListGroup>
          {(itemsList.length === 0) ?
            // if empty
            <div className="w-100 text-center pt-3 fs-6 text-primary"> ( No hay tablas )!</div>
            :
            // render list
            itemsList.map((item) => {
              let date = new Date(item.id + "T01:00");
              
              let salesLength = item.sales.length;
              let finishedSales = false;
              let providerTotalAmount = 0;
              let sellerTotalAmount = 0;
              let paids = 0;
              
              item.sales.forEach((sale) => {
                if (sale.sellerPaid && sale.providerPaid) paids ++;
                sellerTotalAmount += sale.sellerAmount;
                providerTotalAmount += sale.providerAmount;
              });
              
              if (paids === salesLength) finishedSales = true;
              
              return (
                <ListGroup.Item
                  className="d-flex align-items-center" 
                  key={item.id}
                  onClick={() => {
                    setSalesTableViewData(item);
                    openView(["home", "sales-table"]);
                  }}
                > 
                  <div className="p-2">
                    {/* Display the appropriate icon */}
                    { salesLength === 0 ?
                        <EmptyBlankIcon width="1.7em" fill="var(--bs-danger)"/>
                      : !finishedSales ?
                          <ClockIcon width="1.7em" fill="var(--bs-warning)"/>
                        : <CheckIcon width="1.7em" fill="var(--bs-success)"/>
                    }
                  </div>
                  <div className="d-flex flex-column">
                    <div className="fw-bold fs-6"> {getDayRelativityFormat(date)} </div>
                    <div className="fs-6"> {getUsualDateFormat(date)} </div>
                    <div className="fs-6">
                      {/* Display the sales information */}
                      { salesLength === 0 ?
                          <span className="text-danger"> ( Vacío ) </span>
                        : 
                          <div>
                            <span className={!finishedSales? "text-warning" : "text-success"}> Pagados: </span>
                            <span> {paids}/{salesLength} </span>
                          </div>
                      }
                    </div>
                  </div> 
                </ListGroup.Item>
              )
            })
          }
        </ListGroup>
        </div>
        
        <FloatingButton content="+" onClick={() => { 
            openView(["home", "add-sales-table"]);
        }}/>
      </View>
    )
}