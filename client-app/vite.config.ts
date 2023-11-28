import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    server: {
        port: 4000,
    },
    base: 'http://localhost:5000/api',
    plugins: [react()],
})