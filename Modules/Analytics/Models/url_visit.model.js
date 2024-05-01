export default (mongoose) => {
  const urlVisitSchema = mongoose.Schema(
    {
      url_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Url",
        required: true,
      },
      device_info: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
        modifiedAt: "updated_at",
      },
      collection: "url_visits",
    }
  );

  if (!mongoose.models.UrlVisits) {
    const UrlVisits = mongoose.model("UrlVisits");
  }
};
