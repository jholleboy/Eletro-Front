<template>
  <v-app>
    <v-card>
      <v-card-title>
        Eletrodomésticos
        <v-spacer></v-spacer>
        <v-btn
                color="primary"
                @click="criarEletro"
              >
              Criar Eletrodomésticos
              </v-btn><v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="Eletro"
        :search="search"
        :loading="loadTable"
        loading-text="Carregando... Por favor,aguarde!"
      >
  
  
      <template v-slot:top>
        <v-toolbar
          flat
        >
        <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card>
                <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edição de Eletro</h5>
              <v-btn
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="close"
              >
                <span aria-hidden="true">&times;</span>
              </v-btn>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="atualizarEletro">
                <div class="mb-3">
                <label for="formName" class="form-label">Nome</label>
                <input  :placeholder="nome" class="form-control" type="text" v-model="criarNome" id="nome">
              </div>
              <div class="mb-3">
                <label for="formName" class="form-label">Descrição</label>
                <input :placeholder="descricao" class="form-control" type="text" v-model="criarDescricao" id="descricao">
              </div>
              <label for="formName" class="form-label">Marca</label>
              <select class="form-control" ref="Marca">
                <option value="1" selected>Selecione uma Marca</option>
                <option v-for="MarcaNome in MarcaNome" :key="MarcaNome.marca_Id" :value="MarcaNome.marca_Id">{{ MarcaNome.Marca }}</option>
              </select>
              <label for="formName" class="form-label">Tensão</label>
              <select class="form-control" ref="Tensao">
                <option value="1" selected>Selecione uma Tensão</option>
                <option v-for="TensaoNome in TensaoNome" :key="TensaoNome.tensao_Id" :value="TensaoNome.tensao_Id">{{ TensaoNome.Tensao }}</option>
              </select>
              <div class="mb-3">
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  type="submit"
                >
                  Salvar
                </v-btn>
              </div>
              </form>
            </div>
          </div>
        </div>
            </v-card>
          </v-dialog>
  
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Deseja remover esse registro?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm(item)">Sim</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
  
          </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
      
        <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
        <v-icon
          small
          @click="deleteItemConfirm(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <span>
          Carregando... Por favor,aguarde!
        </span>
      </template>
      </v-data-table>
    </v-card>
    <div
        ref="modal"
        class="modal fade"
        :class="[{'show d-block': show}, {'d-none': !show}]"
        tabindex="-1"
        role="dialog"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Criação de Eletrodomésticos</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="criarEletro"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="cadastroEletro">
              <div class="mb-3">
                <label for="formName" class="form-label">Nome</label>
                <input class="form-control" type="text" v-model="criarNome" id="nome">
              </div>
              <div class="mb-3">
                <label for="formName" class="form-label">Descrição</label>
                <input :placeholder="descricao" class="form-control" type="text" v-model="criarDescricao" id="descricao">
              </div>
              <label for="formName" class="form-label">Marca</label>
              <select class="form-control" ref="Marca">
                <option value="1" selected>Selecione uma marca</option>
                <option v-for="MarcaNome in MarcaNome" :key="MarcaNome.marca_Id" :value="MarcaNome.marca_Id">{{ MarcaNome.Marca }}</option>
              </select>
              <label for="formName" class="form-label">Tensão</label>
              <select class="form-control" ref="Tensao">
                <option value="1" selected>Selecione uma Tensão</option>
                <option v-for="TensaoNome in TensaoNome" :key="TensaoNome.tensao_Id" :value="TensaoNome.tensao_Id">{{ TensaoNome.Tensao }}</option>
              </select>
              <div class="mb-3">
                <button type="submit" class="btn btn-primary pull-right">Cadastrar</button>
              </div>
              </form>
              </div>
          </div>
        </div>
      </div>
    </v-app>
  </template>
  
  <script>
  //import 'bootstrap/dist/css/bootstrap.min.css';
  //import ActionButtonsUsers from "./Components/ActionButtonsUsers.vue"
  import axios from "axios"
  
    export default {
      name: 'Eletro',
      data () {
        return {
          search: '',
          loadTable: true,
          id: this.id,
          nome: this.nome,
          descricao: this.descricao,
          marca: this.Marca,
          tensao: this.Tensao,
          criarNome: this.criarNome,
          criarDescricao: this.criarDescricao,
          dialog: false,
          dialogDelete: false,
          dialogRelatorio: false,
          editedIndex: -1,
          Eletro: [],
          MarcaNome: [],
          TensaoNome:[],
          errors: [],
          show:false,
          headers: [
            
            { text: 'Nome', value: 'Nome' },
            { text: 'Descrição', value: 'Descricao' },
            { text: 'Marca', value: 'Marca' },
            { text: 'Tensão', value: 'Tensao' },            
            { text: 'Ações', value: 'actions', sortable: false },
          ],
        }
      },
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
        dialogRelatorio (val) {
          val || this.closeRelatorio()
        },
      },
      methods: {
          criarEletro() {
              setTimeout(() => (this.show = !this.show), 10);
          },
         async cadastroEletro(){
                  this.criarEletro()
                  try{
                   await axios.post("/eletro/", {
                  
                    Nome: this.criarNome,
                    Descricao: this.criarDescricao,
                    Marca: this.$refs['Marca'].value,
                    Tensao: this.$refs['Tensao'].value,
                  
                })
          
          alert("Eletro Criado!");
          this.$router.go(0);
          } catch (error) {
                
                alert("Erro!");
          }
          this.dialog = false
              },
              async atualizarEletro(){
                const id = this.id
                
          try{
          await axios.patch("/eletro/"+id, {
                  
                  "Nome": this.criarNome,
                  "Descricao": this.criarDescricao,
                  "Marca": this.$refs['Marca'].value,
                  "Tensao": this.$refs['Tensao'].value,
                })
          alert("Eletro Atualizado!");
          this.$router.go(0);
          } catch (error) {
                
                alert("Erro!");
          }
          this.dialog = false
            },
           
  
        editItem (item) {
        this.editedIndex = this.Eletro.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.id = item.Id
        this.nome = item.Nome
        this.descricao = item.Descricao
        this.marca = item.Marca
        this.tensao = item.Tensao
        this.dialog = true
        },
  
        
  
        deleteItem (item) {
          this.editedIndex = this.Eletro.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm (item) {
          
          const id = item.Id
          axios.delete("/eletro/"+id)
                          .then((res) => {
                            alert("Eletro Removido!");
                            this.$router.go(0);
                          })
                          .catch((error) => {
                            alert("Erro!");
                          }).finally(() => {
                          });
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeRelatorio () {
          this.dialogRelatorio = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.Eletro[this.editedIndex], this.editedItem)
          } else {
            this.Eletro.push(this.editedItem)
          }
          this.close()
        },
  
  },
      created: function(){
        this.$http.get('/tensao')
        .then(response => {
              this.TensaoNome = response.data;
                   })
        this.$http.get('/marca')
        .then(response => {
              this.MarcaNome = response.data;
                   })
                     axios.get("/eletro")
                          .then(response => {
                            this.Eletro = response.data;
                            
                          })
                          .catch(error => {
                            this.Eletro = error.data;
                            
                          });
                          
                    this.loadTable= false;
              },
    }
  </script>