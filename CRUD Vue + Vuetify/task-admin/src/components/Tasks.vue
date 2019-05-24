<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="black">
        <v-toolbar-title>Tasks</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Task</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md10>
                    <v-text-field v-model="editedItem.task_name" label="Task"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md10>
                    <v-text-field v-model="editedItem.task_desc" label="Description"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md5>
                    <v-text-field v-model="editedItem.start_date" label="Start Date"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md2>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-text-field v-model="editedItem.task_type" label="Task Type"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md5>
                    <label >Finish Date?
                      <v-switch
                      label= "No  - Yes"
                       v-model="switchNew"
                    ></v-switch>
                    </label>
                  </v-flex>
                  <v-flex xs12 sm6 md2>
                  </v-flex>
                  <v-flex xs12 sm6 md5>
                    <v-text-field v-if="switchNew" v-model="editedItem.finish_date" label="Finish Date"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      <v-dialog v-model="dialog2" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline align-center">{{sawItem.task_name}}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap align-center>
                <v-flex xs12 sm6 md2>
                </v-flex>
                <v-flex xs12 sm6 md10>
                  <h3>Task:</h3>
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close2">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="tasks"
        class="elevation-1"
        :search = "search"
      >
        <template v-slot:items="props">
          <td class="center">{{ props.item.task_name }}</td>
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
                class="mr-2"
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
      dialog: false,
      dialog2: false,
      switchNew: true,
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
        { text: 'Actions', value: 'name', sortable: false }
      ],
      search: '',
      tasks: [],
      editedIndex: -1,
      editedItem: {
        task_name: 'New task',//String,
        start_date: '',//String, // dd/mm/yyyy
        has_fdate: false,//Boolean,
        finish_date: '',//String, // Optional & dd/mm/yyy
        task_type: 123,//Number,
        task_desc: ''//String
      },
      defaultItem: {
        task_name: 'New task',//String,
        start_date: '',//String, // dd/mm/yyyy
        has_fdate: true,//Boolean,
        finish_date: '',//String, // Optional & dd/mm/yyy
        task_type: 123,//Number,
        task_desc: ''//String
      },
      sawItem: {
        task_name: '',//String,
        start_date: '',//String, // dd/mm/yyyy
        has_fdate: true,//Boolean,
        finish_date: '',//String, // Optional & dd/mm/yyy
        task_type: 123,//Number,
        task_desc: ''//String
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
            task_type: 123,
            task_desc: 'Como desarrollador, me gustaria instalar Node.js y NPM para poder tener un entorno de desarollo completo.'
          },
          {
            task_name: 'Instalar Vue CLI',
            start_date: '20/05/2019',
            has_fdate: true,
            finish_date: '23/05/2019',
            task_type: 123,
            task_desc: 'Como desarrollador, me gustaria instalar Vue CLI, para poder crear una aplicacion web.'
          },
          {
            task_name: 'Instalar Vuetify',
            start_date: '20/05/2019',
            has_fdate: true,
            finish_date: '23/05/2019',
            task_type: 123,
            task_desc: 'Como desarrollador, me gustaria  instalar Vuetify, para agregar estilos y mejorar la UI.'
          },
          {
            task_name: 'Crear Componentes',
            start_date: '20/05/2019',
            has_fdate: true,
            finish_date: '23/05/2019',
            task_type: 123,
            task_desc: 'Como desarrollador, me gustaria crear componentes, para usarlos dentro de las vistas de la aplicacion web.'
          },
          {
            task_name: 'Crear Rutas',
            start_date: '20/05/2019',
            has_fdate: true,
            finish_date: '23/05/2019',
            task_type: 123,
            task_desc: 'Como desarrollador, me gustaria crear rutas, para poder llamar y visualizar componentes.'
          },
          {
            task_name: 'Crear un Data Table',
            start_date: '20/05/2019',
            has_fdate: true,
            finish_date: '23/05/2019',
            task_type: 123,
            task_desc: 'Como desarrollador, me gustaria crear un Data table, para poder agregar, actualizar, visualizar y eliminar tareas.'
          },
          {
            task_name: 'Crear una barra de busqueda',
            start_date: '20/05/2019',
            has_fdate: true,
            finish_date: '23/05/2019',
            task_type: 123,
            task_desc: 'Como desarrollador, me gustaria implementar una barra de busqueda, para poder encontrar tareas de manera mas rapida.'
          },
          {
            task_name: 'Nueva tarea',
            start_date: '20/05/2019',
            has_fdate: true,
            finish_date: '23/05/2019',
            task_type: 123,
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
