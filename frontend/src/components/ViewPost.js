import { Box, Grid, Paper, Typography, Divider, TextField, Button, Avatar, Input } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    post_id: yup.number().positive(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    comments: yup.string().required().min(10).max(256),
})

const ViewPost = () => {

    const [data, setData] = useState([]);
    const [comment, setComment] = useState([]);
    const postId = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const header = {
        "Accept": "application/json",
        "content-type": "application/json",
        // 'X-CSRFToken': csrftoken,
    }

    const getPost = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/post/${postId.id}/`);
        if (response.data.data) setData(response.data.data);
        if (response.data.comment) setComment(response.data.comment);
    }

    const onSubmit = (formData, e) => {
        axios.post(`http://127.0.0.1:8000/post/savecomment/`, JSON.stringify(formData), { headers: header }, {xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN',}).then((response) => { e.target.reset(); getPost(); });
    }

    useEffect(() => {
        getPost();
    }, []);


    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12} md={8}>
                <Paper style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={data.thumbnail} alt={data.name} width='75%' style={{ padding: 20 }} />
                </Paper>
                <Box my={2} justifyContent='center'>
                    <Typography component={"span"} color='textSecondary' style={{ marginRight: 15 }}>Post By: {data.author_name}</Typography>
                    <Typography component={"span"} color='textSecondary' style={{ marginRight: 15 }}>Date: {data.date}</Typography>
                    <Typography component={"span"} color='textSecondary' style={{ marginRight: 15 }}>Category: {data.category_name}</Typography>
                </Box>
                <Divider />
                <Box fontSize={30} fontWeight={600} mt={3}>
                    {data.name}
                </Box>
                <Box mt={3} fontSize={16}>

                    <p dangerouslySetInnerHTML={{ __html: data.body }}></p>
                </Box>
                <Divider />
                <Box fontSize={30} fontWeight={600} mt={2} pl={3} textAlign="center">
                    Comments
                </Box>
                <Box my={3}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3} justifyContent="center" direction="row">
                            <Input type="hidden" {...register("post_id", { value: postId.id })} />
                            <Grid item xs={12} md={4}>
                                <TextField label="Name" variant="outlined" size="small" placeholder="Name" fullWidth {...register("name")} error={Boolean(errors.name)} helperText={errors.name?.message} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField label="Email" variant="outlined" size="small" placeholder="Email" fullWidth {...register("email")} error={Boolean(errors.email)} helperText={errors.email?.message} />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField label="Comments" variant="outlined" size="small" multiline rows={3} placeholder="Comments" fullWidth {...register("comments")} error={Boolean(errors.comments)} helperText={errors.comments?.message} />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Button type="submit" fullWidth variant="contained" color="secondary">Comment</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <Divider />

                {

                    comment.map((item) => (
                        <Box my={3} key={item.id}>
                            <Grid container justifyContent="center">
                                <Grid item xs={3} sm={2} lg={1} style={{ display: "flex", justifyContent: "center" }}>
                                    <Avatar style={{ background: 'gray', color: 'white', width: 40, height: 40 }}>N</Avatar>
                                </Grid>
                                <Grid item xs={9} sm={10} lg={11}>
                                    <Box><Typography style={{ fontSize: 16, fontWeight: 600 }} component="span">{item.name} (Date: {item.date}): </Typography><Typography component={"span"}>{item.comments}</Typography></Box>
                                </Grid>
                            </Grid>
                        </Box>
                    ))
                }
            </Grid>
        </Grid>
    )
}

export default ViewPost;