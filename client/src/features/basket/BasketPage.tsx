import { Add, Delete, Remove } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography, TableContainer, Table, TableRow, TableCell, Paper, TableBody, TableHead, IconButton, Box, Grid, Button } from '@mui/material';
import { useEffect, useState } from "react"
import agent from "../../app/api/agent";
import { useStoreContext } from '../../app/context/StoreContext';
import LoadingComponent from "../../app/layout/LoadingComponent";
import BasketSummary from './BasketSummary';
import { Link } from 'react-router-dom';
//import { useStoreContext,setBasket, removeItem } from ;

export default function BasketPage() {
    const { basket, setBasket, removeItem } = useStoreContext();    
    const [status, setStatus] = useState({
        loading: false,
        name:''
    });
    // const [basket, setBasket] = useState<Basket | null>(null);
    // useEffect(() => {
    //     agent.Basket.get()
    //         .then(basket => setBasket(basket))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false));
    // }, [])

    // if (loading) return <LoadingComponent message="Loading basket..." />
    // if(!basket) return <Typography variant="h3">Your basket is empty</Typography>
    function handleAddItem(productId: number, name: string) {
        setStatus({loading: true, name});
        agent.Basket.additem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    function handleRemoveItem(productId: number, quantity: number, name: string) {
        setStatus({loading: true, name});
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }
if(!basket) return <Typography variant="h3">Your basket is empty</Typography>
    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {basket.items.map(item => (
                    <TableRow
                    key={item.productId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Box display='flex' alignItems='center'>
                                <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                <span>{item.name}</span>
                            </Box>
                        </TableCell>
                        <TableCell align="right">{(item.price/100).toFixed(2)}</TableCell>
                        <TableCell align="center">
                            <LoadingButton
                                loading={status.loading && status.name==='rem'+item.productId}
                                onClick={() => handleRemoveItem(item.productId, 1,'rem'+item.productId)}
                                color='error' >
                                <Remove/>
                            </LoadingButton>
                            {item.quantity}
                            <LoadingButton
                                loading={status.loading && status.name==='add'+item.productId}
                                onClick={() => handleAddItem(item.productId, 'add'+item.productId)}
                                color='secondary' >
                                <Add/>
                            </LoadingButton>
                        </TableCell>
                        <TableCell align="right">{((item.price/100) * item.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton
                                loading={status.loading && status.name === 'del' + item.productId}
                                onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)}
                                color='error'>
                                <Delete/>
                            </LoadingButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container>
            <Grid item xs={6} />
            <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
            </Grid>
        </Grid>
            
    </>
    )

}