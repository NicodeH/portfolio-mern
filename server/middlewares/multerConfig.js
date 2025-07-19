import multer from "multer"; // Import multer to handle file uploads

// Get the current date
const now = new Date();

// Extract the day, formatted as two digits (e.g., 01, 12, 30)
const day = String(now.getDate()).padStart(2, '0');      

// Extract the month, formatted as two digits (e.g., 01, 05, 12)
// Note: getMonth() is zero-based, so we add 1
const month = String(now.getMonth() + 1).padStart(2, '0'); 

// Extract the full year in 4 digits (e.g., 2025)
const year = now.getFullYear();                          

// Format the date as "ddmmyyyy" without separators (e.g., "15072025")
const formattedDate = day + month + year;

// Configure multer storage to use local disk
const storage = multer.diskStorage({
    // Destination folder where uploaded files will be stored
    destination: "./uploads/",

    // Function to set the filename of the stored file
    // Prefix the original filename with the formatted date (e.g., "15072025_myfile.png")
    filename: (req, file, cb) => {
        cb(null, formattedDate + '_' + file.originalname);
    }
});

// Create multer middleware with the defined storage configuration
const upload = multer({ storage });

// Export the middleware for use in routes
export default upload;
