module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    height: DataTypes.STRING,
    curWeight: DataTypes.INTEGER,
    tarWeight: DataTypes.INTEGER,
    dailyCals: DataTypes.INTEGER,
    vegan: DataTypes.BOOLEAN,
    vegitarian: DataTypes.BOOLEAN,
    dairyFree: DataTypes.BOOLEAN,
    lowSugar: DataTypes.BOOLEAN,
    lowFat: DataTypes.BOOLEAN,
    fatFree: DataTypes.BOOLEAN,
    glutenFree: DataTypes.BOOLEAN,
    wheatFree: DataTypes.BOOLEAN,
  });

  return User;
};
