
import { useState, useEffect, useContext } from "react";
import { insertStyles } from "../utils/styles"
import { GlobalContext } from "./__context";
import { NavbarBackButton } from "ui/Navbar";
import ListGroup from "ui/ListGroup";
import View from "ui/View";
import Checkbox from "ui/Checkbox";
import FloatingButton from "ui/FloatingButton";

import HomeIcon from "../icons/HomeIcon";
import ReloadIcon from "../icons/ReloadIcon";
import CheckIcon from "../icons/CheckIcon";


// SalesTableView component displays a table of sales data
export default function SalesTableView({ show }) {
  const {
    openView,
    backView,
    salesTableViewData,
    updateSalesDayFromSalesTable,
  } = useContext(GlobalContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [showFinishedSales, setShowFinishedSales] = useState(true);
  
  /**
   * Reorder sales 
   */
  const reorderSales = () => {
    let sales = tableData.sales; 
    
    let reorderedSales = [
      ...sales.filter((sale) => sale.providerPaid && sale.sellerPaid),
      ...sales.filter((sale) => !(sale.providerPaid && sale.sellerPaid))
    ];
    tableData.sales = reorderedSales
    updateSalesDayFromSalesTable();
  }
  
  // Calculate total amount and set table data when salesTableViewData changes
  useEffect(() => {
    if (!salesTableViewData) return;

    let _totalAmount = 0;
    let _tableData = salesTableViewData;

    for (let sale of _tableData.sales) {
      _totalAmount += sale.providerAmount;
    }

    setTableData(_tableData);
    setTotalAmount(_totalAmount);
  }, [salesTableViewData]);

  // Generate table rows based on tableData
  let tableRows =
    !tableData ? [] :
    tableData.sales.map((sale) => {
      let finishedSale = sale.providerPaid && sale.sellerPaid;

      // Filter finished sales when showFinishedSales is false
      if (!showFinishedSales && finishedSale) return false;
      
      // Utils classes
      let badgeClass = `me-2 badge ${finishedSale ? "bg-success" : "bg-primary"}`;
      let checkGroupClass = "d-flex align-items-center justify-content-between";
      
      return (
        <tr key={sale.id}>
          <td className="border-end">
            {finishedSale && <CheckIcon fill="var(--bs-success)" width="1.2em"/> }
            {sale.providerId}
          </td>
          <td className="border-end">{sale.products}</td>
          
          <td className=" border-end">
            <label className={checkGroupClass}>
              <div className={badgeClass}> $ {sale.providerAmount} </div>
              <Checkbox
                checked={sale.providerPaid}
                color={finishedSale && "success"}
                onInput={(e) => {
                  sale.providerPaid = e.target.checked;
                  updateSalesDayFromSalesTable();
                }}
              />
            </label>
          </td>
          <td className="border-end">{sale.sellerId}</td>
          
          <td>
            <label className={checkGroupClass}>
              <div className={badgeClass}> $ {sale.sellerAmount} </div>
              <Checkbox
                checked={sale.sellerPaid}
                color={finishedSale && "success"}
                onInput={(e) => {
                  sale.sellerPaid = e.target.checked;
                  updateSalesDayFromSalesTable();
                }}
              />
            </label>
          </td>
        </tr>
      );
    });

  return (
    <View show={show}>
      <NavbarBackButton
        onClick={() => backView()}
        content="Tabla de venta"
        button={<HomeIcon width="1.5rem" fill="currentcolor" />}
      />

      <p className="ps-3 m-2 fs-3 fw-bold border-start border-3 border-primary rounded">
        Total: ${totalAmount}
      </p>

      <div className="fs-6 p-3 d-flex flex-column">
        <label className="p-1 d-flex align-items-center">
          <Checkbox
            checked={showFinishedSales}
            onInput={(e) =>setShowFinishedSales(e.target.checked)}
          />
          <span className="ms-1"> Mostrar ventas terminadas</span>
        </label>
        <label className="p-1 d-flex align-items-center">
          <button
            style={{ width: "1.2em", height: "1.2em" }}
            className="flex-center form-control p-0 me-1"
            onClick={reorderSales}
          >
            <ReloadIcon fill="currentcolor" width=".8rem" />
          </button>
          <span>Reorganizar</span>
        </label>
      </div>

      <div className="p-2 h-100 table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Proveedor</th>
              <th></th>
              <th></th>
              <th className="border-start">Gestor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { tableRows.length ? 
                tableRows
              : 
                <div className="text-warning align-center"> ( Tabla aún vacía ) </div>
            }
          </tbody>
        </table>
      </div>

      <FloatingButton
        content="+"
        onClick={() => {
          openView(["home", "sales-table", "add-sale"]);
        }}
      />
    </View>
  );
}