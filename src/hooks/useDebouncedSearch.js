import { useState, useEffect } from "react";
import { fetchConditions, fetchDoctors } from "../services/api";

const useDebouncedSearch = (query, delay = 500) => {
  const [results, setResults] = useState({ conditions: [], doctors: [] });
  const [noMatchesMessage, setNoMatchesMessage] = useState("");

  const fetchAndFilterData = async () => {
    try {
      const [conditions, doctors] = await Promise.all([
        fetchConditions(),
        fetchDoctors(),
      ]);

      const filteredConditions = conditions.filter((cond) =>
        cond.name?.toLowerCase().includes(query.toLowerCase())
      );
      const filteredDoctors = doctors.filter(
        (doc) =>
          doc.fullName?.toLowerCase().includes(query.toLowerCase()) ||
          doc.specialty?.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredConditions.length === 0 && filteredDoctors.length === 0) {
        setNoMatchesMessage(`No matches found for "${query}"`);
      } else {
        setNoMatchesMessage("");
      }

      setResults({
        conditions: filteredConditions,
        doctors: filteredDoctors,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setNoMatchesMessage("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    if (!query) {
      setResults({ conditions: [], doctors: [] });
      setNoMatchesMessage("");
      return;
    }

    const debounceTimer = setTimeout(fetchAndFilterData, delay);
    return () => clearTimeout(debounceTimer);
  }, [query, delay]);

  return { results, noMatchesMessage };
};

export default useDebouncedSearch;
