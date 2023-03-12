import 'dotenv/config'

export const DB = process.env.MONGO_URL!

export const PORT = process.env.PORT || 3001