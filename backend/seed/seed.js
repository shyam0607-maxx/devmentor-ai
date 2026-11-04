const mongoose = require('mongoose');
const User = require('../src/models/User');
const LearningProgress = require('../src/models/LearningProgress');
require('dotenv').config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devmentor-ai';
    await mongoose.connect(mongoUri);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await LearningProgress.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create demo users
    const demoUser = new User({
      name: 'Demo Student',
      email: 'demo@example.com',
      password: 'demo123',
      role: 'student',
      learningPath: 'dsa',
    });
    await demoUser.save();
    console.log('✓ Created demo user');

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      learningPath: 'both',
    });
    await adminUser.save();
    console.log('✓ Created admin user');

    // Create learning progress for demo user
    const demoProgress = new LearningProgress({
      userId: demoUser._id,
      dsaProgress: {
        completedTopics: [{ topicId: 'basics', completedAt: new Date() }],
        totalTopics: 11,
        overallProgress: 9,
        quizAverageScore: 85,
      },
      mernProgress: {
        completedModules: [],
        totalModules: 4,
        overallProgress: 0,
      },
      meanProgress: {
        completedModules: [],
        totalModules: 4,
        overallProgress: 0,
      },
      mockInterviewHistory: [
        {
          topic: 'Arrays & Strings',
          difficulty: 'beginner',
          score: 78,
          duration: 45,
          date: new Date(),
        },
        {
          topic: 'Linked Lists',
          difficulty: 'intermediate',
          score: 82,
          duration: 52,
          date: new Date(Date.now() - 86400000),
        },
      ],
      codingProblems: {
        attempted: 15,
        solved: 12,
      },
      learningStreak: {
        current: 5,
        longest: 12,
        lastActivityDate: new Date(),
      },
    });
    await demoProgress.save();
    console.log('✓ Created learning progress for demo user');

    // Create learning progress for admin
    const adminProgress = new LearningProgress({
      userId: adminUser._id,
      dsaProgress: {
        completedTopics: [],
        totalTopics: 11,
        overallProgress: 0,
        quizAverageScore: 0,
      },
      mernProgress: {
        completedModules: [],
        totalModules: 4,
        overallProgress: 0,
      },
      meanProgress: {
        completedModules: [],
        totalModules: 4,
        overallProgress: 0,
      },
      mockInterviewHistory: [],
      codingProblems: {
        attempted: 0,
        solved: 0,
      },
      learningStreak: {
        current: 0,
        longest: 0,
        lastActivityDate: null,
      },
    });
    await adminProgress.save();
    console.log('✓ Created learning progress for admin');

    console.log('\n✅ Database seeded successfully!\n');
    console.log('Demo Credentials:');
    console.log('  Email: demo@example.com');
    console.log('  Password: demo123\n');
    console.log('Admin Credentials:');
    console.log('  Email: admin@example.com');
    console.log('  Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
