import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NewArrivals = () => {

  const scrollRef = useRef(null);
  const [isDragging, setisDragging] = useState(false);
  const [startX, setstartX] = useState(0);
  const [scrollLeft, setscrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(false);
  const [canScrollLeft, setcanScrollLeft] = useState(false);
  const [canScrollRight, setcanScrollRight] = useState(true);

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500?random=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Cuddly N Mushy Valentine Combo",
      price: 845,
      images: [
        {
          url: "https://picsum.photos/500?random=2",
          altText: "Velvet Rose",
        },
      ],
    },
    {
      _id: "3",
      name: "A Forever Promise In White Roses",
      price: 845,
      images: [
        {
          url: "https://picsum.photos/500?random=3",
          altText: "Velvet Rose",
        },
      ],
    },
    {
      _id: "4",
      name: "Love In Bloom Peach Roses",
      price: 695,
      images: [
        {
          url: "https://picsum.photos/500?random=4",
          altText: "Velvet Rose",
        },
      ],
    },
    {
      _id: "5",
      name: "Pink Roses Of Affection",
      price: 745,
      images: [
        {
          url: "https://picsum.photos/500?random=5",
          altText: "Velvet Rose",
        },
      ],
    },
    {
      _id: "6",
      name: "Love At First Sight",
      price: 1145,
      images: [
        {
          url: "https://picsum.photos/500?random=6",
          altText: "Velvet Rose",
        },
      ],
    },
    {
      _id: "7",
      name: "Softly Into Forever With Gypsums",
      price: 745,
      images: [
        {
          url: "https://picsum.photos/500?random=7",
          altText: "Velvet Rose",
        },
      ],
    },
    {
      _id: "8",
      name: "Marvelous Wonderment",
      price: 1195,
      images: [
        {
          url: "https://picsum.photos/500?random=8",
          altText: "Velvet Rose",
        },
      ],
    },
  ];

  const handleMouseDown = (e) => {
    setisDragging(true);
    setstartX(e.pageX - scrollRef.current.offsetLeft);
    setscrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setisDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Update Scroll Buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

      setcanScrollLeft(leftScroll > 0);
      setcanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 py-4">
        Check out our newest collection for men and women - modern, trendy, and ready to refresh your wardrobe. Explore now!
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {
          newArrivals.map((product) => (
            <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || product.name}
                className="w-full h-[300px] object-cover rounded-lg"
                draggable="false"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg hover:text-fresh-green">
                <Link
                  to={`/products/${product._id}`}
                  className="block"
                >
                  <h4 className="font-medium">
                    {product.name}
                  </h4>
                  <p className="mt-1">
                    ₹ {product.price}
                  </p>
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default NewArrivals;
