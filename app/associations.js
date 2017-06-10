module.exports = function(db) {
  /////////////////////////////////////////////////////////
  // add associations here

  db.SavedSearch.belongsTo(
    db.User, 
    {
      foreignKey: {
        allowNull: false
      }
    }
  );
  
db.User.hasMany(
  db.SavedSearch,
  {
    onDelete: "cascade"
  }
)
  /////////////////////////////////////////////////////////
};
