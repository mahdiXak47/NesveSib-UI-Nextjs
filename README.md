# NesveSib-UI-Nextjs

A modern web application built with Next.js, featuring a beautiful UI and powerful functionality.

## Features

- Modern and responsive design
- User authentication
- File upload functionality
  - Supports uploading files to `/hello` directory
  - Real-time upload status feedback
  - Secure file handling

## Setup Requirements

1. Node.js (v14 or higher)
2. npm or yarn
3. Ensure the `/hello` directory exists and has proper write permissions for file uploads

## Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## File Upload Configuration

The application supports file uploads to the `/hello` directory. Make sure:

1. The `/hello` directory exists on your server
2. The directory has proper write permissions
3. The server process has access to write to this location

## Environment Variables

No specific environment variables are required for basic functionality.

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Formidable (for file uploads)
- TypeScript