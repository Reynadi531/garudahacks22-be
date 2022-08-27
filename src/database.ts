import { Sequelize } from 'sequelize';
import consola from 'consola';

let sequelize: Sequelize;

const initDatabase = async (dsn: string): Promise<void> => {
  sequelize = new Sequelize(dsn);

  try {
    await sequelize.authenticate();
    consola.success('Connected to database');
  } catch (error) {
    consola.error(error);
    throw new Error(error);
  }
};

export { sequelize, initDatabase };
