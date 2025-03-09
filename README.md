# FixCal

FixCal is a web application that allows users to convert SportFix team fixtures into ICS calendars that can be downloaded and/or subscribed to from any calendar application.

## Features

- Convert SportFix team fixtures into ICS calendar files
- Create and manage multiple calendars for different teams
- One-click download of calendar files
- Subscribe to calendars with webcal:// links
- Background Jobs for Automatic calendar updates (every 12 hours)
- Google OAuth sign-in for user authentication
- Responsive design for mobile and desktop
- Active Storage with S3 Bucket Object Storage for ICS files

## Technical Stack
- An Inertia-Rails React App:

### Backend
- Ruby on Rails 8.0
- PostgreSQL database
- Solid Queue for background job processing
- Active Storage for file storage
- SQLite3 for SolidCache & SolidQueue
- Devise + OmniAuth for authentication
- Pundit for authorization

### Frontend
- React 19.0 with TypeScript
- Inertia.js for SPA-like navigation
- Vite for asset bundling
- TailwindCSS for styling
- shadcn/ui component library
- Lucide icons

## Deployment
Deployed with Kamal.

## Author

Created by Maximus Dionyssopoulos.
