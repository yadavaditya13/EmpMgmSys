import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
 
 
// const userData = [
//   { name: "Last Name" },
//   { name: "First Name" },
//   { name: "email" },
//   { name: "Address" },
//   { name: "Phone Number" },
//   { name: "DOB" },
//   { name: "DOJ" },
//   { name: "Base Location" },
//   { name: "Manager" },
//   { name: "rahul" }
// ];
 
function FilterTableDataComponent({filters,setFilters}) {
  // var filters = props.filters;
  // var setFilters = props.setFilters;
  const [isFiterOptnsVisible, setFilterOptnsVisibility] = useState(false);
 console.log("-----------------------this is  a dummy line");
//  console.log(props);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "Select All") {
      let tempUser = filters.map((user) => {
        return { ...user, isChecked: checked };
      });
      setFilters(tempUser);
    } else {
      let tempUser = filters.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setFilters(tempUser);
    }
  };
 
  return (
    
    <div className="filter-container" style={{display:"block"}}>
        <button type="button" className="btn btn-primary"  onClick= { () => {isFiterOptnsVisible? setFilterOptnsVisibility(false):setFilterOptnsVisibility(true)}}>{isFiterOptnsVisible?"OK":"Filter"}</button>
      {isFiterOptnsVisible && <form className="form" style={{position:"absolute"}}>
        
        
        {filters.map((user) => (<div style={{background:"grey", color:"white"}}>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name={user.name}
              checked={user?.isChecked || false}
              onChange={handleChange}
            />
            <label className="form-check-label ms-2">{user.name}</label>
          </div></div>
        ))}
      </form>
      }
    </div>
  );
}
 
export default FilterTableDataComponent;