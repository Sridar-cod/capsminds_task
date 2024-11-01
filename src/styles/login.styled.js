import styled from "styled-components";

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;

  label {
    margin-bottom: 4px;
    font-weight: 500;
    color: #374151; /* Slate color for better readability */
  }

  input {
    padding: 8px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: #f3f4f6;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #6366f1; /* Indigo border on focus */
    }
  }
`;
export const StyledButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  color: #ffffff;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
`;
export const StyledBox = styled.div`
  background-color: #f1f5f9;
  padding: 1.5rem;
  border-radius: 0.5rem;
`;
export const StyledHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
`;
export const StyledOuterContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const StyledInnerContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
`;
export const StyledLink = styled.div`
  margin-top: 1rem;
  text-align: center;

  a {
    color: blue;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
export const StyledErrorBox = styled.div`
  color: #ff4d4f;
  background-color: #ffe6e6;
  border: 1px solid #ff4d4f;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
`;
