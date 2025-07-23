# minibasket
Mini Sepet Similasyonu

This project is a **React Native** application that simulates a simple e-commerce cart logic.
Products can be added to the cart from the product detail page, quantity can be increased/decreased on the cart screen, and the **total amount** is displayed in real time.

---

## Features

- **Product Detail Page**: Product information and add-to-cart button
- **Cart Management**:
- Add/remove products
- Increase/decrease quantity (automatically cleared if set to 0)
- Clear the cart completely
- **Total Amount**: Displayed permanently at the bottom and updated instantly
- **Global State Management with Context API**: Lightweight and fast without using external libraries

---

## Requirements

- **Node.js** (>= 18.x)
- **npm** (>= 9.x) or **yarn**
- **React Native CLI** environment
- **Android Studio** (for Android)
- **Xcode** (for iOS)

---

## Installation and Operation

1. **Clone the project:**

```bash
git clone https://github.com/furkannemree/minibasket.git
cd <minibasket>
```

2. **Install dependencies:**

npm install

3. **Setup Pods for iOS (macOS users):**

npx pod-install

4. **Run the application:**

For Android:

npm run android

For IOS:

npm run ios


## If you get Android build errors

cd android && ./gradlew clean

or

If there is a version-related problem or you get a Gradle error, you need to run the project in Android Studio and synchronize it with Gradle.