const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Department = require('./models/Department');

dotenv.config();

const departments = [
  {
    name: 'Emergency',
    description: 'Immediate care for life-threatening conditions and urgent medical needs',
    icon: '🚨',
    services: ['Trauma care', 'Cardiac emergencies', 'Acute injuries', 'Stabilization'],
    contactNumber: '+254-796-604-050',
    availableHours: '24/7',
    emergencyAvailable: true
  },
  {
    name: 'General Medicine',
    description: 'Comprehensive primary healthcare and general medical consultations',
    icon: '🏥',
    services: ['Health check-ups', 'Chronic disease management', 'Preventive care', 'General consultation'],
    contactNumber: '+254-796-604-050',
    availableHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    emergencyAvailable: false
  },
  {
    name: 'Pediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents',
    icon: '👶',
    services: ['Child health check-ups', 'Vaccinations', 'Growth monitoring', 'Pediatric emergencies'],
    contactNumber: '+254-796-604-050',
    availableHours: 'Mon-Sat: 8:00 AM - 6:00 PM',
    emergencyAvailable: true
  },
  {
    name: 'Cardiology',
    description: 'Heart and cardiovascular system care and treatment',
    icon: '❤️',
    services: ['ECG', 'Heart disease management', 'Blood pressure monitoring', 'Cardiac rehabilitation'],
    contactNumber: '+254-796-604-050',
    availableHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    emergencyAvailable: false
  },
  {
    name: 'Orthopedics',
    description: 'Treatment of bone, joint, and musculoskeletal conditions',
    icon: '🦴',
    services: ['Fracture treatment', 'Joint replacement', 'Sports injuries', 'Physical therapy'],
    contactNumber: '+254-700-555-555',
    availableHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    emergencyAvailable: false
  },
  {
    name: 'Maternity',
    description: 'Comprehensive prenatal, delivery, and postnatal care',
    icon: '🤰',
    services: ['Prenatal care', 'Delivery services', 'Postnatal care', 'Family planning'],
    contactNumber: '+254-796-604-050',
    availableHours: '24/7',
    emergencyAvailable: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Department.deleteMany({});
    console.log('Cleared existing departments');

    await Department.insertMany(departments);
    console.log('Departments seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();