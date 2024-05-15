export default (mongoose) => {
  const analyticsSchema = new mongoose.Schema(
    {
      url_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Url",
        required: true,
      },
      total_visits: {
        type: Number,
        required: true,
        default: 0,
      },
      unique_visits: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
        modifiedAt: "updated_at",
      },
      collection: "url_analytics",
    }
  );

  if (!mongoose.models.UrlAnalytics) {
    const UrlAnalytics = mongoose.model("UrlAnalytics", analyticsSchema);
  }
};
