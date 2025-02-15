import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.scss";
import { Row } from "react-bootstrap";
const PaginationComponent = ({
  itemsPerPage,
  fetchData,
  renderItem,
  loader = "Loading...",
}) => {
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAndSetData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchData(); // Fetch data using provided function
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetData();
  }, [fetchData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  // Handle pagination
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [items, itemOffset, itemsPerPage]);

  return (
    <>
      {isLoading ? (
        <div>{loader}</div>
      ) : (
        <div className="container">
          <Row>
          {currentItems.map((item, index) => renderItem(item, index))}
          </Row>
        </div>
      )}
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};

export default PaginationComponent;
