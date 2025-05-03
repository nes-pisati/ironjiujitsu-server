import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('⚠️ MONGODB_URI non definito nel file .env');
    }
    try {
        await mongoose.connect(mongoUri);
        console.log('✅ Database connesso con successo');
    } catch (error) {
        console.error('❌ Errore durante la connessione al database:', error);
        process.exit(1)
    }
}