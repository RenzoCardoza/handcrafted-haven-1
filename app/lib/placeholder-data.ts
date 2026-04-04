const users = [ 
    {
        name: 'adminUser',
        email: 'admin@havenproject.com',
        password: '123456',
        role: 'admin'
    },
    {
        name: 'localUser',
        email: 'localuser@hotmail.com',
        password: 'password12',
        role: 'user'
    }
];

const artisans = [
    { name: "Maria Souza", location: "Brazil", bio: "Ceramic artist inspired by nature.", email: "mariasouza@hotmail.com", image_url: "/artisans/maria-souza.jpg" },
    { name: "Juan Perez", location: "Mexico", bio: "Handmade leather crafts.", email: "juanperez@gmail.com", image_url: "/artisans/juan-perez.jpg" },
    { name: "Aiko Tanaka", location: "Japan", bio: "Minimalist woodworker.", email: "aikotanaka2@gmail.com", image_url: "/artisans/aiko-tanaka.jpg" },
    { name: "Luca Rossi", location: "Italy", bio: "Glass artisan from Venice.", email: "lucarossi03@hotmail.com", image_url: "/artisans/luca-rossi.jpg" },
    { name: "Fatima Noor", location: "Morocco", bio: "Traditional textile maker.", email: "fatimaLoor@hotmail.com", image_url: "/artisans/fatima-noor.jpg" },
    { name: "John Smith", location: "USA", bio: "Modern metal sculptor.", email: "johnsmith21@gmail.com", image_url: "/artisans/john-smith.jpg" },
    { name: "Sofia Ivanova", location: "Russia", bio: "Hand-painted jewelry.", email: "sofiaivanova4202@hotmail.com", image_url: "/artisans/sofia-ivanova.jpg" },
    { name: "Kwame Mensah", location: "Ghana", bio: "Wood carving specialist.", email: "kwamemensah2@gmail.com", image_url: "/artisans/kwame-mensah.jpg" },
];

const products = [
    {
        name: "Clay Vase",
        material: "Clay",
        price: 25,
        description: "Handmade clay vase.",
        image_url: "vase.jpg",
        artisanIndex: 0,
    },
    { 
        name: "Leather Wallet",
        material: "Leather",
        price: 40,
        description: "Durable leather wallet.",
        image_url: "wallet.jpg",
        artisanIndex: 1,
    },
    {
        name: "Wooden Bowl",
        material: "Wood",
        price_url: 30,
        description: "Minimalist wooden bowl.",
        image: "bowl.jpg",
        artisanIndex: 2,
    },
    {
        name: "Glass Necklace",
        material: "Glass",
        price: 50,
        description: "Elegant glass necklace.",
        image_url: "necklace.jpg",
        artisanIndex: 3,
    },
    {
        name: "Woven Rug",
        material: "Textile",
        price: 120,
        description: "Handwoven rug.",
        image_url: "rug.jpg",
        artisanIndex: 4,
    },
    {
        name: "Metal Sculpture",
        material: "Metal",
        price: 200,
        description: "Abstract metal sculpture.",
        image_url: "sculpture.jpg",
        artisanIndex: 5,
    },
    {
        name: "Painted Earrings",
        material: "Ceramic",
        price: 20,
        description: "Colorful earrings.",
        image_url: "earrings.jpg",
        artisanIndex: 6,
    },
    {
        name: "Wood Mask",
        material: "Wood",
        price: 60,
        description: "Traditional carved mask.",
        image_url: "mask.jpg",
        artisanIndex: 7,
    },
    {
        name: "Ceramic Plate",
        material: "Clay",
        price: 35,
        description: "Decorative plate.",
        image_url: "plate.jpg",
        artisanIndex: 0,
    },
    {
        name: "Leather Belt",
        material: "Leather",
        price: 45,
        description: "Handmade belt.",
        image_url: "belt.jpg",
        artisanIndex: 1,
    },
];

const reviews = [
    { 
        rating: 5, 
        comment: "Amazing quality!", 
        userIndex: 0, 
        productIndex: 0 
    },
    { 
        rating: 4, 
        comment: "Very nice wallet.", 
        userIndex: 1, 
        productIndex: 1 
    },
    { 
        rating: 5, 
        comment: "Beautiful craftsmanship.", 
        userIndex: 2, 
        productIndex: 2 
    },
    { 
        rating: 4, 
        comment: "Looks great on my table.", 
        userIndex: 0, 
        productIndex: 3 
    },
    { 
        rating: 5, 
        comment: "Super comfortable and well made.", 
        userIndex: 1, 
        productIndex: 4 
    },
    { 
        rating: 4, 
        comment: "Impressive detail!", 
        userIndex: 2, 
        productIndex: 5 
    },
    { 
        rating: 5, 
        comment: "Love these earrings!", 
        userIndex: 0, 
        productIndex: 6 
    },
    { 
        rating: 4, 
        comment: "Very unique piece.", 
        userIndex: 1, 
        productIndex: 7 
    },
    { 
        rating: 5, 
        comment: "Perfect decoration.", 
        userIndex: 2, 
        productIndex: 8 
    },
    { 
        rating: 4, 
        comment: "Great fit and quality.",
        userIndex: 0, 
        productIndex: 9 
    },
];

export { reviews, users, products, artisans };