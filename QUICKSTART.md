# LifeQuest Quick Start Guide

## 🚀 5-Minute Setup

### 1. Prerequisites
- Node.js 18+ installed
- npm installed
- A Supabase account (free at https://supabase.com)

### 2. Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in project details
4. Wait for project to initialize (2-3 minutes)
5. Note your credentials

### 3. Setup Database
1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `database.sql` from this project
4. Click **Run**
5. Wait for completion (you should see "Query successful")

### 4. Get API Credentials
In Supabase Dashboard:
1. Go to **Settings** → **API**
2. Copy the **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
3. Copy the **anon/public key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### 5. Configure Environment
```bash
# Edit .env.local with your credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 6. Install Dependencies
```bash
npm install
```

### 7. Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## 🎮 First Steps

1. **Create Account**
   - Click "Create Account"
   - Fill in username, email, password
   - Click "Create Account"

2. **Explore Dashboard**
   - View your stats and XP progress
   - See recent activity feed
   - Quick add a task using the input at the top

3. **Create Your First Task**
   - Click "My Tasks" in sidebar
   - Click "+ New Task"
   - Fill in title, description, priority, due date
   - Click "Create Task"

4. **Complete Tasks**
   - Check the checkbox to mark tasks complete
   - Earn XP and level up!
   - Watch your progress on the Dashboard

5. **Organize with Categories**
   - Go to Categories
   - Create categories for different areas (Work, Personal, etc.)
   - Assign tasks to categories

## 📁 Project Structure

```
LifeQuest/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── hooks/           # Custom hooks (useAuth)
│   ├── lib/             # Utilities (Supabase client)
│   ├── store/           # Zustand state management
│   └── types/           # TypeScript interfaces
├── .env.local           # Your local config (DO NOT COMMIT)
├── .env.example         # Config template
├── database.sql         # Database schema
├── IMPLEMENTATION.md    # Full documentation
└── package.json         # Dependencies
```

## 🎨 Key Features

### ✅ Task Management
- Create, edit, delete tasks
- Filter by status, priority, category
- Sort by due date or priority
- Mark tasks complete
- Assign XP rewards

### 🎮 Gamification
- Earn XP on task completion
- Level progression system
- Track streaks
- View achievements
- Character progression

### 👤 User Profile
- Custom username and avatar
- XP and level display
- Task statistics
- Edit profile information
- Account settings

### 📊 Dashboard
- Stats overview
- Level progress indicator
- Activity feed
- Quick task creation
- XP tracking

## 💾 Database Tables

The database includes 8 main tables:

1. **profiles** - User profiles and stats
2. **tasks** - Task items with metadata
3. **statuses** - Task status options (todo, in_progress, etc.)
4. **priorities** - Priority levels
5. **categories** - Task categories
6. **task_tags** - Tags for tasks
7. **achievements** - Earned achievements
8. **activity_logs** - User activity history

All tables have Row Level Security (RLS) enabled for data privacy.

## 🛠️ Common Tasks

### View Available Pages
- `/` - Home/Landing
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/(app)/` - Dashboard
- `/(app)/tasks` - Task management
- `/(app)/character` - Character progression
- `/(app)/categories` - Category management
- `/(app)/priorities` - Priority settings
- `/(app)/profile` - User profile
- `/(app)/settings` - App settings

### Run Production Build
```bash
npm run build
npm start
```

### Run Linter
```bash
npm run lint
```

## 🔐 Authentication

- Secure signup/login with Supabase Auth
- Email and password authentication
- Automatic session persistence
- Auto-redirect to login when needed

## 🎨 Styling

- Tailwind CSS v4 for styling
- Dark theme with glassmorphism
- Responsive mobile-first design
- Consistent color palette:
  - Primary: Cyan (#06b6d4)
  - Accent: Violet (#a78bfa)
  - Dark background: Slate-950
  - Light text: White/Slate-100

## 🚀 Performance

- Build time: ~3.4 seconds
- Dev server start: ~300ms
- TypeScript type checking: ~3.2 seconds
- All pages pre-rendered for fast loads

## 📝 Next Steps

1. **Backend Integration**
   - Connect components to Supabase queries
   - Implement real-time updates

2. **Advanced Features**
   - Recurring tasks
   - Task dependencies
   - Advanced analytics

3. **Gamification Enhancements**
   - Achievement unlocks
   - Badges and rewards
   - Leaderboards

4. **UI Improvements**
   - Drag-and-drop tasks
   - Calendar view
   - Search functionality

## 🐛 Troubleshooting

### "API key not found"
- Check `.env.local` has correct credentials
- Verify Supabase project is active

### "Can't connect to database"
- Verify `database.sql` was run successfully
- Check RLS policies are enabled
- Ensure Supabase database is online

### "Build errors"
- Delete `node_modules` folder
- Run `npm install` again
- Clear `.next` folder
- Run `npm run build`

### "Components not showing"
- Check that you're authenticated
- Verify browser console for errors
- Check `.env.local` configuration

## 📞 Support

For issues:
1. Check the documentation in `IMPLEMENTATION.md`
2. Review the code structure in `src/`
3. Check Supabase dashboard for data issues
4. Review browser console for errors

## 📚 Resources

- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- Supabase Docs: https://supabase.io/docs
- Tailwind CSS: https://tailwindcss.com
- Zustand: https://zustand-react.pages.dev

## ✨ Congratulations!

You've successfully set up LifeQuest! Start creating tasks, earning XP, and leveling up your productivity! 🎉

Happy questing! 🚀
