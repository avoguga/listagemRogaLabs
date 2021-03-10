<template>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          class="formButton"
          v-bind="attrs"
          v-on="on"
        >
          NOVO ALUNO
        </div>
      </template>
      <v-card>
        <v-card-title class="headerForm">
          <span class="headerText">Cadastrar Aluno</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            
              <v-form ref="form">
                <v-col cols="12">
                  <v-text-field
                    label="Nome*"
                    v-model="usuario"
                    :rules="inputRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    required
                    v-model="email"
                    :rules="inputRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Idade*"
                    required
                    v-model="idade"
                    :rules="inputRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Telefone*"
                    required
                    v-model="telefone"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-text-field
                    label="Ultima Avaliação*"
                    required
                    v-model="ultimaAv"
                    :rules="inputRules"
                  ></v-text-field>
                </v-col>
              </v-form>
           
          </v-container>
          <small>*Preenchimento obrigatório</small>
        </v-card-text>
        <v-card-actions>
          <div
            class="cancelButton"
            @click="dialog = false"
          >
            Cancelar
          </div>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            class="saveButton"
            @click="submit"
            :loading=loading
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import db from '@/fb'

  export default {
    data: () => ({
      dialog: false,
      usuario: '', 
      email: '', 
      idade: '', 
      telefone: '',
      ultimaAv: '',
      inputRules: [
        v =>  v && v.length >= 3 || 'Quantidade mínima de caracteres é 3'
      ],
      loading: false
    }),
    methods:{
      submit(){
        if(this.$refs.form.validate()){
          this.loading = true;

          const userLists = {
            usuario: this.usuario,
            email: this.email,
            idade: this.idade,
            telefone: this.telefone,
            ultimaAv: this.ultimaAv
          }

          db.collection('userLists').add(userLists).then(() => {
            this.loading = false;
            this.dialog = false;
          })
          this.$refs.form.reset();
        }
      }
    }
  }
</script>

<style scoped>
  .headerForm{
    background-color: #280E95;
  }
  .headerText{
    color: #FFF;
  }
  .cancelButton{
    color: #280E95;
    cursor:pointer;
  }
  .saveButton{  
    border-radius: 3px;
    text-align: center;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
    background-color: #FE7160;
    color: #FFF;
    cursor:pointer;
    width: 100px;
  }
  .formButton{  
    border-radius: 3px;
    text-align: center;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
    background-color: #FE7160;
    color: #FFF;
    cursor:pointer;
    height: 25px;
    width: 150px;
  }
</style>