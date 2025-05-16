import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const meta = document.createElement('meta');
meta.name = 'description';
meta.content = 'The Stoic Seller - Learn ancient philosophy for modern sales success. Practice stoic principles to improve your sales approach with interactive modules, voice practice, and reflection.';
document.head.appendChild(meta);

const title = document.createElement('title');
title.textContent = 'The Stoic Seller | Sales Wisdom Through Ancient Philosophy';
document.head.appendChild(title);

createRoot(document.getElementById("root")!).render(<App />);
