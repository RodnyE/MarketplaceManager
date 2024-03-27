import { useState, useContext } from "react";
import { GlobalContext } from "./__context";
import { SalesDay, addSalesDay } from "../logic/sales-manager";
import View from "ui/View";
import TextField from "ui/TextField";
import { NavbarBackButton } from "ui/Navbar";
import FloatingButton from "ui/FloatingButton";
import SaveIcon from "../icons/SaveIcon";
import HomeIcon from "../icons/HomeIcon";

/**
 * Displays a form for adding a new sales day.
 * @param {Object} props - Component properties.
 * @param {function} props.show - Function to control the visibility of the view.
 */
export default function AddSalesDayView({ show }) {
  const { openView, backView } = useContext(GlobalContext);
  const [dayField, setDayField] = useState("");
  const [dayFieldColor, setDayFieldColor] = useState(null);
  const [descField, setDescField] = useState("");

  /**
   * Create a new sales day and save it to the database.
   */
  const handleSaveClick = () => {
    const salesDay = new SalesDay(dayField, descField);

    if (!dayField) {
      setDayFieldColor("danger");
      return;
    }

    addSalesDay(salesDay);
    openView(["home", "loading"]);
    setDayField("");
    setDescField("");
    setDayFieldColor(null);
    setTimeout(() => backView(), 500);
  };

  return (
    <View show={show}>
      <NavbarBackButton 
        onClick={() => backView()}
        content="Nueva Tabla"
        button={ <HomeIcon fill="currentcolor" width="1.5rem"/> }
      />
      <div className="p-3 d-flex flex-column justify-content-center">
        <div className="form-group">
          <label> Fecha: </label>
          <TextField 
            value={dayField}
            type="date"
            color={dayFieldColor}
            onInput={(e) => {
              setDayField(e.target.value);
              setDayFieldColor("success");
            }}
          />
        </div>
        <div className="form-group">
          <label> Info: </label>
          <TextField 
            value={descField}
            placeholder="Un día común y corriente..."
            onInput={(e) => setDescField(e.target.value)}
          />
        </div>
      </div>
      
      <FloatingButton 
        onClick={handleSaveClick}
        content={<SaveIcon width="1.5rem" fill="currentcolor"/>}
      /> 
    </View>
  );
}