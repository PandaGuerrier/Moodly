# Expo App Starter Kit

A modern React Native starter kit built with Expo, featuring a clean architecture and essential packages for rapid mobile app development.

## 📦 Installed Packages

### Core Dependencies
- **expo**: The foundation framework for building universal React applications
- **expo-router**: Handles file-based routing in the application
- **expo-status-bar**: Manages the status bar appearance across different platforms
- **react-native**: The core framework for building native applications using React

### UI & Styling
- **@expo/vector-icons**: Provides a comprehensive set of pre-made icons (including FontAwesome)
- **nativewind**: Utility-first CSS framework for React Native (Tailwind CSS for React Native)

## 🚀 Features

- File-based routing system using Expo Router
- Modern UI styling with NativeWind (Tailwind CSS)
- Pre-configured icon support with Expo Vector Icons
- Clean and organized project structure
- TypeScript support for better development experience

It also contains two components:
- `src/components/AppText.tsx` for text
- `src/components/Button.tsx` for 3 button variants

And one utility:
- `src/utils/cn.ts` for merging Tailwind classes


## 🏗️ Project Structure
```
expo-app-starter/
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   ├── components/
│   │   ├── Container.tsx
│   │   ├── Modal.tsx
├── assets/
├── .gitignore
├── app-env.d.ts
├── app.json
├── babel.config.js
├── cesconfig.json
├── global.css
├── metro.config.js
├── nativewind-env.d.ts
├── package-lock.json
├── package.json
├── prettier.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
```

## 🛠️ Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npx expo start
```

## 💡 Usage
This starter kit provides a small foundation for building React Native applications with Expo. It includes:

- A clean home page component with basic styling
- Example of button implementation with Pressable
- Tailwind CSS styling integration
- Icon usage demonstration
- Type-safe development environment with TypeScript

## 🔧 Customization
You can easily customize this starter kit by:

- Modifying the styling using Tailwind CSS classes
- Adding new routes in the app directory
- Extending the component structure
- Installing additional packages as needed

## 📱 Platform Support
- iOS
- Android
- Web (Expo's universal platform support)

## 📄 License
This project is licensed under the MIT License.