import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";
class MoviesTable extends Component {
  Columns = [
    {
      name: "title",
      title: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { name: "genre.name", title: "Genre" },
    { name: "numberInStock", title: "Stock" },
    { name: "dailyRentalRate", title: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onhandelike(movie)}
        />
      ),
    },
  ];

  deleteColumn = () => {
    return {
      key: "chumi",
      content: (movie) => (
        <button
          onClick={() => this.props.onhandleDelete(movie)}
          className="btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    };
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.Columns.push(this.deleteColumn());
  }
  render() {
    const {
      movies,
      filtered,
      onhandelike,
      onhandleDelete,
      sortColumn,
      handleSort,
    } = this.props;

    return (
      <div>
        <h6>There are {filtered.length} movies</h6>
        <Table
          Columns={this.Columns}
          movies={movies}
          onhandelike={onhandelike}
          onhandleDelete={onhandleDelete}
          sortColumn={sortColumn}
          handleSort={handleSort}
        />
      </div>
    );
  }
}

export default MoviesTable;
