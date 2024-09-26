import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  Slider,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  TextField,
  Container,
  Box,
} from "@mui/material";

import {
  FormWrapper,
  PredictionBar,
  MoreInfoButton,
  pos,
  neg,
  PageWrapper,
  StyledButton,
} from "../../styles/components/diseaseSection";

const DiseaseSection = () => {
  const initialState = {
    age: "",
    gender: "",
    tb: "",
    db: "",
    alkphos: "",
    sgpt: "",
    sgot: "",
    tp: "",
    alb: "",
    agRatio: "",
  };
  const [features, setFeatures] = useState(initialState);
  const [prediction, setPrediction] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      label: "Basic Information",
      fields: [
        {
          name: "age",
          label: "Age (If >= 90 enter 90)",
          type: "number",
          required: true,
        },
        {
          name: "gender",
          label: "Gender (For Male 1, For Female 0)",
          type: "number",
          required: true,
        },
      ],
    },
    {
      label: "Liver Enzymes",
      fields: [
        {
          name: "tb",
          label: "Total Bilirubin",
          type: "number",
          required: true,
        },
        {
          name: "db",
          label: "Direct Bilirubin",
          type: "number",
          required: true,
        },
        {
          name: "alkphos",
          label: "Alkaline Phosphotase",
          type: "number",
          required: true,
        },
        {
          name: "sgpt",
          label: "Alamine Aminotransferase",
          type: "number",
          required: true,
        },
        {
          name: "sgot",
          label: "Aspartate Aminotransferase",
          type: "number",
          required: true,
        },
        {
          name: "tp",
          label: "Total Protein",
          type: "number",
          required: true,
        },
        {
          name: "alb",
          label: "Albumin",
          type: "number",
          required: true,
        },
        {
          name: "agRatio",
          label: "Albumin and Globulin Ratio",
          type: "number",
          required: true,
        },
      ],
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeatures({
      ...features,
      [name]: value,
    });
  };

  const handleValidation = () => {
    const currentFields = steps[currentStep].fields;
    for (let field of currentFields) {
      if (field.required && !features[field.name]) {
        alert(`Please fill out all fields in ${steps[currentStep].label}`);
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (handleValidation()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return; // Validate before submitting
    const email = localStorage.getItem("email");
    try {
      const response = await axios.post(
        `http://localhost:8000/predict/liver/${email}`,
        {
          features,
        }
      );
      setPrediction(response.data.prediction);
      setFeatures(initialState);
      setCurrentStep(0); // Reset to first step after prediction
    } catch (error) {
      console.error(
        "Error getting prediction:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const backToDashboard = () => {
    window.location.href = "/home";
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <PageWrapper>
      <Button
        type="submit"
        variant="contained"
        color="warning"
        onClick={backToDashboard}
        style={{ marginLeft: "30px", marginTop: "20px" }}
      >
        Back to Dashboard
      </Button>
      <Container maxWidth="sm" style={{ marginTop: "5px" }}>
        <Box
          sx={{
            boxShadow: 3,
            padding: 10,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              letterSpacing: "1.5px",
              fontSize: "2.2rem",
              marginBottom: "20px",
              textShadow: "2px 2px 4px rgba(1, 1, 1, 0.2)",
            }}
          >
            Questionnaire for Prediction
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              <span style={{ fontWeight: "bold" }}>
                {steps[currentStep].label}
              </span>
            </Typography>
            <Grid container spacing={2}>
              {steps[currentStep].fields.map((field) => (
                <Grid item xs={12} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    variant="outlined"
                    type={field.type}
                    name={field.name}
                    value={features[field.name]}
                    onChange={handleInputChange}
                    required={field.required}
                  />
                </Grid>
              ))}
            </Grid>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {currentStep > 0 && (
                <Button variant="contained" color="primary" onClick={prevStep}>
                  Back
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextStep}
                >
                  Next
                </Button>
              ) : (
                <Button variant="contained" color="primary" type="submit">
                  Predict
                </Button>
              )}
            </div>
          </form>
          {prediction != null && (
            <div className="result">
              {prediction === 0 && (
                <h2>
                  The prediction for the person to have liver-related ailments
                  in the near future is <b className="neg">Negative</b>
                </h2>
              )}
              {prediction === 1 && (
                <h2>
                  The prediction for the person to have liver-related ailments
                  in the near future is <b className="pos">Positive</b>
                </h2>
              )}
            </div>
          )}
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default DiseaseSection;
