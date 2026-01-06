# 📝 Thinkerboard

A modern, intelligent note-taking application built with the MERN stack. Capture ideas, organize thoughts, and boost your productivity with a beautiful, intuitive interface.
<img width="1889" height="915" alt="Screenshot_20260106_181202" src="https://github.com/user-attachments/assets/80dc922f-784a-4396-b994-294ca50115d7" />
<img width="1764" height="861" alt="Screenshot_20260106_181231" src="https://github.com/user-attachments/assets/35d06ca1-84b8-4b2d-973c-3569d2df5446" />



## ✨ Features

### 🎨 **Modern UI/UX**

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Theme**: Beautiful forest theme with DaisyUI components
- **Smooth Animations**: Micro-interactions and transitions throughout
- **Glassmorphism Effects**: Modern backdrop blur and transparency
- **Custom Animations**: Fade-in, slide, and scale effects

### 📝 **Note Management**

- **Create Notes**: Rich text editor with title, content, and categories
- **Edit Notes**: Pre-populated forms for easy editing
- **Delete Notes**: Confirmation dialogs for safety
- **Categories**: Organize notes with custom categories
- **Real-time Search**: Instant filtering across title, content, and categories

### 🔍 **Search & Discovery**

- **Live Search**: Real-time filtering as you type
- **Multi-field Search**: Search through title, content, and categories
- **Search Results UI**: Dedicated interface for search results
- **Quick Clear**: One-click search clearing

### 📊 **Dashboard & Analytics**

- **Stats Overview**: Total notes, categorized count, recent activity
- **Activity Tracking**: Notes created this week
- **Visual Cards**: Beautiful note cards with hover effects
- **Empty States**: Helpful guidance for new users

### 🛡️ **Performance & Security**

- **Rate Limiting**: API protection against abuse
- **Error Handling**: Comprehensive error messages and recovery
- **Loading States**: Skeleton loaders and spinners
- **Responsive Images**: Optimized for all screen sizes

## 🚀 Tech Stack

### **Frontend**

- **React 19**: Modern React with hooks and concurrent features
- **React Router**: Client-side routing with lazy loading
- **TailwindCSS**: Utility-first CSS framework
- **DaisyUI**: Component library built on Tailwind
- **Lucide React**: Beautiful icon library
- **React Hot Toast**: Elegant notification system
- **Axios**: HTTP client for API requests

### **Backend**

- **Node.js**: JavaScript runtime with ES6+ features
- **Express.js**: Fast, minimalist web framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **Rate Limiting**: Upstash Redis-based rate limiting
- **CORS**: Cross-origin resource sharing

### **Development Tools**

- **Vite**: Lightning-fast build tool and dev server
- **ESLint**: Code quality and style enforcement
- **Git**: Version control and collaboration

## 📦 Installation

### **Prerequisites**

- Node.js 18+ and npm
- MongoDB database (local or cloud)

### **Setup**

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sanjaya-Danushka/Thinkerboard.git
   cd Thinkerboard
   ```

2. **Install dependencies**

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend/thinkboard
   npm install
   ```

3. **Environment Configuration**

   ```bash
   # Backend environment variables
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and other secrets

   # Frontend environment variables
   cd ../frontend/thinkboard
   cp .env.example .env
   # Edit .env if needed
   ```

4. **Start the application**

   ```bash
   # Start backend server (port 5001)
   cd backend
   npm run dev

   # Start frontend dev server (port 5173)
   cd ../frontend/thinkboard
   npm run dev
   ```

## 🌐 API Endpoints

### **Notes API**

- `GET /api/notes` - Fetch all notes
- `GET /api/notes/:id` - Fetch single note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update existing note
- `DELETE /api/notes/:id` - Delete note

### **Request/Response Format**

```javascript
// Create Note Request
{
  "title": "My Note Title",
  "content": "Note content here...",
  "category": "Personal" // Optional
}

// Note Response
{
  "_id": "64a1b2c3d4e5f6789012345",
  "title": "My Note Title",
  "content": "Note content here...",
  "category": "Personal",
  "createdAt": "2024-01-06T12:00:00.000Z",
  "updatedAt": "2024-01-06T12:00:00.000Z"
}
```

## 🎯 Usage

### **Creating Notes**

1. Click "New Note" button in the navbar
2. Fill in title, content, and optional category
3. Click "Save Note" to create

### **Searching Notes**

1. Click the search button in the navbar
2. Type to search through title, content, and categories
3. Click X to clear search

### **Managing Notes**

- **Edit**: Click the edit icon on any note card
- **Delete**: Click the delete icon with confirmation
- **View**: Click anywhere on the note card to see details

### **Categories**

Organize your notes with predefined categories:

- Personal
- Work
- Ideas
- Tasks
- Learning
- Meeting
- Project
- Other

## 🎨 Customization

### **Theme Customization**

The app uses DaisyUI's forest theme. You can customize colors in `src/index.css`:

```css
:root[data-theme="forest"] {
  --p: 142 76% 36%; /* primary - green */
  --s: 317 71% 52%; /* secondary - pink */
  --a: 174 60% 51%; /* accent - cyan */
  /* ... more color variables */
}
```

### **Adding New Categories**

Update the categories array in `CreatePage.jsx` and `EditPage.jsx`:

```javascript
const categories = [
  "Personal",
  "Work",
  "Ideas",
  "Tasks",
  "Learning",
  "Meeting",
  "Project",
  "Other",
  "Your New Category", // Add here
];
```

## 🔧 Development

### **Project Structure**

```
Mern-thinkerboard/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and rate limiting config
│   │   ├── controllers/      # API route handlers
│   │   ├── middleware/       # Custom middleware
│   │   ├── models/          # Mongoose schemas
│   │   └── routes/          # API route definitions
│   └── package.json
├── frontend/
│   └── thinkboard/
│       ├── public/           # Static assets
│       ├── src/
│       │   ├── components/   # Reusable React components
│       │   ├── pages/        # Page components
│       │   └── index.css     # Global styles
│       └── package.json
└── README.md
```

### **Available Scripts**

#### **Backend**

```bash
npm run dev          # Start development server
npm start           # Start production server
npm test             # Run tests
```

#### **Frontend**

```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint          # Run ESLint
```

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**

```bash
cd frontend/thinkboard
npm run build
# Deploy the dist/ folder to your hosting provider
```

### **Backend (Heroku/Railway)**

```bash
cd backend
# Set environment variables
npm start
# Deploy to your preferred Node.js hosting platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **TailwindCSS** - For the utility-first CSS framework
- **DaisyUI** - For the beautiful component library
- **Lucide** - For the elegant icon set
- **MongoDB** - For the flexible database solution

## 📞 Support

If you have any questions or feedback, feel free to:

- Open an issue on GitHub
- Start a discussion
- Contact the maintainers

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Sanjaya-Danushka">Sanjaya Danushka</a></p>
  <p>⭐ If this project helped you, please give it a star!</p>
</div>
