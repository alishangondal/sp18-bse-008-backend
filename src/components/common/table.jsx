import React from "react";
import TableBody from "./tablebody";
import TableHeader from "./tableHeader";
const Table = ({
  movies,
  Columns,
  onhandelike,
  onhandleDelete,
  sortColumn,
  handleSort,
}) => {
  return (
    <table className="table">
      <TableHeader
        Columns={Columns}
        sortColumn={sortColumn}
        onhandleSort={handleSort}
      />
      <TableBody
        movies={movies}
        onhandelike={onhandelike}
        onhandleDelete={onhandleDelete}
        Columns={Columns}
      />
    </table>
  );
};

export default Table;
