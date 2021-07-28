import axios from 'axios'

const APIPath = 'http://localhost:5000/api/students'

class StudentService {
  // Get Students
  static async listStudents () {
    const url = APIPath + '/list'

    try {
      return await axios.get(url).then(response => response.data).catch(error => error.response.data)
    } catch (error) {
      return [{
        error: true,
        message: error.message
      }]
    }
  }

  static async searchStudents (filter) {
    const url = APIPath + '/search/' + filter

    try {
      return await axios.get(url).then(response => response.data).catch(error => error.response.data)
    } catch (error) {
      return [{
        error: true,
        message: error.message
      }]
    }
  }

  static async findStudents (cpf) {
    const url = APIPath + '/find/' + cpf

    try {
      return await axios.get(url).then(response => response.data).catch(error => error.response.data)
    } catch (error) {
      return [{
        error: true,
        message: error.message
      }]
    }
  }

  // Add Student
  static async insertStudent (student) {
    const url = APIPath + '/insert'

    try {
      return await axios.post(url, student).then(response => response.data).catch(error => error.response.data)
    } catch (error) {
      return [{
        error: true,
        message: error.message
      }]
    }
  }

  // Update Student
  static async updateStudent (cpf, student) {
    const url = APIPath + '/update/' + cpf

    try {
      return await axios.put(url, student).then(response => response.data).catch(error => error.response.data)
    } catch (error) {
      return [{
        error: true,
        message: error.message
      }]
    }
  }

  // Delete Student
  static async deleteStudent (cpf) {
    const url = APIPath + '/delete/' + cpf

    try {
      return await axios.delete(url).then(response => response.data).catch(error => error.response.data)
    } catch (error) {
      return [{
        error: true,
        message: error.message
      }]
    }
  }
}

export default StudentService
