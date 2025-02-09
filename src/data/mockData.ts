export const MOCK_DATA = {
  banners: [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60',
  ],
  filters: [
    {id: 1, name: 'Pure Veg', icon: '🥬'},
    {id: 2, name: 'Fast Delivery', icon: '⚡'},
    {id: 3, name: 'Top Rated', icon: '⭐'},
    {id: 4, name: 'Premium', icon: '👑'},
  ],
  restaurants: [
    {
      id: 1,
      name: 'The Spice Garden',
      rating: 4.5,
      time: '25-35 Min',
      cuisine: 'North Indian • Mughlai • Biryani',
      location: 'Sector 29',
      distance: '1.2 KM',
      discount: '50% OFF',
      upTo: '200',
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60',
      promoted: true,
    },
    {
      id: 2,
      name: 'Pizza Paradise',
      rating: 4.3,
      time: '30-40 Min',
      cuisine: 'Pizza • Italian • Pasta',
      location: 'Cyber Hub',
      distance: '2.5 KM',
      discount: '40% OFF',
      upTo: '150',
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60',
      promoted: false,
    },
    {
      id: 3,
      name: 'Beijing House',
      rating: 4.4,
      time: '35-45 Min',
      cuisine: 'Chinese • Thai • Asian',
      location: 'DLF Phase 4',
      distance: '3.0 KM',
      discount: '60% OFF',
      upTo: '120',
      image:
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=60',
      promoted: true,
    },
  ],
  menuItems: [
    // The Spice Garden Menu Items
    {
      id: 1,
      restaurantId: 1,
      name: 'Paneer Tikka',
      description:
        'Grilled cottage cheese cubes marinated in spicy yogurt and herbs.',
      price: 220,
      image:
        'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=60',
      isVeg: true,
      discount: '50% OFF',
      upTo: '139',
    },
    {
      id: 2,
      restaurantId: 1,
      name: 'Tandoori Chicken',
      description:
        'Spicy and smoky chicken marinated with yogurt and traditional spices.',
      price: 320,
      image:
        'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=60',
      isVeg: false,
      discount: '50% OFF',
      upTo: '139',
    },
    {
      id: 3,
      restaurantId: 1,
      name: 'Dal Makhani',
      description:
        'Creamy black lentils slow-cooked overnight with rich spices and butter.',
      price: 250,
      image:
        'https://images.unsplash.com/photo-1626500155537-99daec8b2f9f?w=800&auto=format&fit=crop&q=60',
      isVeg: true,
      discount: '40% OFF',
      upTo: '120',
    },
    {
      id: 4,
      restaurantId: 1,
      name: 'Butter Chicken',
      description:
        'Tender chicken pieces in a rich, creamy tomato-based curry.',
      price: 380,
      image:
        'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=60',
      isVeg: false,
      discount: '40% OFF',
      upTo: '120',
    },
    {
      id: 5,
      restaurantId: 1,
      name: 'Garlic Naan',
      description: 'Soft Indian bread topped with garlic and butter.',
      price: 60,
      image:
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=60',
      isVeg: true,
    },
    {
      id: 6,
      restaurantId: 1,
      name: 'Biryani',
      description:
        'Fragrant basmati rice cooked with aromatic spices and tender meat.',
      price: 350,
      image:
        'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=60',
      isVeg: false,
      discount: '30% OFF',
      upTo: '100',
    },
    {
      id: 7,
      restaurantId: 1,
      name: 'Malai Kofta',
      description: 'Soft potato and paneer dumplings in a rich creamy gravy.',
      price: 280,
      image:
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
      isVeg: true,
      discount: '25% OFF',
      upTo: '80',
    },

    // Pizza Paradise Menu Items
    {
      id: 8,
      restaurantId: 2,
      name: 'Margherita Pizza',
      description:
        'Classic pizza with tomato sauce, mozzarella, and fresh basil.',
      price: 299,
      image:
        'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=60',
      isVeg: true,
      discount: '40% OFF',
      upTo: '150',
    },
    {
      id: 9,
      restaurantId: 2,
      name: 'Pepperoni Pizza',
      description: 'Spicy pepperoni with melted cheese and tomato sauce.',
      price: 399,
      image:
        'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=60',
      isVeg: false,
      discount: '35% OFF',
      upTo: '120',
    },
    {
      id: 10,
      restaurantId: 2,
      name: 'Pasta Alfredo',
      description: 'Creamy pasta with parmesan cheese and garlic.',
      price: 275,
      image:
        'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&auto=format&fit=crop&q=60',
      isVeg: true,
    },
    {
      id: 11,
      restaurantId: 2,
      name: 'Garlic Bread',
      description: 'Crusty bread with garlic butter and herbs.',
      price: 149,
      image:
        'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800&auto=format&fit=crop&q=60',
      isVeg: true,
    },
    {
      id: 12,
      restaurantId: 2,
      name: 'BBQ Chicken Pizza',
      description: 'Grilled chicken with BBQ sauce and red onions.',
      price: 449,
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60',
      isVeg: false,
      discount: '30% OFF',
      upTo: '100',
    },
    {
      id: 13,
      restaurantId: 2,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center.',
      price: 169,
      image:
        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=60',
      isVeg: true,
    },

    // Beijing House Menu Items
    {
      id: 14,
      restaurantId: 3,
      name: 'Kung Pao Chicken',
      description: 'Spicy diced chicken with peanuts and vegetables.',
      price: 320,
      image:
        'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop&q=60',
      isVeg: false,
      discount: '60% OFF',
      upTo: '120',
    },
    {
      id: 15,
      restaurantId: 3,
      name: 'Veg Spring Rolls',
      description: 'Crispy rolls filled with vegetables and glass noodles.',
      price: 180,
      image:
        'https://images.unsplash.com/photo-1548507346-a42eaf632c86?w=800&auto=format&fit=crop&q=60',
      isVeg: true,
    },
    {
      id: 16,
      restaurantId: 3,
      name: 'Pad Thai',
      description: 'Thai style stir-fried rice noodles with tofu and peanuts.',
      price: 280,
      image:
        'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&auto=format&fit=crop&q=60',
      isVeg: true,
      discount: '40% OFF',
      upTo: '100',
    },
    {
      id: 17,
      restaurantId: 3,
      name: 'Dim Sum Platter',
      description: 'Assorted steamed dumplings with different fillings.',
      price: 350,
      image:
        'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&auto=format&fit=crop&q=60',
      isVeg: false,
    },
    {
      id: 18,
      restaurantId: 3,
      name: 'Schezwan Noodles',
      description: 'Spicy noodles with vegetables in Schezwan sauce.',
      price: 250,
      image:
        'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=60',
      isVeg: true,
      discount: '50% OFF',
      upTo: '110',
    },
    {
      id: 19,
      restaurantId: 3,
      name: 'Sweet and Sour Prawns',
      description: 'Crispy prawns tossed in sweet and sour sauce.',
      price: 420,
      image:
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=60',
      isVeg: false,
      discount: '35% OFF',
      upTo: '130',
    },
  ],
  searchResults: {
    restaurants: [
      {
        id: 1,
        name: 'Pizza Hut',
        rating: 4.5,
        time: '35-45 Min',
        cuisine: 'North Indian, Biryani, Thali',
        location: 'Huda City Center',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 2,
        name: "Domino's Pizza",
        rating: 4.3,
        time: '25-35 Min',
        cuisine: 'Pizza, Italian, Fast Food',
        location: 'Sector 14',
        image:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60',
      },
    ],
    dishes: [
      {
        id: 1,
        name: 'Margherita Pizza',
        restaurant: 'Pizza Hut',
        price: 299,
        rating: 4.5,
        image:
          'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 2,
        name: 'Butter Chicken',
        restaurant: 'Punjabi Angithi',
        price: 399,
        rating: 4.7,
        image:
          'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=60',
      },
    ],
  },
};
