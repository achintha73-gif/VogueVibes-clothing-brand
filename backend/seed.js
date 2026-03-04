// seed.js
const mongoose = require('mongoose');
require('dotenv').config();

// Product Schema එක (server.js එකේ තියෙන විදියටම)
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sizes: [String],
    colors: [String]
});

const Product = mongoose.model('Product', productSchema);

// MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017/aurora_clothing';

// Sample products
const sampleProducts = [
    {
        name: "Classic White T-Shirt",
        price: 29.99,
        description: "Comfortable cotton t-shirt for everyday wear",
        category: "T-Shirts",
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Black", "Gray"]
    },
    {
        name: "Slim Fit Jeans",
        price: 79.99,
        description: "Modern slim fit jeans with stretch comfort",
        category: "Jeans",
        sizes: ["30", "32", "34", "36"],
        colors: ["Blue", "Black"]
    },
    {
        name: "Summer Dress",
        price: 59.99,
        description: "Floral print summer dress",
        category: "Dresses",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Pink", "Blue"]
    },
    {
        name: "Leather Jacket",
        price: 199.99,
        description: "Classic leather jacket for a stylish look",
        category: "Jackets",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Brown"]
    }
];

// MongoDB connect වෙලා data insert කරන්න
mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('MongoDB Connected');
        
        // Old data delete කරන්න
        await Product.deleteMany({});
        console.log('Old products deleted');
        
        // New data insert කරන්න
        await Product.insertMany(sampleProducts);
        console.log('Sample products added successfully!');
        
        // Connection close කරන්න
        mongoose.connection.close();
    })
    .catch(err => {
        console.log('Error:', err);
    });