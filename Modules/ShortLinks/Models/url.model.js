export default (mongoose) => {
  const urlSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        maxlength: 100,
      },
      url: {
        type: String,
        required: true,
        maxlength: 600,
      },
      short_code: {
        type: String,
        required: true,
        unique: true,
        maxlength: 11,
      },
      is_active: {
        type: Boolean,
        default: true,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: {
        createdAt: "created_at", // Customize names to match Sequelize model
        updatedAt: "updated_at",
      },
      collection: "short_urls",
    }
  );

  const Url = mongoose.models.Url || mongoose.model("Url", urlSchema);
};
