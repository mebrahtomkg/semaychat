import { demoUsers } from '@/config/demoData';
import { createNewUser, createProfilePhoto } from '@/services';

const seedDemoData = async () => {
  console.log('Starting demo data seeding...');

  try {
    for (const demoUser of demoUsers) {
      const { photos, ...rest } = demoUser;

      const user = await createNewUser(rest);

      if (!photos) continue;

      for (const photo of photos) {
        await createProfilePhoto({
          userId: user.id,
          name: photo,
          originalname: photo,
          size: 0,
        });
      }
    }

    console.log('Demo data seeded successfully.');
  } catch (error) {
    console.error('Demo data seeding failed: ', error);
  }
};

export default seedDemoData;
