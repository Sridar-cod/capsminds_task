import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function SearchResults({ results, type }) {
    return (
        <Grid container spacing={2}>
          {results.length > 0 ? (
            results.map((item) => (
              <Grid item xs={12} sm={12} md={results.length === 1 ? 12 : 6}  key={item.id}>
                <Link to={`/${type}/${item.id}`} style={{ textDecoration: "none" }}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <CardContent>
                      {type === "conditions" ? (
                        <>
                          <Typography variant="h6" color="primary">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {item.description}
                          </Typography>
                        </>
                      ) : (
                        <>
                        <Typography variant="h6" color="primary" gutterBottom>
                          {item.fullName}
                        </Typography>
                      
                        <Typography variant="subtitle1" color="textSecondary">
                          Specialty:
                        </Typography>
                        <Typography variant="body1" color="textPrimary" paragraph>
                          {item.specialty}
                        </Typography>
                      
                        <Typography variant="subtitle1" color="textSecondary">
                          Location:
                        </Typography>
                        <Typography variant="body1" color="textPrimary" paragraph>
                          {item.location}
                        </Typography>
                      
                        <Typography variant="subtitle1" color="textSecondary">
                          Expertise:
                        </Typography>
                        <Typography variant="body1" color="textPrimary" paragraph>
                          {item.summary}
                        </Typography>
                      </>
                      
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))
        ) : (
        
            <Grid item xs={12}>
              <Typography variant="h5" color="error" textAlign="center" mt={4}>
                No matching {type} found.
              </Typography>
            </Grid>
          )}
      </Grid>
      );
      
}

export default SearchResults;
