# EzzyBIZZ - Barber & Beauty Business Assistant

**EzzyBIZZ** is a simple, beginner-friendly business assistant web application designed specifically for barbershop owners, hair stylists, nail technicians, and spa entrepreneurs.

The app works **100% in the frontend**, using your browser's local storage to save your records securely without requiring any backend database, serverless function, or monthly server costs. It is pre-configured for instant zero-configuration static deployment on **Netlify**.

---

## 🌟 Key Features

1. 💈 **Sales Tracker**:
   - Log cuts, fades, beard trims, dye jobs, dreadlocks retwists, and VIP king grooming packages.
   - Record customer payment method: **M-Pesa**, Cash, or Card.
   - Track which barber or stylist handled each client.
   - Export sales reports to CSV anytime.
   - View and print mini client receipt slips.

2. 📉 **Expenses Tracker**:
   - Track operational outlays: shop rent, clipper blades (Dorco/Barbicide), electricity tokens (KPLC), water delivery, staff commission, and Wi-Fi.
   - Visual category distribution to detect where your money is going.

3. 💰 **Estimated Profits & Margins**:
   - Automatic calculation of daily, weekly, and monthly Gross Revenue, Total Expenses, Estimated Net Profit, and Profit Margin %.
   - Visual cashflow split progress bar.

4. 📊 **Service Profitability Analyzer**:
   - Compare which services generate the highest net profit after factoring in consumable costs (blades, oils, creams, towels).
   - Interactive price & profit simulator: see how raising a service price by KSh 100 or KSh 200 affects your monthly net income.

5. 📝 **Daily Business Notes & Shift Log**:
   - Set daily haircut targets.
   - Log inventory restock reminders (e.g. running low on aftershave or black dye).
   - Record customer feedback and equipment repair logs.

6. 🤖 **AI Business Assistant**:
   - Ask questions in plain language about today's sales (mauzo ya leo), expenses (matumizi), net profit (faida), most profitable services (huduma), and cost-cutting advice.
   - Generates instant answers using local financial calculations and active ledger rules without requiring external API keys.
   - Clean architecture prepared for easy future integration with Gemini API or a secure backend.

7. 📅 **Customer Booking Link (Miadi ya Wateja)**:
   - Shareable customer-facing booking page with shop details, services, prices in KSh, barber selection, and date/time slots.
   - One-click copy booking link button and instant booking confirmation.
   - Owners can review all appointments and convert any appointment into a completed sale (Weka Mauzo) with one click.
   - Persistent in browser storage with clear multi-device sync notice.

8. 🇰🇪 **Kenyan Shillings & Locally Friendly**:
   - Native Kenyan Shillings (KSh) formatting.
   - Familiar bilingual Swahili terms: Karibu (Welcome), Mauzo (Sales), Matumizi (Expenses), Faida (Profit), Huduma (Services), Wateja (Customers), Miadi (Appointments), and Hifadhi (Save).

---

## 🚀 How to Deploy on Netlify via GitHub (Beginner Friendly)

EzzyBIZZ is built with **React + Vite** and comes with a pre-configured `netlify.toml` file that handles client-side single page app (SPA) routing so page refreshes never return 404 errors.

### Step 1: Push Code to GitHub
1. Unzip `ezzybizz-project.zip` onto your computer.
2. Open your terminal or command prompt inside the extracted folder.
3. Run the following commands:

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit of EzzyBIZZ"

# Link to your GitHub account (create a new repository at github.com/new named ezzybizz)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ezzybizz.git
git push -u origin main
```

### Step 2: Deploy to Netlify
1. Log in to [Netlify](https://app.netlify.com).
2. Click **"Add new site"** → **"Import an existing project"**.
3. Select **GitHub** and grant permission to access your `ezzybizz` repository.
4. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy EzzyBIZZ"**.
6. Within 60 seconds, your application will be live at a custom URL (e.g., `https://your-shop-name.netlify.app`)!

---

## 🛠️ Local Development

To run the app locally on your computer:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🔒 Demo Authentication Note

EzzyBIZZ utilizes client-side demo authentication. Your user profile, sales, expenses, and notes are persisted directly in your browser's `localStorage`. No remote server or database is contacted, making it fast, private, and 100% free to host.

---

© 2026 EzzyBIZZ. Designed for barbershop and beauty entrepreneurs.
