import { TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from '../../store/configureStore';
import { setProductParams } from "./catalogSlice";
import { useState } from 'react';
import debounce from "debounce";
export default function ProductSearch() {
    const { productParams } = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }));
    }, 1000)
    return (
        <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            value={searchTerm || ''}
            onChange={event => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}
