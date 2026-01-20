What is Ops Monitor?

A real-time incident tracking dashboard for engineering and operations teams. It helps teams to log, track, and manage post production incidents, outages, and SLA breaches in a structered way.

Project Features:
- User authentication with secure signup and login.
- Log and classify the incidents (outagesm SLA breackes)
- Track status of incident and ownership instantly
- Update incidetns as the progress through their lifecycle

Tech Stack:

Backend - Node js, Express jx, Prisma ORM, PostgresSQL, Socket.io (planned implementation for real-time updates), Zod(Validation)

Infra: Docker, Docker Compose

Auth: JWT

Frontend - Next js, TypeScript, Tailwind CSS, shadcn, TanStack Table

API Endpoints:

Auth:
POST | /api/user/signup | To sign up a new user account
POST | /api/user/login | To login an existing user account

Incidents:
POST | /api/incidents | To create a new incidents
GET | /api/incidents | To retrieve all the incidents (with pagination and filters)
GET | /api/incidents/:id | To retrieve details of single incident by ID
PATCH | /api/incidents/:id | To edit the details of single incident (status, priority, assignee)
