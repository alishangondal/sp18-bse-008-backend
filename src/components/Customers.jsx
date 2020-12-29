import React, { Component } from "react";
import { Dropdown } from "primereact/dropdown";
// import "./DropdownDemo.css";

export class DropdownDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity1: null,
    };

    this.cities = [
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ];

    this.onCityChange = this.onCityChange.bind(this);
  }

  onCityChange(e) {
    this.setState({ selectedCity1: e.value });
  }

  render() {
    return (
      <div class="navbar">
        <div className="dropdown-demo">
          <div className="card">
            <Dropdown
              value={this.state.selectedCity1}
              options={this.cities}
              onChange={this.onCityChange}
              optionLabel="name"
              placeholder="Select a City"
            />
          </div>
        </div>
      </div>
    );
  }
}
