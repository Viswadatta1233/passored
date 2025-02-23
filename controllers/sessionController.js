const Session = require("../models/Session");

// Start the session (set isActive to true)
exports.startSession = async (req, res) => {
    try {
        let session = await Session.findOne(); // Only one session entry needed

        if (!session) {
            session = new Session({ isActive: true });
        } else {
            session.isActive = true;
        }

        await session.save();

        // Automatically stop session after 30 minutes
        setTimeout(async () => {
            session.isActive = false;
            await session.save();
        }, 30 * 60 * 1000); // 30 minutes

        res.json({ message: "Session started", isActive: true });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// End the session manually
exports.endSession = async (req, res) => {
    try {
        const session = await Session.findOne();

        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }

        session.isActive = false;
        await session.save();

        res.json({ message: "Session ended", isActive: false });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Get session status
exports.getSessionStatus = async (req, res) => {
    try {
        const session = await Session.findOne();
        console.log(session)
        res.json({ isActive: session ? session.isActive : false });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
