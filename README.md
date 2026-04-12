# 🎬A Cinematic Portfolio Experience

Welcome to the digital home of my video editing journey. This isn't just a website; it's a curated, single-page experience designed to showcase visual storytelling the way it's meant to be seen—fluid, dynamic, and completely immersive. 

Forget the standard, rigid portfolios. We built this to flow.

## 🚀 The Vibe & Vision

I wanted a space that reflects how I edit: seamless transitions, intentional pacing, and a cinematic aesthetic. By combining smooth, scroll-triggered animations with embedded high-quality video (shoutout to Vimeo), the site guides you through my work, experience, and creative process without a single jarring page load.

## 🛠️ What's Under the Hood?

It looks clean on the surface, but there's some serious engineering making it happen.

**The Creative Frontend (`/`)**
- **Next.js & React:** The engine powering the fast, single-page architecture.
- **Framer Motion:** Bringing the UI to life with butter-smooth animations.
- **Tailwind CSS:** Keeping the styling sharp, modern, and perfectly responsive.

**The Reliable Backend (`/portfolio-backend`)**
- **Express.js & Node.js:** Handling the heavy lifting behind the scenes.
- **MongoDB:** Storing data securely.
- **Custom Contact API:** A secure, rate-limited email gateway so we can connect without the spam.

## 🏎️ Want to run it locally?

If you're looking to spin this up on your own machine (or fork it to build your own), here's the quick start guide.

### 1. Fire up the Backend
```bash
cd portfolio-backend
npm install
# Add your environment variables in a .env file (MONGO_URI, PORT, Email creds)
node server.js
```

### 2. Launch the Frontend
```bash
# Don't forget to head back to the root folder first!
npm install
# Set up your .env.local if needed
npm run dev
```

Hit `http://localhost:3000` in your browser and enjoy the show.

## ✌️ Let's Connect

Whether you're here to check out my showreel or you want to collaborate on the next big project, drop me a line through the contact section on the site. Let's make something awesome together.
