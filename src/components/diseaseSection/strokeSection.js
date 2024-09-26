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
} from "../../styles/components/diseaseSection.js";

const DiseaseSection = () => {
  const initialState = {
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    ever_married: "",
    Residence_type: "",
    avg_glucose_level: "",
    bmi: "",
    work_type_Govt_job: "",
    work_type_Never_worked: "",
    work_type_Private: "", // This will be used for selecting a work type
    work_type_Self_employed: "",
    work_type_children: "",
    smoking_status_formerly_smoked: "",
    smoking_status_never_smoked: "",
    smoking_status_smokes: "",
  };
  const [features, setFeatures] = useState(initialState);
  const [prediction, setPrediction] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      label: "Basic Information",
      fields: [
        {
          name: "gender",
          label: "Gender (1 for Male else 0)",
          type: "number",
          required: true,
        },
        {
          name: "age",
          label: "Age",
          type: "number",
          required: true,
        },
        {
          name: "hypertension",
          label: "Hypertension (1 for Yes else 0)",
          type: "number",
          required: true,
        },
        {
          name: "heart_disease",
          label: "Heart Disease (1 for Yes else 0)",
          type: "number",
          required: true,
        },
      ],
    },
    {
      label: "Personal Information",
      fields: [
        {
          name: "ever_married",
          label: "Ever Married (1 for Yes else 0)",
          type: "number",
          required: true,
        },
        {
          name: "work_type_Private",
          label: "Private Job (1 for Yes else 0)",
          type: "number",
          required: true,
        },
        {
          name: "work_type_Self_employed",
          label: "Self Employed (1 for Yes else 0)",
          type: "number",
          required: true,
        },
        {
          name: "work_type_Govt_job",
          label: "Government Job (1 for Yes else 0)",
          type: "number",
          required: true,
        },
        {
          name: "work_type_children",
          label: "Children (1 for Yes else 0)",
          type: "number",
          required: true,
        },
        {
          name: "work_type_Never_worked",
          label: "Never Worked (1 for Yes else 0)",
          type: "number",
          required: true,
        },
        {
          name: "Residence_type",
          label: "Residence Type(Urban-1, Rural-0)",
          type: "number",
          required: true,
        },
      ],
    },
    {
      label: "Health Information",
      fields: [
        {
          name: "avg_glucose_level",
          label: "Average Glucose Level",
          type: "number",
          required: true,
        },
        {
          name: "bmi",
          label: "BMI",
          type: "number",
          required: true,
        },
        {
          name: "smoking_status_never_smoked",
          label: "Never Smoked (1 for Yes else 0)",
          type: "number",
          required: true,
        },
        {
          name: "smoking_status_formerly_smoked",
          label: "Formerly Smoked (1 for Yes else 0)",
          type: "number",
          required: true,
        },
        {
          name: "smoking_status_smokes",
          label: "Smokes (1 for Yes else 0)",
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
        `http://localhost:8000/predict/stroke/${email}`,
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
                  The prediction for the person to have Stroke in the near
                  future is <b className="neg">Negative</b>
                </h2>
              )}
              {prediction === 1 && (
                <h2>
                  The prediction for the person to have Stroke in the near
                  future is <b className="pos">Positive</b>
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
