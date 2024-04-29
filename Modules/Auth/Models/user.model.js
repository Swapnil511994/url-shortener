export default (mongoose) => {
  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        maxlength: 150,
        default: null, // Explicitly set default as null if allowed
      },
      email: {
        type: String,
        maxlength: 150,
        required: true,
        unique: true, // Ensure email uniqueness across documents
      },
      password: {
        type: String,
        required: true,
      },
      is_active: {
        type: Boolean,
        default: true,
      },
      googleId: {
        type: String,
        default: null, // Explicitly set default as null if allowed
      },
    },
    {
      timestamps: {
        createdAt: "created_at", // Customize field names for timestamps
        updatedAt: "updated_at",
      },
      collection: "users", // Define the collection name
    }
  );

  const User = mongoose.models.User || mongoose.model("User", userSchema);
};
