// src/components/SearchBar.js
import { Box, TextField } from '@mui/material';

function SearchBar({ setQuery,query }) {
    return (
        <Box display="flex" justifyContent="center">
            <TextField
                value={query}
                placeholder="Search for conditions or doctors"
                variant="outlined"
                onChange={(e)=>setQuery(e.target.value)
                }
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                }}
            />
        </Box>
    );
}

export default SearchBar;
