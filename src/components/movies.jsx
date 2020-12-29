import React, { Component } from "react";
import { getMovies, deleteMovie } from "./../services/movieService";
import _ from "lodash";
import Pagination from "./common/pagination";
import { Paginate } from "./../utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviestable";
import { Link } from "react-router-dom";
import SearchBox from "./common/search";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null,
    // selectedGenre: { name: "Action" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres: [{ _id: "", name: "All Genres" }, ...data],
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = [...this.state.movies];
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast("This has already been deleted");
      this.setState({ movies: originalMovies });
    }
  };
  handelike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelected = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = Paginate(sorted, currentPage, pageSize);
    return { filtered, movies };
  };

  render() {
    const { length } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    if (length === 0) return <h1>There is no movies</h1>;
    const { filtered, movies } = this.getPageData();
    const { user } = this.props;
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            onItemSelected={this.handleGenreSelected}
            selectedGenre={selectedGenre}
          />
        </div>
        <div className="col">
          {user && (
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            filtered={filtered}
            onhandelike={this.handelike}
            onhandleDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            handleSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            onPageChange={this.handlePageChange}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
