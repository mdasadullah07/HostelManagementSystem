// src/components/common/GlobalStyles.js
import React from 'react';

const GlobalStyles = () => (
  <>
    {/* Tailwind CSS and Material UI setup */}
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Inter:300,400,500,700&display=swap"
    />
    {/* Bootstrap CSS */}
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossOrigin="anonymous"
    />
    <style>
      {`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f8f9fa; /* Light grey background */
        }
        .MuiAppBar-root {
          background-color: #3f51b5; /* Material UI primary color */
        }
        .MuiButton-root {
          text-transform: none; /* Keep button text as is */
        }
        .MuiCard-root {
          border-radius: 12px !important; /* Rounded corners for cards */
        }
        .MuiDialog-paper {
          border-radius: 12px !important; /* Rounded corners for dialogs */
        }
        .rounded-pill {
          border-radius: 50rem !important; /* Bootstrap rounded pill class */
        }
        .shadow-sm {
          box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important; /* Bootstrap shadow */
        }
        .mt-4 {
          margin-top: 1.5rem !important; /* Bootstrap margin top */
        }
        .mb-3 {
          margin-bottom: 1rem !important; /* Bootstrap margin bottom */
        }
        .mb-2 {
          margin-bottom: 0.5rem !important; /* Bootstrap margin bottom */
        }
        .text-center {
          text-align: center !important; /* Bootstrap text center */
        }
        .text-muted {
          color: #6c757d !important; /* Bootstrap muted text color */
        }
        .d-flex {
          display: flex !important;
        }
        .justify-content-center {
          justify-content: center !important;
        }
        .align-items-center {
          align-items: center !important;
        }
        .flex-grow-1 {
          flex-grow: 1 !important;
        }
        .gap-3 {
          gap: 1rem !important; /* Bootstrap gap utility */
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .bed-card {
          border: 1px solid rgba(0,0,0,0.1);
        }
        .bed-card.bg-success {
          background-color: #28a745 !important; /* Bootstrap success green */
        }
        .bed-card.bg-danger {
          background-color: #dc3545 !important; /* Bootstrap danger red */
        }
        .bed-card.text-white {
          color: #fff !important;
        }
        .fw-bold {
          font-weight: 700 !important;
        }
        .text-success {
          color: #28a745 !important;
        }
        .text-danger {
          color: #dc3545 !important;
        }
        .text-warning {
          color: #ffc107 !important;
        }
      `}
    </style>
  </>
);

export default GlobalStyles;