import { useState, useEffect, useRef } from 'react';
import React from 'react';

export const Table = ({ data, showHeader, showFooter, tableHead }) => {
    const [columns, setColumns] = useState([]);
    const [sortedData, setSortedData] = useState(data);
    const [sortOrder, setSortOrder] = useState({ column: '', ascending: true });
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
        const filteredDataCopy = sortedData.filter((employee) =>
            searchQueryParts.every((part) =>
                Object.values(employee).some((value) =>
                    value.toString().toLowerCase().includes(part)
                )
            )
        );
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
            return (
                <header>
                    <span>
                        Show
                        <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        entries
                    </span>
                    <span>
                        Search:<input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} ref={searchInputRef} />
                    </span>
                </header>
            );
        }
    };

    const Footer = () => {
        if (showFooter) {
            const totalPages = Math.ceil(data.length / rowsPerPage);
            const pageButtons = [];
            for (let i = 1; i <= totalPages; i++) {
                pageButtons.push(
                    <button key={i} onClick={() => setCurrentPage(i)} className={i === currentPage ? 'active' : ''}>
                        {i}
                    </button>
                );
            }
            const start = (currentPage - 1) * rowsPerPage;
            const end = start + rowsPerPage;

            return (
                <footer>
                    <span>Showing {start + 1} to {end > data.length ? data.length : end} of {data.length} entries</span>
                    <div>
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        {pageButtons}
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </footer>
            );
        }
    };

    function handleSort(index) {
        const column = Object.keys(sortedData[0])[index];
        let ascending = sortOrder.column === column ? !sortOrder.ascending : true;
        const sortedDataCopy = [...sortedData].sort((a, b) =>
            ascending ? (a[column] < b[column] ? -1 : 1) : a[column] > b[column] ? -1 : 1
        );
        setSortedData(sortedDataCopy);
        setSortOrder({ column, ascending });
        setSearchQuery('');
    };

    return (
        <>
            <Header />
            <table id="employee-list">
                <thead>
                    <tr>
                        {tableHead.map((column, index) => (
                            <th onClick={() => { if (sortedData[0]) { handleSort(index) } }} key={index}>
                                {column}

                                {sortedData[0] && sortOrder.column === Object.keys(sortedData[0])[index] && (
                                    sortOrder.ascending ? ' ' : ' '
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((employee, index) => (
                        <tr key={index}>
                            {columns.map((column, index) => (
                                <td key={index}>{employee[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </>
    );
};
