import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrentBookToViewedQueue,
  getBookDetails,
  setOpenModal,
} from "../redux/viewedSlice";

export default function ModalBook() {
  const book = useSelector((state) => state.currentBook);
  const latestBooks = useSelector((state) => state.latestBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentBookToViewedQueue(book));
  }, []);

  return (
    <div className="modal--block">
      <div className="modal--block-content">
        <button
          className="close cursor"
          onClick={() => dispatch(setOpenModal(false))}
        />
        <div className="book--block-modal">
          <img src={`${book.formats["image/jpeg"]}`} alt="" />
          <section className="book--info">
            <div className="padding--block">
              <h1>{book.title}</h1>
              <p>{book.authors.map((author) => author.name)}</p>
            </div>
            <ul className="bookshelves">
              {book.bookshelves.map((bookshelf) => (
                <li key={bookshelf}>{bookshelf}</li>
              ))}
            </ul>
          </section>
        </div>
        {latestBooks.length > 1 && (
          <div className="latest--block">
            <h1 className="intro">Latest views</h1>
            <Grid container spacing={4}>
              {latestBooks.map((b) => {
                return (
                  <Grid
                    key={b.id}
                    item
                    xs={3}
                    onClick={() => dispatch(getBookDetails(book.id))}
                  >
                    <div className="book--block book--block-latest">
                      <img src={`${b.formats["image/jpeg"]}`} alt="" />
                      <h1>{b.title}</h1>
                      <p>{b.authors.map((author) => author.name)}</p>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
