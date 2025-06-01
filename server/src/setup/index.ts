import sequelize from '../config/db';
import { User } from '../models'; //needed to run association

const dbSetup = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.warn('Models were synchronized successfully. eg.', User.tableName);
  } catch (err) {
    console.error(err);
  }
};

dbSetup(true);
