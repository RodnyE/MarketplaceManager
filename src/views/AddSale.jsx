
import { useState, useContext, useEffect, useRef } from "react"
import cloneDeep from 'lodash/cloneDeep';
import { GlobalContext } from "./__context"
import { Sale, updateSalesDay } from "../logic/sales-manager"

import View from "ui/View"
import TextField from "ui/TextField"
import { NavbarBackButton } from "ui/Navbar"
import FloatingButton from "ui/FloatingButton"
import SaveIcon from "../icons/SaveIcon"

const defaultFieldsValues = [
    {label: "Productos", value: "", ph: "Chancletas, pulovers..."},
    {label: "Proveedor", value: "", ph: "Tienda #2"},
    {label: "Monto", value: "", ph: "5000", type: "number"},
    {label: "Gestor", value: "", ph: "Anita González"},
    {label: "Pago", value: "", ph: "250", type: "number"},
];

export default function AddSaleView ({show}) {
    const { 
        openView, 
        backView,
        salesTableViewData,
        setSalesTableViewData,
    } = useContext(GlobalContext);
    const [fieldsCheck, setFieldsCheck] = useState(false);
    const [fieldsValues, setFieldsValues] = useState(cloneDeep(defaultFieldsValues));
    const formRef = useRef(null);
    
    const handleSaveClick = () => {
        
        // check all fields 
        let correctFieldsCheck = true;
        for (let field of fieldsValues) {
            if (field.value) continue
            correctFieldsCheck = false;
            break;
        }
        
        // missing fields
        if (!correctFieldsCheck) {
            setFieldsCheck(true);
            return;
        }
        
        // success !
        let sale = new Sale(
            fieldsValues[0].value,
            fieldsValues[1].value,
            parseInt(
                fieldsValues[2].value
            ),
            fieldsValues[3].value,
            parseInt(
                fieldsValues[4].value
            ),
        );
        
        salesTableViewData.sales.push(sale);
        updateSalesDay(
            salesTableViewData.id,
            salesTableViewData,
        );
        setFieldsCheck(false);
        setSalesTableViewData(
            cloneDeep(salesTableViewData)
        );
        setFieldsValues(
            cloneDeep(defaultFieldsValues)
        );
        backView(); 
    }
    
    useEffect(() => {
        if (show) {
            let form = formRef.current;
            let firstInput = form.querySelector("input");
        
            if (firstInput) firstInput.focus();
        }
    }, [show]);
    
    return (
      <View show={show}>
        <NavbarBackButton
          onClick={() => backView()}
          content="Tabla de venta: Añadir"
        />
        
        {/* Form */}
        <div 
          className="p-3 d-flex flex-column justify-content-center"
          ref={formRef} 
        > 
          {
            fieldsValues.map((field, key) => ( 
              <div 
                className="form-group" 
                key={key}
              >
                <label> {field.label}: </label>
                <TextField 
                  value={field.value} 
                  key={key}
                  type={field.type || "text"}
                  color={fieldsCheck && (!field.value ? "danger" : false)}
                  placeholder={field.ph}
                  onInput={(e) => {
                    fieldsValues[key].value = e.target.value;
                    setFieldsValues(cloneDeep(fieldsValues)); 
                  }}
                />
              </div>
            ))
          } 
        </div>
        
        {/* Save button */}
        <FloatingButton onClick={handleSaveClick}>
           <SaveIcon width="1.5rem" fill="currentcolor"/>
        </FloatingButton>
      </View>
    )
}