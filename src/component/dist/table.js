import { useState, useEffect, useRef } from 'react';
import React from 'react';
export const Table = ({
  data,
  showHeader,
  showFooter,
  tableHead
}) => {
  const [columns, setColumns] = useState([]);
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState({
    column: '',
    ascending: true
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    if (sortedData.length > 0) {
      setColumns(Object.keys(sortedData[0]));
    }
  }, [sortedData]);
  useEffect(() => {
    const searchQueryParts = searchQuery.toLowerCase().split(' ');
    const filteredDataCopy = sortedData.filter(employee => searchQueryParts.every(part => Object.values(employee).some(value => value.toString().toLowerCase().includes(part))));
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const currentData = filteredDataCopy.slice(start, end);
    setFilteredData(currentData);
  }, [searchQuery, sortedData, currentPage, rowsPerPage]);
  const Header = () => {
    const searchInputRef = useRef(null);
    useEffect(() => {
      searchInputRef.current.focus();
    });
    if (showHeader) {
      return /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("span", null, "Show", /*#__PURE__*/React.createElement("select", {
        value: rowsPerPage,
        onChange: e => setRowsPerPage(Number(e.target.value))
      }, /*#__PURE__*/React.createElement("option", {
        value: "10"
      }, "10"), /*#__PURE__*/React.createElement("option", {
        value: "25"
      }, "25"), /*#__PURE__*/React.createElement("option", {
        value: "50"
      }, "50"), /*#__PURE__*/React.createElement("option", {
        value: "100"
      }, "100")), "entries"), /*#__PURE__*/React.createElement("span", null, "Search:", /*#__PURE__*/React.createElement("input", {
        type: "text",
        value: searchQuery,
        onChange: e => setSearchQuery(e.target.value),
        ref: searchInputRef
      })));
    }
  };
  const Footer = () => {
    if (showFooter) {
      const totalPages = Math.ceil(data.length / rowsPerPage);
      const pageButtons = [];
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push( /*#__PURE__*/React.createElement("button", {
          key: i,
          onClick: () => setCurrentPage(i),
          className: i === currentPage ? 'active' : ''
        }, i));
      }
      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("span", null, "Showing ", start + 1, " to ", end > data.length ? data.length : end, " of ", data.length, " entries"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        onClick: () => setCurrentPage(currentPage - 1),
        disabled: currentPage === 1
      }, "Previous"), pageButtons, /*#__PURE__*/React.createElement("button", {
        onClick: () => setCurrentPage(currentPage + 1),
        disabled: currentPage === totalPages
      }, "Next")));
    }
  };
  function handleSort(index) {
    const column = Object.keys(sortedData[0])[index];
    let ascending = sortOrder.column === column ? !sortOrder.ascending : true;
    const sortedDataCopy = [...sortedData].sort((a, b) => ascending ? a[column] < b[column] ? -1 : 1 : a[column] > b[column] ? -1 : 1);
    setSortedData(sortedDataCopy);
    setSortOrder({
      column,
      ascending
    });
    setSearchQuery('');
  }
  ;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("table", {
    id: "employee-list"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, tableHead.map((column, index) => /*#__PURE__*/React.createElement("th", {
    onClick: () => {
      if (sortedData[0]) {
        handleSort(index);
      }
    },
    key: index
  }, column, sortedData[0] && sortOrder.column === Object.keys(sortedData[0])[index] && (sortOrder.ascending ? ' ' : ' '))))), /*#__PURE__*/React.createElement("tbody", null, filteredData.map((employee, index) => /*#__PURE__*/React.createElement("tr", {
    key: index
  }, columns.map((column, index) => /*#__PURE__*/React.createElement("td", {
    key: index
  }, employee[column])))))), /*#__PURE__*/React.createElement(Footer, null));
};