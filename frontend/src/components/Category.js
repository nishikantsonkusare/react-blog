import Cards from "./Cards";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    paginationPosition: {
        display: 'flex',
        justifyContent: 'center',
    }
}));


const Category = () => {
    const classes = useStyles();
    const [page, setPage] = useState(1)
    const category  = useParams();
    const [data, setData] = useState([]);

    const postData = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/category-wise/${category.cateogry}/`);
        return response.data;
    }

    useEffect(() => {
        const getData = async () => {
            const fetchData = await postData();
            if (fetchData) setData(fetchData);
        };
        getData();
    }, [category]);

    return (
        <>
            { Object.keys(data).length !== 0 ? <Cards getPost={data} /> : null }
            <Box className={classes.paginationPosition} mt={5}>
                <Pagination count={data.count} size='large' defaultPage={page} variant="outlined" color="secondary" onChange={(e, value)=> setPage(value)} />
            </Box>
        </>
    )
}

export default Category;