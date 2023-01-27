import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import MediaItems from './MediaItems';
import { useTranslation } from 'next-i18next';
export default function Pageination({ media }) {
  const [currentItems, setCurrentItems] = useState(null);
  const itemsPerPage = 9
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedPage, setSelectedPage] = useState()
  const { t } = useTranslation('common');
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(media.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(media.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,media]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % media.length;
    setItemOffset(newOffset);
    // setSelectedPage(event.selected)
  };
  const handlePageClickFirstLast = (offsetNumber,selectedOne) => {
    setItemOffset(offsetNumber);
    setSelectedPage(selectedOne)
  };

  return (
    <>
      <div className='news'>
        <MediaItems currentItems={currentItems} />
      </div>
      <div className='paginate-bar'>
        {selectedPage != 0 && <div className='last-button' onClick={(e) => { handlePageClickFirstLast(0,0) }}>
          <span>{`<<`}</span> {t('investor.first')}
        </div>}
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          lastLabel="last"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={0}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          forcePage={selectedPage}
          selected={selectedPage}
          initialSelected={selectedPage}
        />
        {selectedPage != pageCount - 1 && <div className='last-button' onClick={() => { handlePageClickFirstLast(((pageCount-1)* itemsPerPage) % media.length,pageCount-1) }}
          >
          {t('investor.last')} <span>{`>>`}</span>
        </div>}
      </div>
    </>
  );
}