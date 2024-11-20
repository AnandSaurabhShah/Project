import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import { green } from '@mui/material/colors';
import { TextField, Button } from '@mui/material';
import { MenuItem } from '@mui/material';

import Spacer from '../components/Spacer';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const AutismForm = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(
        theme.breakpoints.up('md'),
        { defaultMatches: true }
    );
    const [send, setSend] = useState(false);
    const [result, setResult] = useState(false);
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        jundice: "",
        usedscreeningbefore: "",
        whoistakingtest: ""
    });
    const [prediction, setPrediction] = useState(null);
    const [probability, setProbability] = useState(null);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/predict/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setPrediction(data.prediction); // Update prediction state
            setProbability(data.probability);
            setSend(true);
            // Set result to true only if there is a valid prediction response
            setResult(!!data.prediction);
            console.log(data.prediction); // Log prediction from response
            setResult(!!data.probability);
            console.log(data.probability);
            console.log(JSON.stringify(formData));
        } catch (error) {
            console.error(error);
            // Optionally, you can set prediction state to null if an error occurs
            setPrediction(null);
            setProbability(null);
        }
    };




    const handleDownload = () => {
        const documentDefinition = {
            content: [
                {
                    text: "Autism ",
                    style: "header"
                },
                {
                    text: "Age: " + formData.age
                },
                {
                    text: "Gender: " + (formData.gender === "0" ? "Female" : "Male")
                },
                {
                    text: "Jundice: " + (formData.jundice === "0" ? "No" : "Yes")
                },
                {
                    text: "Used Screening Before: " + (formData.usedscreeningbefore === "0" ? "No" : "Yes")
                },
                {
                    text: "Who is taking the test: " +
                        (formData.whoistakingtest === "0"
                            ? "Self"
                            : formData.whoistakingtest === "1"
                                ? "Parent"
                                : formData.whoistakingtest === "2"
                                    ? "Health care professional"
                                    : formData.whoistakingtest === "3"
                                        ? "Relative"
                                        : "Other")
                },
                {
                    text: "Probability of Autism: " + (probability !== null ? (probability * 100).toFixed(2) + "%" : "N/A")
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                }
            }
        };
        pdfMake.createPdf(documentDefinition).download("AutismDetail.pdf");
    };

    return (
        <>
            <Helmet>
                <title>Autism Form</title>
            </Helmet>
            <Box
                backgroundColor={theme.palette.background.default}
                minHeight='100%'
                paddingTop={15}
                paddingBottom={15}
            >
                <Container maxWidth={false}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            {/* Age */}
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Age"
                                                    type="number"
                                                    name="age"
                                                    value={formData.age}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </Grid>
                                            {/* Gender */}
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Gender"
                                                    select
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                    <MenuItem value="1">Male</MenuItem>
                                                    <MenuItem value="0">Female</MenuItem>
                                                </TextField>
                                            </Grid>
                                            {/* Jundice */}
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Jundice"
                                                    select
                                                    name="jundice"
                                                    value={formData.jundice}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                    <MenuItem value="1">Yes</MenuItem>
                                                    <MenuItem value="0">No</MenuItem>
                                                </TextField>
                                            </Grid>
                                            {/* Used Screening Before */}
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Used Screening Before"
                                                    select
                                                    name="usedscreeningbefore"
                                                    value={formData.usedscreeningbefore}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                    <MenuItem value="1">Yes</MenuItem>
                                                    <MenuItem value="0">No</MenuItem>
                                                </TextField>
                                            </Grid>
                                            {/* Who is taking the test */}
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Who is taking the test"
                                                    select
                                                    name="whoistakingtest"
                                                    value={formData.whoistakingtest}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                    <MenuItem value="0">Self</MenuItem>
                                                    <MenuItem value="1">Parent</MenuItem>
                                                    <MenuItem value="2">Health care professional</MenuItem>
                                                    <MenuItem value="3">Relative</MenuItem>
                                                    <MenuItem value="4">Other</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="h5" gutterBottom>
                                                    Questions:
                                                </Typography>

                                            </Grid>
                                            {/* Questions */}
                                            {/* Question 1 */}
                                            <TextField
                                                label="Does your child look at you when you call his/her name?"
                                                select
                                                name="q1"
                                                value={formData.q1}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            >
                                                <MenuItem value="1">Yes</MenuItem>
                                                <MenuItem value="0">No</MenuItem>
                                            </TextField>
                                            {/* Question 2 */}
                                            <TextField
                                                label="Is it easy for you to get eye contact with your child?"
                                                select
                                                name="q2"
                                                value={formData.q2}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            >
                                                <MenuItem value="1">Yes</MenuItem>
                                                <MenuItem value="0">No</MenuItem>
                                            </TextField>
                                            {/* Add other questions in a similar manner */}
                                            {/* Question 3 */}
                                            <TextField
                                                label="Does your child point to indicate that s/he wants something? (out of reach)"
                                                select
                                                name="q3"
                                                value={formData.q3}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            >
                                                <MenuItem value="1">Yes</MenuItem>
                                                <MenuItem value="0">No</MenuItem>
                                            </TextField>
                                            {/* Question 4 */}
                                            <TextField
                                                label="Does your child point to share interest with you?"
                                                select
                                                name="q4"
                                                value={formData.q4}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            >
                                                <MenuItem value="1">Yes</MenuItem>
                                                <MenuItem value="0">No</MenuItem>
                                            </TextField>
                                            {/* Question 5 */}
                                            <TextField
                                                label="Does the individual struggle with imaginative or pretend play? (e.g. care for dolls, talk on a toy phone)"
                                                select
                                                name="q5"
                                                value={formData.q5}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            >
                                                <MenuItem value="1">Yes</MenuItem>
                                                <MenuItem value="0">No</MenuItem>
                                            </TextField>
                                            {/* Question 6 */}
                                            <TextField
                                                label="Is your child hypersensitive (light, sound, touch, or taste)?"
                                                select
                                                name="q6"
                                                value={formData.q6}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            >
                                                <MenuItem value="1">Yes</MenuItem>
                                                <MenuItem value="0">No</MenuItem>
                                            </TextField>
                                            {/* Question 7 */}
                                            <TextField
                                                label="If you or someone else in the family is visibly upset, does your child show signs of wanting to comfort them? (e.g. stroking hair, hugging them)"
                                                select
                                                name="q7"
                                                value={formData.q7}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            >
                                                <MenuItem value="1">Yes</MenuItem>
                                                <MenuItem value="0">No</MenuItem>
                                            </TextField>
                                            {/* Question 8 */}
                                            <TextField
                                                label="Did your child have birth complications or history of infection or illness during early childhood?"
                                                select
                                                name="q8"
                                                value={formData.q8}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            >
                                                <MenuItem value="1">Yes</MenuItem>
                                                <MenuItem value="0">No</MenuItem>
                                            </TextField>
                                            {/* Question 9 */}
                                            <TextField
                                                label="Does your child use simple gestures? (e.g. wave goodbye)"
                                                select
                                                name="q9"
                                                value={formData.q9}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            >
                                                <MenuItem value="1">Yes</MenuItem>
                                                <MenuItem value="0">No</MenuItem>
                                            </TextField>
                                            {/* Question 10 */}
                                            <TextField
                                                label="Does your child stare at nothing with no apparent purpose?"
                                                select
                                                name="q10"
                                                value={formData.q10}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            >
                                                <MenuItem value="1">Yes</MenuItem>
                                                <MenuItem value="0">No</MenuItem>
                                            </TextField>

                                        </Grid>
                                        {/* Submit and Download buttons */}
                                        <Box marginTop={2} textAlign="center">
                                            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} style={{ marginLeft: '10px' }}>
                                                Submit
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={handleDownload} style={{ marginLeft: '10px' }}>
                                                Download
                                            </Button>
                                        </Box>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom>
                                                Percentage of Autism detected :{result && (
                                                    <Typography variant="body1">
                                                        {probability ? `Prediction: ${(probability * 100).toFixed(2) + "%"}` : 'No prediction'}
                                                    </Typography>
                                                )}
                                            </Typography>

                                        </Grid>

                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
            <Spacer sx={{ pt: 6 }} />
        </>
    );
};

export default AutismForm;
