import React, {
    useEffect,
    useState
} from 'react'
import ReactPaginate from 'react-paginate';
import './navi.css'

import {
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter

} from '@mui/material';

import Button from '@mui/material/Button';


// const items = [...Array(33).keys()];

function Items({ currentItems, onEdit }) {
    return (
        <>
            {currentItems && currentItems.map((item, index) => (
                <TableRow
                    key={index + 1}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                    <TableCell align="left">{item.username}</TableCell>
                    <TableCell align="left">{item.email}</TableCell>
                    <TableCell align="right">{String(item.isEmailVerified)}</TableCell>
                    <TableCell align="right">
                        <Button onClick={onEdit} value={index}>Edit</Button>
                    </TableCell>
                    {/* <TableCell align="right">
                    <Button onClick={deleteUser} value={item.id}>Delete</Button>
                </TableCell> */}
                </TableRow>
            ))}
        </>
    );
}

function UserTable({ itemsPerPage, items, onEdit }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    // const headerLabel = Object.keys(items[0])
    // console.log(headerLabel)

    return (
        <>
            <TableContainer sx={{ p: 2, minWidth: 300, mt: 2, border: '3px dashed grey', borderRadius: 5 }}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="left">Username</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="right">Verify</TableCell>
                            <TableCell align="right">Action</TableCell>
                            {/* <TableCell align="right">Action</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Items currentItems={currentItems} onEdit={onEdit} />
                    </TableBody>
                </Table>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </TableContainer>
        </>
    );
}

export default UserTable;
