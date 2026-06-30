# Node 3-Tier Application

A simple **Task Manager** built with Node.js and Express, following a classic **3-tier architecture**: presentation, application, and data layers.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Presentation Tier (public/)                            │
│  HTML, CSS, JavaScript — user interface                 │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP /api/tasks
┌──────────────────────────▼──────────────────────────────┐
│  Application Tier (src/routes, controllers, services)   │
│  API routes, request handling, business logic           │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│  Data Tier (src/data/)                                  │
│  Repository pattern + JSON file persistence               │
└─────────────────────────────────────────────────────────┘
```

| Tier | Folder | Responsibility |
|------|--------|----------------|
| **Presentation** | `public/` | UI — forms, task list, API calls from the browser |
| **Application** | `src/routes/`, `controllers/`, `services/` | REST API, validation, business rules |
| **Data** | `src/data/` | Read/write tasks to `tasks.json` |

## Project Structure

```
node_application/
├── public/                      # Presentation tier
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── src/
│   ├── server.js                # Entry point
│   ├── app.js                   # Express configuration
│   ├── routes/taskRoutes.js     # API route definitions
│   ├── controllers/taskController.js
│   ├── services/taskService.js
│   └── data/
│       ├── taskRepository.js    # Data access layer
│       └── tasks.json           # Persistent storage
├── scripts/
│   └── smoke-test.js            # Automated smoke tests
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/node-3tier-app.git
cd node-3tier-app
npm install
```

### Run the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Mode

Auto-restarts the server when files change:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/tasks` | List all tasks |
| `GET` | `/api/tasks/:id` | Get a task by ID |
| `POST` | `/api/tasks` | Create a task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `PATCH` | `/api/tasks/:id/toggle` | Toggle task completion |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Example: Create a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Build a 3-tier app"}'
```

## Testing

Run smoke tests locally:

```bash
npm test
```

Tests cover task creation, retrieval, toggle, deletion, and input validation.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Storage:** JSON file (`tasks.json`)

## License

MIT
