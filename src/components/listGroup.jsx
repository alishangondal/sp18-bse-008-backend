import React, { Component } from "react";
class ListGroup extends Component {
  state = {};
  render() {
    const {
      textProperty,
      valueProperty,
      onItemSelected,
      selectedGenre,
    } = this.props;
    return (
      <ul className="list-group">
        {this.props.items.map((genre) => (
          <li
            onClick={() => onItemSelected(genre)}
            key={genre[valueProperty]}
            className={
              genre === selectedGenre
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {genre[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
