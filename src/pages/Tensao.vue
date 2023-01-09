<template>
  <v-app>
    <v-card>
      <v-card-title>
        Tensão
        <v-spacer></v-spacer>
        <v-btn
                color="primary"
                @click="criarTensao"
              >
              Criar Tensão
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
        :items="getTensao"
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
              <h5 class="modal-title">Edição de Tensão</h5>
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
              <form v-on:submit.prevent="atualizarTensao">
                <div class="mb-3">
                <label for="formName" class="form-label">Nome</label>
                <input :placeholder="Tensao" class="form-control" type="text" v-model="Tensao" id="Tensao">
              </div>
              
              
              
              
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
              <h5 class="modal-title">Criação de Tensão</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="criarTensao"
                
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="cadastroTensao">
              <div class="mb-3">
                <label for="formName" class="form-label">Nome</label>
                <input class="form-control" type="text" v-model="criarNome" id="criarNome">
              </div>
      
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
  import axios from "axios"
  
    export default {
      name: 'Tensao',
      data () {
        return {
          search: '',
          loadTable: true,
          id: this.id,
          Tensao: this.Tensao,
          criarNome: this.criarNome,
          dialog: false,
          dialogDelete: false,
          dialogRelatorio: false,
          editedIndex: -1,
          getTensao: [],
          errors: [],
          show:false,
          headers: [
        
            
            { text: 'Nome', value: 'Tensao' },
            
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
          criarTensao() {
              setTimeout(() => (this.show = !this.show), 10);
          },
          async cadastroTensao(){
                  this.criarTensao()
                  
                  try{
                   await axios.post("/tensao/", {
                  
                  "Tensao": this.criarNome,
                  
                })
          
          alert("Tensao Criada!");
          } catch (error) {
                
                alert("Erro!");
          }
          this.dialog = false
                  
                 
              },
              async atualizarTensao(){
                const id = this.id
                
          try{
          await axios.patch("/tensao/"+id, {
                  
                  "Tensao": this.Tensao,
                  
                })
          alert("Tensao Atualizado!");
          } catch (error) {
                
                alert("Erro!");
          }
          this.dialog = false
            },
           
  
        editItem (item) {
          this.editedIndex = this.getTensao.indexOf(item)
          this.editedItem = Object.assign({}, item)
        this.id = item.tensao_Id
        this.Tensao = item.Tensao
        
          this.dialog = true
        },
  
        
  
        deleteItem (item) {
          this.editedIndex = this.getTensao.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm (item) {
          
          const id = item.tensao_Id
          axios.delete("/tensao/"+id)
                          .then((res) => {
                            alert("Tensao Removida!");
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
            Object.assign(this.getTensao[this.editedIndex], this.editedItem)
          } else {
            this.getTensao.push(this.editedItem)
          }
          this.close()
        },
  
  },
      created: function(){
        
                     axios.get("/tensao")
                          .then(response => {
                            this.getTensao = response.data;
                          })
                          .catch(error => {
                            this.getTensao = error.data;
                          });
                    this.loadTable= false;
              },
    }
  </script>
