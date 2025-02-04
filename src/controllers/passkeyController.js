const Passkey = require("../models/Passkey");

exports.addPasskey = async (req, res) => {
    const { key } = req.body;
    const adminId = req.admin.id;

    try {
        const passkey = await Passkey.create({ key, createdBy: adminId });
        res.json(passkey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPasskeys = async (req, res) => {
    try {
        const passkeys = await Passkey.find();
       
        res.json({ passkeys, currentPasskey: global.currentPasskey || null }); // Avoid errors if no passkeys exist
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePasskey = async (req, res) => {
    try {
        const passkey = await Passkey.findById(req.params.id);
        console.log(req.params.id);

        if (!passkey) {
            return res.status(404).json({ message: "Passkey not found" });
        }

        // Ensure only the admin who created it can delete it
        if (passkey.createdBy.toString() !== req.admin.id) {
            return res.status(403).json({ message: "Not authorized to delete this passkey" });
        }

        await passkey.deleteOne();
        res.json({ message: "Passkey deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
