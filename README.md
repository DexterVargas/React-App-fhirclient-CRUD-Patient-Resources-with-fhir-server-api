# React App: FHIR Client for Patient Resource Management
This repository contains a **React.js** application designed to function as a **FHIR (Fast Healthcare Interoperability Resources) client**. The application demonstrates how to perform **CRUD (Create, Read, Update, Delete)** operations on **Patient** resources by interacting with a FHIR server API. This project is a practical example of building a modern healthcare application that adheres to open standards for exchanging health information.

## Key Features and Functionality
- **FHIR Patient Resource Management**: The core of the application is its ability to manage patient data as defined by the FHIR standard. This includes:

    -  **Create (POST)**: A form for a user to input new patient data (e.g., name, gender, birth date) and save it as a new Patient resource on the FHIR server.

    -  **Read (GET)**: The application fetches and displays a list of all Patient resources from the FHIR server. Each patient's details are rendered in a clean, readable format.

    -  **Update (PUT)**: Users can edit an existing patient's information. The updated data is then sent back to the server to modify the corresponding Patient resource.

    -  **Delete (DELETE)**: A button or link is provided to remove a patient's record from the FHIR server, demonstrating the ability to handle data removal.

- **RESTful API Interaction**: The application uses modern JavaScript techniques (e.g., fetch or a library like axios) to make RESTful API calls to the FHIR server. It handles the asynchronous nature of these requests and manages the state of the application accordingly (e.g., loading states, error handling).

- **React Hooks for State Management**: The application leverages React Hooks (useState, useEffect) to manage the application's state, such as the list of patients, form input values, and loading indicators.

- **Component-Based Architecture**: The user interface is built with reusable React components, such as a PatientForm component for creating/updating patients and a PatientList component for displaying them. This modular structure makes the codebase clean and maintainable.

## Technologies Used
- **React.js**: The core library for building the single-page application.

- **TypeScript**: The programming language used for all application logic.

- **HTML/TailwindCSS**: For the application's structure and styling.

- **shadcn/ui**: For the application's beautifully-designed, accessible components.

- **FHIR API**: The application interacts with a test or sandbox **FHIR server** (e.g., a publicly available HAPI FHIR server) to perform CRUD operations.
    - The app is using free fhir server `**'https://fhir-bootcamp.medblocks.com/fhir'**` for all api calls.

- **REST API Calls**: The application uses fetch or a similar library to handle HTTP requests to the FHIR server.

## How to Run
Clone the repository.

Install dependencies: `npm install`.

Start the application: `npm run dev`.