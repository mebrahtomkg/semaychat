import { demoUsers } from '@/config/demoData';
import { createNewUser } from '@/services';

const seedDemoData = async () => {
  console.log('Starting demo data seeding...');

  try {
    for (const user of demoUsers) {
      await createNewUser(user);
    }

    console.log('Demo data seeded successfully.');
  } catch (error) {
    console.error('Demo data seeding failed: ', error);
  }
};

export default seedDemoData;
