import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Url = sequelize.define(
    "Url",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(600),
        allowNull: false,
      },
      short_code: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Changed from 'default' to 'defaultValue'
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "short_urls",
    }
  );

  Url.associate = (models) => {
    // Define associations here
    Url.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });
  };

  return Url;
};
