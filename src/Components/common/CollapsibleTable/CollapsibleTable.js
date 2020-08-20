import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { transformHeader, stableSort, getComparator } from './tableUtils';
import { transformToLabel } from 'utils/utils';
import EditableCell from 'Components/common/EditableCell/EditableCell';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxHeight: '425px',
  },
  mainRow: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 675,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const Row = (props) => {
  const { row, collapseLabel, columnProperties, updateFunction } = props;
  const { collapse_content, ...rowData } = row;
  const collapseContentKey = Object.keys(collapse_content)[0];
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.mainRow}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {Object.keys(rowData).map((key, index) => {
          let currentColumnProperty =
            columnProperties.find((property) => {
              return property.id === key;
            }) || undefined;
          let cellValue = rowData[key];
          return (
            <TableCell key={index}>
              {currentColumnProperty && currentColumnProperty.editable ? (
                <EditableCell
                  dataKey={key}
                  value={cellValue}
                  dataId={rowData.id}
                  updateFunction={updateFunction}
                />
              ) : (
                cellValue
              )}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {collapseLabel ?? transformToLabel(collapseContentKey)}
              </Typography>
              <Typography>{collapse_content[collapseContentKey]}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const SortableTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort, tableHeaders } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {tableHeaders.map((tableHeader) => (
          <TableCell
            key={tableHeader.id}
            align={tableHeader.numeric ? 'right' : 'left'}
            padding={tableHeader.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === tableHeader.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === tableHeader.id}
              direction={orderBy === tableHeader.id ? order : 'asc'}
              onClick={createSortHandler(tableHeader.id)}
            >
              {tableHeader.label}
              {orderBy === tableHeader.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default function CollapsibleTable(props) {
  const {
    tableData,
    columnProperties,
    collapseLabel,
    rowsPerPageOptions,
    updateFunction,
  } = props;
  const { collapse_content, ...tableProperties } = tableData[0];
  const tableKeys = Object.keys(tableProperties);
  const tableColumnProperties = columnProperties ?? transformHeader(tableKeys);
  const tableRowPerPage = rowsPerPageOptions ?? [5, 10, 25];

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <SortableTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            tableHeaders={tableColumnProperties}
          />
          <TableBody>
            {stableSort(tableData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <Row
                    key={row.id}
                    row={row}
                    collapseLabel={collapseLabel}
                    columnProperties={tableColumnProperties}
                    updateFunction={updateFunction}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>{' '}
      <TablePagination
        rowsPerPageOptions={tableRowPerPage}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

CollapsibleTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableHeaders: PropTypes.array,
  collapseLabel: PropTypes.string,
  rowsPerPageOptions: PropTypes.array,
  updateFunction: PropTypes.func,
};
