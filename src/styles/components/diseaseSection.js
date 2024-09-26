import { styled } from "@mui/system";
import { Card } from "@mui/material";
import { Button, Slider, button } from "@mui/material";

export const FormWrapper = styled(Card)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 2rem 0;
`;
export const StyledButton = styled(Button)`
  margin: 200px;
`;
export const PageWrapper = styled("div")({
  backgroundImage:
    "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWGNnlvR10sY3jn6-xUAoRIYuAz0KodHzLow&s)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",

  // minHeight: 100,
  marginBottom: 0,
  padding: 0,
});

export const PredictionBar = styled(Slider)`
  & .MuiSlider-thumb {
    background-color: #ff5722;
  }
  & .MuiSlider-rail {
    background-color: #bdbdbd;
  }
  & .MuiSlider-track {
    background-color: #ff5722;
  }
`;

export const MoreInfoButton = styled(Button)`
  background-color: #2196f3;
  color: white;
  margin-top: 1rem;
  &:hover {
    background-color: #1976d2;
  }
`;
export const pos = styled("b")({
  "&.pos": {
    color: "green",
  },
});
export const neg = styled("b")({
  "&.neg": {
    color: "red",
  },
});
