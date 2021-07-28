import Cards from "./Cards";
import {useEffect, useState} from 'react';
import axios from 'axios'
import { Box } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    paginationPosition: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

const Home = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const postData = async () => {
        const response = await axios.get(`http://localhost:8000/postdata/?page=${page}`);
        return response.data;
    }

    useEffect(() => {
        const getData = async () => {
            const fetchData = await postData();
            if (fetchData) setData(fetchData);
        };
        getData();
    }, [page]);

    return (
        <>
            { Object.keys(data).length !== 0 ? <Cards getPost={data} /> : null }
            <Box className={classes.paginationPosition} mt={5}>
                <Pagination count={data.count} size='large' defaultPage={page} variant="outlined" color="secondary" onChange={(e, value)=> setPage(value)} />
            </Box>
        </>
    )
}

export default Home;