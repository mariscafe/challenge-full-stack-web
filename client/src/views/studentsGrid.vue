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
        <v-btn depressed class="custom-button" color="primary" @click="searchStudents()">Pesquisar</v-btn>
      </v-col>
    </v-row>
 
    <v-row>
      <v-col class="col-12">
        <v-btn depressed class="custom-button" color="primary" @click="navegateTo('studentsForm')">
          <v-icon left> mdi-plus </v-icon>
          Cadastrar Aluno
        </v-btn>
      </v-col>
      <v-col class="col-12">
        <AlertDialog ref="alert" />
        <v-data-table
          :headers="headers"
          :items="students"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          no-data-text="Registro(s) não encontrado(s)."
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <router-link :to="{ name: 'StudentsForm', params: { cpf: item.cpf } }">
              <v-icon left> mdi-pencil </v-icon>
            </router-link>
            <v-icon left @click="deleteStudent(item.cpf)"> mdi-delete </v-icon>
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
    <ConfirmDialog ref="confirm" />
  </div>
</template>

<script>
import navegateTo from '@/mixins/navegateTo'
import StudentService from '@/services/StudentService'

export default {
  mixins: [navegateTo],
  components: {
    ConfirmDialog: () => import("@/components/ConfirmDialog"),
    AlertDialog: () => import("@/components/AlertDialog"),
  },
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
    async listStudents () {
      try{
        const response = await StudentService.listStudents()

        if(response.error){
          this.$refs.alert.show('error', response.message, true)
        } else {
          this.$refs.alert.hide()
          this.students = response.data
        }
      } catch (error) {
        this.$refs.alert.show('error', error.message, true)
      }
    },
    async searchStudents () {
      try{
        if(!this.filter){
          this.listStudents()
          return
        }

        const response = await StudentService.searchStudents(this.filter)

        if(response.error){
          this.$refs.alert.show('error', response.message, true)
          this.students = []
        } else {
          if(response.data.length === 0){
            this.$refs.alert.show('error', `Nenhum aluno encontrado para o filtro '${this.filter}'`, true)
            this.students = []
          } else {
            this.$refs.alert.hide()
            this.students = response.data
          }
        }
      } catch (error) {
        this.$refs.alert.show('error', error.message, true)
      }
    },
    async deleteStudent (cpf) {
      if (
        await this.$refs.confirm.open(
          "Excluir",
          "Tem certeza que deseja excluir o aluno?"
        )
      ) {
        try {
          const response = await StudentService.deleteStudent(cpf)

          if(response.error){
             this.$refs.alert.show('error', response.message, true)
          } else {
            this.listStudents()
          }
        } catch (error) {
          this.$refs.alert.show('error', error.message, true)
        }
      }
    }
  },
  mounted () {
    this.listStudents()
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
