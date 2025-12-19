# Aura Pop Beauty - Cosmetic Ecommerce Website

A modern, responsive React.js ecommerce website for a luxury cosmetic brand featuring a rose gold gradient theme with elegant design elements.

## Features

### Core Functionality
- **Home Page**: Hero banner, featured products, and brand highlights
- **Product Listing**: Filterable and sortable product catalog with search
- **Product Details**: Detailed product view with image gallery and specifications
- **Shopping Cart**: Add/remove items with quantity controls and real-time updates
- **Checkout**: Complete order form with shipping and payment details

### Design & UX
- **Rose Gold Theme**: Elegant gradient (#B76E79 to #A85F6A) with creamy white backgrounds
- **Responsive Design**: Mobile-first approach with smooth animations
- **Loading States**: Skeleton screens for better user experience
- **Interactive Elements**: Hover effects, smooth transitions, and visual feedback

### Technical Features
- **React Router**: Smooth navigation between pages
- **Context API**: Global cart state management
- **Local Storage**: Persistent cart data across sessions
- **Modern CSS**: CSS Grid, Flexbox, and custom properties
- **Performance**: Optimized images and lazy loading

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Navigation and search
│   ├── Footer/         # Site footer with links
│   ├── ProductCard/    # Product display component
│   ├── CartItem/       # Cart item component
│   └── LoadingSkeleton/ # Loading state components
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Products.jsx    # Product listing
│   ├── ProductDetails.jsx # Individual product view
│   ├── Cart.jsx        # Shopping cart
│   └── Checkout.jsx    # Order completion
├── context/            # React Context providers
│   └── CartContext.jsx # Cart state management
├── data/               # Static data
│   └── products.js     # Product catalog
├── styles/             # Global styles
│   └── globals.css     # CSS variables and utilities
└── App.jsx             # Main application component
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd my-react-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Customization

### Colors
Update the CSS custom properties in `src/styles/globals.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #B76E79 0%, #A85F6A 100%);
  --primary-color: #B76E79;
  --secondary-color: #A85F6A;
  --background-cream: #FFF8F5;
  --text-gray: #8A8A8A;
}
```

### Products
Modify the product data in `src/data/products.js` to add your own products.

### Branding
Update the brand name and logo in:
- `src/components/Header/Header.jsx`
- `src/components/Footer/Footer.jsx`
- `index.html` (title and meta tags)

## Features to Extend

- User authentication and accounts
- Product reviews and ratings
- Wishlist functionality
- Order history and tracking
- Payment gateway integration
- Admin panel for product management
- Email notifications
- Social media integration

## Technologies Used

- **React 19** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **Context API** - State management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational and demonstration purposes.