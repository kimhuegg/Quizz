import React, {
    useEffect,
    useState
} from 'react'
import ReactPaginate from 'react-paginate';

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

function Items({ currentItems, updateQuestion, deleteQuestion }) {
    return (
        <>
            {currentItems && currentItems.map((item, index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {index + 1}     </TableCell>
                    <TableCell align="left">{item.question}</TableCell>
                    <TableCell align="right">{item.answer1}</TableCell>
                    <TableCell align="right">{item.answer2}</TableCell>

                    <TableCell align="right">{item.answer3}</TableCell>
                    <TableCell align="right">{item.answer4}</TableCell>
                    <TableCell align="right">
                        <Button onClick={updateQuestion} value={index}>Edit</Button>
                    </TableCell>
                    <TableCell align="right">
                        <Button onClick={deleteQuestion} value={item.id}>Delete</Button>
                    </TableCell>

                </TableRow>
            ))}
        </>
    );
}

function QuestionTable({ itemsPerPage, items, deleteQuestion, updateQuestion }) {
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


    return (
        <>
            <TableContainer sx={{ p: 2, mt: 2, minWidth: 300, border: '3px dashed grey', borderRadius: 5 }}>

                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="left">Question</TableCell>
                            <TableCell align="right">Answer</TableCell>
                            <TableCell align="right">Answer</TableCell>
                            <TableCell align="right">Answer</TableCell>
                            <TableCell align="right">Answer</TableCell>
                            <TableCell align="right">action</TableCell>
                            <TableCell align="right">action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Items currentItems={currentItems} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} />
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

export default QuestionTable;
