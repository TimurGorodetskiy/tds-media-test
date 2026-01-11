# TDS Media - User Management System

A User Management Dashboard built with **React**, **TypeScript**, and **Vite**. This application allows administrators to manage a user database with full CRUD capabilities.

## 🚀 Features

### Core Functionality
- **Full CRUD Support**: View, create, edit, and delete users via a RESTful API.
- **Server-side Logic**: Integrated with MockAPI for real-time data persistence.

### Advanced Features (Bonus Implemented)
- **Data Validation**: Strict schema-based validation using `Zod` (Email formats, required fields, minimum constraints).
- **Pagination**: server-side pagination.
- **Sorting**: Multi-column sorting (First Name, Last Name, Email) with visual indicators.

### UI/UX & Polish
- **Modern Interface**: Built with **Shadcn/ui** and **Tailwind CSS**.
- **User Feedback**:
    - **Sonner Toast**:  Notifications for success and error states.
    - **Alert Dialogs**: Custom confirmation modals for destructive actions (Delete).

## 🛠 Tech Stack

- **Frontend**: React 19 (Vite)
- **Language**: TypeScript
- **Form Management**: React Hook Form
- **Validation**: Zod
- **API Client**: Axios
- **Styling**: Tailwind CSS + Shadcn/ui
- **Routing**: React Router 7
- **Icons**: Lucide React
  
## 📦 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn or pnpm

### Installation

1. **Clone the repository**:
```bash
   git clone https://github.com/TimurGorodetskiy/tds-media-test.git
   cd tds-media-test
```

2. **Install dependencies**:
```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
```

3. **Run the development server**:
```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
```

4. **Open your browser**:
```
   http://localhost:5173
```

## 🏗 Build for Production
```bash
npm run build
# or
yarn build
# or
pnpm build
```

The production-ready files will be in the `dist/` folder.

## 📝 Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

- **Timur Gorodetskiy** - [GitHub](https://github.com/TimurGorodetskiy)
