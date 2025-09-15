

import Note from "../models/Note.js";
import Tenant from "../models/Tenant.js";

export const checkSubscriptionLimit = async (req, res, next) => {
  const tenant = await Tenant.findById(req.user.tenantId);

  if (tenant.subscription === "Free") {
    const noteCount = await Note.countDocuments({ tenantId: tenant._id });
    if (noteCount >= 3) {
      return res.status(403).json({ message: "Upgrade required: Free plan allows only 3 notes" });
    }
  }
  next();
};
