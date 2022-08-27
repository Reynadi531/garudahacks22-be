import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Token = sequelize.define('token', {
  refreshToken: DataTypes.TEXT,
  appToken: DataTypes.TEXT
});

(async () => {
  await Token.sync({ force: true });
})();

export default Token;
