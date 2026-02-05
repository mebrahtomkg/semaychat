import sequelize from '@/config/db';
import seedDemoData from './seedDemoData';

const resetDatabase = async () => {
  // Sync the database, recreate tables.
  await sequelize.sync({ force: true });

  // Insert demo data to the database.
  await seedDemoData();
};

export default resetDatabase;
