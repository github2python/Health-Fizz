import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardWrapper,
  Header,
  ExplanationWrapper,
  ExplanationText,
  RiskSection,
  RiskAccordion,
  RiskAccordionSummary,
  RiskAccordionDetails,
  RiskIcon,
  RiskStatus,
  StepAccordion,
  StepAccordionSummary,
  StepAccordionDetails,
  Step,
} from "../styles/components/Dashboard";
import {
  Grid,
  Typography,
  CardContent,
  IconButton,
  Card,
  CardActionArea,
  CardActions,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
} from "@mui/material";
import { Logout, CheckCircle, Cancel } from "@mui/icons-material"; // Added Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

// Styled Components for Risk Display

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRisk, setUserRisk] = useState({});
  const [preventionSteps, setPreventionSteps] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(false);
  };

  useEffect(() => {
    const fetchUserRisk = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(
          `http://localhost:8000/disease/risk/${email}`
        );
        setUserRisk(response.data.riskScores);
        console.log(response.data.riskScores);
        const diseaseRisks = Object.entries(response.data.riskScores).filter(
          ([, risk]) => risk
        );

        if (diseaseRisks.length > 0) {
          const steps = {};

          await Promise.all(
            diseaseRisks.map(async ([disease]) => {
              const preventionResponse = await axios.get(
                `http://localhost:8000/prevention/steps/${disease}`
              );
              steps[disease] = preventionResponse.data;
            })
          );

          setPreventionSteps(steps);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user risk:", error);
        setLoading(false);
      }
    };

    fetchUserRisk();
  }, []);

  return (
    <DashboardWrapper>
      <Header>
        <Typography variant="h4" fontWeight="bold">
          Health Fizz Dashboard
        </Typography>
        <IconButton onClick={handleLogout} color="primary">
          <Logout fontSize="large" />
        </IconButton>
      </Header>

      <ExplanationWrapper>
        <ExplanationText>
          Welcome to your Health Risk Dashboard! This tool provides personalized
          insights into your health risks, including Heart Disease, Stroke,
          Diabetes, and Liver Disease. Explore the different sections, monitor
          your health metrics, and receive customized recommendations to improve
          your well-being. Our innovative system analyzes your data, offering
          you a comprehensive view of your health in a modern and engaging
          interface.
        </ExplanationText>
      </ExplanationWrapper>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea onClick={() => navigate(`/disease/heart`)}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Heart Disease Risk
                </Typography>
                <Typography variant="body2">
                  Monitor and manage your heart health with personalized
                  insights and recommendations.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => navigate(`/disease/heart`)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea onClick={() => navigate(`/disease/stroke`)}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Stroke Risk
                </Typography>
                <Typography variant="body2">
                  Understand your stroke risk factors and get tailored advice to
                  mitigate risks.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => navigate(`/disease/stroke`)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea onClick={() => navigate(`/disease/diabetes`)}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Diabetes Risk
                </Typography>
                <Typography variant="body2">
                  Receive guidance on managing diabetes risk through lifestyle
                  changes and medical advice.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => navigate(`/disease/diabetes`)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea onClick={() => navigate(`/disease/liver`)}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Liver Disease Risk
                </Typography>
                <Typography variant="body2">
                  Assess your liver health and get recommendations for improving
                  liver function.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => navigate(`/disease/liver`)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Section displaying disease risks and steps */}
      <RiskSection>
        <Typography variant="h5" gutterBottom>
          Your Health Risks and Prevention Steps
        </Typography>
        <Divider style={{ marginBottom: "20px" }} />
        {loading ? (
          <Typography>Loading your health data...</Typography>
        ) : (
          Object.keys(userRisk).map((disease) => (
            <RiskAccordion key={disease}>
              <RiskAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <RiskIcon risk={userRisk[disease]}>
                  {userRisk[disease] ? <Cancel /> : <CheckCircle />}
                </RiskIcon>
                <RiskStatus risk={userRisk[disease]}>
                  {disease.charAt(0).toUpperCase() + disease.slice(1)} :{" "}
                  {userRisk[disease] != 0 ? "At Risk" : "No Risk"}
                </RiskStatus>
              </RiskAccordionSummary>
              {userRisk[disease] == 0 && (
                <RiskAccordionDetails>
                  <Typography>
                    Keep going with your current lifestyle and you will remain
                    healthy.
                  </Typography>
                </RiskAccordionDetails>
              )}
              {(userRisk[disease] == 1 || userRisk[disease] == 2) &&
                preventionSteps[disease] && (
                  <RiskAccordionDetails>
                    {Object.keys(preventionSteps[disease]).map((category) => (
                      <StepAccordion key={category}>
                        <StepAccordionSummary expandIcon={<ExpandMoreIcon />}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </StepAccordionSummary>
                        <StepAccordionDetails>
                          {preventionSteps[disease][category].map(
                            (step, index) => (
                              <ul>
                                <li>
                                  <Step key={index}>{step}</Step>
                                </li>
                              </ul>
                            )
                          )}
                        </StepAccordionDetails>
                      </StepAccordion>
                    ))}
                  </RiskAccordionDetails>
                )}
            </RiskAccordion>
          ))
        )}
      </RiskSection>
      <footer
        style={{
          backgroundColor: "whitesmoke",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "50px",
          padding: "5px",
        }}
      >
        <p> &copy; 2024 Dhanbad India, Inc. All rights reserved.</p>
      </footer>
    </DashboardWrapper>
  );
};

export default Dashboard;
