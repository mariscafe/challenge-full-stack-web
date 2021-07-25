<template>
  <div class="studentsGrid">
    <h1>Alunos - Consulta</h1>

    <v-row>
      <v-col class="col-12 text-center">
        <v-text-field
        v-model="filter"
        label="Digite a sua busca"
        outlined
        clearable
        dense
        class="d-inline-block pr-2"
        ></v-text-field>
        <v-btn depressed class="custom-button" color="primary" v-on:click="search()">Pesquisar</v-btn>
      </v-col>
    </v-row>
 
    <v-row>
      <v-col class="col-12">
        <v-btn depressed class="custom-button" color="primary" v-on:click="navegateTo('studentsForm')">
          <v-icon left> mdi-plus </v-icon>
          Cadastrar Aluno
        </v-btn>
      </v-col>
      <v-col class="col-12">
        <v-data-table
          :headers="headers"
          :items="students"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <router-link :to="{ name: 'StudentsForm', params: { cpf: item.cpf } }">
              <v-icon left> mdi-pencil </v-icon>
            </router-link>
            <v-icon left> mdi-delete </v-icon>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import navegateTo from '@/mixins/navegateTo'

export default {
  mixins: [navegateTo],
  data () {
    return {
      filter: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text: '', value: 'actions', width: '10%', sortable: false},
        { text: 'Registro Acadêmico', value: 'register', width: '20%' },
        { text: 'CPF', value: 'cpf', width: '20%' },
        { text: 'Nome', value: 'name', width: '50%' },
      ],
      students: [],
    }
  },
  methods: {
    async search() {
      // TO DO: Search students
      this.students = [{
        register: '123456',
        cpf: '99999999991',
        name: 'Aluno 1', 
      }]
    },
    async loadStudents() {
      // TO DO: Load students
      this.students = [{
        register: '123456',
        cpf: '99999999991', 
        name: 'Aluno 1',
      },
      {
        register: '123457',
        cpf: '99999999992',
        name: 'Aluno 2',
      },
      {
        register: '123458',
        cpf: '99999999993',
        name: 'Aluno 3',
      }]
    },
  },
  created () {
    this.loadStudents()
  }
}
</script>

<style scoped>
h1{
  border-bottom: 1px solid;
  margin-bottom: 30px;
}
a{
  text-decoration: none;
}
.v-text-field{
  width: 65%;
}
.custom-button{
  height:40px !important;
  margin-bottom: 2px;
}
</style>