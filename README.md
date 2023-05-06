Employee List Table

This is a simple employee list table React component that allows sorting, searching, and pagination. It accepts an array of objects as data prop and an array of strings as tableHead prop to define the table header columns. You can optionally show or hide the table header and footer by setting the showHeader and showFooter props to true or false. The number of rows to show per page can be set using the rowsPerPage prop.

Usage

To use the component, simply import it and render it in your component, passing the required props.

jsx

import { Table } from './Table';

<pre>
const employeeData = [
  { id: 1, name: 'John Doe', age: 32, department: 'Sales' },
  { id: 2, name: 'Jane Doe', age: 27, department: 'Marketing' },
  { id: 3, name: 'Bob Smith', age: 45, department: 'IT' },
  { id: 4, name: 'Mary Johnson', age: 38, department: 'Finance' },
  // ... more employees
];
</pre>

const tableHead = ['ID', 'Name', 'Age', 'Department'];

<pre>
function App() {
  return (
    <div>
       (
    Employee<div>Employee List
      <h1>Employee List</h1>
      <Table
        data={employeeData}
        tableHead={tableHead}
        showHeader={true}
        showFooter={true}
        rowsPerPage={10}
      />
    </div>
  );
}
</pre>

Props
The following props are available:

-data (required): An array of objects representing the employee data to be displayed in the table. Each object should have the same keys.

-tableHead (required): An array of strings representing the table header columns. The number of columns should match the number of keys in each object in the data array.

-showHeader (optional): A boolean value indicating whether to show the table header. Default is true.

-showFooter (optional): A boolean value indicating whether to show the table footer with pagination. Default is true.

-rowsPerPage (optional): An integer value representing the number of rows to show per page. Default is 10.

Features
The component has the following features:

-Sorting: Click on a table header to sort the table data by that column. Click again to toggle between ascending and descending order.

-Searching: Type a search query in the search box to filter the table data by any column. The search is case-insensitive and supports partial matches.

-Pagination: The table is split into pages with a fixed number of rows per page. Use the page navigation buttons to move between pages.

License

This component is released under the MIT License. See LICENSE file for details.
