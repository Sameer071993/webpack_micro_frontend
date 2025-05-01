# 🧩 Microfrontend React App with Webpack Module Federation

This project demonstrates a **Microfrontend Architecture** using **React** and **Webpack Module Federation**. It consists of three independent React applications:

- **CDS** — Main Shell App
- **Header** — Microfrontend 1
- **Dashboard** — Microfrontend 2

Each microfrontend runs independently and is dynamically loaded into the shell using **Webpack Module Federation**. All apps are hosted locally on different ports.

---

## 📁 Folder Structure

microfrontend-example/ │ ├── cds/ # Shell (Host) App - http://localhost:3000 ├── header/ # Remote App - Header - http://localhost:3001 └── dashboard/ # Remote App - Dashboard - http://localhost:3002

yaml
Copy
Edit

---

## 🚀 Setup Instructions

### 1. Install dependencies

```bash
cd cds && npm install
cd ../header && npm install
cd ../dashboard && npm install
2. Start all apps (in separate terminals)
bash
Copy
Edit
# Terminal 1
cd cds
npm start

# Terminal 2
cd header
npm start

# Terminal 3
cd dashboard
npm start
3. Access the app
Visit: http://localhost:3000

You will see the Header and Dashboard components loaded inside the Shell app.

🛠️ Module Federation Configuration
🔹 Shell App (cds/webpack.config.js)
js
Copy
Edit
new ModuleFederationPlugin({
  name: "cds",
  remotes: {
    header: "header@http://localhost:3001/remoteEntry.js",
    dashboard: "dashboard@http://localhost:3002/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
  },
})
🔹 Header App (header/webpack.config.js)
js
Copy
Edit
new ModuleFederationPlugin({
  name: "header",
  filename: "remoteEntry.js",
  exposes: {
    "./Header": "./src/Header",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
  },
})
🔹 Dashboard App (dashboard/webpack.config.js)
js
Copy
Edit
new ModuleFederationPlugin({
  name: "dashboard",
  filename: "remoteEntry.js",
  exposes: {
    "./Dashboard": "./src/Dashboard",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
  },
})
💻 Usage in Shell App
js
Copy
Edit
// cds/src/App.js
import React, { Suspense } from "react";

const Header = React.lazy(() => import("header/Header"));
const Dashboard = React.lazy(() => import("dashboard/Dashboard"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>

      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}

export default App;
🧠 Common Issues & Fixes
Issue	Solution
Shared module is not available for eager consumption	Avoid eager loading. Use React.lazy and Suspense.
404 Not Found: remoteEntry.js	Ensure all apps are running and the remote URLs are correct.
ReferenceError: React is not defined	Add import React from 'react' in files using JSX.
MIME type error when loading remoteEntry.js	Make sure webpack-dev-server is serving JS correctly.
Remote components not loading	Check browser DevTools → Network tab for loading issues.

📸 Visual Flow
less
Copy
Edit
[ Header App ]     [ Dashboard App ]
      |                    |
      ↓                    ↓
  expose Header        expose Dashboard
      ↓                    ↓
       ↘                ↙
        ↘              ↙
          [ CDS (Shell App) ]
               ↓
        Dynamically loads Header & Dashboard



