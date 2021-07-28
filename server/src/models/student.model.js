const { DataTypes, Model } = require('sequelize')

class StudentModel extends Model {
  static init (sequelize) {
    super.init({
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      register: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true
      }
    }, {
      sequelize,
      modelName: 'tbl_student'
    })
  }
}

module.exports = StudentModel
