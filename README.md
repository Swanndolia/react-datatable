Table ComponenReact Table Component
This is a reusable table component for React that allows you to display, sort, filter, and paginate tabular data.
Features
Sort table columns in ascending or descending order
Filter table rows by searching for a specific keyword
Paginate table rows to display a limited number of rows per page
Customize the table header and footer
Pass in data and column names as props
Usage
Install the component using npm:
css
Copy code
npm install --save react-table-component
Import the component into your React application:
js
Copy code
import { Table } from 'react-table-component';
Render the component in your JSX code:
jsx
Copy code
const data = [
  { name: 'John Doe', age: 32, city: 'New York' },
  { name: 'Jane Doe', age: 28, city: 'Los Angeles' },
  { name: 'Bob Smith', age: 45, city: 'Chicago' },
  { name: 'Mary Johnson', age: 37, city: 'Houston' }
];

const tableHead = ['Name', 'Age', 'City'];

return (
  <Table
    data={data}
    tableHead={tableHead}
    showHeader={true}
    showFooter={true}
  />
);
Props
`datadata (required): An array of objects representing the data to be displayed in the table.
`tableHeadtableHead (required): An array of strings representing the names of the table columns.
showHeader (optional, default: true): A boolean value indicating whether to display the table header.
showFooter (optional, default: true): A boolean value indicating whether to display the table footer.
rowsPerPage (optional, default: 10): A number representing the maximum number of rows to display per page.
handleRowClick (optional): A function to handle row click events.
customClasses (optional): An object containing custom CSS classes for the table, header, and footer.
customStyles (optional): An object containing custom CSS styles for the table, header, and footer.
License
This component is open-source and free to use under the MIT license. See the LICENSE file for more information.This project is licensed under the MIT License. See the LICENSE file for details.This project is licensed under the MIT License. See the LICENSE file for details.
