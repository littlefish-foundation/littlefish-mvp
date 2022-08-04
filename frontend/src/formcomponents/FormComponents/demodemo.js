/*import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import ReactDOM from "react-dom";

import React, { useState, useEffect } from "react";

import { MultiSelect } from "primereact/multiselect";

import { CountryService } from "../service/CountryService";
import { NodeService } from "../service/NodeService";

const FloatLabelDemo = () => {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [nodes, setNodes] = useState(null);

  const [value12, setValue12] = useState(null);

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="card">
        <div className="p-fluid grid">
          <div className="field col-12 md:col-4">
            <span className="p-float-label">
              <MultiSelect
                inputId="multiselect"
                value={value12}
                options={cities}
                onChange={(e) => setValue12(e.value)}
                optionLabel="name"
              />
              <label htmlFor="multiselect">MultiSelect</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<FloatLabelDemo />, rootElement);
*/