<template>
  <div class="studentsForm">
    <h1>Alunos - Cadastro</h1>
    <v-row>
      <v-col class="col-12 ">
        <v-alert
          v-if="message.show"
          v-bind:type="message.type"
          dense
          text
        >{{ message.text }}</v-alert>
      </v-col>
      
      <v-col class="col-12">
        <v-form
          ref="form"
          lazy-validation
        >
          <v-text-field
            v-model="student.name"
            label="Nome"
            placeholder="Informe o nome completo"
            :rules="nameRules"
            required
            outlined
          ></v-text-field>
          <v-text-field
            v-model="student.email"
            label="E-mail"
            placeholder="Informe apenas um e-mail"
            :rules="emailRules"
            required
            outlined
          ></v-text-field>
          <v-text-field
            v-model="student.register"
            label="RA"
            placeholder="Informe o registro acadêmico"
            :rules="registerRules"
            required
            :disabled="edit ? true : false"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="student.cpf"
            label="CPF"
            placeholder="Informe o número do documento"
            :rules="cpfRules"
            required
            :disabled="edit ? true : false"
            outlined
          ></v-text-field>
        </v-form>
      </v-col>

      <v-col class="col-12 text-center">
        <v-btn depressed class="custom-button" color="secondary" v-on:click="cancel()">
          <v-icon left> mdi-cancel </v-icon>
          Cancelar
        </v-btn>
        <v-btn depressed class="custom-button" color="success" v-on:click="validate()">
          <v-icon left> mdi-content-save </v-icon>
          Salvar
        </v-btn>
      </v-col>
    </v-row>
    <ConfirmDialog ref="confirm" />
  </div>
</template>

<script>
import navegateTo from '@/mixins/navegateTo'

export default {
  mixins: [navegateTo],
  components: {
    ConfirmDialog: () => import("@/components/ConfirmDialog"),
  },
  data: () => ({
    edit: false,
    message: {
      show: false,
      type: '',
      text: ''
    },
    student: {
      cpf: '',
      name: '',
      email: '',
      register: ''
    },
    nameRules: [
      v => !!v || 'Campo obrigatório',
      v => (v && v.length >= 120) || 'Nome deve possuir no máximo 120 caracteres',
    ],
    emailRules: [
      v => !!v || 'Campo obrigatório',
      v => /.+@.+\..+/.test(v) || 'Formato de e-mail inválido',
    ],
    registerRules: [
      v => !!v || 'Campo obrigatório',
      v => /^[0-9]*$/.test(v) || 'Somente números',
      v => (v && v.length === 6) || 'Deve possuir 6 caracteres',
    ],
    cpfRules: [
      v => !!v || 'Campo obrigatório',
      v => /^[0-9]*$/.test(v) || 'Somente números',
      v => (v && v.length === 11) || 'Deve possuir 11 caracteres',
    ]
  }),
  methods: {
    validate() {
      if(this.$refs.form.validate()){
        this.save()
      }
    },
    async loadStudent(cpf) {
      try{
        //TO DO: Load register

        this.student.cpf = cpf
      }
      catch(err){
        this.message.show = true
        this.message.type = 'error'
        this.message.text = err.message
      }
    },
    async cancel() {
      if (
        await this.$refs.confirm.open(
          "Cancelar",
          "Cancelar operação e voltar a tela anterior?"
        )
      ) {
        this.navegateTo('studentsGrid')
      }
    },
    async save() {
      try{
        if(this.edit = true){
          // TO DO: Update register

          this.message.text = 'Registro atualizado com sucesso'
        } else{
          // TO DO: Insert register

          this.message.text = 'Registro inserido com sucesso'
        }

        this.message.show = true
        this.message.type = 'success'
      } catch(err){
        this.message.show = true
        this.message.type = 'error'
        this.message.text = err.message
      }
    },
  },
  created () {
    if(this.$route.params.cpf){
      this.edit = true
      this.loadStudent(this.$route.params.cpf)
    }
  },
}
</script>

<style scoped>
h1{
  border-bottom: 1px solid;
  margin-bottom: 30px;
}
form, .v-alert{
  margin: 0 auto;
  width: 75%;
}
.custom-button{
  height: 40px !important;
  margin: auto 5px 2px auto;
}
</style>
