const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../models");
const Gadget = db.Gadget; // Updated to use Sequelize model
const authenticate = require("../middleware/auth"); // JWT Middleware

// Generate random mission success probability
const getSuccessProbability = () => `${Math.floor(Math.random() * 100)}%`;

// GET all gadgets or filter by status using query parameters
router.get("/", async (req, res) => {
  try {
    const { status } = req.query; // Read status from query parameters

    let filter = {};
    if (status) {
      // Validate status value
      const validStatuses = [
        "Available",
        "Deployed",
        "Destroyed",
        "Decommissioned",
      ];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }
      filter.status = status; // Apply filter if status is provided
    }

    // Fetch gadgets based on the filter
    const gadgets = await Gadget.findAll({ where: filter });

    // Add random success probability to each gadget
    const gadgetsWithProbability = gadgets.map((gadget) => ({
      ...gadget.toJSON(),
      successProbability: getSuccessProbability(),
    }));

    res.json(gadgetsWithProbability);
  } catch (error) {
    console.error("Error fetching gadgets:", error);
    res.status(500).json({ error: "Failed to retrieve gadgets" });
  }
});
// GET gadget by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);

    if (!gadget) {
      return res.status(404).json({ error: "Gadget not found" });
    }

    const gadgetWithProbability = {
      ...gadget.toJSON(),
      successProbability: getSuccessProbability(),
    };

    res.json(gadgetWithProbability);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve gadget" });
  }
});

// POST - Add a new gadget (Protected)
// Sample codenames list
const codenames = [
  "The Nightingale",
  "The Kraken",
  "The Falcon",
  "The Leviathan",
  "The Cyclops",
  "The Mantis",
  "The Chimera",
];

// Function to get a random codename
const getRandomCodename = () => {
  return codenames[Math.floor(Math.random() * codenames.length)];
};

// POST - Add a new gadget (Protected)
router.post("/", authenticate, async (req, res) => {
  try {
    const { name, status } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const codename = getRandomCodename(); // Assign a random codename
    if (!status) {
      const gadget = await Gadget.create({
        id: uuidv4(),
        name: codename, // Use the codename as the gadget's name
        status: "Available", // Default status
      });

      res.status(201).json(gadget);
    } else {
      const gadget = await Gadget.create({
        id: uuidv4(),
        name: codename, // Use the codename as the gadget's name
        status: status,
      });

      res.status(201).json(gadget);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add gadget" });
  }
});

// PATCH - Update gadget (Protected)
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    await gadget.update({ name, status });
    res.json({ message: "Gadget updated", gadget });
  } catch (error) {
    res.status(500).json({ error: "Failed to update gadget" });
  }
});

// DELETE - Decommission gadget (Protected)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    await gadget.update({
      status: "Decommissioned",
    });

    res.json({ message: "Gadget decommissioned" });
  } catch (error) {
    res.status(500).json({ error: "Failed to decommission gadget" });
  }
});

// POST - Self-Destruct (Protected)
router.post("/:id/self-destruct", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    const confirmationCode = Math.floor(1000 + Math.random() * 9000);
    res.json({ message: "Self-destruct sequence initiated", confirmationCode });
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate self-destruct" });
  }
});

module.exports = router;
