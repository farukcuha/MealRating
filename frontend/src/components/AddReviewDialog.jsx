import React, { useContext, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TextField, Button, Box, Autocomplete, LinearProgress, ThemeProvider, createTheme, createFilterOptions, CircularProgress, Grid } from '@mui/material';
import { FormText, Input } from 'reactstrap';
import { ReviewsContext } from '../contexts/ReviewsContext';
import { insertReview } from '../controller/ReviewsContoller';
import { getFoods } from '../controller/FoodsController';
import { getCurrentMeal, initialDate } from "../util/DateUtil";
import uploadImage from '../util/FileUploader';

const AddReviewDialog = () => {
    const { getReviewsForContext } = useContext(ReviewsContext)
    const [foods, setFoods] = useState([])

    let time = initialDate().getTime()
    let currentMeal = getCurrentMeal()

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [password, setPassword] = useState('')
    const [isErrorPassword, setIsErrorPassword] = useState(false)
    const [isEmptyPassword, setIsEmptyPassword] = useState(false)

    const [foodOption, setFoodOption] = useState(foods[0]);
    const [food, setFood] = useState('');
    const [isErrorMeal, setIsErrorMeal] = useState(false)

    const [score, setScore] = useState(null)
    const [isErrorScore, setIsErrorScore] = useState(false)

    const [author, setAuthor] = useState('')
    const [image, setImage] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)

    const [body, setBody] = useState('')
    const [isErrorBody, setIsErrorBody] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getFoods((data) => {
            setFoods(data.map((res) => {
                return {
                    label: res.name,
                    id: res._id
                }
            }))
            console.log(data);
        }, (error) => {
            console.log(error);
        })
    }, [])

    const handleMealScore = (event) => setScore(event.target.value)
    const handleImageInputChange = (event) => setImage(event.target.files[0]);

    const checkInputs = () => {
        setIsErrorMeal(food.length === 0);
        setIsErrorScore(score === null);
        setIsErrorBody(body.length === 0);
        setIsErrorPassword(password !== process.env.REACT_APP_INSERT_PASSWORD)
        setIsEmptyPassword(password.length === 0)
    }

    const clearInputs = () => {
        setFoodOption(null)
        setFood('')
        setScore(null)
        setAuthor('')
        setImage(null)
        setBody('')
        setImageUploadProgress(null)
        setPassword('')
        setIsLoading(false)
    }

    const submitComment = () => {
        checkInputs()
        if (food.length !== 0 && score !== null && body.length !== 0 && password === process.env.REACT_APP_INSERT_PASSWORD) {
            setIsLoading(true)
            if (image != null) {
                uploadImage(image, (downloadurl) => {
                    insertReviewInDialog(downloadurl)
                }, (progress) => {
                    console.log(progress);
                    setImageUploadProgress(progress)
                }, (error) => {
                    console.log('error', error);
                })
            } else insertReviewInDialog()
        }
    }

    const insertReviewInDialog = (imageDownloadUrl) => {
        insertReview({
            food_id: foodOption.id,
            author: author.length === 0 ? 'Anonim' : author,
            body: body,
            score: score,
            meal: currentMeal,
            time: time,
            image: imageDownloadUrl
        }, (data) => {
            console.log(data);
            clearInputs()
            getReviewsForContext(time, currentMeal)
            handleClose()
        }, (error) => {
            console.log(error);
        })
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: "#2B2E4A",
            },
            secondary: {
                main: '#E84545',
            },
        },
    });

    return (
        <div style={{ marginTop: "16px" }}>
            <ThemeProvider theme={theme}>
                <Button onClick={handleClickOpen} fullWidth
                    variant="contained">Yorum Ekle</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}>
                    <DialogTitle id="alert-dialog-title">
                        {"Yorum Ekle"}
                    </DialogTitle>
                    <DialogContent>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center">
                            <div style={{ "color": "red" }}>{(isErrorPassword && !isEmptyPassword) ? 'Hatalı Şifre' : ''}</div>
                            <TextField
                                id="outlined-multiline-static"
                                label="Şifre"
                                type="password"
                                error={isEmptyPassword == true}
                                value={password}
                                onChange={e => {
                                    e.preventDefault()
                                    setPassword(e.target.value)
                                }}
                                fullWidth
                                rows={3}
                                sx={{ mt: 2 }} />
                            <Autocomplete
                                value={foodOption}
                                onChange={(event, newValue) => {
                                    setFoodOption(newValue);
                                }}
                                inputValue={food}
                                onInputChange={(event, newInputValue) => {
                                    setFood(newInputValue);
                                }}
                                sx={{ mt: 2 }}
                                fullWidth
                                id="combo-box-demo"
                                options={foods}
                                renderInput={(params) => <TextField error={isErrorMeal === true}
                                    {...params} label="Yemek" />}
                            />

                            <div style={{ "margin-top": "16px", "color": "red" }}>{isErrorScore === true ? 'Puan Seçiniz' : ''}</div>
                            <ToggleButtonGroup
                                color="primary"
                                exclusive
                                value={score}
                                onChange={
                                    handleMealScore
                                }
                                aria-label="Platform"
                                fullWidth>
                                <ToggleButton color='secondary' value='1'>1</ToggleButton>
                                <ToggleButton color='secondary' value='2'>2</ToggleButton>
                                <ToggleButton color='secondary' value='3'>3</ToggleButton>
                                <ToggleButton color='secondary' value='4'>4</ToggleButton>
                                <ToggleButton color='secondary' value='5'>5</ToggleButton>
                            </ToggleButtonGroup>

                            <ToggleButtonGroup
                                color="primary"
                                exclusive
                                value={score}
                                onChange={
                                    handleMealScore
                                }
                                aria-label="Platform"
                                fullWidth>
                                <ToggleButton color='secondary' value='6'>6</ToggleButton>
                                <ToggleButton color='secondary' value='7'>7</ToggleButton>
                                <ToggleButton color='secondary' value='8'>8</ToggleButton>
                                <ToggleButton color='secondary' value='9'>9</ToggleButton>
                                <ToggleButton color='secondary' value='10'>10</ToggleButton>
                            </ToggleButtonGroup>

                            <TextField
                                id="outlined-multiline-static"
                                label="Gönderen (opsiyonel)"
                                value={author}
                                onChange={e => {
                                    e.preventDefault()
                                    setAuthor(e.target.value)
                                }}
                                fullWidth
                                rows={3}
                                sx={{ mt: 2 }} />

                            <Input onChange={handleImageInputChange} accept="image/*" style={{ "margin-top": "16px" }} type='file' placeholder='Resim'></Input>
                            {
                                imageUploadProgress !== null ? <LinearProgress sx={{ mt: 1 }} color='secondary' fullWidth variant="determinate" value={imageUploadProgress} /> : <></>
                            }
                            <FormText >Resim yükle (opsiyonel)</FormText>

                            <TextField
                                id="outlined-multiline-static"
                                label="Yorum"
                                multiline
                                error={isErrorBody == true}
                                value={body}
                                onChange={e => {
                                    e.preventDefault()
                                    setBody(e.target.value)
                                }}
                                fullWidth
                                rows={3}
                                sx={{ mt: 2 }} />

                            {
                                isLoading ? <CircularProgress style={{ "margin-top": "16px" }} /> : <Button fullWidth onClick={submitComment}
                                    variant="contained" sx={{ mt: 2 }}>Gönder</Button>
                            }

                        </Grid>
                    </DialogContent>
                </Dialog>
            </ThemeProvider>
        </div>
    );
};

export default AddReviewDialog;