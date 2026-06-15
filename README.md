TEMPO is a lightweight, zero-dependency Progressive Web App (PWA) designed to anchor your focus during study and high-intensity deep work blocks.

By completely avoiding heavy frameworks, build pipelines, and unnecessary runtime wrappers, this application achieves near-zero CPU idle overhead. This design guarantees that your device stays cool, quiet, and battery-efficient during long study sessions. Under its minimalist, calm user interface lies a rich architecture deeply integrated into modern, low-level web browser APIs for a fully native app experience.

Technical Architecture & Features

* Vanilla Flip Animation Engine: A custom-engineered flip-clock component built using semantic HTML markup, pure hardware-accelerated CSS3 3D transforms, and lightweight JavaScript state management. Fully optimized for steady 60fps animations with near-zero paint, layout, or reflow costs.
* Procedural Web Audio Noise Generator: Features a native browser AudioContext node pipeline that mathematically synthesizes White, Pink, and Brown noise in real-time. This eliminates the need to download massive ambient audio loops, ensures zero looping gaps, and functions completely offline infinitely.
* Screen Wake Lock API Integration: Utilizes the experimental Screen Wake Lock API to natively prevent your device screen from dimming or locking while a focus block is active, automatically releasing hardware locks when the application tab is minimized or closed.
* Tactile Haptic Feedback: Leverages the navigator.vibrate() API to issue micro-vibrations, yielding a premium tactile feel during card flips, mode transitions, or focus interval completions on supported mobile configurations.
* 100% Offline-First (PWA): Configured with a robust Service Worker caching layer and an explicit Web App Manifest. Can be added directly to desktop docks or mobile home screens, providing a clean, standalone, borderless frame that launches instantly without a network connection.

Tech Stack & Web APIs

* Core Layout & Logic: Vanilla HTML5, CSS3 Custom Properties, Modern ECMAScript (ES6+).
* PWA Architecture: Service Worker API (Cache-First strategy), Web App Manifest standard.
* Audio Core: Web Audio API (AudioContext, AudioBuffer, BiquadFilterNode, GainNode).
* Hardware Layer: Screen Wake Lock API, Vibration/Haptic API.
