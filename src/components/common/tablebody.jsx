import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  state = {};
  renderColumn = (genre, movie) => {
    if (genre.content) return genre.content(movie);
    return _.get(movie, genre.name);
  };

  render() {
    const { movies, Columns } = this.props;
    return (
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            {Columns.map((genre) => (
              // <Link></Link>
              <td key={genre.name || genre.key}>
                {this.renderColumn(genre, movie)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
