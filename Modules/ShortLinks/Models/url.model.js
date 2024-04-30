import URLCounterService from "../Services/url_counter.service.js";
import { base36Converter } from "../../../Utils/Helpers/converter.helper.js";

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

  if (!mongoose?.models?.Url) {
    urlSchema.pre("save", async function (next) {
      try {
        const uRLCounterService = new URLCounterService();
        const newUrl = this;
        const currentCount = await uRLCounterService.getTotalCount();
        if (currentCount <= 0) throw new Error("Unable to get url count");
        newUrl.short_code = base36Converter(currentCount + 1);
        await uRLCounterService.updateTotalCount();
        next();
      } catch (error) {
        next(error);
      }
    });
    const Url = mongoose.model("Url", urlSchema);
  }
};
