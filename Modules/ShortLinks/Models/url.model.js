import { DataTypes } from "sequelize";

export default (sequelize) => {
  const url = sequelize.define(
    "Url",
    {
      id: {
        type: DataTypes.NUMBER,
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
        default: true,
      },
      user_id: {
        type: DataTypes.NUMBER,
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

  url.associate = (user) => {
    //user_id belongs to user->id
  };

  return url;
};
