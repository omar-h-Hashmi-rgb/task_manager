# Task Manager Frontend

A modern, responsive task management application built with Next.js, React, and Tailwind CSS.

**Author:** Omar Hashmi

## Features

- ✨ Clean and modern UI design
- 📱 Fully responsive layout
- ⚡ Real-time task management
- 📊 Task statistics dashboard
- 🎨 Beautiful animations and transitions
- 🔄 Optimistic UI updates
- 🚀 Fast and lightweight

## Tech Stack

- **Framework:** Next.js 14
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Data Fetching:** SWR
- **HTTP Client:** Axios
- **Icons:** Heroicons (via SVG)

## Features Overview

### Task Management
- ✅ Create new tasks with title and description
- 📝 View all tasks in a clean list interface
- ✔️ Toggle task completion status
- 🗑️ Delete tasks with confirmation
- 🔍 Filter tasks by status (All, Pending, Completed)

### User Interface
- 🎨 Custom design with blue/cyan color scheme (no purple!)
- 📊 Statistics cards showing task counts and completion rate
- 💫 Smooth animations and hover effects
- 📱 Mobile-first responsive design
- ⚡ Loading states and error handling

### Performance
- 🚀 Optimized with Next.js App Router
- 🔄 SWR for efficient data fetching and caching
- ⚡ Client-side routing for instant navigation

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Running backend API (task-manager-backend)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ayush2005k/task-manager-frontend.git
cd task-manager-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run test         # Run tests (if configured)
```

## Project Structure

```
├── app/
│   ├── components/       # React components
│   │   ├── Header.js     # App header with title
│   │   ├── Stats.js      # Statistics dashboard
│   │   ├── TaskForm.js   # Create task form
│   │   ├── TaskList.js   # Task list with filtering
│   │   └── TaskCard.js   # Individual task item
│   ├── lib/
│   │   └── api.js        # API utility functions
│   ├── globals.css       # Global styles and Tailwind
│   ├── layout.js         # Root layout component
│   └── page.js          # Home page
├── public/              # Static assets
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

## Components

### Header
- Displays app title and author information
- Gradient icon with task management symbol

### Stats
- Shows total, completed, pending tasks
- Displays completion percentage
- Auto-updates when tasks change

### TaskForm
- Form to create new tasks
- Validates required fields
- Handles loading states

### TaskList
- Displays filtered list of tasks
- Handles empty states
- Loading and error states

### TaskCard
- Individual task display
- Toggle completion status
- Delete with confirmation
- Shows creation timestamp

## API Integration

The frontend communicates with the backend API through these endpoints:

```javascript
// Get all tasks
GET /api/tasks

// Create task
POST /api/tasks
{
  "title": "Task title",
  "description": "Task description",
  "status": "pending"
}

// Update task
PUT /api/tasks/:id
{
  "title": "Updated title",
  "status": "completed"
}

// Delete task
DELETE /api/tasks/:id
```

## Styling

### Design System
- **Primary Colors:** Blue shades (50-900)
- **Gray Scale:** Modern gray palette
- **Typography:** Inter font family
- **Components:** Custom Tailwind utility classes

### Custom CSS Classes
```css
.btn              # Base button styles
.btn-primary      # Primary blue buttons
.btn-secondary    # Gray secondary buttons
.btn-danger       # Red danger buttons
.btn-success      # Green success buttons
.card             # White card with shadow
.input            # Form input styling
.textarea         # Form textarea styling
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL

### Netlify

1. Build the application:
```bash
npm run build
```

2. Deploy the `out` directory to Netlify

3. Set environment variable:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL

### Environment Variables

For production deployment, make sure to set:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
```

## Development

### Adding New Components

1. Create component in `app/components/`
2. Import and use in relevant pages
3. Follow existing patterns for styling and state management

### Styling Guidelines

1. Use Tailwind utility classes
2. Follow the existing color scheme (blue/cyan/gray)
3. Ensure responsive design with mobile-first approach
4. Add hover and focus states for interactive elements

### State Management

- Use React hooks (`useState`, `useEffect`)
- SWR for server state management
- Lift state up to parent components when needed

## Performance Optimization

- Next.js automatic code splitting
- SWR caching and revalidation
- Optimized images and fonts
- Minimal JavaScript bundles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure responsive design
5. Test across different devices
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Author

**Omar Hashmi**

This is a full-stack task management application showcasing modern web development practices with Next.js, React, and Tailwind CSS.