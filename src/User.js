import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function User() {
    const [items, setItems] = useState([]);

    const UserGet = () => {
        fetch("https://www.mecallapi.com/api/users")
        .then(res => res.json())
        .then(
            (result) => {
            setItems(result);
            },
        )
    }

    useEffect(() => { UserGet(); }, [])

    const UserUpdate = id => {
        window.location = '/update/' + id;
    }

    const UserDelete = id => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
            "id": id
        });
        
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch("https://www.mecallapi.com/api/users/delete", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['message'])
            if (result['status'] === 'ok') {
                UserGet();
            }
        })
        .catch(error => console.log('error', error));
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Users
                            </Typography>
                        </Box>
                        <Link href="create">
                            <Button variant="contained">
                                Create
                            </Button>                      
                        </Link>
                    </Box> 
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Avatar</TableCell>
                                    <TableCell align="right">First name</TableCell>
                                    <TableCell align="right">Last name</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box diplay="flex" justifyContent="center">
                                                <Avatar alt="Remy Sharp" src={row.avatar} />
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.fname}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.lname}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.username}
                                        </TableCell>
                                        <TableCell align="right">
                                            <ButtonGroup variant="text" aria-label="text button group">
                                                <Button onClick={() => UserUpdate(row.id)}>
                                                    Edit
                                                </Button>
                                                <Button onClick={() => UserDelete(row.id)}>
                                                    Del
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>                                  
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>                  
                </Paper>
            </Container>
        </React.Fragment>
    );
}