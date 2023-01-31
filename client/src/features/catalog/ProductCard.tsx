import { LoadingButton } from "@mui/lab";
import { Button, Card, CardActions, CardContent, CardMedia, CardHeader, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { currencyFormat } from '../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { addBasketItemAsync } from '../basket/basketSlice';

interface Props{
    product: Product
}

export default function ProductCard({ product }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor:'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx:{fontWeight:'bold', color:'primary.main'}
                }}
            />
            <CardMedia
                component="img"
                height="140"
                sx={{height:140, backgroundSize: 'contain', bgcolor:'primary.light'}}
                image={product.pictureUrl}
                alt={product.name}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5" component="div">
                {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand }/ {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    loading={status.includes('pendingAddItem'+product.id)}
                    onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                    size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}