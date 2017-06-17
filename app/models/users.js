module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        height: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "5\'11\""
        },
        curWeight: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: "150"
        },
        tarWeight: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dailyCals: {
            type: DataTypes.INTEGER
        },
        vegan: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        vegitarian: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        dairyFree: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        lowSugar: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        lowFat: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        fatFree: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        glutenFree: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        wheatFree: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return User;
};
