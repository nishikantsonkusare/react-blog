import { CardActionArea, CardActions, CardContent, CardMedia, Paper, Typography,  Grid, Button } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { makeStyles} from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    card: {
        height: 500,
    },
    cardImage: {
        width: '100%',
        height: 250,
        padding: 10,
    }
}));

const Cards = (props) => {
    const classes = useStyles();

    return (
        <>
            <Fade left>
                <Grid container spacing={2}>
                    {
                        props.getPost.results.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                                <Paper elevation={5} className={classes.card}>
                                    <CardActionArea component={Link} to={`/view-post/${item.id}`}>
                                        <CardMedia component="img" alt="Post Image" height='100%' image={item.thumbnail} title={item.name} className={classes.cardImage} />
                                        <CardContent>
                                            <Typography variant="h5" style={{height: 65, overflow: 'hidden'}}>
                                                {item.name}
                                            </Typography>
                                            <Typography color="textSecondary"  style={{height: 90, overflow: 'hidden'}}>
                                                    <p dangerouslySetInnerHTML={{ __html: item.body }}></p>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{float: "right", marginRight: 25}}>
                                        <Button variant="contained" size="small" color="secondary" component={Link} to={`/view-post/${item.id}`}>
                                            View Post
                                        </Button>
                                    </CardActions>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </Fade>
        </>
    )
}

export default Cards;