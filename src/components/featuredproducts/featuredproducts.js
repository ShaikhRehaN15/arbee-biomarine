import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import "./featuredproducts.css"; // Create this CSS file for styling

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
const ENQUIRE_ANIMATION_PATH = '/animations/Get-Support-Animation.json';

const products = [
  {
    name: "Crude Fish Oil",
    description:
      "Providing a natural source of omega-3 fatty acids, Arbee’s crude fish oil is versatile for both the feed industry and health sector. Perfect for enhancing animal nutrition or creating wellness supplements, our crude fish oil retains its natural nutrients, supporting growth in livestock and aquaculture, as well as human health initiatives.",
    image: require("../../assets/crude-fish-oil.jpg"), // Update with your image path
  },
  // Add more products here as needed
  {
    name: "Product 2",
    description: "Description for product 2.",
    image: require("../../assets/product2.jpg"),
  },
  {
    name: "Product 3",
    description: "Description for product 3.",
    image: require("../../assets/product3.jpg"),
  },
];

export default function FeaturedProducts() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="featured-products-section">
      <h1 className="featured-title">Featured Products</h1>
      <hr className="featured-divider" />
      <div className="featured-content">
        <div className="featured-info">
          <h2 className="featured-product-name">{products[current].name}</h2>
          <p className="featured-product-desc">{products[current].description}</p>
          <div className="featured-buttons">
            <button className="view-product-btn">View Product</button>
            <Link href="/enquiry" className="enquire-btn h-[60px] w-[176px] inline-block">
              <Lottie
                path={ENQUIRE_ANIMATION_PATH}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
              />
            </Link>
          </div>
        </div>
        <div className="featured-image-area">
          <img
            src={products[current].image}
            alt={products[current].name}
            className="featured-product-image"
          />
        </div>
      </div>
      <div className="featured-carousel">
        <button className="carousel-arrow" onClick={handlePrev}>
          &#60;
        </button>
        <div className="carousel-thumbnails">
          {products.map((product, idx) => (
            <img
              key={idx}
              src={product.image}
              alt={product.name}
              className={`carousel-thumb ${idx === current ? "active" : ""}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
        <button className="carousel-arrow" onClick={handleNext}>
          &#62;
        </button>
      </div>
    </section>
  );
}