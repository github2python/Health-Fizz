import styled from "@emotion/styled";
import { Container, Card, Typography, Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

// Styled Components
export const DashboardWrapper = styled(Container)`
  padding: 2rem;
  background: url("https://acropolium.com/img/articles/healthcare-management-system-development/img10.jpg")
    no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
`;

export const CardStyled = styled(Card)`
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 1rem 0;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    transform: scale(1.02);
  }
`;

export const Title = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`;

export const Content = styled(Typography)`
  font-size: 1rem;
  color: #666;
`;

export const LogoutButton = styled(Button)`
  margin: 1rem;
  background-color: #f44336;
  color: white;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const Header = styled(Paper)`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
`;

export const ExplanationWrapper = styled.div`
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  margin-bottom: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const ExplanationText = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6;
`;

export const DropdownSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const RiskStatus = styled(Typography)(({ theme, risk }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1.1rem",
  color: risk ? "#d32f2f" : "#388e3c", // Red for at risk, green for no risk
}));

export const RiskIcon = styled("span")(({ risk }) => ({
  marginRight: "8px",
  color: risk ? "#d32f2f" : "#388e3c",
}));

export const RiskSection = styled(Box)(() => ({
  marginTop: "40px",
  backgroundColor: "#f0f0f3",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "8px 8px 16px #c1c1c1, -8px -8px 16px #ffffff",
}));

export const RiskAccordion = styled(Accordion)(() => ({
  marginBottom: "10px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  "&:before": {
    display: "none",
  },
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
}));

export const RiskAccordionSummary = styled(AccordionSummary)(() => ({
  fontWeight: "bold",
  color: "#333",
}));

export const RiskAccordionDetails = styled(AccordionDetails)(() => ({
  backgroundColor: "#f4f4f4",
  borderRadius: "0 0 10px 10px",
  padding: "20px",
  fontSize: "1rem",
  color: "#555",
}));

export const StepAccordion = styled(Accordion)(() => ({
  backgroundColor: "#fafafa",
  borderRadius: "8px",
  marginBottom: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

export const StepAccordionSummary = styled(AccordionSummary)(() => ({
  backgroundColor: "#e0e0e0",
  borderRadius: "8px",
  fontWeight: "bold",
  color: "#333",
  "&:hover": {
    backgroundColor: "#d5d5d5",
  },
}));

export const StepAccordionDetails = styled(AccordionDetails)(() => ({
  backgroundColor: "#f9f9f9",
  padding: "10px 20px",
  borderRadius: "0 0 8px 8px",
  color: "green",
}));

export const Step = styled(Typography)(() => ({
  marginLeft: "20px",
  fontSize: "0.9rem",
}));
