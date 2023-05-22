const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const config = require('./config/dbConn'); 
const adminRoutes = require('./routes/admin/admin-routes');
const teacherRoutes = require('./routes/teacher/teacher-routes');
const studentRoutes = require('./routes/student/student-routes');

const server = Hapi.server({
  port: 30096,
  host: 'localhost',
});

// Connect to MongoDB
async function connectDatabase() {
  try {
    await mongoose.connect(config.mongodb.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Terminate the application if the connection fails
  }
}

connectDatabase();
server.route(adminRoutes);
// server.route(teacherRoutes);
// server.route(studentRoutes);
// Start the server
const startServer = async () => {
  try {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log('Error starting server:', err);
  }
};

startServer();
