import * as React from 'react';
import Head from 'next/head'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from "next/link";
import { FormattedMessage } from "react-intl";

function createData(name, firstYear, secondYear, thirdYear, fourYear,fiveYear) {
  return { name, firstYear, secondYear, thirdYear, fourYear,fiveYear };
}

const rows = [
  createData('Price (GBP)', "£99", "£180", "£250", "£325","£400"),
  createData('Cleaning Service', "1 per year", "1 per year", "1 per year", "1 per year","1 per year"),
  createData('Stone Tightening', "1 per year", "1 per year", "1 per year", "1 per year","1 per year"),
  createData('Earring Repairs', "1 per year", "1 per year", "1 per year", "1 per year","1 per year"),
  createData('Chain and Bracelet Soldering',"1 per year", "1 per year", "1 per year", "1 per year","1 per year"),
  createData('Cleaning Service', "1 per year", "1 per year", "1 per year", "1 per year","1 per year"),
  createData('Stone Tightening', "1 per year", "1 per year", "1 per year", "1 per year","1 per year"),
  createData('Earring Repairs', "1", "1 per year", "1 per year", "1 per year","1 per year"),
  createData('Chain and Bracelet Soldering',"1 per year", "1 per year", "1 per year", "1 per year","1 per year"),
];

export default function OfferTable() {
  return (
    <>
    <Head>
    <Link rel="stylesheet" href="/assets/css/df-jewellerycare.css" />
    </Head>
    <div className='offer-table-heading mt-5'>
      <h4><FormattedMessage id="offerTable.heading" />?</h4>
    </div>
    <TableContainer component={Paper} className='mb-5 df-table-design table-design'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><FormattedMessage id="offerTable.planDetails" /></TableCell>
            <TableCell align="right">1 <FormattedMessage id="offerTable.years" /></TableCell>
            <TableCell align="right">2 <FormattedMessage id="offerTable.years" /></TableCell>
            <TableCell align="right">3 <FormattedMessage id="offerTable.years" /></TableCell>
            <TableCell align="right">4 <FormattedMessage id="offerTable.years" /></TableCell>
            <TableCell align="right">5 <FormattedMessage id="offerTable.years" /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.firstYear}</TableCell>
              <TableCell align="right">{row.secondYear}</TableCell>
              <TableCell align="right">{row.thirdYear}</TableCell>
              <TableCell align="right">{row.fourYear}</TableCell>
              <TableCell align="right">{row.fiveYear}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className='offer-table-heading mt-5 mb-4'>
      <h4><FormattedMessage id="offerTable.tandc" /></h4>
      <p><FormattedMessage id="offerTable.viewTandC" /> <Link href={"/terms-conditions"} className='text-underline'><FormattedMessage id="common.here" /></Link>.</p>
    </div>
    </>
  );
}