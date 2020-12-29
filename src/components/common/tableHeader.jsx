import React, { Component } from "react";
class TableHeader extends Component {
  state = {};
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onhandleSort(sortColumn);
  };
  sortIcon = (Column) => {
    const { sortColumn } = this.props;
    if (Column.name !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.Columns.map((p) => (
            <th key={p.name || p.key} onClick={() => this.raiseSort(p.name)}>
              {p.title}
              {this.sortIcon(p)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
export default TableHeader;
