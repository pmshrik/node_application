const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Architecture: Presentation (public/) -> Application (routes/controllers/services) -> Data (repository)');
});
