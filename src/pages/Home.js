import React, { useEffect, useState } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import SearchResults from "../components/searchSection/SearchResults";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import { Box, Typography } from "@mui/material";
function Home() {
  const [conditionResults, setConditionResults] = useState([]);
  const [doctorResults, setDoctorResults] = useState([]);

  const [query, setQuery] = useState("");
  const {results,noMatchesMessage} = useDebouncedSearch(query, 800);

  useEffect(() => {
    setConditionResults(results.conditions || []);
    setDoctorResults(results.doctors || []);
  }, [results]);

  return (
    <Box
      textAlign="center"
      p={4}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Search Medical Information
      </Typography>

      <Box mt={"2"} width={"100%"}>
      <SearchBar setQuery={setQuery} query={query} />
      </Box>

        {(noMatchesMessage.length===0 && (doctorResults.length > 0 || conditionResults.length > 0)) ?  (
        <Box display="flex" gap={4} mt={4} justifyContent="center" alignItems={'start'}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' } 
        }}>
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
      ): <Typography variant="h5" color="error" mt={3}>
      {noMatchesMessage}
      </Typography>}
    </Box>
  );
}

export default Home;
