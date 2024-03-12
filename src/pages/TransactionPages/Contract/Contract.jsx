// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useContract } from "../../../contexts/ContractContext";
import AddButton from "../../../components/atoms/AddButton";
import ConfirmationDialog from "../../../components/atoms/ConfirmationDialog";
import "../../../App.css";

const Contract = () => {
  const [contract, setContract] = useState([]);
  const [currentTable, setCurrentTable] = useState("");
  const { departments,vendors,properties,migration,roles,rent_contracts,schedule } = useContract();
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    onCancel: null,
    onConfirm: null,
  });

const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (name === "table" && value != null) {
    setCurrentTable(value); // Set the current table name here
    const apiUrl = `http://localhost:5050/${value}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setContract(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  } else {
    setContract([]);
    setCurrentTable(""); // Reset the current table if the selection is cleared
  }
};


  const handleAddButtonClick = () => {
    // showConfirmationDialog(
    //   "Add Confirmation",
    //   "Are you sure you want to add?",
    //   closeConfirmationDialog,
    //   () => {
        add();
    //     closeConfirmationDialog();
    //   }
    // );
  };

  const showConfirmationDialog = (title, message, onCancel, onConfirm) => {
    setConfirmationDialog({
      isOpen: true,
      title,
      message,
      onCancel,
      onConfirm,
    });
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialog({
      isOpen: false,
      title: "",
      message: "",
      onCancel: null,
      onConfirm: null,
    });
  };
const add = () => {
  console.log("currentTable:", currentTable);

  if (currentTable === "departments") {
    departments(contract);
  } else if(currentTable === "vendors") {
    vendors(contract);
  } else if(currentTable === "properties") {
    properties(contract);
  } else if(currentTable === "migration") {
    migration(contract);
  } else if(currentTable === "roles") {
    roles(contract);
  } else if (currentTable === "contract") {
    rent_contracts(contract);
  } else if(currentTable === "payment_schedules") {
    schedule(contract);
  }
};


  const renderTableHeadings = () => {
    if (contract.length === 0) return null;

    const headings = Object.keys(contract[0]);

    return (
      <thead
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <tr>
          {headings.map((heading) => (
            <th key={heading} className="px-2 py-2">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  return (
    <div className=" overflow-auto ">
      <div className="flex items-center justify-center ">
        <div className="rounded-md shadow-md w-full h-full bg-slate-800 text-white">
          <div className="px-2 py-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="title">{currentTable}</h3>
              <div className="flex items-center">
                <select
                  name="table"
                  onChange={(e) => handleInputChange(e)}
                  className="search w-full border border-gray-300 rounded-lg text-black"
                >
                  <option value="">Select an option</option>
                  <option value="contract">rent_contracts</option>
                  <option value="departments">departments</option>
                  <option value="properties">properties</option>
                  <option value="vendors">vendors</option>
                  <option value="users">users</option>
                  <option value="roles">roles</option>
                  <option value="reports">reports</option>
                  <option value="personal_access_tokens">personal_access_tokens</option>
                  <option value="payment_schedules">payment_schedules</option>
                  <option value="password_resets">password_resets</option>
                  <option value="migration">migration</option>
                  <option value="menu_role_permissions">menu_role_permissions</option>
                  <option value="menus">menus</option>
                  <option value="failed_jobs">failed_jobs</option>
                  <option value="current_month_rents">current_month_rents</option>
                  </select>

                <AddButton onClick={handleAddButtonClick} />
              </div>
            </div>

            <div className=" table-container-small">
              <table className="w-full table">
                {renderTableHeadings()}
                <tbody>
                  {contract.map((contractItem, index) => (
                    <tr
                      key={contractItem.$id}
                      className={`text-center ${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                      } hover:bg-gray-600 transition-colors duration-300 cursor-pointer`}
                      style={{ marginBottom: "10px" }}
                    >
                      {Object.values(contractItem).map((value, columnIndex) => (
                        <td key={columnIndex} className="px-2 py-2">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ConfirmationDialog {...confirmationDialog} />
        </div>
      </div>
    </div>
  );
};

export default Contract;
