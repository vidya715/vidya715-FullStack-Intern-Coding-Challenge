const User = require('./models/user');
const Store = require('./models/store');
const Rating = require('./models/rating');

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Rating, { foreignKey: 'storeId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

Store.belongsTo(User, { foreignKey: 'storeId', as: 'owner' }); // Store owner association

module.exports = { User, Store, Rating };
