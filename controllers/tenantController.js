import Tenant from "../models/Tenant.js";

export const upgradeTenant = async (req, res) => {

  try {
     const { subscription } = req.body;
     
     const tenant = await Tenant.findByIdAndUpdate(
      req.user.tenantId,
      { subscription: "Pro" },
      { new: true }
    );

    res.json({ message: `Subscription upgraded to ${subscription}`, tenant: tenant});

  } catch (err) {

    res.status(400).json({ message: err.message });
  }
};


// Get all tenants (Admin only)
export const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
