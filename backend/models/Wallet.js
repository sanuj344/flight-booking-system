import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  balance: { type: Number, default: 50000 }
});

export default mongoose.model("Wallet", walletSchema);
