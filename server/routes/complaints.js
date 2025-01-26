import express from 'express';
import Complaint from '../models/Complaint.js';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get all complaints (admin only) or user's complaints
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    let complaints;
    if (user.type === 'admin') {
      complaints = await Complaint.find().populate('userId', 'name email');
    } else {
      complaints = await Complaint.find({ userId: req.user.userId });
    }
    
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new complaint
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, type, mediaUrl } = req.body;

    const complaint = new Complaint({
      userId: req.user.userId,
      title,
      description,
      type,
      mediaUrl
    });

    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update complaint status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.type !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get complaints statistics (admin only)
router.get('/statistics', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.type !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const stats = await Complaint.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;