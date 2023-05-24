import React from 'react';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';
import {  useSelector } from 'react-redux';
import { useState } from 'react';

const CardsContainer = ({currentPage, setCurrentPage}) => {
  const { countries } = useSelector((state) => state);
  
  const [countriesPerPage] = useState(10);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const countriesToShow = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

   const totalPages = Math.ceil(countries.length / countriesPerPage);
   
   
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Prev page
  const handlePrevPage = () => {
    if (currentPage > 1) paginado(currentPage - 1);
  };

  // Next page
  const handleNextPage = () => {
    if (currentPage < totalPages) paginado(currentPage + 1);
  };

  // First Page
  const handleFirstPage = () => {
    if (currentPage !== 1) paginado(1);
  };

  // Last Page
  const handleLastPage = () => {
    if (currentPage !== totalPages) paginado(totalPages);
  };

  const pageNumbers = [];
   const maxPagesView = 7;
   let startPage = Math.max(1, currentPage - Math.floor(maxPagesView / 2));
   let endPage = Math.min(totalPages, startPage + maxPagesView - 1);

   if (endPage - startPage + 1 < maxPagesView) startPage = Math.max(1, endPage - maxPagesView + 1);
   
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.container}>
      <div>
        <div className={style.cardsSection}>
          {countriesToShow.map((country) => (
            <Card
              key={country.id}
              id={country.id}
              flags={country.flags}
              name={country.name}
              continent={country.continent}
            />
          ))}
        </div>

        <div className={style.pageSection}>
          <nav className={style.contpag}>
            <ul>
              <button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                className={style.buttonPag}
              >
                first
              </button>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={style.buttonPag}
              >
                prev
              </button>
              {pageNumbers &&
                pageNumbers.map((number) => (
                  <button
                    className={`${style.buttonPag} ${
                      currentPage === number ? style.active : ''
                    }`}
                    key={number}
                    onClick={() => paginado(number)}
                  >
                    {number}
                  </button>
                ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={style.buttonPag}
              >
                next
              </button>
              <button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                className={style.buttonPag}
              >
                last
              </button>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;


