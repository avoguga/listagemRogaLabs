<template>
  <v-app id="inspire">
    <v-app-bar 
    app
    color="#ff6450"
    
    >
      <v-row></v-row>
      <v-card
      tile
      class="menuUserHeader"
      >
        <v-toolbar 
        color="#FE7160"
        >
          <v-avatar class="avatarUserHeader"></v-avatar>
          <div>
          <h4 class="white--text">Rafael RogaLabs</h4>
          <body 
          class="usuarioHeader">Último login: 10/03/2020</body>
          </div>
          <v-btn icon>
            <v-icon color="#FFFFFF">mdi-menu-down</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card> 
    </v-app-bar>
    
    <v-main class="mainHeader">
      <div class="miniHeader">

        <div class="inputSearch">
          <v-text-field v-model="search" label="Busque por nomes ou emails"></v-text-field>
          <v-icon class="iconSearch">mdi-magnify</v-icon>
        </div>
        
        <v-container class="rightSideHeader">
          <p> Filtros: </p>
          <v-overflow-btn
            class="mainOverflow"
            item-value="texto"
            :items="items"
            label="Todos"
          ></v-overflow-btn>
          <Form/>
        </v-container>
        
        
      </div>
      
      <v-container>
         <v-alert
          value="false"
          v-model="alert"
          dismissible
          color="#FF6450"
          border="left"
          elevation="2"
          colored-border
        >
          Tem <strong>{{this.userLists.length}}</strong> alunos cadastrados!
        </v-alert>
        <v-row>
          <v-col
            v-for="(userList, i) in filteredUsers"
            :key="i"
            v-model="selected"
          >
          
            <v-card width="260">
              <div v-bind:class="{available: available}" class="cardContent">
                <div class="menuUserContent">
                  <v-avatar class="avatarUser2"></v-avatar>
                  <div class="textCardContent">
                  <h4>{{userList.usuario}}</h4>
                  <body class="usuarioCard">Última avaliação: {{userList.ultimaAv}}</body>
                  </div>
                </div>
              </div>
              
              <v-divider class="mx-4"></v-divider>
              <div class="cardContent">
                <div v-bind:class="{available: available}" class="menuUserContent">
                  <div class="menuUserContentBottom">
                    <body
                    class="usuarioCard">{{userList.email}}</body>
                    <div class="textBoxCard">
                      <body
                  class="usuarioCard">{{userList.idade}}</body>
                      <body
                    class="usuarioCard">{{userList.telefone}}</body>
                    </div>
                  </div>
                    <div class="iconsDiv">
                        <div
                          class="pencilButton"
                        >
                          <v-icon
                            color="#3A2298"
                            @click="alterar()"
                           >
                            mdi-pencil
                          </v-icon>
                        </div>
                        <v-speed-dial
                          
                          v-model="fab"
                        >
                          <template v-slot:activator>
                            <div
                              class="dotsButton"
                            >
                              <v-icon color="#3A2298" v-if="fab">
                                mdi-close
                              </v-icon>
                              <v-icon color="#3A2298" v-else>
                                mdi-dots-horizontal
                              </v-icon>
                            </div>
                          </template>
                          <v-btn
                            fab
                            dark
                            small
                            color="green"
                          >
                            <v-icon>mdi-whatsapp</v-icon>
                          </v-btn>
                          <v-btn
                            fab
                            dark
                            small
                            color="indigo"
                          >
                            <v-icon>mdi-email</v-icon>
                          </v-btn>
                          <v-btn
                            fab
                            dark
                            small
                            color="red"
                            @click="removeUser(userList)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-speed-dial>
                      </div>
                </div>
              </div>
              <v-divider class="mx-4"></v-divider>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Form from '@/components/Form.vue'
  import db from '@/fb'
  export default {
    components: {
    Form
    },
    inputRules: [
        v =>  v && v.length >= 3 || 'Quantidade mínima de caracteres é 3'
      ],
    computed: {
    filteredUsers: function(){
      return this.userLists.filter((userList) => {
        return userList.usuario.toLowerCase().match(this.search.toLowerCase()) || userList.email.toLowerCase().match(this.search.toLowerCase());
      
      });
    }
  },
    methods: {
      sortBy(prop){
        this.userLists.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
      },
      alterar () {
        alert('Alterar atividade do usuario!')
      },
      removeUser(userList){
        db.collection("userLists").doc(userList.id).delete()
      }
    },
    name: "Header",
    data: () => ({
        search: '',
        available: false,
        items: ['Todos', 'Ativos', 'Inativos'
          ],
        userLists: [],
    }),
    
    created(){
      db.collection('userLists').onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if(change.type === 'added'){
            this.userLists.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }else{
            this.userLists.pop({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        })
      }) 
    },

 }
  
</script>

<style scoped>
  .mainHeader{
    margin-top: 40px;
  }
  .available{

    opacity: 0.6;
  }
  .usuarioHeader{
    color: #fff;
    opacity:0.5;
    font-size: 12px;
  }
  .usuarioCard{
    color: #000;
    opacity:0.5;
    font-size: 12px;
  }
  .avatarUserHeader{
    background-color:#fff;
    margin-right: 6px;
  }
  .avatarUser2{
    background-color:#666;
    margin-right: 6px;
  }
  .menuUserHeader{
    background-color:#FE7160;
    margin-right: 76px;
  }
  .menuUserContent{
    width: 300px;
    height: 50%;
    display: flex;
    flex-wrap: wrap;
    padding: auto;
    
  }
  .cardContent{
    padding: 15px;
  }
  .textBoxCard{
    display: flex;
    justify-content: space-between;
  }
  .pencilButton{
    padding: 2px;
    height: 29px;
    width: 29px;
    border-radius: 20px;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
    cursor:pointer;
    margin-right: 8px;
  }
  .dotsButton{
    padding: 2px;
    border-radius: 20px;
    height: 29px;
    width: 29px;
  }
  .iconsDiv{
    display: flex;
    justify-content: space-between;
  }
  .menuUserContentBottom{
   margin-right: 10px;
  }
  .headBodyLine{
    margin-top: 40px;
    height: 50px;
    width: 100%;
   background-color: blue;
  }
  
  .inputSearch{
    display: flex;
    margin-left: 93px;
    margin-bottom: 10px;
    height: 50px;
    width: 260px;
    border-radius: 3px;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
  }
  .iconSearch{
    cursor: pointer;
    width: 30px;
    border-radius: 3px;
  }
  .mainOverflow{
    display: flex;
    margin-left: 2%;
    margin-bottom: 10px;
    height: 50px;
    width: 100px;
    border-radius: 3px;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
  }
  .rightSideHeader{
    margin-right: 33px;
    display: flex;
    align-items: center;
    width: 40%;
  }
  .miniHeader{
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
  }
  .mainContainer{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>