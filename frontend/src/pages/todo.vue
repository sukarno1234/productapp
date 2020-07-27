<style>
  .task-done {
    text-decoration: line-through;
    color: #808080;
  }
</style>

<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
      </q-avatar>

      <q-toolbar-title>Batch 32</q-toolbar-title>

      <q-btn flat round dense icon="print" @click="printPDF" />
    </q-toolbar>
    <div class="q-pa-md">
      <div class="row">
        <q-input :error="!todo" v-model="todo" class="col" value="text" label="Todo" />
        <div>
          <q-btn :disabled="!todo" @click="addTask" round color="primary" icon="save" />
        </div>
      </div>
      <div class="row justify-center">
        editingIndex={{ editingIndex }} &nbsp; editDraft={{ editDraft }}
      </div>
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="(task, i) in tasks" :key="task._id" @dblclick="editTask(task, i)" >
          <q-item-section avatar>
            <!-- <q-icon name="signal_wifi_off" /> -->
            <q-checkbox v-model="task.isDone"></q-checkbox>
            <!-- {{ i }} -->
          </q-item-section>
          <q-item-section>
            <span v-show="i !== editingIndex" :class="{'task-done': task.isDone}">{{ task.desc }}</span>
            <q-input @keyup.esc="editingIndex = -1" @keyup.enter="task.desc = editDraft, editingIndex = -1" @blur="editingIndex = -1" v-show="i === editingIndex" :ref="'editInput' + i" v-model="editDraft"></q-input>
          </q-item-section>
          <q-item-section side>
            <q-btn @click="removeTask(i)" round color="red" flat icon="delete"></q-btn>
          </q-item-section>
        </q-item>
      </q-list>
      <pie-chart :donut="true" :data="[['Done', doneTasks], ['Pending', pendingTasks]]"></pie-chart>
      <hello-suk v-model="todo" fname="Coco" lname="Melon" :num="20" @poop="fromChild" />
    </div>
  </div>
</template>

<script>
import helloSuk from 'components/helloSuk.vue'

export default {
  mounted () {
    this.todosService = this.$dbCon.wingsService('todos')
    console.log('Pogi')
    this.todosService.on('dataChange', (messages) => {
      console.log(messages)
      this.tasks = messages
    })
    this.todosService.init()
  },
  components: {
    helloSuk
  },
  data () {
    return {
      editingIndex: -1,
      editDraft: '',
      todo: 'zxczxczxc',
      tasks: [
        {
          _id: 0,
          desc: 'Create Add Button',
          isDone: false
        },
        {
          _id: 1,
          desc: 'Create delete function',
          isDone: false
        }
      ]
    }
  },
  computed: {
    pendingTasks () {
      return this.tasks.filter(t => !t.isDone).length
    },
    doneTasks () {
      return this.tasks.filter(function (task) {
        return task.isDone === true
      }).length
    }
  },
  methods: {
    printPDF () {
      const dd = {
        content: [
          {
            table: {
              body: [
                ['Done', 'Pending'],
                [this.doneTasks, this.pendingTasks]
              ]
            }
          }
        ]
      }

      this.$pdfMake.createPdf(dd).print()
    },
    fromChild (data) {
      console.log('data from poop', data)
    },
    randomId (min, max) {
      return Math.random() * (max - min) + min
    },
    addTask () {
      this.tasks.push({
        _id: this.randomId(0, 999),
        desc: this.todo,
        isDone: false
      })

      this.todo = ''
    },
    removeTask (i) {
      this.tasks.splice(i, 1)
    },
    editTask (task, i) {
      this.editingIndex = i
      this.editDraft = task.desc
      console.log(this.$refs['editInput' + i][0])

      setTimeout(() => {
        this.$refs['editInput' + i][0].focus()
        this.$refs['editInput' + i][0].select()
      }, 100)
    }
  }
}
</script>