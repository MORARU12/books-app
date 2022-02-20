import Grid from "@mui/material/Grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, BOOKS_PER_PAGE } from "../constants";
import { getBookDetails } from "../redux/viewedSlice";
import ReactPaginate from "react-paginate";
import ModalBook from "./ModalBook";
import "../assets/style/index.scss";

function BooksPage() {
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const openModal = useSelector((state) => state.openModal);

  useEffect(() => {
    getBooks(1).then((data) => {
      setPageCount(parseInt(Math.ceil(data.count / BOOKS_PER_PAGE)));
    });
  }, []);

  const getBooks = async (page) => {
    const booksResponse = await axios.get(`${API_URL}/books?page=${page}`);
    setBooks(booksResponse.data.results);
    window.scrollTo(0, 0);
    return booksResponse.data;
  };

  const handlePageClick = (event) => {
    const page = event.selected + 1;
    getBooks(page);
  };

  return (
    <>
    {openModal && <ModalBook />}
    <div className="app--block">

      {/* Header/Logo */}
      <header>
        <img
          src="https://biblioteca.url.edu.gt/wp-content/uploads/2020/11/logo-project_gutenberg.png"
          alt=""
        />
      </header>
      
      {/* LIST OF BOOKS */}
      <Grid container spacing={4}>
        {books.length > 0 &&
          books.map((book) => (
            <Grid
              key={book.id}
              item
              xs={4}
              sm={3}
              onClick={() => dispatch(getBookDetails(book.id))}
            >
              <div className="book--block cursor">
                <img src={book.formats["image/jpeg"]} alt="" />
                <h1>{book.title}</h1>
                <p>{book.authors.map((author) => author.name)}</p>
              </div>
            </Grid>
          ))}
      </Grid>

      <ReactPaginate
        className="pagination"
        breakLabel="-"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={1}
      />
    </div>
    </>
  );
}

export default BooksPage;
