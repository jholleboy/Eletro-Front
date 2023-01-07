<template>
  <v-app>
    <v-card>
      <v-card-title>
        Marca
        <v-spacer></v-spacer>
        <v-btn
                color="primary"
                @click="criarMarca"
              >
              Criar Marca
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
        :items="getMarca"
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
              <h5 class="modal-title">Edição de Marca</h5>
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
              <form v-on:submit.prevent="atualizarMarca">
                <div class="mb-3">
                <label for="formName" class="form-label">Nome</label>
                <input :placeholder="Marca" class="form-control" type="text" v-model="Marca" id="Marca">
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
        :class="[{'show d-block': show}, {'d-none': !show}, {'modal-mini': type === 'mini'}]"
        tabindex="-1"
        role="dialog"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Criação de Marca</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="criarMarca"
                
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="cadastroMarca">
              <div class="mb-3">
                <label for="formName" class="form-label">Nome</label>
                <input class="form-control" type="text" v-model="Marca" id="marca">
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
      name: 'Marca',
      data () {
        return {
          search: '',
          loadTable: true,
          id: this.id,
          Marca: this.Marca,
          criarMarca: this.criarMarca,
          dialog: false,
          dialogDelete: false,
          dialogRelatorio: false,
          editedIndex: -1,
          getMarca: [],
          errors: [],
          show:false,
          headers: [
           
            
            { text: 'Nome', value: 'Marca' },
            
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
          criarMarca() {
              setTimeout(() => (this.show = !this.show), 10);
          },
          cadastroMarca(){
                  this.criarMarca()
                  axios.post("/marca", ({
                    
                    Marca: this.Marca,
                    
                  }))
                      .then((res) => {
                          res.send("Cadastro com sucesso!")
                          this.criarMarca()
                          this.dialog = false
                      })
                      .catch((error) => {
                          this.criarMarca()
                          this.dialog = false
                      }).finally(() => {
                          this.criarMarca()
                          this.dialog = false
                      });
              },
              async atualizarMarca(){
                const id = this.id
                
          try{
          await axios.patch("/marca/"+id, {
                  
                  "Marca": this.Marca,
                  
                })
          alert("Marca Atualizado!");
          } catch (error) {
                
                alert("Erro!");
          }
          this.dialog = false
            },
           
  
        editItem (item) {
          this.editedIndex = this.getMarca.indexOf(item)
          this.editedItem = Object.assign({}, item)
        this.id = item.marca_Id
        this.Marca = item.Marca
        
          this.dialog = true
        },
  
        
  
        deleteItem (item) {
          this.editedIndex = this.getMarca.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm (item) {
          
          const id = item.marca_Id
          axios.delete("/marca/"+id)
                          .then((res) => {
                            alert("Marca Removida!");
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
            Object.assign(this.getMarca[this.editedIndex], this.editedItem)
          } else {
            this.getMarca.push(this.editedItem)
          }
          this.close()
        },
  
  },
      created: function(){
        
                     axios.get("/marca")
                          .then(response => {
                            this.getMarca = response.data;
                          })
                          .catch(error => {
                            this.getMarca = error.data;
                          });
                    this.loadTable= false;
              },
    }
  </script>
