***Medical Appointment Scheduler***

*How to Run the Application:
Before starting the application, you need to install react-router-dom and @mui/material for routing and UI components.

*Update API URL:
 Go to the API configuration file in your project and change the URL to http://localhost:3000 to point to your local server.

*Design Decisions:
Throughout the application, a card view layout is used to display information, providing a clean and user-friendly interface for search results, detailed views, and scheduled appointments.

*Challenges Faced:
Using MUI Components: Initially, I had limited knowledge of Material-UI (MUI) components. To overcome this challenge, I dedicated time to learning the MUI documentation, which helped me implement various components effectively in the application.

*Implementing a Debounce Function: Creating an efficient search feature required a debounce function to minimize unnecessary API calls. I researched and implemented this functionality, allowing the application to wait for the user to stop typing before initiating a search request.

-----Documentation-----

**Technology Stack:
--Frontend: React
--UI Library: Material-UI (MUI)
--Routing: React Router
--API: Mock API located in public/data

**Key Features
--Mock API Integration: Fetch data through api.js.
--Seamless Navigation: Utilize React Router for page transitions.
--Efficient Searching: Custom debounce hook for optimized search functionality.
--Appointment Scheduling: Users can schedule appointments with data stored in local storage.
--View Scheduled Appointments: Retrieve and display appointments from local storage.

**Implementation
--API Calls: Managed via api.js to fetch data.
--Routing: Set up using React Router for component navigation.
--Custom Hook: A debounce function to enhance search efficiency.
--Overall Data Storage : utilizing React hooks for state management.
--Data Storage for appointment: Appointment information stored in local storage for persistence.





