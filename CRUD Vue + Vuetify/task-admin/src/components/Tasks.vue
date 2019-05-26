<template >

  <v-layout align-start>
    <v-flex >
          <v-toolbar flat color="#B0BEC5">
        <v-toolbar-title>Tasks</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>

        <!-- New-Edit Task Card -->

      <v-dialog v-model="dialog" max-width="500px">
          <template color="black" v-slot:activator="{ on }">
            <v-btn color="blue-grey darken-3" dark class="mb-2" v-on="on">New Task</v-btn>
          </template>
          <v-card class="white" >
            <v-card-title class="grey">
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text >
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-form
                    ref="form"
                    v-model="valid"
                    placeholder="Placeholder"
                   >
                    <v-text-field
                      v-model="editedItem.task_name"
                      label="Task"
                      placeholder="Type here:"
                      required
                      :rules="[v => !!v || 'Task is required']"
                    ></v-text-field>
                    <v-textarea
                      v-model="editedItem.task_desc"
                      label="Description"
                      placeholder="Write a description of the task"
                      required
                      :rules="[v => !!v || 'Desccription is required']"
                    ></v-textarea>
                    <v-text-field
                      v-model="editedItem.start_date"
                      label="Start Date"
                      placeholder="DD/MM/YYYY"
                      required
                      prepend-icon="event"
                       hint="DD/MM/YYYY format"
                      :rules="sDateRules"
                    ></v-text-field>


                      <v-select
                      required
                      :items="taskTypes"
                      label="Task Type"
                      v-model="selected.name"
                      :value="selected.id"
                      :reduce="name => selected.code"
                    >
                  </v-select>

                    <label >Finish Date?
                      <v-switch
                        label= "No - Yes"
                        v-model="switchNew"
                        required
                    ></v-switch>
                    </label>
                    <v-text-field
                      required
                      :rules="fDateRules"
                      v-if="switchNew"
                      prepend-icon="event"
                      hint="DD/MM/YYYY format"
                      placeholder="DD/MM/YYYY"
                      v-model="editedItem.finish_date"
                      label="Finish Date"
                    ></v-text-field>
                </v-form>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" flat @click="close" >Cancel</v-btn>
              <v-btn color="success" flat @click="save" :disabled="!valid">Save</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

        <!-- See Task Card -->
      <v-dialog  v-model="dialog2" max-width="500px">
        <v-card >
          <v-card-title class="grey">
            <span class="headline align-center">{{sawItem.task_name}}</span>
          </v-card-title>

          <v-card-text class="grey lighten-3" >
            <v-container grid-list-md>
              <v-layout wrap align-center>
                <v-flex xs12 sm6 md2>
                </v-flex>
                <v-flex xs12 sm6 md10>
                  <h3 >Task:</h3>
                  <label> {{sawItem.task_name}}</label>
                </v-flex>
                <v-flex xs12 sm6 md2>
                </v-flex>
                <v-flex xs12 sm6 md10>
                  <h3>Description:</h3>
                  <label> {{sawItem.task_desc}}</label>
                </v-flex>
                <v-flex xs12 sm6 md2>
                </v-flex>
                <v-flex xs12 sm6 md10>
                  <h3>Start Date:</h3>
                  <label> {{sawItem.start_date}}</label>
                </v-flex>
                <v-flex xs12 sm6 md2>
                </v-flex>
                <v-flex xs12 sm6 md10>
                  <h3>Finish Date:</h3>
                  <label> {{sawItem.finish_date}}</label>
                </v-flex>
                <v-flex xs12 sm6 md2>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <h3>Task Type:</h3>
                  <label> {{sawItem.task_type}}</label>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions class="grey lighten-3">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close2">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      </v-toolbar >

      <v-data-table
        :headers="headers"
        :items="tasks"
        class="elevation-1 cyan lighten-5 def"
        :search = "search"
      >
        <template v-slot:items="props">
          <td class="center" >{{ props.item.task_name }}</td>
          <td class="center">{{ props.item.task_desc }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editTask(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
                class="mr-2 "
              @click="deleteTask(props.item)"
            >
              delete
            </v-icon>
            <v-icon
              small
              @click="seeTask(props.item)"
            >
              remove_red_eye
            </v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data(){
    return{
      selected:[
        {
            name: 'Personal',
            id: 1
        },
        {
            name: 'Business',
            id: 2
        },
        {
            name: 'Other',
            id: 3
        }
      ],
      taskTypes: ['Personal','Business','Other'],
      valid: true,
      dialog: false,
      dialog2: false,
      switchNew: true,
      sDateRules: [
        v => ( v.length === 10) || 'Incorrect Format',
        v => !!v || 'Date is required',
        v => (/^((0[1-9]|[12][0-9]|3[01])(\/)(0[13578]|1[02]))|((0[1-9]|[12][0-9])(\/)(02))|((0[1-9]|[12][0-9]|3[0])(\/)(0[469]|11))(\/)\d{4}$/.test(v))  || 'Incorrect Format'

      ],
      fDateRules: [
        v => ( v.length === 10) || 'Incorrect Format',
        v => !!v || 'Date is required',
        v => (/^((0[1-9]|[12][0-9]|3[01])(\/)(0[13578]|1[02]))|((0[1-9]|[12][0-9])(\/)(02))|((0[1-9]|[12][0-9]|3[0])(\/)(0[469]|11))(\/)\d{4}$/.test(v))  || 'Incorrect Format'
      ],
      headers: [
        {
          text: 'Task Name',
          align: 'justify-center',
          sortable: false,
          value: 'task_name'
        },
        {
          text: 'Description',
          value: 'task_desc',
          sortable: false,
          align: 'justify-center',
        },
        {
          text: 'Actions',
          value: 'name',
          sortable: false }
      ],
      search: '',
      tasks: [],
      editedIndex: -1,
      editedItem: {
        task_name: '',
        start_date: '',
        has_fdate: false,
        finish_date: '',
        task_type: 1,
        task_desc: ''
      },
      defaultItem: {
        task_name: '',
        start_date: '',
        has_fdate: true,
        finish_date: '',
        task_type: 2,
        task_desc: ''
      },
      sawItem: {
        task_name: '',
        start_date: '',
        has_fdate: true,
        finish_date: '',
        task_type: 3,
        task_desc: ''
      }
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Task' : 'Edit Task'
      },
      sawTitle () {
        return this.sawIndex === -1 ? 'Task' : 'Task'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },
  methods:{
    initialize () {
        this.tasks = [
          {
            task_name: 'Instalar Node.js y NPM',
            start_date: '20/05/2019',
            has_fdate: true,
            finish_date: '23/05/2019',
            task_type: 1,
            task_desc: 'Como desarrollador, me gustaria instalar Node.js y NPM para poder tener un entorno de desarollo completo.'
          },
          {
            task_name: 'Instalar Vue CLI',
            start_date: '20/05/2019',
            has_fdate: false,
            finish_date: '23/05/2019',
            task_type: 2,
            task_desc: 'Como desarrollador, me gustaria instalar Vue CLI, para poder crear una aplicacion web.'
          },
          {
            task_name: 'Instalar Vuetify',
            start_date: '20/05/2019',
            has_fdate: true,
            finish_date: '27/08/2019',
            task_type: 2,
            task_desc: 'Como desarrollador, me gustaria  instalar Vuetify, para agregar estilos y mejorar la UI.'
          },
          {
            task_name: 'Crear Componentes',
            start_date: '20/05/2019',
            has_fdate: false,
            finish_date: '26/05/2019',
            task_type: 3,
            task_desc: 'Como desarrollador, me gustaria crear componentes, para usarlos dentro de las vistas de la aplicacion web.'
          },
          {
            task_name: 'Crear Rutas',
            start_date: '20/05/2019',
            has_fdate: true,
            finish_date: '23/12/2019',
            task_type: 2,
            task_desc: 'Como desarrollador, me gustaria crear rutas, para poder llamar y visualizar componentes.'
          },
          {
            task_name: 'Crear un Data Table',
            start_date: '20/10/2019',
            has_fdate: true,
            finish_date: '23/06/2019',
            task_type: 1,
            task_desc: 'Como desarrollador, me gustaria crear un Data table, para poder agregar, actualizar, visualizar y eliminar tareas.'
          },
          {
            task_name: 'Crear una barra de busqueda',
            start_date: '20/07/2019',
            has_fdate: false,
            finish_date: '23/05/2019',
            task_type: 2,
            task_desc: 'Como desarrollador, me gustaria implementar una barra de busqueda, para poder encontrar tareas de manera mas rapida.'
          },
          {
            task_name: 'Nueva tarea',
            start_date: '20/08/2019',
            has_fdate: true,
            finish_date: '23/05/2019',
            task_type: 3,
            task_desc: 'Sin Descripcion'
          }
        ]
      },
      editTask (item) {
        this.editedIndex = this.tasks.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      seeTask (item) {
        this.sawIndex = this.tasks.indexOf(item)
        this.sawItem = Object.assign({}, item)
        this.dialog2 = true
      },

      deleteTask (item) {
        const index = this.tasks.indexOf(item)
        confirm('Are you sure you want to delete this task?') && this.tasks.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      close2 () {
        this.dialog2 = false
        setTimeout(() => {
          this.sawItem = Object.assign({}, this.defaultItem)
          this.sawIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.tasks[this.editedIndex], this.editedItem)
        } else {
          this.tasks.push(this.editedItem)
        }
        this.close()
      },
      fillTaskType(){
        /*this.$http.get('https://53lsdx4cm6.execute-api.us-east-1.amazonaws.com/dev/task-type',
        {
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:8080',
              'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
              'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
              'Content-Type': 'application/jsonp',
              'Accept': 'application/jsonp'
            }
          }
        )
        .then(response => (this.options = response))
         .catch(error => console.log(error))
      }
      this.$http.get('https://53lsdx4cm6.execute-api.us-east-1.amazonaws.com/dev/task-type')
          .then(response => {
            console.log("SI");
          })
          .catch(error => console.log(error, "nel"))
        */}
  }
}

</script>

<style media="screen">

  tbody {
     background-color: white;
     color: black;
     width: "1%";
  }
  table{
    width: "1%";
  }
  table, th, td {
    background-color: white;
    padding: 0 10px;
    width: "1%";
  }
  tbody tr:nth-of-type(even) {
    background-color: grey;
    color: black;
  }
  #app > div.application--wrap > main > div > div > div > div > div > div.v-table__overflow > table > thead > tr:nth-child(1) > th{
    color : black;
  }
  th {
    background-color: #CFD8DC;
  }
  #app > div.application--wrap > main > div > div > div > div > div > div.v-datatable.v-table.theme--dark > div {
    background-color: white;
    color: black;
  }
  #app > div.application--wrap > main > div > div > div > div > div > div.v-datatable.v-table.theme--dark > div > div.v-datatable__actions__select > div > div > div > div.v-select__slot > div.v-select__selections > div{
    color: black;
  }
  #app > div.application--wrap > main > div > div > div > div > div > div.v-datatable.v-table.theme--dark > div > div.v-datatable__actions__select > div{
    color: black;
  }
  #app > div.application--wrap > main > div > div > div > div > div > div.v-datatable.v-table.theme--dark > div > div.v-datatable__actions__select > div > div > div > div.v-select__slot > div.v-input__append-inner > div > i{
    color: black;
  }
  td {
    color: black;
  }
  #app > div.application--wrap > main > div > div > div > div > div > div.v-table__overflow > table > tbody > tr > td.justify-center.layout.px-0 > i {
    color: black;
  }
  .darkText{
    color:black;
  }
  label {
    color:black;
  }
  h3{
    color: black;
  }
  input, select, textarea{
      color: black;
  }
</style>
