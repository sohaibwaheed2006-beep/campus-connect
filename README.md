# CampusConnect — COMSATS University Web Portal

**CampusConnect** is a responsive, accessible, and high-performance academic web portal built for **COMSATS University**. The system provides centralized digital access to university departments, accredited degree curricula, campus support services, live university announcements, and an interactive student inquiry dispatch system.

🌐 **Live Deployment**: [https://campus-connect-lovat-iota.vercel.app/](https://campus-connect-lovat-iota.vercel.app/)  
📂 **GitHub Repository**: [https://github.com/sohaibwaheed2006-beep/campus-connect](https://github.com/sohaibwaheed2006-beep/campus-connect)

---

## 🏛️ System Architecture: 2-Tier Architecture

CampusConnect is designed using a **2-Tier Client-Server Architecture**:

```
+===================================================================+
|                     TIER 1: PRESENTATION LAYER                    |
|                (HTML5, Responsive Vanilla CSS, UI Components)     |
|   - Navigation & Adaptive Drawer (Mobile & Desktop)               |
|   - Hero Portal with Quick Action Triggers                        |
|   - Real-time Course Search & Department Filter UI                |
|   - Accessible Modal Dialogs & Toast Notifications                |
|   - Interactive Student Inquiry Validation & Feedback Forms       |
+=================================▲=================================+
                                  │
                                  │ Event-Driven DOM & Data Binding
                                  │
+=================================▼=================================+
|                     TIER 2: DATA & LOGIC LAYER                    |
|             (JavaScript Engine, State Store & Validation Logic)   |
|   - Degree Programs Dataset (CS, SE, IT, EE, BBA, Math)           |
|   - Student Support Services Repository                           |
|   - Real-time Client-side Search & Multi-criteria Filtering       |
|   - Regex-based Student Roll Number & Form Validation             |
|   - Modal Template Injection & Dynamic View Assembly              |
+===================================================================+
```

### 1. Tier 1 — Presentation Layer (Client UI)
- **Semantic HTML5**: Fully structured markup conforming to modern accessibility standards (`aria-*`, skip-links, dialog semantics).
- **Vanilla CSS (Design Tokens)**: Modern, responsive layout system using CSS variables, Flexbox, and CSS Grid with a university color palette (Navy Blue `#091e42`, Royal Blue `#1d4ed8`, and Accent Amber `#d97706`).
- **Mobile-First Responsiveness**: Fluid multi-breakpoint layout adapting from ultra-wide displays down to mobile handheld devices.

### 2. Tier 2 — Data & Logic Layer
- **Dataset Catalog**: In-memory JavaScript data models storing comprehensive program outlines, prerequisite subjects, skills matrix, career pathways, and support office desk hours.
- **Dynamic Search & Filtering**: Sub-millisecond client search algorithm scanning course titles, descriptions, and metadata keywords.
- **Client Validation Engine**: Comprehensive regular expression verification for student registration numbers (e.g., `2023-SE-045`), email domains, and minimum content lengths with immediate visual feedback.

---

## 📁 Project Directory Structure

```
uni-portal/
├── index.html            # Main university landing portal & notice board
├── departments.html      # Academic faculties directory & research centers
├── courses.html          # Degree catalog with real-time search & filters
├── services.html         # Campus student support wings & service modals
├── contacts.html         # Student inquiry desk & validated contact form
├── css/
│   └── style.css         # Unified design system & responsive styling
├── js/
│   └── script.js         # Logic layer: search filters, data store, modals & validation
└── README.md             # Project technical documentation
```

---

## 🚀 Key Features

1. **Centralized Portal Navigation**: Sticky header with brand logo badge, navigation links, and mobile slide-out drawer.
2. **Dynamic Course Exploration**: Real-time keyword search and department dropdown filters with accessible modal views for deep curriculum inspection.
3. **Campus Notice Board**: Priority-tagged live announcements (Academic Urgent, Events, Facilities) synchronized on the home portal.
4. **Student Inquiry Management**: Validated student enquiry form with real-time error clearance and submission status alerts.
5. **Zero External Framework Dependencies**: Pure standard Web APIs (HTML5 / CSS3 / ES6+ JavaScript) ensure zero build steps, instant loading speeds, and universal browser compatibility.

---

## 💻 Setup & Execution

1. Clone or download the repository into your local web environment (e.g. `htdocs` or any local folder).
2. Open `index.html` directly in any modern web browser, or serve via a local server (e.g. XAMPP Apache or Live Server).
3. Navigate across **Departments**, **Courses**, **Student Services**, and **Contacts**.

---

## 📜 License & Accreditation
Developed for **COMSATS University Web Technology & Portal Systems**. All rights reserved © 2026.
