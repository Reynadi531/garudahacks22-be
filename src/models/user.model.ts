import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import Token from './token.model';

const User = sequelize.define('user', {
  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT
});

User.hasOne(Token);

(async () => {
  await User.sync({ force: true });
})();

export default User;
