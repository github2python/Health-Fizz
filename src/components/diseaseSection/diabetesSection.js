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
    HighBP: "",
    HighChol: "",
    CholCheck: "",
    BMI: "",
    Smoker: "",
    Stroke: "",
    HeartDiseaseorAttack: "",
    PhysActivity: "",
    Fruits: "",
    Veggies: "",
    HvyAlcoholConsump: "",
    AnyHealthcare: "",
    NoDocbcCost: "",
    GenHlth: "",
    MentHlth: "",
    PhysHlth: "",
    DiffWalk: "",
    Sex: "",
    Age: "",
    Education: "",
    Income: "",
  };
  const [features, setFeatures] = useState(initialState);
  const [prediction, setPrediction] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      label: "Health Parameters",
      fields: [
        {
          name: "HighBP",
          label: "For High BP enter 1, else 0",
          type: "number",
          required: true,
        },
        {
          name: "HighChol",
          label: "For High Cholesterol enter 1, else 0",
          type: "number",
          required: true,
        },
        {
          name: "CholCheck",
          label: "If Cholestrol checked in last 5 years enter 1",
          type: "number",
          required: true,
        },
        {
          name: "BMI",
          label: "BMI",
          type: "number",
          required: true,
        },
      ],
    },
    {
      label: "Lifestyle Information",
      fields: [
        {
          name: "Smoker",
          label: "For Smoker enter 1, else 0",
          type: "number",
          required: true,
        },
        {
          name: "Stroke",
          label: "If you have had a stroke enter 1, else 0",
          type: "number",
          required: true,
        },
        {
          name: "HeartDiseaseorAttack",
          label: "If you had CHD or myocardial infarction enter 1",
          type: "number",
          required: true,
        },
        {
          name: "PhysActivity",
          label: "If you have been physically active in the last 30 days",
          type: "number",
          required: true,
        },
      ],
    },
    {
      label: "Diet Habits",
      fields: [
        {
          name: "Fruits",
          label: "Consumed fruits one or more times per day",
          type: "number",
          required: true,
        },
        {
          name: "Veggies",
          label: "Consumed vegetables one or more times per day",
          type: "number",
          required: true,
        },
        {
          name: "HvyAlcoholConsump",
          label: "Consumed more than 14 drinks per week ",
          type: "number",
          required: true,
        },
        {
          name: "AnyHealthcare",
          label: "If you have any healthcare coverage",
          type: "number",
          required: true,
        },
      ],
    },
    {
      label: "Medical History",
      fields: [
        {
          name: "NoDocbcCost",
          label:
            "If you have not seen a doctor due to cost in the last 12 months",
          type: "number",
          required: true,
        },
        {
          name: "GenHlth",
          label: "Your General Health on a scale of 1-5 (1 being excellent)",
          type: "number",
          required: true,
        },
        {
          name: "MentHlth",
          label: "Mental Health",
          type: "number",
          required: true,
        },
        {
          name: "PhysHlth",
          label: "Any physical health issues in the last 30 days",
          type: "number",
          required: true,
        },
        {
          name: "DiffWalk",
          label: "Difficulty in walking ",
          type: "number",
          required: true,
        },
      ],
    },
    {
      label: "Personal Information",
      fields: [
        {
          name: "Sex",
          label: "0 for women and 1 for men",
          type: "number",
          required: true,
        },
        {
          name: "Age",
          label: "Age",
          type: "number",
          required: true,
        },
        {
          name: "Education",
          label: "Education Level 1 (never attended)",
          type: "number",
          required: true,
        },
        {
          name: "Income",
          label: "Income level 1-8",
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
        `http://localhost:8000/predict/diabetes/${email}`,
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
                  The prediction for the person to have diabetes the near future
                  is <b className="neg">Negative.</b>
                </h2>
              )}
              {prediction === 1 && (
                <h2>The person is in pre-diabetic stage. </h2>
              )}
              {prediction === 2 && (
                <h2>
                  The prediction for the person to have diabetes is positive.
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
