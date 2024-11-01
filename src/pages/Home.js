import React, { useEffect, useState } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import SearchResults from "../components/searchSection/SearchResults";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import { Box, Container, Typography, AppBar, Toolbar, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { isAuthentication, logout } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDoctor } from "../slices/doctorSlice";
import { setConditions } from "../slices/conditionsSlice";
import { userDetails } from "../services/api";
import { setUser } from "../slices/userDetails";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false); 
  const { results, noMatchesMessage } = useDebouncedSearch(query, 800);

  useEffect(() => {
    const getName = async () => {
      try {
        const response = await userDetails();
        return response.data.users[0].displayName;
      } catch (error) {
        console.error("Error fetching user details:", error);
        return "Error";
      }
    };
    
    const formatUsername = (username) => {
      if (!username) return "";
      const capitalized = username.charAt(0).toUpperCase() + username.slice(1);
      return capitalized.length > 15 ? capitalized.slice(0, 15) + "..." : capitalized;
    };

    const fetchUserData = async () => {
      const username = await getName();
      const formattedUsername = formatUsername(username);
      dispatch(setUser(formattedUsername));
    };

    fetchUserData();
    dispatch(setDoctor(results.doctors || []));
    dispatch(setConditions(results.conditions || []));
  }, [results, dispatch]);

  const conditionResults = useSelector((state) => state.conditionsInfo.conditionsList);
  const doctorResults = useSelector((state) => state.doctorsInfo.doctorsList);
  const userName = useSelector((state) => state.userInfo.userName);

  const handleLogoutClick = () => {
    setOpenDialog(true); 
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); 
  };

  if (!isAuthentication()) {
    navigate("/");
    return null;
  }

  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Medical Dashboard
          </Typography>
          <Box display="flex" alignItems="center">
            <Avatar alt="User Photo" src="/path/to/dummy-photo.jpg" style={{ marginRight: "1rem" }} />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogoutClick}
              sx={{
                bgcolor: "secondary.main",
                color: "white",
                "&:hover": { bgcolor: "secondary.dark" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        textAlign="center"
        p={4}
        sx={{
          minHeight: "83vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome, {userName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Find doctors and medical conditions easily.
        </Typography>

        <Box mt={2} width="100%">
          <SearchBar setQuery={setQuery} query={query} />
        </Box>

        {noMatchesMessage.length === 0 && (doctorResults.length > 0 || conditionResults.length > 0) ? (
          <Box
            display="flex"
            gap={4}
            mt={4}
            justifyContent="center"
            alignItems="start"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <Box
              flex={1}
              p={2}
              border={1}
              borderRadius={2}
              borderColor="grey.300"
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Medical Conditions
              </Typography>
              <SearchResults results={conditionResults} type="conditions" query={query} />
            </Box>

            <Box
              flex={1}
              p={2}
              border={1}
              borderRadius={2}
              borderColor="grey.300"
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Doctors
              </Typography>
              <SearchResults results={doctorResults} type="doctors" query={query} />
            </Box>
          </Box>
        ) : (
          <Typography variant="h5" color="error" mt={3}>
            {noMatchesMessage}
          </Typography>
        )}
      </Box>

      <Box mt={5} textAlign="center" color="grey.600">
        <Typography variant="caption">&copy; 2024 Medical Dashboard. All rights reserved.</Typography>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Dashboard;


