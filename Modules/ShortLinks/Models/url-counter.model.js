export default (mongoose) => {
  const UrlCounterSchema = mongoose.Schema(
    {
      counter: {
        type: Number,
        unique: true,
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
      collection: "url_counter",
    }
  );

  if (!mongoose?.models?.UrlCounter) {
    const UrlCounter = new mongoose.model("UrlCounter", UrlCounterSchema);
  }
};
