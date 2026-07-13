import app from './src/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started and processing live on: http://localhost:${PORT}`);
});